'WOReceiptMaint'.maint({panelStyle: "titled", icon: "Boxes"})
'WOReceipt'.datatype()
'Add Work Order Receipt'.title({when: 'adding'})
'Edit Work Order Receipt'.title({when: 'editing'})
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Labels'.action({spec: "Labels.js"})
'Attachments'.action({act: 'attachments'})

'Receipt Details'.panel()
'receiptNumber'.field({key: true})
'workOrder'.field({refersToParent: 'WO', showAsLink: true, indexed: true})
'receivedDate'.field({date: true, caption: 'Completion Date'})
'fgLocation'.field({refersTo: 'Location', readOnly: true, showAsLink: true, caption: 'Location'})

'product'.field({refersTo: 'products', showAsLink: true, readOnly: true})
'orderedQuantity'.field({numeric: true, readOnly: true})
'receivedQuantity'.field({numeric: true})
'previouslyReceived'.field({numeric: true, readOnly: true})
'cancelledQuantity'.field({numeric: true})
'outstandingQuantity'.field({numeric: true, readOnly: true})

'Product Image'.panel()
'image'.field({postImage: true, postImageType: 'full', postIdField: 'product'})
'thumbnailImage'.field({postImage: true, postImageType: 'thumbnail', postIdField: 'product', caption: 'Image', hidden: true})

'outstandingQuantity'.calculate(async (woReceipt) => {
  let res = woReceipt.orderedQuantity - woReceipt.previouslyReceived - woReceipt.receivedQuantity - woReceipt.cancelledQuantity
  if ( res < 0 )
    res = 0
  return res
})

'previouslyReceived'.calculate(async (woReceipt) => {
  let res = 0
  let otherRecs = await 'WOReceipt'.bring({workOrder: woReceipt.workOrder}, {useIndexedField: 'workOrder', forceFast: true})
  if ( otherRecs === 'na' )
    otherRecs = await 'WOReceipt'.bring({workOrder: woReceipt.workOrder}, {useIndexedField: 'workOrder'})
  for ( var i = 0; i < otherRecs.length; i++ ) {
    let rl = otherRecs[i]
    if ( rl.id === woReceipt.id ) continue
    res = res + rl.receivedQuantity
  }
  return res
})

'product'.calculate(async woReceipt => {
  let wo = await woReceipt.referee('workOrder'); if ( ! wo ) return
  return wo.product
})

'fgLocation'.calculate(async woReceipt => {
  let wo = await woReceipt.referee('workOrder'); if ( ! wo ) return
  return wo.fgLocation
})

'orderedQuantity'.calculate(async woReceipt => {
  let wo = await woReceipt.referee('workOrder'); if ( ! wo ) return
  return wo.fgQuantity
})

'WOReceipt'.method('createTransactions', async function(chg) {

  let createFGTransaction = async () => {
    let tran = await 'Transaction'.create()
    tran.product = global.copyObj(this.product)
    tran.date = this.receivedDate
    tran.quantity = chg
    tran.unitCost = wo.fgUnitCostIncTax
    tran.source = 'WO Receipt'
    tran.reference = wo.workOrderNumber
    tran.location = global.copyObj(wo.fgLocation)
    tran.taxPct = wo.taxPct
  }

  let createRMTransaction = async woLine => {
    let tran = await 'Transaction'.create()
    let consumedQuantity = woLine.quantity * (chg / wo.fgQuantity)
    tran.product = global.copyObj(woLine.product)
    tran.date = this.receivedDate
    tran.quantity = - consumedQuantity
    tran.unitCost = woLine.unitCostIncTax
    tran.source = 'WO Consumed'
    tran.reference = wo.workOrderNumber
    tran.location = global.copyObj(woLine.location)
    tran.taxPct = wo.taxPct
  }

  let wo = await this.referee('workOrder'); if ( ! wo ) return
  await createFGTransaction()
  let woLines = await wo.toWOLines()
  for ( var i = 0; i < woLines.length; i++ ) {
    let woLine = woLines[i]
    await createRMTransaction(woLine)
  }
})

'WOReceipt'.beforeSaving(async function() {
  let unreceived = this.orderedQuantity - this.previouslyReceived - this.receivedQuantity
  if ( this.propChanged('cancelledQuantity') ) {
    if ( this.orderedQuantity >= 0 ) {
      if ( unreceived < 0 ) unreceived = 0
      if ( this.cancelledQuantity > unreceived ) throw(new Error('You cannot cancel more than the quantity left on order'))
    } else {
      if ( unreceived > 0 ) unreceived = 0
      if ( this.cancelledQuantity < unreceived ) throw(new Error('You cannot cancel more than the quantity left on order'))
    }
  }
  let wo = await this.referee('workOrder')
  if ( wo )
    await wo.refreshReceived()
  let chg = this.receivedQuantity - this.getOld().receivedQuantity
  await wo.refreshStatus()
  if ( chg !== 0 )
    await this.createTransactions(chg)
  let inventory = await this.toInventory()
  await this.refreshQuantitiesOnWOLines()
  if ( inventory ) {
    await inventory.refreshQuantityBeingManufactured()
  }
})

'WOReceipt'.method('refreshQuantitiesOnWOLines', async function() {
  let wo = await this.toWO(); if ( ! wo ) return
  let lines = await wo.toWOLines()
  for ( var i = 0; i < lines.length; i++ ) {
    let line = lines[i]
    let inventory = await line.toInventory(); if ( ! inventory ) continue
    await inventory.refreshQuantityOnWOLines()
  }
})

'WOReceipt'.method('toInventory', async function() {
  let product = await this.referee('product'); if ( ! product ) return null
  return await product.toInventory()
})

'WOReceiptMaint'.makeDestinationFor('WOReceipt')

'WOReceipt'.method('toWO', async function(options) {
  return await this.referee('workOrder', options)
})

'WOReceiptMaint'.whenAdding(async function(woReceipt, maint) {

  let defaultReceiptNumber = async () => {
    let recToSuffix = (aRec) => {
      let no = aRec.receiptNumber
      let parts = no.split('-')
      if ( parts.length < 2 ) return "00"
      return parts[parts.length - 1]
    }
  
    let incSuffix = (aSuffix) => {
      let no = Number(aSuffix) + 1 + ""
      return no.padStart(2, '0')
    }

    let recsToOneWithMaxReceiptNumber = (aRecs) => {
      let res
      let max = ''
      aRecs.forAll(rec => {
        let no = rec.receiptNumber; if ( ! no ) return 'continue'
        if ( no <= max ) return 'continue'
        max = no
        res = rec
      })
      return res
    }
  
    let woNo = this.fieldNameToKeyValue('workOrder')
    let woRef = this.getFieldValue('workOrder')
    let recs = await 'WOReceipt'.bring({workOrder: woRef})
    let rec = recsToOneWithMaxReceiptNumber(recs)
    let suffix = "01"
    if ( rec ) {
      suffix = recToSuffix(rec)
      suffix = incSuffix(suffix)
    }
    let recNo = woNo + "-" + suffix
    this.setFieldValue('receiptNumber', recNo)
  }

  await defaultReceiptNumber()
  woReceipt.receivedQuantity = woReceipt.outstandingQuantity
})


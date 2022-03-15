'EnterStocktakeCounts'.maint({panelStyle: "titled", icon: 'HandPointRight', includeManifestSearch: true})
'Enter Stocktake Counts'.title()
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Finalise'.action()
'Zero Uncounted'.action()
'Variances'.action({spec: "StocktakeVariances.js"})
'Stocktake'.datatype()

'Stocktake Details'.panel()
'stocktakeNumber'.field({readOnly: true})
'stocktakeDate'.field({readOnly: true})
'location'.field({readOnly: true, showAsLink: true})
'status'.field({readOnly: true})

'Lines'.manifest()
'StocktakeLine'.datatype()
'product'.field({showAsLink: true})
'sku'.field()
'supplier'.field({showAsLink: true})
'supplierSku'.field()
'wooCommerceRegularPrice'.field()
'countedQuantity'.field({numeric: true, readOnly: false})
'systemQuantity'.field()
'discrepancy'.field()

'Zero Uncounted'.act(async (maint, stocktake) => {
  let lines = await 'StocktakeLine'.bringChildrenOf(stocktake)
  for ( var i = 0; i < lines.length; i++ ) {
    let line = lines[i]
    line.countEntered = true
  }
})

'discrepancy'.visibleWhen(list => {
  let m = global.foreman.doNameToMold('Configuration'); if ( ! m ) return false
  let c = m.fastRetrieveSingle(); if ( ! c ) return false
  return c.showDiscrepanciesInCountPage === 'Yes'
})

'systemQuantity'.visibleWhen(list => {
  let m = global.foreman.doNameToMold('Configuration'); if ( ! m ) return false
  let c = m.fastRetrieveSingle(); if ( ! c ) return false
  return c.showDiscrepanciesInCountPage === 'Yes'
})

'EnterStocktakeCounts'.readOnly((maint, stocktake) => {
  if ( stocktake.status === 'Finalised' )
    return "This Stocktake has been finalised and cannot be altered"
})

'countedQuantity'.modifyInputRenderValue((renderValue, stocktakeLine) => {
  if ( stocktakeLine.countEntered ) return renderValue
  if ( renderValue !== '0' ) return renderValue
  return ''
})

'Finalise'.act(async (maint, stocktake) => {
  if ( stocktake.status === "Finalised" ) throw(new Error("This Stocktake has already been finalised previously"))
  await stocktake.finalise()
  maint.showMessage('The Stocktake has been finalised')
})

'Stocktake'.method('finalise', 
  async function() {
    let lines = await 'StocktakeLine'.bringChildrenOf(this)
    await lines.forAllAsync(async (line) => {
      await line.finalise()
    })
    this.status = 'Finalised'
  }
)

'StocktakeLine'.method('finalise', 
  async function() {
    if ( (! this.countedQuantity) && (! this.countEntered) ) throw(new Error("Please enter a quantity for all products before finalising"))
    let chg = this.countedQuantity - this.systemQuantity
    let tran = await 'Transaction'.create()
    let stocktake = await this.parent()
    tran.product = this.product
    tran.date = stocktake.stocktakeDate
    tran.location = stocktake.location
    tran.quantity = chg
    tran.source = 'Stocktake'
    tran.reference = stocktake.stocktakeNumber
  }
)


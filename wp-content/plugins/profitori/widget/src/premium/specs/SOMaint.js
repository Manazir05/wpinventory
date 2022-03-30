'SOMaint'.maint({panelStyle: "titled", icon: 'Truck'})
'Sales Order Fulfillment'.title()
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Drop Ship'.action()

'SO'.datatype()

'Order Summary'.panel()
'order'.field({readOnly: true})
'orderDate'.field({readOnly: true})
'wcNiceStatus'.field({caption: 'WC Order Status'})
'shippingNameAndCompany'.field({caption: "Ship To", readOnly: true})
'shippingAddress'.field({caption: "Address", readOnly: true})
'shippingEmailAndPhone'.field({caption: "Contact", readOnly: true})

'Fulfillment Details'.panel()
'latestShipmentNumber'.field({caption: 'Shipment Number', readOnly: true})
'shipFromLocation'.field()
'packable'.field({readOnly: true, caption: 'Packable From This Location'})
'shipmentMethod'.field()
'fulfillStage'.field()
'priority'.field()
'notes'.field()

'Lines'.manifest()
'SOLine'.datatype()
'sequence'.field()
'descriptionAndSKU'.field({caption: 'Product', showAsLink: true})
'shipFromLocation'.field({showAsLink: true})
'packable'.field()
'fulfillStage'.field()
'priority'.field()
'quantityOrdered'.field()
'quantityRemainingToShip'.field()
'quantityPickable'.field()
'quantityToPack'.field()
'quantityShipped'.field({readOnly: false})
'quantityShippedIncremental'.field({readOnly: false})
'Edit'.action({place: 'row', act: 'edit'})
'SOLineMaint.js'.maintSpecname()

'Drop Ship'.act(async maint => {
  await maint.segue('add', 'POMaint.js')
})

'quantityShippedIncremental'.columnVisibleWhen((list, line) => {
  return global.confVal('enterIncrementalShipmentQuantity') === 'Yes'
})

'quantityShipped'.readOnlyWhen((maint, line) => {
  return global.confVal('enterIncrementalShipmentQuantity') === 'Yes'
})

'SOMaint'.afterInitialising(async so => {

/*
  let refreshLatestShipmentNumber = async () => {

    let shipmentToSuffix = (shipment) => {
      let no = shipment.shipmentNumber
      let parts = no.split('-')
      if ( parts.length < 2 ) return "00"
      return parts[parts.length - 1]
    }

    let incSuffix = (aSuffix) => {
      let no = Number(aSuffix) + 1 + ""
      return no.padStart(2, '0')
    }

    let shipmentsToOneWithMaxShipmentNumber = (shipments) => {
      let res
      let max = ''
      shipments.forAll(shipment => {
        let no = shipment.shipmentNumber; if ( ! no ) return 'continue'
        if ( no <= max ) return 'continue'
        max = no
        res = shipment
      })
      return res
    }

    let shipment
    if ( so.latestShipmentNumber )
      shipment = await 'SOShipment'.bringSingle({shipmentNumber: so.latestShipmentNumber})
    let needNew = (! shipment) || (shipment.shipmentDate !== global.todayYMD()) || shipment.invoiced === 'Yes'
    if ( ! needNew )
      return
    let shipments = await 'SOShipment'.bring({order: so.order})
    shipment = shipmentsToOneWithMaxShipmentNumber(shipments)
    let suffix = "01"
    if ( shipment ) {
      suffix = shipmentToSuffix(shipment)
      suffix = incSuffix(suffix)
    }
    so.latestShipmentNumber = so.order.id + "-" + suffix
  }
*/

  await so.refreshLatestShipmentNumber()
})

'wcNiceStatus'.dynamicOptions(async maint => {
  let res = ['Pending', 'On-hold', 'Processing', 'Completed']
  let orders = await 'orders.RecentOrActive'.bring()
  for ( var i = 0; i < orders.length; i++ ) {
    let order = orders[i]
    let status = order.niceStatus
    if ( res.indexOf(status) >= 0 ) continue
    res.push(status)
  }
  return res
})

'Lines'.defaultSort({field: "sequence"})

'Lines'.filter(async (soLine, list) => {
  if ( ! soLine.parentSOLine ) {
    let lineType = soLine.lineType
    if ( lineType && (lineType !== 'Product') )
      return false
    return true
  }
  let parentLine = await soLine.toTopParentSOLine(); if ( ! parentLine ) return false
  return parentLine.quantityToMake !== 0
})

'Labels'.page({readOnly: false})
'Labels'.title()
'Back'.action({act: 'cancel'})
'Layout'.action({spec: 'TemplateMaint.js'})
'Download Labels PDF'.action()
'Print Labels'.action()
'labelType'.field({readOnly: true})
'sourceType'.field({readOnly: true})
'sourceReference'.field({readOnly: true})
'howMany'.field()
'enteredNumberOfLabels'.field({numeric: true, decimals: 0, readOnly: false, caption: "Number of Labels"})

'Labels'.beforeLoading(async page => {
  let cast = page.callerCast()
  if ( cast ) {
    if ( cast.datatype() === 'POReceipt' ) {
      page.setFieldValue('labelType', 'Inventory')
      page.setFieldValue('sourceType', 'Purchase Order Receipt')
      page.setFieldValue('sourceReference', cast.receiptNumber)
      return
    } else if ( cast.datatype() === 'products' ) {
      page.setFieldValue('labelType', 'Inventory')
      page.setFieldValue('sourceType', 'Product')
      page.setFieldValue('sourceReference', cast.uniqueName)
      return
    } else if ( cast.datatype() === 'Inventory' ) {
      page.setFieldValue('labelType', 'Inventory')
      page.setFieldValue('sourceType', 'Product')
      page.setFieldValue('sourceReference', cast.productName)
      return
    }
  }
  page.setFieldValue('labelType', 'Inventory')
  page.setFieldValue('sourceType', 'Product')
  page.setFieldValue('sourceReference', 'Selected Products')
})

'Download Labels PDF'.act(async (page, cast) => {
  let numberOfLabels = (cast.howMany === 'Enter Number of Labels') ? cast.enteredNumberOfLabels : -1
  page.downloadPDF({spec: "LabelsPdf.js", docName: "Labels for " + cast.sourceReference + ".PDF", cast: page.callerCast(), numberOfLabels: numberOfLabels})
})

'Print Labels'.act(async (page, cast) => {
  let numberOfLabels = (cast.howMany === 'Enter Number of Labels') ? cast.enteredNumberOfLabels : -1
  page.downloadPDFandPrint({spec: "LabelsPdf.js", docName: "Labels for " + cast.sourceReference + ".PDF", cast: page.callerCast(), numberOfLabels: numberOfLabels})
})

'howMany'.dynamicOptions(async page => {
  let cast = page.callerCast()
  if ( cast && (cast.datatype() === 'POReceipt') ) 
    return ['Use Quantity Received', 'Enter Number of Labels']
  else
    return ['Use Quantity On Hand', 'Enter Number of Labels']
})

'howMany'.default(page => {
  let cast = page.callerCast()
  if ( cast && (cast.datatype() === 'POReceipt') ) 
    return 'Use Quantity Received'
  return 'Use Quantity On Hand'
})

'enteredNumberOfLabels'.visibleWhen((page, cast) => {
  return cast.howMany === 'Enter Number of Labels'
})

'enteredNumberOfLabels'.inception(1)

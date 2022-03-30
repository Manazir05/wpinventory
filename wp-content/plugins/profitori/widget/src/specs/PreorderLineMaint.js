'PreorderLineMaint'.maint({panelStyle: "titled"})
'Add Preorder Line'.title({when: 'adding'})
'Edit Preorder Line'.title({when: 'editing'})
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Add another line'.action({act: 'add'})
'PreorderLine'.datatype()

'Line Details'.panel()
'preorder'.field({refersToParent: 'Preorder', showAsLink: true, caption: 'Preorder Number'})
'lineType'.field()
'product'.field({refersTo: 'products'})
'description'.field({allowEmpty: false, showAsLink: true})
'shippingMethod'.field()

''.panel()

'Quantity and Price'.panel()
'quantity'.field({numeric: true})
'unitValueExclTaxFX'.field({numeric: true})
'unitValueIncTaxFX'.field({numeric: true, caption: "Unit Price (Inc Tax)"})
'taxPct'.field({numeric: true, decimals: 2, caption: "Tax %"})
'lineValueIncTaxFX'.field({numeric: true, decimals: 2, caption: "Line Total (Inc Tax)", readOnly: true})
'lineTaxFX'.field({numeric: true, decimals: 2, readOnly: true})

'Product Image'.panel()
'image'.field({caption: ''})

'shippingMethod'.visibleWhen((maint, line) => {
  return line.lineType === 'Shipping'
})

'shippingMethod'.excludeChoiceWhen(async (maint, shippingMethod, line) => {
  let preorder = await line.toPreorder(); if ( ! preorder ) return true
  let countryCode = await preorder.toCountryCode()
  if ( ! countryCode ) return false
  return ! (await shippingMethod.appliesToCountryCode(countryCode))
})

'PreorderLine'.validate(async function() {
  if ( this.lineType === 'Shipping' ) {
    if ( (this.isNew() || this.propChanged('shippingMethod')) && (! this.shippingMethod) )
      throw(new Error('Shipping Method is required'))
  }
})

'Product Image'.visibleWhen((maint, line) => {
  return ((line.lineType === 'Product') && line.product) ? true : false
})

'PreorderLineMaint'.makeDestinationFor('PreorderLine')

'PreorderLine'.datatype()

'unitValueExclTaxFX'.visibleWhen((maint, preorderLine) => {
  return preorderLine.includeTaxOption === "No"
})

'unitValueIncTaxFX'.visibleWhen((maint, preorderLine) => {
  return preorderLine.includeTaxOption !== "No"
})

'quantity'.afterUserChange(async (oldInputValue, newInputValue, preorderLine, maint) => {
  await preorderLine.maybeGenerateImpostLines()
})

'product'.afterUserChange(async (oldInputValue, newInputValue, preorderLine, maint) => {
  let name = await preorderLine.toProductName()
  if ( name )
    maint.setFieldValue('description', name)
  let product = await 'products'.bringFirst({uniqueName: newInputValue}) 
  if ( product ) {
    maint.setFieldValue('unitValueExclTaxFX', await product.toRegularPriceExclTax())
    maint.setFieldValue('unitValueIncTaxFX', await product.toRegularPriceIncTax())
    let taxPct = await product.toRetailTaxPct()
    maint.setFieldValue('taxPct', taxPct)
    await preorderLine.maybeGenerateImpostLines()
  }
})

'lineType'.afterUserChange(async (oldInputValue, newInputValue, preorderLine, maint) => {
  let lineType = preorderLine.lineType
  if ( lineType === "Other" ) {
    maint.setFieldValue('description', '')
    maint.setFieldValue('quantity', 1)
  } else if ( lineType && (lineType !== "Product") ) {
    maint.setFieldValue('description', lineType)
    maint.setFieldValue('quantity', 1)
  }
})

'product'.visibleWhen((maint, preorderLine) => {
  let lineType = preorderLine.lineType
  return (! lineType) || (lineType === "Product")
})

'taxPct'.inception(async (preorderLine) => {
  let config = await 'Configuration'.bringSingle(); if ( ! config ) return 0
  let res = config.taxPct
  return res
})

'PreorderLine'.datatype()

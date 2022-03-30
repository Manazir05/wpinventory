'LotMaint'.maint()
'Add Lot'.title({when: 'adding'})
'Edit Lot'.title({when: 'editing'})
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Add another'.action({act: 'add'})
'Attachments'.action({act: 'attachments'})
'Lot'.datatype()
'lotNumber'.field({readOnly: true})
'product'.field({readOnly: true})
'expiryDate'.field()

'expiryDate'.afterUserChange(async (oldInputValue, newInputValue, lot) => {
  let allotments = await 'Allotment'.bring({lot: lot.reference()})
  for ( var i = 0; i < allotments.length; i++ ) {
    let allotment = allotments[i]
    allotment.__afterRetrieveDone = false
  }
})

'Lot'.allowTrash(async function() {
  if ( this.lotNumber === "Unspecified" ) 
    return 'The "Unspecified" lot cannot be trashed'
  if ( await this.hasClumps() )
    return 'This lot has inventory data and cannot be trashed'
  return null
})

'Lot'.method('hasClumps', async function() {
  let clump = await 'Clump'.bringFirst({lot: this})
  return clump ? true : false
})

'LotMaint'.makeDestinationFor('Lot')

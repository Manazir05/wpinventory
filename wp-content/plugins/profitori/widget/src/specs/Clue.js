'Clue'.datatype()
'date'.field({date: true})
'time'.field()
'clientOrServer'.field()
'user'.field()
'point'.field()
'theDatatype'.field()
'castId'.field({numeric: true})
'fieldName'.field()
'newValue'.field()
'oldValue'.field()
'reference'.field()
'product'.field({refersTo: 'products'})

'product'.calculate(async clue => {
  let product
  if ( clue.theDatatype === 'products' ) {
    product = await 'products'.bringFirst({id: clue.castId}); if ( ! product ) return null
  } else if ( clue.theDatatype === 'Inventory' ) {
    let inventory = await 'Inventory'.bringFirst({id: clue.castId}); if ( ! inventory ) return null
    product = await inventory.toProduct(); if ( ! product ) return null
  } else
    return null
  return product.reference()
})

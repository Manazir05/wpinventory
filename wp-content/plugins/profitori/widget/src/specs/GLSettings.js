'GLSettings'.maint({icon: 'Cog'})
'General Ledger Settings'.title()
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Locations'.action({spec: 'LocationList.js'})
'Configuration'.datatype()

'calendarStartingMonth'.field()
'glEnabled'.field()
'preventPostingBefore'.field()

'GLSettings'.onSave(async (maint, cast) => {
  await maint.harmonize()
})

'ExtensionList'.list()
'Extension Specs'.title()
'Back'.action({act: 'cancel'})
'Add'.action({act: 'add'})
'Refresh'.action({act: "refresh"})
'Download to Excel'.action({act: 'excel'})
'Extension'.datatype()
'specname'.field()
'status'.field({translateOnDisplay: true})
'Edit'.action({place: 'row', act: 'edit'})
'Trash'.action({place: 'row', act: 'trash'})
'ExtensionMaint.js'.maintSpecname()

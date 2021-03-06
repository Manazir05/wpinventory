'StatementMaint'.maint({panelStyle: "titled"})
'Modify Statement'.title()
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Statement'.datatype()

''.panel()
'name'.field()
'showBalance'.field()
'showYTDBalance0'.field({caption: 'Show YTD Balance'})
'showPTDBalance0'.field({caption: 'Show PTD Balance'})
'showYTDBalance1'.field({caption: 'Show Last Year YTD'})
'showPTDBalance1'.field({caption: 'Show Last Year PTD'})
'showYTDBalance2'.field({caption: 'Show Prev Year YTD'})
'showPTDBalance2'.field({caption: 'Show Prev Year PTD'})

'Lines'.manifest()
'Add Line'.action({act: 'add'})
'StatementLine'.datatype()
'statement'.field({refersToParent: 'Statement', hidden: true})
'sequence'.field()
'caption'.field()
'ranges'.field()
'drcr'.field()
'bold'.field()
'Edit'.action({place: 'row', act: 'edit'})
'Trash'.action({place: 'row', act: 'trash'})
'StatementLineMaint.js'.maintSpecname()

'Lines'.defaultSort({field: "sequence"})

'name'.readOnlyWhen((maint, statement) => {
  return (statement.name === 'Balance Sheet') || (statement.name === 'Profit and Loss')
})

'AgentList'.list()
'Sales Agents'.title()
'Back'.action({act: 'cancel'})
'Add'.action({act: 'add'})
'Commission Deductions'.action({spec: 'DeductionList.js'})
'Download to Excel'.action({act: 'excel'})
'Agent'.datatype()
'agentName'.field()
'commissionPercent'.field()
'Edit'.action({place: 'row', act: 'edit'})
'Trash'.action({place: 'row', act: 'trash'})
'AgentMaint.js'.maintSpecname()

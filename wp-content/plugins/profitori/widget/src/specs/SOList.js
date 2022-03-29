'SOList'.list({icon: 'FileInvoiceDollar'})
'Sales Orders'.title()
'Back'.action({act: 'cancel'})
'Add'.action({act: 'add'})
'Allocate'.action({spec: 'AllocationList.js'})
'Fulfill'.action({spec: 'Fulfillment.js'})
'Refresh'.action({act: "refresh"})
'Download to Excel'.action({act: 'excel'})
'Sales Agents'.action({spec: 'AgentList.js'})
'Commission Report'.action({spec: 'CommissionReport.js'})
'Shipments'.action({spec: 'SalesShipmentList.js'})
'Preorders'.action({spec: 'PreorderList.js'})

'SO'.datatype()
'order'.field()
'orderDate'.field()
'customer'.field({showAsLink: true})
'orderTotal'.field({caption: "Value"})
'wcNiceStatus'.field({caption: 'Status'})
'financeStatus'.field()
'attachmentIcon'.field({icon: true, caption: ''})
'Edit'.action({place: 'row', act: 'edit'})
'Trash'.action({place: 'row', act: 'trash'})
'SOManageMaint.js'.maintSpecname()

'SOList'.beforeTrash(async (list, so) => {
  so.manageInProfitori = 'Yes'
})

'attachmentIcon'.calculate(async so => {
  let attachment = await 'Attachment'.bringFirst({theParentId: so.id})
  if ( attachment )
    return 'Paperclip'
})

'attachmentIcon'.destination(async preorder => {
  return 'AttachmentsByParent.js'
})

'SOList'.defaultSort({field: "orderDate", descending: true})

'SOList'.beforeLoading(async list => {
  await list.harmonize()
})


'SalesList'.list({expose: true, icon: 'FileInvoiceDollar'})
'Sales and Invoices'.title()
'Back'.action({act: 'cancel'})
'Refresh'.action({act: "refresh"})
'Manage Orders'.action({spec: 'SOList.js'})
'Sales Analysis'.action({spec: 'SAProductList.js'})
'Download to Excel'.action({act: 'excel'})
'Unpaid Invoices'.action({spec: 'UnpaidInvoices.js'})
'Show Older Sales'.action({spec: 'SalesListAll.js'})
'Sales Agents'.action({spec: 'AgentList.js'})
'Commission Report'.action({spec: 'CommissionReport.js'})
'Shipments'.action({spec: 'SalesShipmentList.js'})
'Preorders'.action({spec: 'PreorderList.js'})

'order_items'.datatype()
'order_date'.field()
'theOrder'.field({showAsLink: true})
'billingName'.field({caption: "Customer", showAsLink: true})
'productUniqueName'.field({caption: 'Product', showAsLink: true})
'_qty'.field()
'quantityRemainingToShip'.field()
'_line_total'.field({caption: "Amount Ex Tax"})
'_line_tax'.field()
'niceOrderStatus'.field({caption: "Status"})
'shippedDate'.field()
'View Order'.action({spec: 'ViewSalesOrder.js', place: 'row', act: 'editParent'})
'Edit'.action({spec: 'SOManageMaint.js', place: 'row', act: 'editParent'})

'SalesList'.beforeLoading(async list => {
  await list.harmonize()
})

'SalesList'.defaultSort({field: 'order_date', descending: true})

'SalesList'.limitToSubset('RecentOrActive')

'theOrder'.destination(async orderItem => {
  let dt = 'orders'
  if ( orderItem.onlyHoldsSubset('RecentOrActive') )
    dt += '.RecentOrActive'
  let res = await dt.bringSingle({id: orderItem.theOrder.id})
  return res
})

'billingName'.destination(async orderItem => {
  return await orderItem.toCustomer()
})

'SalesList'.filter(async oi => {
  return oi._product_id ? true : false
})


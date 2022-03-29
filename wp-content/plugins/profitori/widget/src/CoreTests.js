'helper'.trashAll('Lot')
'helper'.trashAll('Inventory')
'helper'.trashAll('Cluster')
'helper'.trashAll('Clump')
'helper'.trashAll('Location')
'helper'.trashAll('Adjustment')
'helper'.trashAll('Extension')
'helper'.trashAll('Mod')
'stocktend_locations'.click()
  'Add'.click()
    'Location Name'.enter('Narnia')
    'OK'.click()
  'Back'.click()
'stocktend_inventory'.click()
  'helper'.trashAll('Cluster')
  'mainTable./Cap (C01)/.Adjust Qty'.click()
    'Location'.enter('Narnia')
    'Quantity'.enter('1')
    'OK'.click()
  'mainTable./Cap (C01)/.Adjust Qty'.click()
    'Location'.enter('Narnia')
    'Quantity'.enter('1')
    'helper'.adjustQtyWithDifferentForeman('Cap (C01)', 'General', 1)
    'OK'.click()
  'helper'.trashAll('Cluster')
  'mainTable./Hoodie (H01)/.Adjust Qty'.click()
    'Location'.enter('General')
    'Quantity'.enter('1')
    'helper'.adjustQtyWithDifferentForeman('Cap (C01)', 'General', 1)
    'OK'.click()
  'helper'.trashAll('Cluster')
  'mainTable./Cap (C01)/.Adjust Qty'.click()
    'Location'.enter('General')
    'Quantity'.enter('1')
    'helper'.adjustQtyWithDifferentForeman('Cap (C01)', 'General', 1)
    'OK'.click()
    'stFormRejection'.shouldContain("Data updates in this session conflict with those made by another session. Please refresh your browser and try again.")
'helper'.simulateBrowserRefresh()
'helper'.trashAll('Inventory')
'helper'.trashAll('Cluster')
'helper'.trashAll('Clump')
'helper'.trashAll('Lot')
'helper'.trashAll('Location')
'helper'.trashAll('Facet')
'helper'.trashAll('Template')
'Home'.shouldBeCurrentPage()
'stocktend_inventory'.click()
  'mainTable./Bóónie (BOO100)/.Edit Product'.click()
    'WooCommerce Regular Price'.enter('55.00')
    'OK'.click()
  'Back'.click()
'helper'.simulateBrowserRefresh()
'stocktend_inventory'.click()
  'Customize'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.lastPurchaseUnitCostIncTax')
      'Caption'.enter('Last Cost')
      'Display As'.enter('Number')
      'Allow Editing'.shouldEqual('No')
      'Allow Editing'.enter('Yes')
      'OK'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.wooCommerceRegularPrice')
      'Caption'.enter('WC Price')
      'Display As'.enter('Number')
      'Allow Editing'.enter('Yes')
      'OK'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.inventoryValueRetail')
      'Caption'.enter('Retail Value')
      'Allow Editing'.shouldntExist()
      'OK'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.estSalesUnitsPerDay')
      'Caption'.enter('Est Sales')
      'Allow Editing'.shouldEqual('No')
      'OK'.click()
    'OK'.click()
  'mainTable./Bóónie (BOO100)/.WC Price'.shouldEqual('55.00')
  'Edit'.click()
  'mainTable./Bóónie (BOO100)/.WC Price'.enter('44.00')
  'Save'.click()
  'Back'.click()
'stocktend_inventory'.click()
  'mainTable./Bóónie (BOO100)/.WC Price'.shouldEqual('44.00')
  'mainTable./Cap (C01)/.Edit Product'.click()
    'Last Purchase Unit Cost (Inc Tax)'.enter('5.00')
    'OK'.click()
  'mainTable./Cap (C01)/.Edit Product'.click()
    'Last Purchase Unit Cost (Inc Tax)'.enter('10.00')
    'OK'.click()
  'mainTable./Cap (C01)/.Last Cost'.shouldEqual('10.00')
  'helper'.setProductLastCostWithDifferentForeman('Cap (C01)', 25.00)
  'Refresh'.click()
  'mainTable./Cap (C01)/.Last Cost'.shouldEqual('25.00')
  'mainTable./Cap (C01)/.Last Cost'.shouldBeReadOnly()
  'Save'.shouldntExist()
  'Edit'.click()
  'Save'.shouldExist()
  'mainTable./Cap (C01)/.Last Cost'.enter('20.00')
  'Back'.click()
  'confirmLeave'.shouldExist('doc')
  'Yes - Cancel my changes'.click('doc')
'stocktend_inventory'.click()
  'mainTable./Cap (C01)/.Last Cost'.shouldEqual('25.00')
  'Edit'.click()
  'mainTable./Cap (C01)/.Last Cost'.enter('20.00')
  'mainTable./Bóónie (BOO101)/.Last Cost'.enter('20.00')
  'Refresh'.click(); //'stocktend_purchaseOrders'.click(); 'confirmLeave'.shouldExist('doc'); 'No - Stay on this page'.click('doc')
  'mainTable./Cap (C01)/.Retail Value'.shouldBeReadOnly()
  'mainTable./Cap (C01)/.Est Sales'.shouldBeReadOnly()
  'Save'.click()
  'Back'.click()
  'confirmLeave'.shouldntExist('doc')
'stocktend_inventory'.click()
  'mainTable./Bóónie (BOO101)/.Last Cost'.shouldEqual('20.00')
  'Edit'.click()
  'mainTable./Cap (C01)/.Last Cost'.enter('20.00')
  'Back'.click()
  'confirmLeave'.shouldntExist('doc')
'stocktend_inventory'.click()
  'Customize'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.supplierSku')
      'Caption'.enter('Supplier SKU')
      'Allow Editing'.enter('Yes')
      'OK'.click()
    'OK'.click()
  'Edit'.click()
  'mainTable./Cap (C01)/.Supplier SKU'.enter('ABC123')
  'Save'.click()
  'Back'.click()
'stocktend_inventory'.click()
  'mainTable./Cap (C01)/.Supplier SKU'.shouldEqual('ABC123')
  'Back'.click()
'helper'.trashAll('PO')
'helper'.trashAll('Avenue')
'helper'.trashAll('Supplier')
'helper'.flushCache()
'Home'.shouldBeCurrentPage()
'stocktend_suppliers'.click()
  'Add'.click()
    'Name'.enter('Test Supplier')
    'Notes'.enter('Line1\nLine2')
    'OK'.click()
  'mainTable./Test Supplier/.Edit'.click()
    'Notes'.shouldEqual('Line1\nLine2')
    'Back'.click()
  'Back'.click()
'stocktend_inventory'.click()
  'Customize'.click()
    'Add Field'.click()
      'Get Value From'.enter('Inventory.barcode')
      'Caption'.enter('Barcode')
      'OK'.click()
    'OK'.click()
  'mainTable./Cap (C01)/.Edit Product'.click()
    'Add Supplier'.click()
      'Supplier'.enter('Test Supplier')
      'Barcode'.enter('BC1')
      'OK'.click()
    'OK'.click()
  'mainTable./Cap (C01)/.Barcode'.shouldEqual('BC1')
  'helper'.setProductBarcodeWithDifferentForeman('Cap (C01)', 'BC2')
  'Refresh'.click()
  'mainTable./Cap (C01)/.Barcode'.shouldEqual('BC2')
  'Back'.click()
'Enter purchase orders'.click()
'browser'.back()
'Home'.shouldBeCurrentPage()
'helper'.trashAll('Morsel')
'helper'.trashAll('Facet')
'helper'.trashAll('Template')
'helper'.trashAll('Transaction')
'helper'.trashAll('Inventory')
'helper'.trashAll('POLine')
'helper'.trashAll('PO')
'helper'.trashAll('Configuration')
'helper'.flushCache()
'helper'.simulateBrowserRefresh()
'stocktend_settings'.click()
'Short Date Format'.clickDropdown()
'Short Date Format'.shouldHaveNOptions(4)
'Short Date Format'.shouldEqual('Browser default')
'Back'.click()
'Home'.shouldBeCurrentPage()
'Enter purchase orders'.click()
'Back'.click()
'Home'.shouldBeCurrentPage()
'Enter purchase orders'.click()
'Add'.click()
'Order Date'.shouldEqualExpression('global.todayLocal().toDMY()')
'Order Date'.enter('30/3/2020')
'OK'.click()
'mainTable'.shouldHaveCount(1)
'mainTable.0.Trash'.click()
'mainTable.0.Really Trash?'.click()
'stocktend_settings'.click()
'Short Date Format'.clickDropdown()
'Short Date Format'.chooseOption('dd/mm/yyyy')
'OK'.click()
'Purchase Orders'.shouldBeCurrentPage()
'Back'.click()
'Home'.shouldBeCurrentPage()
'Enter purchase orders'.click()
'Add'.click()
'Order Date'.shouldEqualExpression('global.todayLocal().toDMY()')
'Order Date'.enter('30/3/2020')
'OK'.click()
'mainTable'.shouldHaveCount(1)
'mainTable.0.Trash'.click()
'mainTable.0.Really Trash?'.click()
'stocktend_settings'.click()
'Short Date Format'.shouldEqual('dd/mm/yyyy')
'Short Date Format'.clickDropdown()
'Short Date Format'.chooseOption('mm/dd/yyyy')
'OK'.click()
'Add'.click()
'Order Date'.shouldEqualExpression('global.todayLocal().toMDY()')
'Order Date'.enter('3/30/2020')
'OK'.click()
'mainTable'.shouldHaveCount(1)
'mainTable.0.Order Date'.shouldEqual("Mar 30 2020", null, {englishOnly: true})
'mainTable.0.Trash'.click()
'mainTable.0.Really Trash?'.click()
'stocktend_settings'.click()
'Short Date Format'.shouldEqual('mm/dd/yyyy')
'Short Date Format'.clickDropdown()
'Short Date Format'.chooseOption('yyyy/mm/dd')
'OK'.click()
'Add'.click()
'Order Date'.shouldEqualExpression('global.todayLocal().toShortYMD()')
'Order Date'.enter('2020/3/30')
'OK'.click()
'mainTable'.shouldHaveCount(1)
'mainTable.0.Order Date'.shouldEqual("Mar 30 2020", null, {englishOnly: true})
'mainTable.0.Trash'.click()
'mainTable.0.Really Trash?'.click()
'stocktend_settings'.click()
'Short Date Format'.enter('dd/mm/yyyy')
'OK'.click()
'Purchase Orders'.shouldBeCurrentPage()
'Back'.click()
'Home'.shouldBeCurrentPage()
'Track orders and receive goods'.click()
'Receive Purchases'.shouldBeCurrentPage()
'browser'.back()
'Home'.shouldBeCurrentPage()
'Adjust inventory levels'.click()
'Inventory'.shouldBeCurrentPage()
'browser'.back()
'Home'.shouldBeCurrentPage()
'Track and adjust average costs'.click()
'Inventory'.shouldBeCurrentPage()
'browser'.back()
'Home'.shouldBeCurrentPage()
'Do stocktakes'.click()
'Stocktakes'.shouldBeCurrentPage()
'browser'.back()
'Home'.shouldBeCurrentPage()
'Enter supplier details'.click()
'Suppliers'.shouldBeCurrentPage()
'browser'.back()
'Home'.shouldBeCurrentPage()
'stocktend_purchaseOrders'.click()                                                 // Back button and confirm dialog
'mainTable'._forEach('true', {lastToFirst: true})
  'Trash'.click()
  'Really Trash?'.click()
  'mainTable'.endForEach()
'browser'.back()
'stocktend_suppliers'.click()
'mainTable'._forEach('true', {lastToFirst: true})
  'Trash'.click()
  'Really Trash?'.click()
  'mainTable'.endForEach()
'browser'.back()
'Home'.shouldBeCurrentPage()
'helper'.clearWCStockLevels()
'helper'.trashAll('Transaction')
'helper'.trashAll('Inventory')
'helper'.trashAll('Template')
'helper'.trashAll('Facet')
'helper'.flushCache()
'Inventory'.click()
'mainTable./Bóónie (BOO100)/.Quantity On Hand'.shouldBeFieldNo(3)
'mainTable./Bóónie (BOO100)/.Quantity On Hand'.shouldEqual('0')
'mainTable./Bóónie (BOO100)/.On Purchase Orders'.shouldBeFieldNo(4)
'mainTable./Bóónie (BOO100)/.Avg Unit Cost'.shouldBeFieldNo(5)
'mainTable./Bóónie (BOO100)/.Inventory Value'.shouldBeFieldNo(6)
'mainTable./Bóónie (BOO100)/.Adjust Qty'.click()
'Quantity Change'.enter('10')
'Unit Price (Inc Tax)'.enter('12.3456')
'OK'.click()
'Inventory'.shouldBeCurrentPage()
'mainTable./Bóónie (BOO100)/.Quantity On Hand'.shouldEqual('10')
'mainTable./Bóónie (BOO100)/.Avg Unit Cost'.shouldEqual('12.3456')
'mainTable./Bóónie (BOO100)/.View History'.click()
  'mainTable.0.User'.shouldEqual('admin')
  'Back'.click()
'Customize'.click()
  'Customize Fields'.shouldBeCurrentPage()
  'Facets.1.Column Heading'.shouldEqual('Quantity On Hand'.translate())
  'Facets.1.Get Value From'.shouldEqual('Inventory.quantityOnHand')
  'Facets.1.Sequence'.shouldEqual('10')
  'Facets.2.Column Heading'.shouldEqual('On Purchase Orders'.translate())
  'Facets.2.Get Value From'.shouldEqual('Inventory.quantityOnPurchaseOrders')
  'Facets.2.Sequence'.shouldEqual('20')
  'Facets.3.Column Heading'.shouldEqual('Avg Unit Cost'.translate())
  'Facets.3.Get Value From'.shouldEqual('Inventory.avgUnitCost')
  'Facets.3.Sequence'.shouldEqual('30')
  'Facets.4.Column Heading'.shouldEqual('Inventory Value'.translate())
  'Facets.4.Get Value From'.shouldEqual('Inventory.inventoryValue2')
  'Facets.4.Sequence'.shouldEqual('40')
  'Facets./Quantity On Hand/.Edit'.click()
    'Edit Inventory Levels Field'.shouldBeCurrentPage()
    'Caption'.shouldEqual('Quantity On Hand'.translate())
    'Get Value From'.clickDropdown()
    'Get Value From'.shouldHaveOption('Inventory.quantityOnHand')
    'Get Value From'.shouldHaveOption('Inventory.quantityOnPurchaseOrders')
    'Get Value From'.shouldHaveOption('Inventory.avgUnitCost')
    'Get Value From'.shouldHaveOption('Inventory.inventoryValue2')
    'Get Value From'.shouldHaveOption('Inventory.inventoryValueExclConsignment')
    'Get Value From'.shouldHaveOption('WC Product Attribute.color')
    'Get Value From'.shouldEqual('Inventory.quantityOnHand')
    'Sequence'.shouldEqual('10')
    'Caption'.enter('QOH')
    'Sequence'.enter('25')
    'Display As'.shouldEqual('Number')
    'Display As'.clickDropdown()
    'Display As'.shouldHaveOption('Number')
    'Display As'.shouldHaveOption('Text')
    'Minimum Decimals'.shouldEqual('0')
    'Maximum Decimals'.shouldEqual('0')
    'OK'.click() // ----
  'Customize Fields'.shouldBeCurrentPage()
  'Facets.1.Column Heading'.shouldEqual('On Purchase Orders'.translate())
  'Facets.2.Column Heading'.shouldEqual('QOH')
  'Facets./Avg Unit Cost/.Trash'.click()
  'Facets./Avg Unit Cost/.Really Trash?'.click()
  'OK'.click()
'Inventory'.shouldBeCurrentPage()
'mainTable./Bóónie (BOO100)/.On Purchase Orders'.shouldBeFieldNo(3)
'mainTable./Bóónie (BOO100)/.QOH'.shouldBeFieldNo(4)
'mainTable./Bóónie (BOO100)/.Inventory Value'.shouldBeFieldNo(5)
'mainTable./Bóónie (BOO100)/.QOH'.shouldEqual('10')
'Customize'.click()
  'Customize Fields'.shouldBeCurrentPage()
  'Add Field'.click()
    'Add Inventory Levels Field'.shouldBeCurrentPage()
    'Caption'.enter('Wholesale Cust Price')
    'OK'.click()
    'stFormRejection'.shouldContain("Get Value From")
    'stFormRejection'.shouldContain("is required", null, {englishOnly: true})
    'Get Value From'.chooseOption('Inventory.quantityOnHand')
    'OK'.click()
    'stFormRejection'.shouldContain("Inventory.quantityOnHand")
    'stFormRejection'.shouldContain("is already included", null, {englishOnly: true})
    'Get Value From'.chooseOption('WC Product Attribute.wholesale-customer-price')
    'Sequence'.shouldEqual('50')
    'Display As'.shouldEqual('Number')
    'Show Total'.shouldEqual('No')
    'Show Total'.enter('Yes')
    'Minimum Decimals'.shouldEqual('2')
    'Maximum Decimals'.shouldEqual('2')
    'Minimum Decimals'.enter('1')
    'Maximum Decimals'.enter('1')
    'Add another'.click()
    'Caption'.enter('Price'.translate())
    'Get Value From'.chooseOption('WC Product._price')
    'Display As'.chooseOption('Number')
    'Sequence'.shouldEqual('60')
    'Add another'.click()
    'Caption'.enter('Color'.translate())
    'Get Value From'.chooseOption('WC Product Attribute.color')
    'Sequence'.shouldEqual('70')
    'Sequence'.enter('55')
    'Add another'.click()
    'Caption'.enter('Value ex Cons'.translate())
    'Get Value From'.chooseOption('Inventory.inventoryValueExclConsignment')
    'Display As'.chooseOption('Number')
    'Sequence'.shouldEqual('70')
    'OK'.click() // ---
  'Customize Fields'.shouldBeCurrentPage()
  'Facets.6.Column Heading'.shouldEqual('Price'.translate())
  'OK'.click()
'mainTable./Bóónie (BOO100)/.Wholesale Cust Price'.shouldBeFieldNo(6)
'mainTable./Bóónie (BOO100)/.Wholesale Cust Price'.shouldEqual('23.5')
'mainTable./TOTAL/.Wholesale Cust Price'.shouldEqual('46.9')
'mainTable./Bóónie (BOO100)/.Price'.shouldBeFieldNo(8)
'mainTable./Bóónie (BOO100)/.Price'.shouldEqual('44.00')
'mainTable./Bóónie (BOO100)/.Color'.shouldBeFieldNo(7)
'mainTable./Bóónie (BOO100)/.Color'.shouldEqual('Blue')
'Customize'.click()
'Facets./Wholesale Cust Price/.Edit'.click()
'Minimum Decimals'.enter(2)
'Maximum Decimals'.enter(2)
'OK'.click()
'Customize Fields'.shouldBeCurrentPage()
'Add Field'.click()
'Caption'.enter('Avg Unit Cost'.translate())
'Get Value From'.chooseOption('Inventory.avgUnitCost')
'Display As'.chooseOption('Number')
'Minimum Decimals'.enter('2')
'Maximum Decimals'.enter('6')
'OK'.click()
'OK'.click()
'mainTable./Bóónie (BOO100)/.Wholesale Cust Price'.shouldEqual('23.45')
'mainTable./Bóónie (BOO100)/.Avg Unit Cost'.shouldEqual('12.3456')
'mainTable./Bóónie (BOO100)/.QOH'.shouldEqual('10')
'mainTable./Bóónie (BOO100)/.Inventory Value'.shouldEqual('123.46')
'mainTable./Bóónie (BOO100)/.Value ex Cons'.shouldEqual('123.46')
'mainTable./Bóónie (BOO100)/.Edit Product'.click()
  'Held on Consignment?'.enter('Yes')
  'OK'.click()
'mainTable./Bóónie (BOO100)/.Inventory Value'.shouldEqual('123.46')
'mainTable./Bóónie (BOO100)/.Value ex Cons'.shouldEqual('0.00')
'stocktend_suppliers'.click()
'mainTable'.shouldBeEmpty()
'Add'.click()
'Add Supplier'.shouldBeCurrentPage()
'browser'.back()
'confirmLeave'.shouldntExist('doc')
'Suppliers'.shouldBeCurrentPage()
'Add'.click()
'Name'.enter('Company 10')
'browser'.back()
'confirmLeave'.shouldExist('doc')
'Yes - Cancel my changes'.click('doc')
'confirmLeave'.shouldntExist('doc') //---
'Suppliers'.shouldBeCurrentPage()
'mainTable'.shouldHaveCount(0)
'Add'.click()
'Name'.enter('Company 10')
'browser'.back()
'confirmLeave'.shouldExist('doc')
'No - Stay on this page'.click('doc')
'confirmLeave'.shouldntExist('doc')
'Add Supplier'.shouldBeCurrentPage() //---
'Save'.click()
'Edit Supplier'.shouldBeCurrentPage()
'browser'.back()
'Add Supplier'.shouldBeCurrentPage()
'browser'.back()
'Suppliers'.shouldBeCurrentPage()
'browser'.back()
'stocktend_suppliers'.click()                                                  // Menu buttons confirm dialog
'mainTable'.shouldHaveCount(1)
'stocktend_suppliers'.click()
'mainTable'._forEach('true', {lastToFirst: true})
  'Trash'.click()
  'Really Trash?'.click()
  'mainTable'.endForEach()
'mainTable'.shouldBeEmpty()
'Add'.click()
'Add Supplier'.shouldBeCurrentPage()
'stocktend_purchaseOrders'.click()
'confirmLeave'.shouldntExist('doc')
'Purchase Orders'.shouldBeCurrentPage()
'stocktend_suppliers'.click()
'Add'.click()
'Name'.enter('Company 10')
'stocktend_purchaseOrders'.click()
'confirmLeave'.shouldExist('doc')
'Yes - Cancel my changes'.click('doc')
'confirmLeave'.shouldntExist('doc')
'Purchase Orders'.shouldBeCurrentPage()
'stocktend_suppliers'.click()
'mainTable'.shouldHaveCount(0)
'Add'.click()
'Name'.enter('Company 10')
'stocktend_purchaseOrders'.click()
'confirmLeave'.shouldExist('doc')
'No - Stay on this page'.click('doc')
'confirmLeave'.shouldntExist('doc')
'Add Supplier'.shouldBeCurrentPage()
'Save'.click()
'Edit Supplier'.shouldBeCurrentPage()                                // Maintenance / Supplier Maintenance
'stocktend_suppliers'.click()
'mainTable'.shouldHaveCount(1)
'mainTable.0.Edit'.click()
'Name'.shouldEqual('Company 10')
'Name'.enter("Company '11'")
'Save'.click()
'stocktend_suppliers'.click()
'mainTable.0.Name'.shouldEqual("Company '11'")
'Add'.click()
'Name'.enter('Company 20')
'OK'.click()
'Suppliers'.shouldBeCurrentPage()
'mainTable.1.Edit'.click()
'Add another'.click()
'Name'.enter('Company "30"')
'Save'.click()
'Edit Supplier'.shouldBeCurrentPage()
'Add another'.click()
'Name'.shouldEqual('')
'Name'.shouldntHaveError()
'Save'.click()
'Name'.shouldHaveError("You must enter a")
'Name'.shouldHaveError("Name")
'Name'.enter('Company "30"')
'Name'.shouldHaveError("Supplier")
'Name'.shouldHaveError("already exists")
'Save'.click()
'stFormRejection'.shouldContain("Supplier")
'stFormRejection'.shouldContain("already exists")
'Name'.enter('Company 25')
'Name'.shouldntHaveError()
'Save'.shouldntHaveError()
'Save'.click()
'Save'.shouldntHaveError()
'stocktend_suppliers'.click()
'mainTable'.shouldHaveCount(4)
'mainTable.0.Name'.shouldEqual('Company "30"')
'mainTable.1.Name'.shouldEqual("Company '11'")
'mainTable.2.Name'.shouldEqual('Company 20')
'mainTable.3.Name'.shouldEqual('Company 25')
'mainTable.3.Edit'.click()
'stocktend_suppliers'.click()
'mainTable.2.Edit'.click()
'Name'.shouldEqual('Company 20')
'browser'.back()
'confirmLeave'.shouldntExist('doc')
'mainTable.2.Edit'.click()
'Name'.enter('Company 21')
'browser'.back()
'confirmLeave'.shouldExist('doc')
'No - Stay on this page'.click('doc')
'confirmLeave'.shouldntExist('doc')
'Save'.click()
'stocktend_suppliers'.click()
'mainTable.2.Name'.shouldEqual('Company 21')
'mainTable.2.Name'.shouldEqual('Company 21')
'mainTable.2.Trash'.click()
'mainTable.2.Really Trash?'.click()
'mainTable'.shouldHaveCount(3)
'mainTable.2.Name'.shouldEqual('Company 25')

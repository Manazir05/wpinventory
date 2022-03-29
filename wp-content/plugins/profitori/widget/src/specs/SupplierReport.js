'SupplierReport'.list({withHeader: true})
'Supplier Report'.title()
'Back'.action({act: 'cancel'})
'Refresh'.action({act: "refresh"})
'Download to Excel'.action({act: 'excel'})

'Lines'.manifest()
'Supplier'.datatype()
'name'.field({key: true, showAsLink: true})
'address'.field()
'city'.field({caption: 'City/Suburb/Town'})
'state'.field({caption: 'State/Province'})
'postcode'.field({caption: 'Postal/Zip Code'})
'country'.field({caption: 'Country'})
'mainContactPerson'.field()
'phone'.field()
'mobile'.field()
'email'.field()
'notes'.field()

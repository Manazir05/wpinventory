'WOPdf'.output({rowsPerPage: 10, version: 2})
'WO'.datatype()

'Banner'.section({pageHeading: true, rightAlign: true})
'BannerMain'.subsection({captionPosition: "none"})
'businessName'.field()

'Banner2'.section({pageHeading: true, height: 16})
'BannerTitle'.subsection({captionPosition: "none"})
'pdfTitle'.field({fontSize: 28})

'Header'.section({pageHeading: true})
'workOrderNumber'.field({caption: "Order Number"})
'product'.field({caption: 'FG Product'})
'fgQuantity'.field({rightAlign: false})
'fgLocation'.field()
'orderDate'.field()
'expectedCompletionDate'.field({caption: 'Expected Completion'})
'notes'.field()

'Lines'.manifest()
'WOLine'.datatype()
'descriptionAndSKU'.field({width: 89})
'location'.field({width: 16})
'quantityPerFGUnit'.field({caption: "Qty per FG Unit", width: 16, rightAlign: true})
'quantity'.field({caption: "Qty Required", width: 16, rightAlign: true})


import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from '../Link.js'
import HomePageLink from '../HomePageLink.js'
import prologo from './images/probanner.png'
'Home'.page({noTitle: true, expose: true})
'blurb'.field({snippet: true})

'blurb'.visibleWhen(() => {
  return global.gApp.specConfigsReady
})

'blurb'.content(
  <Container key="logo" className="mt-5">
    <Row>
      <Col className="text-center mt-3">
        <img className="prfi_pro_logo" src={prologo} alt="prologo"/>
      </Col>
    </Row>
    <Row>
      <Col className="text-center mt-5 mb-3" style={{fontSize: "24px"}}>
        {"The E-Commerce ERP".translate()}
      </Col>
    </Row>
    <Row>
      <Col className="text-center mt-3">
        {
          global.gApp.atumIsActive ? 
            <div>
              <Link menuCaption="Copy ATUM Data" style={{fontSize: "16px", marginTop: "6px"}}>{"Import data from ATUM".translate()}</Link><br/>
              <br/>
            </div>
          :
            null
        }
        <HomePageLink menuCaption="View Short Stock" icon="Eye" menuText="Assess your inventory requirements" />
        <HomePageLink menuCaption="Purchase Orders" icon="PeopleArrows" menuText="Enter purchase orders" />
        <HomePageLink menuCaption="Receive Purchases" icon="Boxes" menuText="Track orders and receive goods" />
        <HomePageLink menuCaption="Work Orders" icon="Tools" menuText="Manage assembly / manufacturing" />
        <HomePageLink menuCaption="Inventory" icon="Warehouse" menuText="Adjust inventory levels and costs" />
        <HomePageLink menuCaption="Location Inventory" icon="Cubes" menuText="Manage inventory by location" />
        <HomePageLink menuCaption="Fulfillment" icon="Truck" menuText="Manage order fulfillment" />
        <HomePageLink menuCaption="Sales and Invoices" icon="FileInvoiceDollar" menuText="View sales and produce invoice PDFs" />
        <HomePageLink menuCaption="Unpaid Invoices" icon="HandHoldingUsd" menuText="View unpaid invoices" />
        <HomePageLink menuCaption="View Profits" icon="DollarSign" menuText="View profits" />
        <HomePageLink menuCaption="General Ledger" icon="BalanceScale" menuText="Manage financial accounts" />
        <HomePageLink menuCaption="Dashboard" icon="ChartLine" menuText="Monitor your business with the dashboard" />
        <HomePageLink menuCaption="Stocktake" icon="HandPointRight" menuText="Do stocktakes" />
        <HomePageLink menuCaption="Suppliers" icon="UserFriends" menuText="Enter supplier details" />
        <HomePageLink menuCaption="Customers" icon="ShoppingBasket" menuText="View customer details" />
        <HomePageLink menuCaption="Locations" icon="Cubes" menuText="Manage multiple inventory locations" />
        <HomePageLink menuCaption="Currencies" icon="Coins" menuText="Manage multiple currencies" />
        <HomePageLink menuCaption="Reports" icon="ThList" menuText="View reports" />
        <HomePageLink menuCaption="Search" icon="Search" menuText="Search across all data" />
        <HomePageLink menuCaption="Settings" icon="Cog" menuText="Settings" />
        <HomePageLink menuCaption="Modify Profitori" icon="LightBulb" menuText="Customize Profitori to suit your business" />
        <br/>
        {"and more".translate()}
      </Col>
    </Row>
  </Container>
)

/*
'blurb'.content(
  <Container key="logo" className="mt-5">
    <Row>
      <Col className="text-center mt-3">
        <img className="prfi_pro_logo" src={prologo} alt="prologo"/>
      </Col>
    </Row>
    <Row>
      <Col className="text-center mt-5 mb-3" style={{fontSize: "24px"}}>
        {"The E-Commerce ERP".translate()}
      </Col>
    </Row>
    <Row>
      <Col className="text-center mt-3">
        {
          global.gApp.atumIsActive ? 
            <div>
              <Link menuCaption="Copy ATUM Data" style={{fontSize: "16px", marginTop: "6px"}}>{"Import data from ATUM".translate()}</Link><br/>
              <br/>
            </div>
          :
            null
        }
        <Link menuCaption="View Short Stock" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Eye', 'lg')}
          {"Assess your inventory requirements".translate()}
        </Link><br/>
        <Link menuCaption="Purchase Orders" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('PeopleArrows', 'lg')}
          {"Enter purchase orders".translate()}
        </Link><br/>
        <Link menuCaption="Receive Purchases" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Boxes', 'lg')}
          {"Track orders and receive goods".translate()}
        </Link><br/>
        <Link menuCaption="Inventory" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Warehouse', 'lg')}
          {"Adjust inventory levels".translate()}
        </Link><br/>
        <Link menuCaption="Inventory" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('FunnelDollar', 'lg')}
          {"Track and adjust average costs".translate()}
        </Link><br/>
        <Link menuCaption="Fulfillment" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Truck', 'lg')}
          {"Manage order fulfillment".translate()}
        </Link><br/>
        <Link menuCaption="Sales and Invoices" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('FileInvoiceDollar', 'lg')}
          {"View sales and produce invoice PDFs".translate()}
        </Link><br/>
        <Link menuCaption="Unpaid Invoices" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('HandHoldingUsd', 'lg')}
          {"View unpaid invoices".translate()}
        </Link><br/>
        <Link menuCaption="View Profits" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('DollarSign', 'lg')}
          {"View profits".translate()}
        </Link><br/>
        <Link menuCaption="General Ledger" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('BalanceScale', 'lg')}
          {"Manage financial accounts".translate()}
        </Link><br/>
        <Link menuCaption="Dashboard" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('ChartLine', 'lg')}
          {"Monitor your business with the dashboard".translate()}
        </Link><br/>
        <Link menuCaption="Stocktake" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('HandPointRight', 'lg')}
          {"Do stocktakes".translate()}
        </Link><br/>
        <Link menuCaption="Suppliers" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('UserFriends', 'lg')}
          {"Enter supplier details".translate()}
        </Link><br/>
        <Link menuCaption="Locations" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Cubes', 'lg')}
          {"Manage multiple inventory locations".translate()}
        </Link><br/>
        <Link menuCaption="Currencies" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Coins', 'lg')}
          {"Manage multiple currencies".translate()}
        </Link><br/>
        <Link menuCaption="Reports" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('ThList', 'lg')}
          {"View reports".translate()}
        </Link><br/>
        <Link menuCaption="Settings" className="stHomePageLink" style={{fontSize: "16px", marginTop: "6px"}}>
          {global.gApp.nameToIcon('Cog', 'lg')}
          {"Settings".translate()}
        </Link><br/>
        <br/>
        {"and more".translate()}
      </Col>
    </Row>
  </Container>
)
*/

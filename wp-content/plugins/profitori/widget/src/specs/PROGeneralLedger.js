import React from 'react'
import { Container, Row, Col, Label } from 'reactstrap'
'PROGeneralLedger'.page({expose: true})
'PRO General Ledger'.title()
'blurb'.field({snippet: true})

'blurb'.content(
  <Container key="logo" className="mt-5">
    <Row>
      <Col>
        <Row>
          <Col className="text-center">
            <Row><Label className="prfi_pro_label">{"Go PRO!... For Total Control".translate()}</Label></Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Row><Label className="prfi_pro_sub_label">{"Manage your operation's financial accounts without expensive third-party accounting software.".translate()}</Label></Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <a className="stGoProCentered" href="https://profitori.com/pro/gl" target="_blank" rel="noopener noreferrer">Click here to view Profitori PRO General Ledger features</a>
          </Col>
        </Row>
      </Col>
    </Row>
    <div style={{height: "20px"}}>
    </div>
  </Container>
)



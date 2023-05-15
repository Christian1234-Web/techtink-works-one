// ** React Imports
import React from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import InvoiceList from '@src/views/apps/invoice/list'


// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EcommerceDashboard = () => {
  // ** Context
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col lg='12' xs='12'>
          <InvoiceList/>
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard

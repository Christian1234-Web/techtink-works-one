// ** React Imports
import React from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import InvoiceList from './list'
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const AppointmentDashboard = () => {
    // ** Context


    // const testing = () => {
    //     const url = 'http://localhost:3002/patient/list'
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res)
    //         })
    // }
    // useEffect(() => {
    //     testing()
    // }, [])
    return (
        <div id='dashboard-ecommerce'>
            <Row className='match-height'>
                <Col lg='12' xs='12'>
                    <InvoiceList />
                </Col>
            </Row>
        </div>
    )
}

export default AppointmentDashboard

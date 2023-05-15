// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import InvoiceList from './list'
import AddEventSidebar from './list/AddEventSidebar'
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'


const calendarsColor = {
    Business: 'primary',
    Holiday: 'success',
    Personal: 'danger',
    Family: 'warning',
    ETC: 'info'
}

const AdmittedDashboard = () => {
    // ** Context
    const [addSidebarOpen, setAddSidebarOpen] = useState(false)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

    // ** AddEventSidebar Toggle Function
    const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

    // ** LeftSidebar Toggle Function
    const toggleSidebar = val => setLeftSidebarOpen(val)

    const refetchEvents = () => {
        // if (calendarApi !== null) {
        //   calendarApi.refetchEvents()
        // }
    }

    // ** Fetch Events On Mount

    return (
        <Fragment>
            <div className='app-calendar overflow-hidden'>
                <Row className='g-0'>
                    <Col
                        id='app-calendar-sidebar'
                        className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
                            show: leftSidebarOpen
                        })}
                    >

                    </Col>
                    <InvoiceList
                        toggleSidebar={toggleSidebar}
                        handleAddEventSidebar={handleAddEventSidebar}
                    />
                    <div
                        className={classnames('body-content-overlay', {
                            show: leftSidebarOpen === true
                        })}
                        onClick={() => toggleSidebar(false)}
                    ></div>
                </Row>
            </div>
            <AddEventSidebar
                open={addSidebarOpen}
                calendarsColor={calendarsColor}
                handleAddEventSidebar={handleAddEventSidebar}
            />


        </Fragment>
    )
}

export default AdmittedDashboard

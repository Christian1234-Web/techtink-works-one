// ** React Imports
import { Fragment } from "react"
// ** Table Columns
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, User, Lock } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from "../../../forms/form-elements/datepicker/PickerRange"
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, Accordion, Input, Row, Col, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Reactstrap Imports
// ** Store & Actions
// import { getData } from '../store'
import SecurityTab from '../../../apps/user/view/SecurityTab'
import InvoiceList from "../list/index"
import IndexRequest from "../list/indexRequest"

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CreateLab from "../list/createLab"

export const Tabs = ({ active, toggleTab }) => {
    // ** Store vars
    return (
        <Fragment>
            <Nav pills className='mb-2'>
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <User className='font-medium-3 me-50' />
                        <span className='fw-bold'>Lab Queue</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <Lock className='font-medium-3 me-50' />
                        <span className='fw-bold'>Lab Requests</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                        <Lock className='font-medium-3 me-50' />
                        <span className='fw-bold'>New Lab Request</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId='1' lg='12'>
                    <IndexRequest />
                </TabPane>
                <TabPane tabId='2'>
                    <InvoiceList />
                </TabPane>
                <TabPane tabId='3'>
                    <CreateLab />
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
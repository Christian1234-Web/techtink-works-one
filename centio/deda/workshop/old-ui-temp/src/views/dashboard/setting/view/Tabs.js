// ** React Imports
import { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Table Columns
import { columns } from './columns'
import Roles from '../roles'
import Permissions from "../permissions"
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, User, Plus, Lock, Circle } from 'react-feather'
import classnames from 'classnames'

import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from "../../../forms/form-elements/datepicker/PickerRange"
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, Input, Row, Col } from 'reactstrap'
import './style.css'
// ** Reactstrap Imports


// ** Store & Actions
// import { getData } from '../store'
import { getData } from '../../../apps/invoice/store'
import SecurityTab from '../../../apps/user/view/SecurityTab'

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import AccordionUncontrolled from './AccordionUncontrolled'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
    return (
        <div className='invoice-list-table-header w-100 py-2'>
            <Row>
                <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                    <div className='d-flex align-items-center me-2'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            className='form-control ms-50 pe-3'
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                    </div>
                    <Breadcrumbs />
                    <Col md='4' sm='12' className='mx-2'>
                        <PickerRange />
                    </Col>
                </Col>
                <Col
                    lg='6'
                    className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
                >
                    <div className='d-flex align-items-center'>
                        <label htmlFor='search-invoice'>Search</label>
                        <Input
                            id='search-invoice'
                            className='ms-50 me-2 w-100'
                            type='text'
                            value={value}
                            onChange={e => handleFilter(e.target.value)}
                            placeholder='Search Invoice'
                        />
                    </div>
                    <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
                        <option value=''>Select Status</option>
                        <option value='downloaded'>Downloaded</option>
                        <option value='draft'>Draft</option>
                        <option value='paid'>Paid</option>
                        <option value='partial payment'>Partial Payment</option>
                        <option value='past due'>Past Due</option>
                        <option value='sent'>Sent</option>
                    </Input>
                </Col>
            </Row>
        </div>
    )
}

export const InvoiceList = ({ active, toggleTab }) => {
    // ** Store vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.invoice)

    // ** States
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')
    const [currentPage, setCurrentPage] = useState(1)
    const [statusValue, setStatusValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // const [open, setOpen] = useState('')

    // const toggle = id => {
    //     open === id ? setOpen() : setOpen(id)
    // }

    useEffect(() => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: statusValue
            })
        )
    }, [dispatch, store.data.length])

    console.log(store.data)
    const handleFilter = val => {
        setValue(val)
        dispatch(
            getData({
                sort,
                q: val,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: statusValue
            })
        )
    }

    const handlePerPage = e => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                status: statusValue,
                perPage: parseInt(e.target.value)
            })
        )
        setRowsPerPage(parseInt(e.target.value))
    }

    const handleStatusValue = e => {
        setStatusValue(e.target.value)
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: e.target.value
            })
        )
    }

    const handlePagination = page => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                status: statusValue,
                perPage: rowsPerPage,
                page: page.selected + 1
            })
        )
        setCurrentPage(page.selected + 1)
    }

    const CustomPagination = () => {
        const count = Number((store.total / rowsPerPage).toFixed(0))

        return (
            <ReactPaginate
                nextLabel=''
                breakLabel='...'
                previousLabel=''
                pageCount={count || 1}
                activeClassName='active'
                breakClassName='page-item'
                pageClassName={'page-item'}
                breakLinkClassName='page-link'
                nextLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousLinkClassName={'page-link'}
                previousClassName={'page-item prev'}
                onPageChange={page => handlePagination(page)}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
        )
    }

    const dataToRender = () => {
        const filters = {
            q: value,
            status: statusValue
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                q: value,
                page: currentPage,
                sort: sortDirection,
                status: statusValue,
                perPage: rowsPerPage,
                sortColumn: column.sortField
            })
        )
    }
    const [menuHover, setMenuHover] = useState(false)

    // ** Ref
  
    // ** Function to handle Mouse Enter
    const onMouseEnter = () => {
      setMenuHover(true)
    }
    const scrollMenu = () => {
       
    }
    
    return (
        <div className='invoice-list-wrapper'>

            <div className='invoice-list-dataTable react-dataTable'>
                <Row>
                    <Col
                     className={classnames('menu-shadow', {
                        expanded: menuHover
                      })}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={() => setMenuHover(false)}
                    style={{ width: "20%", height: "98%" }}>
                        <PerfectScrollbar
                         className='main-menu-content'
                         options={{ wheelPropagation: false }}
                            onScrollY={container => scrollMenu(container)}
                        >
                            <Nav className='mb-2 navigation navigation-main'>
                                <Card className='p-2' >
                                    <NavItem id='nav_link' className='mb-1' >
                                        <NavLink id='nav_link' active={active === '1'} onClick={() => toggleTab('1')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Global Settings</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Roles</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Departments</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Payment Meth..</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Consultation</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Consulting Rooms MGT</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '7'} onClick={() => toggleTab('7')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Departments</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '8'} onClick={() => toggleTab('8')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Diagnosis</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '9'} onClick={() => toggleTab('9')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Leave Categories</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '10'} onClick={() => toggleTab('10')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Services</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '11'} onClick={() => toggleTab('11')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Specialization</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '12'} onClick={() => toggleTab('12')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Appraisal Indicators</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '13'} onClick={() => toggleTab('13')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Antenatal Packages</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '14'} onClick={() => toggleTab('14')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Nicu Accommodation</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link' className='mb-1'>
                                        <NavLink active={active === '15'} onClick={() => toggleTab('15')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Permission</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem id='nav_link'>
                                        <NavLink active={active === '16'} onClick={() => toggleTab('16')}>
                                            <Circle className='font-medium-3' />
                                            <span className='fw-bold mx-1'>Send Mail</span>
                                        </NavLink>
                                    </NavItem>
                                </Card>

                            </Nav>
                        </PerfectScrollbar>
                    </Col>
                    <Col className='col-lg-9' style={{ width: "79%" }}>
                        <TabContent activeTab={active}>
                            <TabPane tabId='1' lg='12'>
                                <Card className='p-1'>
                                    <CustomHeader
                                        value={value}
                                        statusValue={statusValue}
                                        rowsPerPage={rowsPerPage}
                                        handleFilter={handleFilter}
                                        handlePerPage={handlePerPage}
                                        handleStatusValue={handleStatusValue}
                                    />
                                </Card>
                                <DataTable
                                    noHeader
                                    pagination
                                    sortServer
                                    paginationServer
                                    subHeader={true}
                                    columns={columns}
                                    responsive={true}
                                    onSort={handleSort}
                                    data={dataToRender()}
                                    sortIcon={<ChevronDown />}
                                    className='react-dataTable'
                                    defaultSortField='invoiceId'
                                    paginationDefaultPage={currentPage}
                                    paginationComponent={CustomPagination}

                                />

                            </TabPane>
                            <TabPane tabId='2'>
                                <Roles />
                            </TabPane>
                            <TabPane tabId='3'>
                                {/* <Roles /> */}
                            </TabPane>
                            <TabPane tabId='4'>
                                <SecurityTab />
                            </TabPane>
                            <TabPane tabId='5'>
                                <AccordionUncontrolled />
                            </TabPane>

                            <TabPane tabId='15'>
                                <Permissions />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>

        </div >
    )
}
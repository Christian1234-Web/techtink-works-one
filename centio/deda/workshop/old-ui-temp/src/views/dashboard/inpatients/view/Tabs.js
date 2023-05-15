// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'

// ** Table Columns
import { columns } from '../list/columns'

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
import { getData } from '../../../apps/invoice/store'
import SecurityTab from '../../../apps/user/view/SecurityTab'

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
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

    return (
        <div className='invoice-list-wrapper'>

            <div className='invoice-list-dataTable react-dataTable p-2'>
                <Card>
                    <div className='p-1'>
                        <CustomHeader
                            value={value}
                            statusValue={statusValue}
                            rowsPerPage={rowsPerPage}
                            handleFilter={handleFilter}
                            handlePerPage={handlePerPage}
                            handleStatusValue={handleStatusValue}
                        />
                    </div>
                </Card>
                <Fragment>
                    <Nav pills className='mb-2'>
                        <NavItem>
                            <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                                <User className='font-medium-3 me-50' />
                                <span className='fw-bold'>Admitted Patients</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                                <Lock className='font-medium-3 me-50' />
                                <span className='fw-bold'>Discharged Patients</span>
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={active}>
                        <TabPane tabId='1' lg='12'>
                            {/* <Card> */}
                            {/* <Accordion className='accordion-border' open={open} toggle={toggle}>
                                    <AccordionItem>
                                        <AccordionHeader targetId='1'>
                                            <Col>Mary</Col>
                                            <Col>Worker</Col>
                                            <Col>31</Col>
                                            <Col>0904455665</Col>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='1'> */}
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
                            {/* </AccordionBody>
                                    </AccordionItem>
                                </Accordion> */}
                            {/* </Card> */}
                        </TabPane>
                        <TabPane tabId='2'>
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
                    </TabContent>
                </Fragment>
            </div>

        </div >
    )
}
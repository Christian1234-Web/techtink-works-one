// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'
import { patientname, request } from '../../../@fake-db/services/utilities'
import AsyncSelect from 'react-select/async'
import { searchAPI } from '../../../@fake-db/services/constant'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Label } from 'reactstrap'
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from '../../forms/form-elements/datepicker/PickerRange'

// ** Store & Actions
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const CustomHeader = ({ getOptions, getOptionValues, getOptionLabels, setChosenPatient, fetchVoucher, chosenPatient }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              type='select'
              id='rows-per-page'
              // value={rowsPerPage}
              // onChange={handlePerPage}
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
        {/* <Col lg='3'> */}
        {/* </Col> */}
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <Col lg='12' md='6' sm='12' className='mx-1'>
            <AsyncSelect
              isClearable
              getOptionValue={getOptionValues}
              getOptionLabel={getOptionLabels}
              defaultOptions
              name="patient_id"
              id="patient_id"
              loadOptions={getOptions}
              onChange={e => {
                if (e) {
                  setChosenPatient(e?.id);
                  console.log(chosenPatient)

                  fetchVoucher();
                } else {
                  setChosenPatient(null);
                }
              }}
              placeholder="Search patients"
            />
          </Col>
          <Input className='w-auto ' type='select'
          // value={statusValue} onChange={handleStatusValue}
          >
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

const InvoiceList = () => {
  // ** Store vars

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filtering, setFiltering] = useState(false)
  const [patient_id, setPatient_id] = useState('')
  const [status, setStatus] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [chosenPatient, setChosenPatient] = useState('')
  const [patient, setPatient] = useState('')
  const [voucher, setVoucher] = useState([])


  const fetchVoucher = async page => {
    try {
      const p = page || 1;
      setLoading(true);
      const url = `vouchers/list?page=${p}&limit=10&patient_id=${patient}&startDate=${startDate}&endDate=${endDate}&status=${status}`;
      const rs = await request(url, 'GET');
      const { result, ...meta } = rs;
      setMeta(meta);
      setVoucher(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptions = async q => {
    if (!q || q.length < 1) {
      return [];
    }

    const url = `${searchAPI}?q=${q}`;
    const res = await request(url, 'GET');
    return res;
  };
  const getOptionValues = option => option.id;
  const getOptionLabels = option => patientname(option, true);
  useEffect(() => {
    fetchVoucher();
    setLoading(false);
  }, [])

  // const handleFilter = val => {
  //   setValue(val)
  //   dispatch(
  //     getData({
  //       sort,
  //       q: val,
  //       sortColumn,
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       status: statusValue
  //     })
  //   )
  // }

  // const handlePerPage = e => {
  //   dispatch(
  //     getData({
  //       sort,
  //       q: value,
  //       sortColumn,
  //       page: currentPage,
  //       status: statusValue,
  //       perPage: parseInt(e.target.value)
  //     })
  //   )
  //   setRowsPerPage(parseInt(e.target.value))
  // }

  // const handleStatusValue = e => {
  //   setStatusValue(e.target.value)
  //   dispatch(
  //     getData({
  //       sort,
  //       q: value,
  //       sortColumn,
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       status: e.target.value
  //     })
  //   )
  // }

  const handlePagination = page => {
    fetchVoucher(page.selected + 1)
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    console.log(meta)
    const count = Number((meta.totalPages / rowsPerPage).toFixed(0))
    return (
      <ReactPaginate
        nextLabel='Next'
        breakLabel='...'
        previousLabel='Prev'
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

    if (voucher.length > 0) {
      return voucher
    } else if (voucher.length === 0) {
      return []
    } else {
      return voucher.slice(0, rowsPerPage)
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
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            // onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                getOptions={getOptions}
                getOptionValues={getOptionValues}
                getOptionLabels={getOptionLabels}
                setChosenPatient={setChosenPatient}
                fetchVoucher={fetchVoucher}
                chosenPatient={chosenPatient}
              // rowsPerPage={rowsPerPage}
              // handleFilter={handleFilter}
              // handlePerPage={handlePerPage}
              // handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList

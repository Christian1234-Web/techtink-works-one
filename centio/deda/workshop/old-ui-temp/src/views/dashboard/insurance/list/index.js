// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment, useCallback } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Reactstrap Imports
import { Input, Row, Col, Card } from 'reactstrap'
import Breadcrumbs from '@components/updatedBreadcrumb'
import { request } from '../../../../@fake-db/services/utilities'
import Flatpickr from 'react-flatpickr';

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, dateValue, handlePerDate }) => {
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
          {/* <Breadcrumbs /> */}
          <Col md='4' sm='12' className='mx-2'>
            <Flatpickr
              value={dateValue}
              id='range-picker'
              className='form-control'
              onChange={e => handlePerDate(e)}
              options={{
                mode: 'range',
                defaultDate: ['2020-02-01', '2020-02-15']
              }}
            />
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
            <option value='corporate'>Corporate</option>
            <option value='phis'>PHIS</option>
            <option value='self pay'>Self Pay</option>
            {/* <option value='partial payment'>Partial Payment</option>
            <option value='past due'>Past Due</option>
            <option value='sent'>Sent</option> */}
          </Input>
        </Col>
      </Row>
    </div>
  )
}

const InvoiceList = () => {
  // ** Store vars
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [insurance, setInsurance] = useState([])
  const [status, setStatus] = useState('');
  const [meta, setMeta] = useState(null);
  const [patient_id, setPatient_id] = useState('');
  const [hmo_id, setHmo_id] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateValue, setDateValue] = useState(new Date());

  const fetchInsurance = useCallback(
    async (page, q) => {
      try {
        const p = page || 1;
        const url = `hmos/transactions?page=${p}&limit=${rowsPerPage}&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}&hmo_id=${hmo_id}`;
        console.log(url);
        const rs = await request(url, 'GET', true);
        console.log(rs);
        const { result, ...meta } = rs;
        setMeta(meta);
        setInsurance(result);
      } catch (err) {
        console.log(err)
      }
    },
    [endDate, startDate, status],
  )


  useEffect(() => {
    fetchInsurance()
  }, [fetchInsurance])

  const handleFilter = val => {
    setValue(val)
    fetchAdmitted(1, val);
  }
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }
  const handlePerDate = e => {
    // setDateValue(e)
    setEndDate(e[1])
    setStartDate(e[0])
    console.log(e[0])
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)

  }

  const handlePagination = page => {
    fetchInsurance(page.selected + 1);
    setCurrentPage(page.selected + 1);
  }

  const CustomPagination = () => {
    const count = Number((meta.totalPages / rowsPerPage).toFixed(0))

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
    if (insurance.length > 0) {
      return insurance
    } else if (insurance.length === 0) {
      return []
    } else {
      return insurance.slice(0, rowsPerPage)
    }
  }
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
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
              dateValue={dateValue}
              handlePerDate={handlePerDate}
            />
          </div>
        </Card>
        <Card>
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
        </Card>
      </div>

    </div >
  )
}

export default InvoiceList

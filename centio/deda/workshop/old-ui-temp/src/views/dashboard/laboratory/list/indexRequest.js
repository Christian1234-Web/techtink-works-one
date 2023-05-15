// ** React Imports
// import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { request } from '../../../../@fake-db/services/utilities'

import { ThemeColors } from "../../../../utility/context/ThemeColors"
// ** Reactstrap Imports
import { Input, Row, Col, Card } from 'reactstrap'
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from '../../../forms/form-elements/datepicker/PickerRange'

// ** Store & Actions
import { getData } from '../../../apps/invoice/store/labQueRequest'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { SpinnerGrowColors } from './SpinnerGrowingColored'

const CustomHeader = ({ handleFilter, patient_id, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
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
        {/* <Col lg='3'> */}
        {/* </Col> */}
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='number'
              value={patient_id}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Id'
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
  const dispatch = useDispatch()
  const store = useSelector(state => state.labQueRequest)
  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtering, setFiltering] = useState(false)
  const [meta, setMeta] = useState(null)
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [patient_id, setPatient_id] = useState('')
  const [searchValue, setSearchValue] = useState('');


  const fetchLabs = async page => {
    try {
      // const { startDate, endDate, status, patient_id } = this.state;
      // this.setState({ loading: true });
      setLoading(true)
      const p = page || 1;
      // const search = q || '';
      const url = `requests/list/labs?page=${p}&limit=10&today=${date}`;
      console.log(url)
      const rs = await request(url, 'GET');
      const { result, ...meta } = rs;
      // this.setState({ labs: result, loading: false, filtering: false, meta });
      setMeta(meta)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLabs(result)
      setLoading(false)
      setFiltering(false)
    } catch (error) {
      console.log(error);
      // notifyError('Error fetching all lab request');
    }
    console.log(meta, labs)

  };

  const handleFilter = e => {
    setPatient_id(e)
    console.log(e)
    // if (e) e.preventDefault();
    // console.log(searchValue)
    setFiltering(true);
    fetchLabs();
  };
  useEffect(() => {
    // dispatch(
    //   getData({
    //     sort,
    //     q: value,
    //     sortColumn,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     status: statusValue
    //   })
    // )
    // if (!loading) {
    fetchLabs();
    setLoading(false);
    // }
  }, [])
  // console.log(store, 'labQueRequestStore')

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
  //   // console.log(val)
  // }

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
  // const columns = [
  //   {
  //     name: 'Balance',
  //     selector: row => row.createdBy
  //   }
  // ]
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
    // const filters = {
    //   q: value,
    //   status: statusValue
    // }

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0
    // })
    console.log(labs.length, 'hi')
    if (labs.length > 0) {
      return labs
    } else if (labs.length === 0) {
      return []
    } else {
      return labs.length.slice(0, rowsPerPage)
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
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
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

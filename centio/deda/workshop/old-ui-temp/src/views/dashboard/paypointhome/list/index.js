// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'
import { request } from '../../../../@fake-db/services/utilities'
import moment from 'moment';

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from 'reactstrap'
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from '../../../forms/form-elements/datepicker/PickerRange'

// ** Store & Actions
import { getData } from '../../../apps/invoice/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const InvoiceList = () => {
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
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filtering, setFiltering] = useState(false)
  const [transaction, setTransaction] = useState([])


  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const today = moment().format('YYYY-MM-DD');
      const url = `transactions?patient_id=&startDate=${today}&endDate=${today}&bill_source=&status=`;
      const rs = await request(url, 'GET');
      const { result, ...meta } = rs;
      setMeta(meta)
      setTransaction(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransaction();
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
    fetchTransaction(page.selected + 1)
    setCurrentPage(page.selected + 1)
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

    if (transaction.length > 0) {
      return transaction
    } else if (transaction.length === 0) {
      return []
    } else {
      return transaction.slice(0, rowsPerPage)
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
        <h6 className="element-header">
          Today's Transactions ({moment().format('DD-MMM-YYYY')})
        </h6>
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
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList

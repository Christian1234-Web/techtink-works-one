// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'

// ** Table Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Reactstrap Imports
import Breadcrumbs from '@components/updatedBreadcrumb'
import PickerRange from '../../../../forms/form-elements/datepicker/PickerRange'

// ** Store & Actions
// import { getData } from '../store'
// import { getData } from '../../../apps/invoice/store'
import {getData} from "../../../../apps/invoice/store"

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'


// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Input, Row, Col, Card
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
  ChevronDown
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Corporate: { color: 'light-success', icon: CheckCircle },
  PHIS: { color: 'light-primary', icon: Save },
  'Self Pay': { color: 'light-danger', icon: Info }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-primary'],
    color = states[stateNum]

  if (row.hmo.logo.length) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.hmo.hmoType ? `${row.other_names} ${row.surname}` : 'John Doe'} initials />
  }
}

// ** Table columns


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

const Datacompo = (props) => {
  // ** Store vars
  const dispatch = useDispatch()
  const stores = useSelector(state => state.invoice)
  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { handleAddEventSidebar, toggleSidebar } = props

  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

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
  }, [dispatch, stores.data.length])

  console.log(stores)
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
    const count = Number((stores.total / rowsPerPage).toFixed(0))

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

    if (stores.data.length > 0) {
      return stores.data
    } else if (stores.data.length === 0 && isFiltered) {
      return []
    } else {
      return stores.allData.slice(0, rowsPerPage)
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
  const columns = [
    {
      name: '#',
      sortable: true,
      sortField: 'id',
      minWidth: '107px',
      // selector: row => row.id,
      cell: row => <Link to={`/`}>{`#${row.id}`}</Link>
    },
    {
      sortable: true,
      minWidth: '102px',
      sortField: 'invoiceStatus',
      name: <TrendingUp size={14} />,
      // selector: row => row.invoiceStatus,
      cell: row => {
        const color = invoiceStatusObj[row.hmo.hmoType.name] ? invoiceStatusObj[row.hmo.hmoType.name].color : 'primary',
          Icon = invoiceStatusObj[row.hmo.hmoType.name] ? invoiceStatusObj[row.hmo.hmoType.name].icon : Edit
        return (
          <Fragment>
            <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
            <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
              <span className='fw-bold'>{row.hmo.hmoType.name}</span>
              <br />
              <span className='fw-bold'>Balance:</span> {row.balance}
              <br />
              <span className='fw-bold'>Updated Date:</span> {row.last_appointment_date}
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    },
    {
      name: 'Patient',
      sortable: true,
      minWidth: '350px',
      sortField: 'Patient.name',
      // selector: row => row.client.name,
      cell: row => {
        const name = row.hmo.hmoType ? `${row.other_names} ${row.surname}` : 'John Doe',
          email = row.hmo.hmoType ? row.email : 'johnDoe@email.com'
        return (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row)}
            <div className='d-flex flex-column'>
              <h6 className='user-name text-truncate mb-0'>{name}</h6>
              <small className='text-truncate text-muted mb-0'>{email}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'OUTSTANDING',
      sortable: true,
      minWidth: '150px',
      sortField: 'outstanding',
      // selector: row => row.total,
      cell: row => <span>${row.outstanding || 0}</span>
    },
    {
      sortable: true,
      minWidth: '18 0px',
      name: 'DATE REGISTERED',
      sortField: 'updated_at',
      cell: row => <span> {new Date(row.updated_at).toDateString()} {new Date(row.updated_at).toLocaleTimeString()}</span>
  
      // selector: row => row.dueDate
    },
    {
      sortable: true,
      name: 'BALANCE',
      minWidth: '164px',
      // sortField: 'balance',
      // selector: row => row.balance,
      cell: row => {
        return row.balance !== 0 ? (
          <span>{row.balance}</span>
        ) : (
          <Badge color='light-success' pill>
            Paid
          </Badge>
        )
      }
    },
    {
      name: 'Action',
      minWidth: '110px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Eye size={17} className='mx-1 cursor-pointer' id={`pw-tooltip-${row.id}`} onClick={handleAddEventClick} />
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            Preview Profile
          </UncontrolledTooltip>
          <UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' onClick={handleAddEventClick} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Download size={14} className='me-50' />
                <span className='align-middle'>Download</span>
              </DropdownItem>
              <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
                <Edit size={14} className='me-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={e => {
                  e.preventDefault()
                  store.dispatch(deleteInvoice(row.id))
                }}
              >
                <Trash size={14} className='me-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Copy size={14} className='me-50' />
                <span className='align-middle'>Duplicate</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
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

export default Datacompo

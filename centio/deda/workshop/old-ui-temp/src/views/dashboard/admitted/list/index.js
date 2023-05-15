// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

// ** Table Columns
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/flatpickr/flatpickr.scss'

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
import Breadcrumbs from '@components/updatedBreadcrumb'
import { request } from '../../../../@fake-db/services/utilities'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Avatar from '@components/avatar'

import Flatpickr from 'react-flatpickr';

import {
  Eye,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
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

  if (row.patient.hmo.logo.length) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.patient.hmo.hmoType ? `${row.other_names} ${row.surname}` : 'John Doe'} initials />
  }
}
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

const InvoiceList = (props) => {
  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [admitted, setAdmitted] = useState([])
  const [status, setStatus] = useState('');
  const [meta, setMeta] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateValue, setDateValue] = useState(new Date());

  const { handleAddEventSidebar, toggleSidebar } = props

  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }
  const fetchAdmitted = useCallback(
    async (page, q) => {
      try {
        const p = page || 1;
        const search = q || '';
        const url = `patient/admissions?page=${p}&q=${search}&limit=${rowsPerPage}&startDate=${startDate}&endDate=${endDate}&status=${status}`;
        // &patient_id=${pid}
        console.log(url);
        const rs = await request(url, 'GET');
        console.log(rs);
        const { result, ...meta } = rs;
        setMeta(meta);
        setAdmitted(result);
      } catch (err) {
        console.log(err)
      }
    },
    [endDate, startDate, status],
  )


  useEffect(() => {
    fetchAdmitted()
  }, [fetchAdmitted])

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
    fetchAdmitted(page.selected + 1);
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
    if (admitted.length > 0) {
      return admitted
    } else if (admitted.length === 0) {
      return []
    } else {
      return admitted.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)

  }
  const columns = [
    {
      name: 'PATIENT NAME',
      sortable: true,
      minWidth: '350px',
      sortField: 'Patient.name',
      cell: row => {
        const name = row.patient.hmo.hmoType ? `${row.patient.other_names} ${row.patient.surname}` : 'John Doe',
          email = row.patient.hmo.hmoType ? row.patient.email : 'johnDoe@email.com'
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
      name: 'REASON',
      sortable: true,
      minWidth: '150px',
      sortField: 'reason',
      // selector: row => row.total,
      cell: row => <span>{row.reason}</span>
    },
    {
      sortable: true,
      minWidth: '180px',
      name: 'DATE OF ADMISSION',
      sortField: 'updated_at',
      cell: row => <span> {new Date(row.updated_at).toDateString()}</span>

      // selector: row => row.dueDate
    },
    {
      sortable: true,
      name: 'ADMITTED BY',
      minWidth: '330px',
      sortField: 'admitted by',
      // selector: row => row.balance,
      cell: row => {
        const name = row.patient.hmo.hmoType ? `${row.admitted_by.first_name} ${row.admitted_by.last_name}` : 'John Doe',
          email = row.patient.hmo.hmoType ? row.admitted_by.email : 'johnDoe@email.com'
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
    // {
    //   sortable: true,
    //   name: 'ROOM/FLOOR',
    //   minWidth: '164px',
    //   sortField: 'room by',
    //   cell: row => <span>Room {row.id}
    //     {row.room.name} / {row.room.floor}
    //   </span>
    // },
    {
      name: 'Action',
      minWidth: '110px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Link to={`${row.id}`}>
            <Eye size={17} className='mx-1 cursor-pointer' id={`pw-tooltip-${row.id}`} onClick={() => handleAddEventClick(row.id)} />
          </Link>          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            Preview Profile
          </UncontrolledTooltip>
          <UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' />
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

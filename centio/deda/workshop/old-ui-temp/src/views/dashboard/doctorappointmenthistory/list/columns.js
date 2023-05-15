// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteInvoice } from '../../../apps/invoice/store'


// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
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
  ArrowDownCircle
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  // Sent: { color: 'light-secondary', icon: Send },
  Corporate: { color: 'light-success', icon: CheckCircle },
  PHIS: { color: 'light-primary', icon: Save },
  'Self Pay': { color: 'light-danger', icon: Info }
  // Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  // 'Partial Payment': { color: 'light-warning', icon: PieChart }
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
export const columns = [
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
        {/* <Send className='cursor-pointer' size={17}  /> */}
        {/* <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip> */}
        <Link to={`/`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Patient
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

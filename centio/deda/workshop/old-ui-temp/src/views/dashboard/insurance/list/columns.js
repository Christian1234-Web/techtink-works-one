// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteInvoice } from '../../../apps/invoice/store'


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
  Corporate: { color: 'light-success', icon: CheckCircle },
  PHIS: { color: 'light-primary', icon: Save },
  'Self Pay': { color: 'light-danger', icon: Info }
}
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-primary'],
    color = states[stateNum]

  if (row.service.length) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.service ? `${row.other_names} ${row.surname}` : 'John Doe'} initials />
  }
}
// ** Table columns
export const columns = [
  {
    name: 'DATE',
    sortable: true,
    minWidth: '150px',
    sortField: 'reason',
    // selector: row => row.total,
    cell: row => <span>{new Date(row.createdAt).toDateString()}</span>
  },
  {
    sortable: true,
    minWidth: '102px',
    sortField: 'hmo',
    name: <TrendingUp size={14} />,
    // selector: row => row.invoiceStatus,
    cell: row => {
      const color = invoiceStatusObj[row.service.hmo.name] ? invoiceStatusObj[row.service.hmo.name].color : 'light-danger',
        Icon = invoiceStatusObj[row.service.hmo.name] ? invoiceStatusObj[row.service.hmo.name].icon : Edit
      return (
        <Fragment>
          <div> <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} /> {row.service.hmo.name}
          </div>
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>{row.service.hmo.hmoType.name}</span>
            <br />
            <span className='fw-bold'>Balance:</span>  ({row.service.hmo.phoneNumber})
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },
  {
    name: 'PATIENT',
    sortable: true,
    minWidth: '400px',
    sortField: 'Patient.name',
    cell: row => {
      const name = row.service.hmo.hmoType ? `${row.patient.other_names} ${row.patient.surname}` : 'John Doe',
        email = row.service.hmo.hmoType ? row.patient.email : 'johnDoe@email.com'
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
    name: 'SERVICE',
    sortable: true,
    minWidth: '200px',
    sortField: 'service',
    // selector: row => row.total,
    cell: row => <span>{row.description}</span>
  },
  {
    name: 'AMOUNT',
    sortable: true,
    minWidth: '100px',
    sortField: 'amount',
    // selector: row => row.total,
    cell: row => <span>${row.amount}</span>
  },
  // {
  //   name: 'CODE',
  //   sortable: true,
  //   minWidth: '150px',
  //   sortField: 'code',
  //   // selector: row => row.total,
  //   cell:  <span>---</span>
  // },
  {
    sortable: true,
    name: 'STATUS',
    minWidth: '80px',
    sortField: 'status',
    cell: row => {
      return row.status !== -1 ? (
        <span>completed</span>
      ) : (
        <Badge color='light-success' pill>
          pending
        </Badge>
      )
    }
  },
  {
    name: 'Action',
    minWidth: '50px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {/* <Send className='cursor-pointer' size={17}  /> */}
        {/* <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip> */}
        {/* <Link to={`/`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Patient
        </UncontrolledTooltip> */}
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Enter Code</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Approve Without Code</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='me-50' />
              <span className='align-middle'>Transfer to Paypoint</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]

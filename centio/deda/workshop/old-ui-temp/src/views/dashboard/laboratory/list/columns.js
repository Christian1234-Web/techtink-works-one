// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { formatDate } from '@utils'

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
  Printer
} from 'react-feather'

// ** Vars


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

// ** Table columns
export const columns = [
  {
    name: 'DATE',
    sortable: true,
    minWidth: '120px',
    sortField: 'createdAt',
    cell: row => <span>  {formatDate(row.createdAt)} </span>
  },
  {
    name: 'ID',
    sortable: true,
    minWidth: '150px',
    sortField: 'group_code',
    // selector: row => row.total,
    cell: row => <span> {row.group_code}</span>
  },
  {
    name: 'LAB',
    sortable: true,
    minWidth: '200px',
    sortField: 'lab',
    // selector: row => row.total,
    cell: row => <span> {row.item.labTest.name || ' '}</span>
  },
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
    name: 'CREATED BY',
    sortable: true,
    minWidth: '150px',
    sortField: 'createdBy',
    // selector: row => row.total,
    cell: row => <span>{row.createdBy}</span>
  },
  // {
  //   sortable: true,
  //   minWidth: '80px',
  //   name: 'NOTE',
  //   sortField: 'requestNote',
  //   cell: row => <span>{row.requestNote || '--'} </span>
  // },
  {
    sortable: true,
    minWidth: '120px',
    name: 'RESULT',
    sortField: 'result',
    cell: lab => {
      if (lab.item.cancelled === 0 &&
        lab.item.transaction &&
        (lab.item.transaction.status === 1 ||
          lab.item.transaction.status === -1) &&
        lab.item.filled === 0) {
        return (
          <Badge color='light-info' pill>
            Pending
          </Badge>
        )
      } else if (lab.item.cancelled === 0 &&
        lab.item.transaction &&
        lab.item.transaction.status === 0) {
        return (
          <Badge color='light-secondary' pill>
            Awaiting Payment
          </Badge>
        )
      } else if (lab.item.cancelled === 0 &&
        lab.item.transaction &&
        (lab.item.transaction.status === 1 ||
          lab.item.transaction.status === -1) &&
        lab.item.filled === 1 &&
        lab.item.approved === 0) {
        return (
          <Badge color='light-primary' pill>
            Awaiting Approval
          </Badge>
        )
      } else if (lab.item.cancelled === 0 &&
        lab.status === 1 &&
        lab.item.approved === 1) {
        return (
          <Badge color='light-success' pill>
            Approved
          </Badge>
        )
      } else if (lab.item.cancelled === 1) {
        return (
          <Badge color='light-danger' pill>
            cancelled
          </Badge>
        )
      }
    }

    // selector: row => row.dueDate
  },
  {
    name: 'Action',
    minWidth: '50px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Patient
        </UncontrolledTooltip>
        <Link to={`/`} id={`pw-tooltip-${`p1`}`}>
          <Printer size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${`p1`}`}>
          Print Lab Test
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

// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { patientname } from '../../../@fake-db/services/utilities'

// ** Custom Components
import Avatar from '@components/avatar'
import { formatDate } from '@utils'

// ** Store & Actions
// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Modal,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import {
  Clipboard, Edit,
  Copy,
  Trash,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  Printer,
  Plus,
  X,
  Delete
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
    minWidth: '50px',
    sortField: 'createdAt',
    cell: row => <small className='' style={{ fontSize: "11px" }}>  {formatDate(row.createdAt)} </small>
  },
  {
    name: 'PATIENT NAME',
    sortable: true,
    minWidth: '280px',
    sortField: 'Patient.name',
    cell: row => {
      const [show, setShow] = useState(false)
      const testing = () => {
        setShow(true)
        console.log(row.patient)
      }
      const name = row.patient.hmo.hmoType ? `${row.patient.other_names} ${row.patient.surname}` : 'John Doe',
        email = row.patient.hmo.hmoType ? row.patient.email : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center cursor-pointer' onClick={() => testing()}>
          {renderClient(row)}
          <div div className='d-flex flex-column'>
            <div className='d-flex'>
              <h6 className='user-name text-truncate mb-0' style={{ fontSize: "11px" }}>{name}</h6>'
              {(row.patient?.admission_id ||
                row.patient?.nicu_id) && (
                  <span>
                    <Clipboard className='cursor-pointer' color='red' size={12} id={`av-tooltip-${`p4`}`} />
                    <UncontrolledTooltip placement='top' target={`av-tooltip-${`p4`}`}>
                      Admitted
                    </UncontrolledTooltip>
                  </span>
                )}
            </div>
            <small className='text-truncate text-muted mb-0' style={{ fontSize: "11px" }}>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Voucher no',
    sortable: true,
    minWidth: '180px',
    sortField: 'department',
    // selector: row => row.total,
    cell: row => <span style={{ fontSize: "11px" }}>
      {row.voucher_no}
    </span>
  },
  {
    name: 'AMOUNT (₦)',
    sortable: true,
    minWidth: '80px',
    sortField: 'amount',
    // selector: row => row.total,
    cell: row => <small style={{ fontSize: "11px" }}> ₦{row.amount}</small>
  },
  {
    name: 'expiry date',
    sortable: true,
    minWidth: '100px',
    sortField: 'expiration_date',
    // selector: row => row.total,
    cell: row => <small style={{ fontSize: "11px" }}>{formatDate(row.expiration_date)}</small>
  },
  {
    sortable: true,
    minWidth: '120px',
    name: 'STATUS',
    sortField: 'payment_status',
    cell: x => {

      if (!x.transaction) {
        return (
          <Badge color='light-danger' style={{ fontSize: "8px" }} pill>
            Not Used
          </Badge>
        )
      } else {
        return (
          <Badge color='light-success' style={{ fontSize: "8px" }} pill>
            Used<br />
            {` by ${patientname(
              x.transaction.patient,
              true
            )}`}
          </Badge>

        )
      }
    }
    // selector: row => row.dueDate
  },
  {
    name: 'Action',
    minWidth: '20px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/`} id={`pw-tooltip-${`p3`}`}>
          <Delete size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${`p3`}`}>
          Delete
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-110' onClick={e => e.preventDefault()}>
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

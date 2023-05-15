// ** React Imports
import { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
  X
} from 'react-feather'
import DataTableWithButtons from './TableWithButtons'

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

export const ModalTransaction = (props) => {
  // ** State
  const { show, setShow, patient } = props
  // const CloseBtn = <X className='cursor-pointer' size={15} toggle={() => setShow(!show)} />
  const history = useHistory()
  const printDoc = () => {
    console.log('navigate to print page')
    history.push('/dashboard/transaction-history-print')
  }
  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(false)} className='modal-dialog-top modal-refer-earn modal-lg mb-0' style={{ width: '40%' }}>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-0 mb-0 p-0'>
          <DataTableWithButtons
            patient={patient}
            printDoc={printDoc}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  )
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

              <ModalTransaction
                show={show}
                setShow={setShow}
                patient={row.patient}

              />
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
    name: 'Service',
    sortable: true,
    minWidth: '180px',
    sortField: 'department',
    // selector: row => row.total,
    cell: row => <span style={{ fontSize: "11px" }}>
      {row.description}
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
    name: 'CREATED BY',
    sortable: true,
    minWidth: '100px',
    sortField: 'createdBy',
    // selector: row => row.total,
    cell: row => <small style={{ fontSize: "11px" }}>{row.createdBy}</small>
  },
  {
    sortable: true,
    minWidth: '120px',
    name: 'PAYMENT STATUS',
    sortField: 'payment_status',
    cell: transaction => {

      if (transaction.status < 1) {
        return (
          <Badge color='light-danger' style={{ fontSize: "8px" }} pill>
            Pending
          </Badge>
        )
      } else {
        return (
          <Badge color='light-success' style={{ fontSize: "8px" }} pill>
            Paid
          </Badge>
        )
      }
    }
    // selector: row => row.dueDate
  },
  {
    sortable: true,
    minWidth: '20px',
    name: 'Type',
    sortField: 'transaction_type',
    cell: row => <small style={{ fontSize: "11px" }}>{row.transaction_type || ' '} </small>
  },
  {
    sortable: true,
    minWidth: '50px',
    name: 'Received By',
    sortField: 'staff',
    cell: row => <small style={{ fontSize: "11px" }}>{row.lastChangedBy || '--'} </small>
  },
  {
    name: 'Action',
    minWidth: '20px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/`} id={`pw-tooltip-${`p3`}`}>
          <Printer size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${`p3`}`}>
          Print
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

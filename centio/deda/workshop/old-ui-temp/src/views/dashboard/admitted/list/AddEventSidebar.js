// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { X } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
// ** Utils
import { isObjEmpty } from '@utils'
import StaffIndex from "../view"


// ** Avatar Images

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className='toastify-header pb-0'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={icon} />
        <h6 className='toast-title'>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    handleAddEventSidebar
  } = props

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      // className='sidebar-xl'
      toggle={handleAddEventSidebar}
      size={'14'}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
      style={{ width: "95%" }}
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          Event
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <StaffIndex />
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar

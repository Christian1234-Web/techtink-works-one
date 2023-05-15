// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { X } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
// ** Utils
import { isObjEmpty } from '@utils'
import UserView from './UserView'
import StaffIndex from "../../../staffhome/user/view"


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
    store,
    calendarsColor,
    handleAddEventSidebar
  } = props

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      setValue,
      getValues
    } = useForm({
      defaultValues: { title: '' }
    })

  // ** States
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [guests, setGuests] = useState({})
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')

  // ** Adds New Event

  // ** Reset Input Values on Clo
  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const calendar = selectedEvent.extendedProps.calendar

      const resolveLabel = () => {
        if (calendar.length) {
          return { label: calendar, value: calendar, color: calendarsColor[calendar] }
        } else {
          return { value: 'Business', label: 'Business', color: 'primary' }
        }
      }
      setValue('title', selectedEvent.title || getValues('title'))
      setAllDay(selectedEvent.allDay || allDay)
      setUrl(selectedEvent.url || url)
      setLocation(selectedEvent.extendedProps.location || location)
      setDesc(selectedEvent.extendedProps.description || desc)
      setGuests(selectedEvent.extendedProps.guests || guests)
      setStartPicker(new Date(selectedEvent.start))
      setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
      setCalendarLabel([resolveLabel()])
    }
  }
  const handleResetInputValues = () => {
    setValue('title', '')
    setAllDay(false)
    setUrl('')
    setLocation('')
    setDesc('')
    setGuests({})
  }

  // ** (UI) updateEventInCalendar

  // ** Updates Event in Store

  // ** (UI) removeEventInCalendar

  // ** Event Action buttons

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      // className='sidebar-xl'
      toggle={handleAddEventSidebar}
      size={14}
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
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

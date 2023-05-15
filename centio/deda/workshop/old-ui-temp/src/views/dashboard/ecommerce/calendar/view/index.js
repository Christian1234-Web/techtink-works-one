// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'
// import UserView from './container'
// ** Calendar App Component Imports
import AddEventSidebar from './AddEventSidebar'
// ** Custom Hooks
// import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents, selectEvent, updateEvent, addEvent, removeEvent } from '../store'
// ** Styles
import '@styles/react/apps/app-calendar.scss'
import Datacompo from './Datacompo'

// ** CalendarColors
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
}

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** states
  // const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

  // ** Hooks
  // const [isRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  const refetchEvents = () => {
    // if (calendarApi !== null) {
    //   calendarApi.refetchEvents()
    // }
  }

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [])

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden'>
        <Row className='g-0'>
          <Col>
            {/* <UserView /> */}
          </Col>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >

          </Col>
          <Datacompo
            toggleSidebar={toggleSidebar}
            handleAddEventSidebar={handleAddEventSidebar}
          />
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        updateEvent={updateEvent}
        removeEvent={removeEvent}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />


    </Fragment>
  )
}

export default CalendarComponent

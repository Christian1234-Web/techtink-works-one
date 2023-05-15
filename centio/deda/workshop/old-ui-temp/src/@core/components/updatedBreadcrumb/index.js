// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from 'react-feather'

// ** Reactstrap Imports
import {
  Breadcrumb,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const BreadCrumbs = () => {
  // ** Props
//   const { breadCrumbParent2, breadCrumbParent3, breadCrumbActive } = props

  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              {/* <Breadcrumb>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem  className='text-primary'>
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem  className='text-primary'>
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem  active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb> */}
            </div>
          </div>
        </div>
      </div>
      <div className='content-header-right text-md-end col-md-3 col-12 d-md-block d-none'>
        <div className='breadcrumb dropdown'>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='primary' size='sm' className='btn-icon btn-round dropdown-toggle'>
              <Grid size={14} />
            </DropdownToggle>
            <DropdownMenu tag='ul' end>
              <DropdownItem tag={Link} to='/apps/todo'>
                <CheckSquare className='me-1' size={14} />
                <span className='align-middle'>Todo</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/apps/chat'>
                <MessageSquare className='me-1' size={14} />
                <span className='align-middle'>Chat</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/apps/email'>
                <Mail className='me-1' size={14} />
                <span className='align-middle'>Email</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/apps/calendar'>
                <Calendar className='me-1' size={14} />
                <span className='align-middle'>Calendar</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}

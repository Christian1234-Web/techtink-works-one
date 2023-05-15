// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { patientname } from '../../../../../@fake-db/services/utilities'
// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col, Label, Input, Badge } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone, Briefcase, X } from 'react-feather'

const UserInfoCard = ({ selectedUser }) => {
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.profile_pic) {
      return <img src={selectedUser.profile_pic} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        // <Avatar
        //   initials
        //   color={color}
        //   className='rounded'
        //   content={selectedUser.other_names}
        //   contentStyles={{
        //     borderRadius: 0,
        //     fontSize: 'calc(36px)',
        //     width: '100%',
        //     height: '100%'
        //   }}
        //   style={{
        //     height: '90px',
        //     width: '90px'
        //   }}
        // />
        <img src=''/>
      )
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                <div className='d-flex flex-column ml-1'>

                  <div className='d-flex'>
                    <div className='me-25'>
                      {renderUserImg()}
                    </div>

                    <div>
                      <div className='user-info mb-1 mx-2'>
                        <h4 className='mb-0'>{selectedUser !== null ? patientname(selectedUser, true) : 'Eleanor Aguilar'}</h4>
                        <CardText tag='span'>
                          {selectedUser !== null ? selectedUser.email : 'eleanor.aguilar@gmail.com'}
                        </CardText>
                      </div>
                      <div className='d-flex align-items-end mt-75 ms-1'>

                        <div>
                          <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                            Upload
                            <Input type='file' hidden accept='image/*' />
                          </Button>
                          <Button className='mb-75' color='secondary' size='sm' outline >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-around my-2 pt-75'>
                    <div className='d-flex align-items-start me-2'>
                      <Badge color='light-primary' className='rounded p-75'>
                        <Check className='font-medium-2' />
                      </Badge>
                      <div className='ms-75'>
                        <h4 className='mb-0'>1.23k</h4>
                        <small>Tasks Done</small>
                      </div>
                    </div>
                    <div className='d-flex align-items-start'>
                      <Badge color='light-primary' className='rounded p-75'>
                        <Briefcase className='font-medium-2' />
                      </Badge>
                      <div className='ms-75'>
                        <h4 className='mb-0'>568</h4>
                        <small>Projects Done</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Col>
          <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              <div className='d-flex '>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title fw-bolder mb-0'>
                    Username :
                  </CardText>
                </div>
                <CardText className='mb-0 mx-1'>
                  {selectedUser !== null ? patientname(selectedUser, true) : 'eleanor.aguilar'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title fw-bolder mb-0'>
                    Status :
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0 mx-1'>
                  {/* {selectedUser.hmo.hmoType.name !== null ? selectedUser.hmo.hmoType.name : 'Active'} */}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title fw-bolder mb-0'>
                    Gender :
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0 mx-1'>
                  {selectedUser.gender !== null ? selectedUser.gender : 'Admin'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title fw-bolder mb-0'>
                    Address :
                  </CardText>
                </div>
                <CardText className='mb-0 mx-1'>{selectedUser.address !== null ? selectedUser.address : 'Nigeria'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <CardText tag='span' className='user-info-title fw-bolder mb-0'>
                    Contact :
                  </CardText>
                </div>
                <CardText className='mb-0 mx-1'>{selectedUser.phone_number !== null ? selectedUser.phone_number : '(123) 456-7890'}</CardText>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard

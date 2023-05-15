// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  InputGroupText
} from 'reactstrap'

// ** Icons Imports
import { Award, Gift, MessageSquare, Clipboard, Facebook, Twitter, Linkedin } from 'react-feather'

const data = [
  {
    icon: 1,
    title: 'Send Invitation 🤟🏻',
    subtitle: 'Send your referral link to your friend'
  },
  {
    icon: 2,
    title: 'Registration 👩🏻‍💻',
    subtitle: 'Let them register to our services'
  },
  {
    icon: 3,
    title: 'Free Trial 🎉',
    subtitle: 'Your friend will get 30 days free trial'
  }
]

const ReferEarnModal = () => {
  // ** State
  const [show, setShow] = useState(true)

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-refer-earn modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-0'>
          <div className='px-sm-4 mx-50'>
            <h1 className='text-center mb-1'>You are Consulting from Room?</h1>
            {/* <p className='text-center mb-5'>
              Invite your friend to vuexy, if they sign up, you and
              <br />
              your friend will get 30 days free trial
            </p> */}
            <Row>
              {data.map((item, index) => {
                return (
                  <Col xs={12} lg={4} key={index}>
                    <div className='d-flex justify-content-center mb-1'>
                      <div className='cursor-pointer modal-refer-earn-step d-flex width-100 height-100 rounded-circle justify-content-center align-items-center bg-light-primary'>
                        <h1 className='fs-1'> {item.icon}</h1>
                      </div>
                    </div>
                    {/* <div className='text-center'>
                      <h6 className='fw-bolder mb-1'>{item.title}</h6>
                      <p>{item.subtitle}</p>
                    </div> */}
                  </Col>
                )
              })}
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ReferEarnModal

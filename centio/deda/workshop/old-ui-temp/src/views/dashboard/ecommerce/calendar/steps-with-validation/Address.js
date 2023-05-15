// ** React Imports
import { Fragment, useContext } from 'react'
import { ThemeColors } from '../../../../../utility/context/ThemeColors'
import { ArrowLeft } from 'react-feather'
// ** Third Party Components

// ** Reactstrap Imports
import { Label, Row, Col, Button, Input } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Address = ({ stepper }) => {
  // ** Hooks
  const store = useContext(ThemeColors)
  const MySwal = withReactContent(Swal)

  // patient
  const [email] = store.email
  const [surname] = store.surname
  const [address] = store.address
  const [date_of_birth] = store.date_of_birth
  const [ethnicity] = store.ethnicity
  const [gender] = store.gender
  const [occupation] = store.occupation
  const [hmo_id] = store.hmo_id
  const [maritalStatus] = store.maritalStatus
  const [avatar, setAvatar] = store.avatar
  const [other_names] = store.other_names
  const [phone_number] = store.phone_number
  // const [referredBy, setReferredBy] = store.referredBy
  const [enrollee_id] = store.enrollee_id
  // const [staff_id, setStaff_id] = store.staff_id
  // next of kin
  const [nok_email] = store.nok_email
  const [nok_other_names] = store.nok_other_names
  const [nok_surname] = store.nok_surname
  const [nok_address] = store.nok_address
  const [nok_ethnicity] = store.nok_ethnicity
  const [nok_gender] = store.nok_gender
  const [nok_maritalStatus] = store.nok_maritalStatus
  const [nok_occupation] = store.nok_occupation
  const [nok_phoneNumber] = store.nok_phoneNumber
  const [nok_relationship] = store.nok_relationship
  const [nok_date_of_birth] = store.nok_date_of_birth

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
  }
  const handleSuccess = () => {
    return MySwal.fire({
      title: 'Good job!',
      text: 'patient has been created!',
      icon: 'success'
    })
  }
  const handleError = () => {
    return MySwal.fire({
      title: 'Oops!',
      text: "There's something wrong!",
      icon: 'error'
    })
  }

  const createPatient = () => {
    const Bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoxLCJpYXQiOjE2NDcyNjQ2MjEsImV4cCI6MTY0NzQzNzQyMX0.JRefrg1WrGY6akxXgKmjSoVOkl8fu3Pw7c2-GCMmyEw'
    const data = {
      surname,
      other_names,
      email,
      address,
      ethnicity: ethnicity.value,
      gender: gender.value,
      occupation,
      hmo_id,
      maritalStatus: maritalStatus.value,
      phone_number,
      enrollee_id,
      nok_relationship,
      date_of_birth,
      nok_email,
      nok_other_names,
      nok_address,
      nok_surname,
      nok_ethnicity: nok_ethnicity.value,
      nok_gender: nok_gender.value,
      nok_maritalStatus: nok_maritalStatus.value,
      nok_occupation,
      nok_phoneNumber,
      nok_relationship,
      nok_date_of_birth
    }
    fetch('http://localhost:3002/patient', {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Bearer}`
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          handleSuccess()
        } else {
          handleError()
          console.log(res)
        }

      })
  }

  return (
    <Fragment>
      <Row className='content-header'>
        <Col className='d-flex mx-1'>
          <div className='me-25'>
            <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
          </div>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                Upload
                <Input type='file' onChange={onChange} hidden accept='image/*' />
              </Button>
              <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                Reset
              </Button>
              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </Col>
        <Col md='4'>
          <div className='content-header'>
            <h5 className='mb-0'>Patient Name</h5>
            <small>{surname} {other_names}</small>
            <br />
            <small> {email}</small>

          </div>
          <h5 className='mb-0'> Next of Kin</h5>
          <small className='text-muted'>{nok_surname} {nok_other_names}</small>
          <br />
          <small> {nok_email}</small>
        </Col>

      </Row>
      <div className='d-flex justify-content-between'>
        <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
          <span className='align-middle d-sm-inline-block d-none'>Previous</span>
        </Button>
        <Button type='button' onClick={() => createPatient()} color='success' className='btn-submit'>
          Submit
        </Button>
      </div>
    </Fragment>
  )
}

export default Address

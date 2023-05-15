// ** React Imports
import { Fragment, useContext } from 'react'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Third Party Components
// import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
// import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { ThemeColors } from '../../../../../utility/context/ThemeColors'
// import axios from 'axios'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const AccountDetails = ({ stepper, hmo }) => {

  // const [picker, setPicker] = useState(new Date())
  const store = useContext(ThemeColors)
  const [email, setEmail] = store.email
  const [surname, setSurname] = store.surname
  const [address, setAddress] = store.address
  const [date_of_birth, setDate_of_birth] = store.date_of_birth
  const [ethnicity, setEthnicity] = store.ethnicity
  const [gender, setGender] = store.gender
  const [occupation, setOccupation] = store.occupation
  const [hmo_id] = store.hmo_id
  const [maritalStatus, setMaritalStatus] = store.maritalStatus
  const [other_names, setOther_names] = store.other_names
  const [phone_number, setPhone_number] = store.phone_number
  // const [referredBy, setReferredBy] = store.referredBy
  const [enrollee_id, setEnrollee_id] = store.enrollee_id
  // const [staff_id, setStaff_id] = store.staff_id
  const defaultValues = {
    email,
    surname,
    other_names,
    date_of_birth,
    gender,
    maritalStatus,
    hmo: hmo_id,
    enrollee_id,
    occupation,
    address,
    phone_number,
    ethnicity
    // referredBy
  }


  // const SignupSchema = yup.object().shape({
  //   surname: yup.string().required(),
  //   email: yup.string().email().required(),
  //   other_names: yup.string().required(),
  //   date_of_birth: yup.string().required(),
  //   gender: yup.string().required(),
  //   maritalStatus: yup.string().required(),
  //   hmo: yup.string().required(),
  //   enrollee_id: yup.string().required(),
  //   occupation: yup.string().required(),
  //   address: yup.string().required(),
  //   phone_number: yup.string().required(),
  //   ethnicity: yup.string().required()
  // })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
    // resolver: yupResolver(SignupSchema)
  })
  const genderOptions = [
    { value: '', label: 'select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]
  const maritalOptions = [
    { value: '', label: 'select status' },
    { value: 'married', label: 'Married' },
    { value: 'single', label: 'Single' }
  ]

  const ethnicityOptions = [
    { value: '', label: 'select ethnicity' },
    { value: 'igbo', label: 'Igbo' },
    { value: 'hausa', label: 'Hausa' },
    { value: 'hausa-fulani', label: 'Hausa Fulani' }

  ]
  const onSubmit = () => {
    console.log(defaultValues)
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }
  return (
    <Fragment>
      <Row className='content-header'>
        <Col md='4'>
          <h5 className='mb-0'>Patient Details</h5>
          <small className='text-muted'>Enter Details.</small>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='surname'>
              Surname *
            </Label>
            <Controller
              id='surname'
              name='surname'
              control={control}
              render={() => <Input placeholder='johndoe'
                value={surname} onChange={(e) => setSurname(e.target.value)}
                invalid={errors.surname && false} />}
            />
            {errors.surname && <FormFeedback>{errors.surname.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for={`other_names`}>
              Other names *
            </Label>
            <Controller
              control={control}
              id='other_names'
              name='other_names'
              render={() => (
                <Input type='other_names' placeholder='john' value={other_names} onChange={(e) => setOther_names(e.target.value)} invalid={errors.other_names && false} />
              )}
            />
            {errors.other_names && <FormFeedback>{errors.other_names.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for={`email`}>
              Email *
            </Label>
            <Controller
              control={control}
              id='email'
              name='email'
              render={() => (
                <Input type='email' placeholder='john.doe@email.com' value={email} onChange={(e) => setEmail(e.target.value)} invalid={errors.email && false} />
              )}
            />
            {/* {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>} */}
          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='date_of_birth'>
              Date of Birth *
            </Label>
            <Controller
              id='date_of_birth'
              name='date_of_birth'
              control={control}
              render={() => <Flatpickr className='form-control' value={date_of_birth} placeholder='select date' onChange={date => setDate_of_birth(date)} id='default-picker'
                invalid={errors.date_of_birth && false} />
              }
            />
            {errors.date_of_birth && <FormFeedback>{errors.date_of_birth.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='gender'>
              Gender
            </Label>
            <Controller
              id='gender'
              name='gender'
              control={control}
              render={() => <Select
                id={`genders`}
                theme={selectThemeColors}
                isClearable={false}
                defaultValue={gender}
                onChange={setGender}
                className='react-select'
                classNamePrefix='select'
                options={genderOptions}
                invalid={errors.gender && false}
              />
              }
            />
            {errors.gender && <FormFeedback>{errors.gender.message}</FormFeedback>}

          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='maritalStatus'>
              Marital Status *
            </Label>
            <Controller
              id='maritalStatus'
              name='maritalStatus'
              control={control}
              render={() => <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`maritalStatus`}
                className='react-select'
                classNamePrefix='select'
                defaultValue={maritalStatus}
                onChange={setMaritalStatus}
                options={maritalOptions}
                invalid={errors.maritalStatus && false}
              />
              }
            />
            {errors.maritalStatus && <FormFeedback>{errors.maritalStatus.message}</FormFeedback>}

          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='hmo'>
              HMO *
            </Label>
            <br />
            <Controller
              id='hmo'
              name='hmo'
              control={control}
              render={() => <select className='react-select'
                // value={hmo_id} onChange={(e) => setHmo_id(e.target.value) }
                style={{ width: "100%", height: '65%', outline: 'none', fontSize: "12px", border: "1px solid #ddd", color: '#ddd', borderRadius: '5px' }}
                invalid={errors.email && false}>
                {hmo.map(e => {
                  return (
                    <option key={e.id} >
                      {e.hmoType.name}
                    </option>
                  )
                })}
              </select>
              }
            />
            {errors.hmo && <FormFeedback>{errors.hmo.message}</FormFeedback>}

          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='enrollee_id'>
              Enrollee ID *
            </Label>
            <Controller
              id='enrollee_id'
              name='enrollee_id'
              control={control}
              render={() => <Input placeholder='enrollee id' value={enrollee_id} onChange={(e) => setEnrollee_id(e.target.value)} invalid={errors.enrollee_id && false} />}
            />
            {errors.enrollee_id && <FormFeedback>{errors.enrollee_id.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='occupation'>
              Occupation *
            </Label>
            <Controller
              id='occupation'
              name='occupation'
              control={control}
              render={() => <Input placeholder='occupation' value={occupation} onChange={(e) => setOccupation(e.target.value)} invalid={errors.occupation && false} />}
            />
            {errors.occupation && <FormFeedback>{errors.occupation.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='address'>
              Address *
            </Label>
            <Controller
              id='address'
              name='address'
              control={control}
              render={() => <Input placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} invalid={errors.address && false} />}
            />
            {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='phone_number'>
              Phone Number *
            </Label>
            <Controller
              id='phone_number'
              name='phone_number'
              control={control}
              render={() => <Input placeholder='phone number' value={phone_number} onChange={(e) => setPhone_number(e.target.value)} invalid={errors.phone_number && false} />}
            />
            {errors.phone_number && <FormFeedback>{errors.phone_number.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='ethnicity'>
              Ethnicity *
            </Label>
            <Controller
              id='ethnicity'
              name='ethnicity'
              control={control}
              render={() => <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`ethnicity`}
                className='react-select'
                classNamePrefix='select'
                onChange={setEthnicity}
                options={ethnicityOptions}
                defaultValue={ethnicity}
                invalid={errors.ethnicity && false}
              />
              }
            />
            {errors.ethnicity && <FormFeedback>{errors.ethnicity.message}</FormFeedback>}

          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails

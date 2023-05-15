// ** React Imports
import { Fragment, useContext } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
// import * as yup from 'yup'

// import { yupResolver } from '@hookform/resolvers/yup'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { ThemeColors } from '../../../../../utility/context/ThemeColors'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const store = useContext(ThemeColors)

  const [nok_address, setNok_address] = store.nok_address
  const [nok_email, setNok_email] = store.nok_email
  const [nok_ethnicity, setNok_ethnicity] = store.nok_ethnicity
  const [nok_gender, setNok_gender] = store.nok_gender
  const [nok_maritalStatus, setNok_maritalStatus] = store.nok_maritalStatus
  const [nok_occupation, setNok_occupation] = store.nok_occupation
  const [nok_phoneNumber, setNok_phoneNumber] = store.nok_phoneNumber
  const [nok_relationship, setNok_relationship] = store.nok_relationship
  const [nok_surname, setNok_surname] = store.nok_surname
  const [nok_other_names, setNok_other_names] = store.nok_other_names
  const [nok_date_of_birth, setNok_date_of_birth] = store.nok_date_of_birth
  const defaultValues = {
    nok_email,
    nok_surname,
    nok_other_names,
    nok_gender,
    nok_maritalStatus,
    nok_relationship,
    nok_ethnicity,
    nok_phoneNumber,
    nok_occupation,
    nok_address,
    nok_date_of_birth
    // referredBy
  }

  // const SignupSchema = yup.object().shape({
  //   nok_surname: yup.string().required(),
  //   nok_email: yup.string().email().required(),
  //   nok_other_names: yup.string().required(),
  //   nok_date_of_birth: yup.string().required(),
  //   nok_gender: yup.string().required(),
  //   nok_maritalStatus: yup.string().required(),
  //   nok_relationship: yup.string().required(),
  //   nok_occupation: yup.string().required(),
  //   nok_address: yup.string().required(),
  //   nok_phoneNumber: yup.string().required(),
  //   nok_ethnicity: yup.string().required()
  // })

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
    // if (isObjEmpty(errors)) {
    // }
    stepper.next()

  }


  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Next of King Details</h5>
        <small className='text-muted'>Enter Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_surname'>
              Surname *
            </Label>
            <Controller
              id='nok_surname'
              name='nok_surname'
              control={control}
              render={() => <Input placeholder='johndoe' value={nok_surname} onChange={(e) => setNok_surname(e.target.value)} invalid={errors.nok_surname && false} />}
            />
            {errors.nok_surname && <FormFeedback>{errors.nok_surname.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for={`nok_other_names`}>
              Other names *
            </Label>
            <Controller
              control={control}
              id='nok_other_names'
              name='nok_other_names'
              render={() => (
                <Input type='nok_other_names' placeholder='john' value={nok_other_names} onChange={(e) => setNok_other_names(e.target.value)} invalid={errors.nok_other_names && false} />
              )}
            />
            {errors.nok_other_names && <FormFeedback>{errors.nok_other_names.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for={`email`}>
              Email *
            </Label>
            <Controller
              control={control}
              id='nok_email'
              name='nok_email'
              render={() => (
                <Input type='email' placeholder='john.doe@email.com' value={nok_email} onChange={(e) => setNok_email(e.target.value)} invalid={errors.nok_email && false} />
              )}
            />
            {errors.nok_email && <FormFeedback>{errors.nok_email.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_date_of_birth'>
              Date of Birth *
            </Label>
            <Controller
              id='date_of_birth'
              name='date_of_birth'
              control={control}
              render={() => <Flatpickr className='form-control' value={nok_date_of_birth} placeholder='select date' onChange={date => setNok_date_of_birth(date)} id='default-picker'
                invalid={errors.nok_date_of_birth && false} />
              }
            />
            {errors.nok_date_of_birth && <FormFeedback>{errors.nok_date_of_birth.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_gender'>
              Gender
            </Label>
            <Controller
              id='nok_gender'
              name='nok_gender'
              control={control}
              render={() => <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`nok_genders`}
                className='react-select'
                classNamePrefix='select'
                onChange={setNok_gender}
                options={genderOptions}
                defaultValue={nok_gender}
                invalid={errors.nok_gender && false}
              />
              }
            />
            {errors.nok_gender && <FormFeedback>{errors.nok_gender.message}</FormFeedback>}

          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_maritalStatus'>
              Marital Status *
            </Label>
            <Controller
              id='nok_maritalStatus'
              name='nok_maritalStatus'
              control={control}
              render={() => <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`nok_maritalStatus`}
                className='react-select'
                classNamePrefix='select'
                onChange={setNok_maritalStatus}
                options={maritalOptions}
                defaultValue={nok_maritalStatus}
                invalid={errors.nok_maritalStatus && false}
              />
              }
            />
            {errors.nok_maritalStatus && <FormFeedback>{errors.nok_maritalStatus.message}</FormFeedback>}

          </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='nok_address'>
              Address *
            </Label>
            <Controller
              id='nok_address'
              name='nok_address'
              control={control}
              render={() => <Input placeholder='address' value={nok_address} onChange={(e) => setNok_address(e.target.value)} invalid={errors.nok_address && false} />}
            />
            {errors.nok_address && <FormFeedback>{errors.nok_address.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_relationship'>
              Relationship ID *
            </Label>
            <Controller
              id='nok_relationship'
              name='nok_relationship'
              control={control}
              render={() => <Input placeholder='relationship' value={nok_relationship} onChange={(e) => setNok_relationship(e.target.value)} invalid={errors.nok_relationship && false} />}
            />
            {errors.nok_relationship && <FormFeedback>{errors.nok_relationship.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_phoneNumber'>
              Phone Number *
            </Label>
            <Controller
              id='nok_phoneNumber'
              name='nok_phoneNumber'
              control={control}
              render={() => <Input placeholder='phone number' value={nok_phoneNumber} onChange={(e) => setNok_phoneNumber(e.target.value)} invalid={errors.nok_phoneNumber && false} />}
            />
            {errors.nok_phoneNumber && <FormFeedback>{errors.nok_phoneNumber.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_occupation'>
              Occupation *
            </Label>
            <Controller
              id='nok_occupation'
              name='nok_occupation'
              control={control}
              render={() => <Input placeholder='occupation' value={nok_occupation} onChange={(e) => setNok_occupation(e.target.value)} invalid={errors.nok_occupation && false} />}
            />
            {errors.nok_occupation && <FormFeedback>{errors.nok_occupation.message}</FormFeedback>}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='nok_ethnicity'>
              Ethnicity *
            </Label>
            <Controller
              id='nok_ethnicity'
              name='nok_ethnicity'
              control={control}
              render={() => <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`nok_ethnicity`}
                className='react-select'
                classNamePrefix='select'
                options={ethnicityOptions}
                onChange={setNok_ethnicity}
                defaultValue={nok_ethnicity}
                invalid={errors.nok_ethnicity && false}
              />
              }
            />
            {errors.nok_ethnicity && <FormFeedback>{errors.nok_ethnicity.message}</FormFeedback>}

          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
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

export default PersonalInfo

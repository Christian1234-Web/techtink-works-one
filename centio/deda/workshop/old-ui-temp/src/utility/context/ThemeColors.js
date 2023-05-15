// ** React Imports
import { useEffect, useState, createContext } from 'react'

// ** Create Context
export const ThemeColors = createContext()

const ThemeContext = ({ children }) => {
  // ** State
  const [printArr, setPrintArr] = useState([])
  const [colors, setColors] = useState({})
  const data = {
    avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg').default
  }
  const [surname, setSurname] = useState('')
  const [address, setAddress] = useState('')
  const [date_of_birth, setDate_of_birth] = useState(new Date())
  const [email, setEmail] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [gender, setGender] = useState('')
  const [occupation, setOccupation] = useState('')

  const [hmo_id, setHmo_id] = useState(2)
  const [maritalStatus, setMaritalStatus] = useState('')
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  const [nok_address, setNok_address] = useState('')
  const [nok_date_of_birth, setNok_date_of_birth] = useState('')
  const [nok_email, setNok_email] = useState('')
  const [nok_ethnicity, setNok_ethnicity] = useState('')
  const [nok_gender, setNok_gender] = useState('')
  const [nok_maritalStatus, setNok_maritalStatus] = useState('')
  const [nok_occupation, setNok_occupation] = useState('')
  const [nok_other_names, setNok_other_names] = useState('')
  const [nok_phoneNumber, setNok_phoneNumber] = useState('')
  const [nok_relationship, setNok_relationship] = useState('')
  const [nok_surname, setNok_surname] = useState('')
  const [other_names, setOther_names] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [referredBy, setReferredBy] = useState('')
  const [enrollee_id, setEnrollee_id] = useState('')
  const [staff_id, setStaff_id] = useState(null)

  const state = {
    surname: [surname, setSurname],
    address: [address, setAddress],
    date_of_birth: [date_of_birth, setDate_of_birth],
    email: [email, setEmail],
    ethnicity: [ethnicity, setEthnicity],
    gender: [gender, setGender],
    occupation: [occupation, setOccupation],
    hmo_id: [hmo_id, setHmo_id],
    maritalStatus: [maritalStatus, setMaritalStatus],
    avatar: [avatar, setAvatar],
    nok_address: [nok_address, setNok_address],
    nok_email: [nok_email, setNok_email],
    nok_ethnicity: [nok_ethnicity, setNok_ethnicity],
    nok_gender: [nok_gender, setNok_gender],
    nok_maritalStatus: [nok_maritalStatus, setNok_maritalStatus],
    nok_occupation: [nok_occupation, setNok_occupation],
    nok_other_names: [nok_other_names, setNok_other_names],
    nok_phoneNumber: [nok_phoneNumber, setNok_phoneNumber],
    nok_relationship: [nok_relationship, setNok_relationship],
    nok_date_of_birth: [nok_date_of_birth, setNok_date_of_birth],
    nok_surname: [nok_surname, setNok_surname],
    other_names: [other_names, setOther_names],
    referredBy: [referredBy, setReferredBy],
    phone_number: [phone_number, setPhone_number],
    enrollee_id: [enrollee_id, setEnrollee_id],
    staff_id: [staff_id, setStaff_id],
    printArr: [printArr, setPrintArr]
  }
  // ** fetch data
  //** ComponentDidMount
  useEffect(() => {
    if (window !== 'undefined') {
      //** Get variable value
      const getHex = color => window.getComputedStyle(document.body).getPropertyValue(color).trim()
      //** Colors obj
      const obj = {
        primary: {
          light: getHex('--bs-primary').concat('1a'),
          main: getHex('--bs-primary')
        },
        secondary: {
          light: getHex('--bs-secondary').concat('1a'),
          main: getHex('--bs-secondary')
        },
        success: {
          light: getHex('--bs-success').concat('1a'),
          main: getHex('--bs-success')
        },
        danger: {
          light: getHex('--bs-danger').concat('1a'),
          main: getHex('--bs-danger')
        },
        warning: {
          light: getHex('--bs-warning').concat('1a'),
          main: getHex('--bs-warning')
        },
        info: {
          light: getHex('--bs-info').concat('1a'),
          main: getHex('--bs-info')
        },
        dark: {
          light: getHex('--bs-dark').concat('1a'),
          main: getHex('--bs-dark')
        }
      }

      setColors({ ...obj })
    }
  }, [])

  return <ThemeColors.Provider value={colors, state}>{children}</ThemeColors.Provider>
}

export { ThemeContext }

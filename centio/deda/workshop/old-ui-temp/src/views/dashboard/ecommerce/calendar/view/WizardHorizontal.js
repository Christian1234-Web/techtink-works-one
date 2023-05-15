// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import axios from "axios"
// ** Steps
import Address from '../steps-with-validation/Address'
import SocialLinks from '../steps-with-validation/SocialLinks'
import PersonalInfo from '../steps-with-validation/PersonalInfo'
import AccountDetails from '../steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)
  const [hmo, setHmo] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/hmos/schemes').then(response => {
      setHmo(response.data.result)
      console.log(response.data.result, 'axios')
    })
  }, [])
  const steps = [
    {
      id: 'patient-details',
      title: 'Patient Registration',
      subtitle: 'Fill the Form.',
      content: <AccountDetails stepper={stepper} hmo={hmo} />
    },
    {
      id: 'patient-next-of-kin-info',
      title: 'Patient Next Of Kin',
      subtitle: 'Fill the Form',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'display-patient-details',
      title: 'View Details ',
      subtitle: 'Details Provided',
      content: <Address stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps}
        options={{
          linear: false
        }} />
    </div>
  )
}

export default WizardHorizontal

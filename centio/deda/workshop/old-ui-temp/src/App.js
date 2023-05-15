// ** Router Import
import Router from './router/Router'
import { useEffect } from 'react'
import { fetchPatient, fetchAdmitted, fetchInsurance, fetchLab } from './@fake-db/apps/fetchItems'
const App = () => {
  
  // useEffect(async () => {
  //   await fetchPatient()
  //   await fetchAdmitted()
  //   await fetchInsurance()
  //   await fetchLab()
  // }, [])
  return <>
    <Router />
  </>
}

export default App

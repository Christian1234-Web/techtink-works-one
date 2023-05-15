import { patientAPI } from "../services/constant"
const pageLimit = 30
export const STATICURL = 'http://localhost:3002'
const patientArr = []
const admittedArr = []
const insuranceArr = []
const labQueueRequestArr = []


export const fetchPatient = () => {
    const url = `${STATICURL}/${patientAPI}/list?limit=${pageLimit}`
    fetch(url)
        .then(res => res.json())
        .then(res => {
            patientArr.push(res.result)
        })
    // console.log(patientArr, 'patientArr')
}
export const patientData = patientArr

export const fetchAdmitted = () => {
    const url = `${STATICURL}/patient/admissions?limit=${pageLimit}`
    fetch(url)
        .then(res => res.json())
        .then(res => {
            admittedArr.push(res.result)
        })
    // console.log(admittedArr, 'admittedArr')
}
export const admittedData = admittedArr

export const fetchInsurance = () => {
    const url = `${STATICURL}/hmos/transactions`
    fetch(url)
        .then(res => res.json())
        .then(res => {
            insuranceArr.push(res.result)
        })
    // console.log(insuranceArr, 'insuranceArr')
}
export const insuranceData = insuranceArr

export const fetchLab = () => {
    const url = `${STATICURL}/requests/list/labs?limit=${pageLimit}`
    fetch(url)
        .then(res => res.json())
        .then(res => {
            labQueueRequestArr.push(res.result)
            // console.log(res.result)
        })
    // console.log(labQueueRequestArr, 'labQueueRequestArr')
}
export const labQueRequestData = labQueueRequestArr
import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'
import { insuranceData } from './fetchItems'

// fetchData()

const data = {
  insurance: insuranceData
}

// ------------------------------------------------
// GET: Return insurance List
// ------------------------------------------------
mock.onGet('/apps/insurance/insurance').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = config
  /* eslint-enable */
// console.log(data.insurance, 'insuranceinvoice')
  const dataAsc = data.insurance[0].sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    } else {
      const splitColumn = sortColumn.split('.')
      const columnA = a[splitColumn[0]][splitColumn[1]]
      const columnB = b[splitColumn[0]][splitColumn[1]]
      return columnA < columnB ? -1 : 1
    }
  })
  // console.log(dataAsc, 'dataAsc')

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const queryLowered = q.toLowerCase()
  const filteredData = dataToFilter.filter(insurance => {
    const oneName = insurance.patient.surname
    const twoName = insurance.patient.other_names
    const hmoName = insurance.service.hmo.name
    const hmoPhone = insurance.service.hmo.phoneNumber
    const allName = `${oneName} ${twoName}`
    const newDate = `${new Date(insurance.createdAt).toDateString()}`
    // const sorted = insurance.patient.hmo.hmoType.name
    if (String('paid').includes(queryLowered)) {
      return console.log('work')
    } else {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (
          String(insurance.id).toLowerCase().includes(queryLowered) ||
          String(insurance.bill_source).toLowerCase().includes(queryLowered) || 
          String(insurance.amount).toLowerCase().includes(queryLowered) || 
          String(insurance.status).toLowerCase().includes(queryLowered) || 
          allName.toLowerCase().includes(queryLowered) ||
          hmoName.toLowerCase().includes(queryLowered) ||
          hmoPhone.toLowerCase().includes(queryLowered) ||
          String(newDate).toLowerCase().includes(queryLowered) 
        )
      )
    }
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.insurance[0],
      total: filteredData.length,
      insurance: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single insurance
// ------------------------------------------------
mock.onGet(/\/api\/insurance\/insurance\/\d+/).reply(config => {
  //   // // Get event id from URL
  const insuranceId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const insuranceIndex = data.insurance[0].findIndex(e => e.id === insuranceId)
  const responseData = {
    insurance: data.insurance[0][insuranceIndex],
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    }
  }
  return [200, responseData]
})

// // ------------------------------------------------
// // DELETE: Deletes insurance
// // ------------------------------------------------
mock.onDelete('/apps/insurance/delete').reply(config => {
  //   // Get insurance id from URL
  let insuranceId = config.id

  //   // Convert Id to number
  insuranceId = Number(insuranceId)

  const insuranceIndex = data.insurance[0].findIndex(t => t.id === insuranceId)
  data.insurance[0].splice(insuranceIndex, 1)

  return [200]
})

// // ------------------------------------------------
// // GET: Return Clients
// // ------------------------------------------------
mock.onGet('/api/insurance/clients').reply(() => {
  const insurance = data.insurance[0].map(insurance => insurance)
  return [200, insurance.slice(0, 5)]
})
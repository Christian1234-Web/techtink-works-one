import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'
import { admittedData } from './fetchItems'

// fetchData()

const data = {
  admitted: admittedData
}

// ------------------------------------------------
// GET: Return admitted List
// ------------------------------------------------
mock.onGet('/apps/admitted/admitted').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = config
  /* eslint-enable */
// console.log(data.admitted, 'admittedinvoice')
  const dataAsc = data.admitted[0].sort((a, b) => {
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
  const filteredData = dataToFilter.filter(admitted => {
    const oneName = admitted.patient.surname
    const twoName = admitted.patient.other_names
    const admittedByF = admitted.admitted_by.first_name
    const admittedByS = admitted.admitted_by.last_name
    const admittedByA = `${admittedByF} ${admittedByS}`
    const allName = `${oneName} ${twoName}`
    const newDate = `${new Date(admitted.createdAt).toDateString()}`
    // const sorted = admitted.patient.hmo.hmoType.name
 
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (
          String(admitted.id).toLowerCase().includes(queryLowered) ||
          String(admitted.reason).toLowerCase().includes(queryLowered) || 
          allName.toLowerCase().includes(queryLowered) ||
          admittedByA.toLowerCase().includes(queryLowered) ||
          String(newDate).toLowerCase().includes(queryLowered) 
          // String(admitted.room.name).toLowerCase().includes(queryLowered) ||
          // String(admitted.room.floor).toLowerCase().includes(queryLowered) 
          // String(sorted).toLowerCase().includes(queryLowered)
        )
      )
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.admitted[0],
      total: filteredData.length,
      admitted: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single admitted
// ------------------------------------------------
mock.onGet(/\/api\/admitted\/admitted\/\d+/).reply(config => {
  //   // // Get event id from URL
  const admittedId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const admittedIndex = data.admitted[0].findIndex(e => e.id === admittedId)
  const responseData = {
    admitted: data.admitted[0][admittedIndex],
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
// // DELETE: Deletes admitted
// // ------------------------------------------------
mock.onDelete('/apps/admitted/delete').reply(config => {
  //   // Get admitted id from URL
  let admittedId = config.id

  //   // Convert Id to number
  admittedId = Number(admittedId)

  const admittedIndex = data.admitted[0].findIndex(t => t.id === admittedId)
  data.admitted[0].splice(admittedIndex, 1)

  return [200]
})

// // ------------------------------------------------
// // GET: Return Clients
// // ------------------------------------------------
mock.onGet('/api/admitted/clients').reply(() => {
  const admitted = data.admitted[0].map(admitted => admitted)
  return [200, admitted.slice(0, 5)]
})
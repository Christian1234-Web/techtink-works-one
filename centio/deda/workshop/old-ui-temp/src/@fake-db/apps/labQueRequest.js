import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'
import { labQueRequestData } from './fetchItems'

// fetchData()

const data = {
  labQueRequest: labQueRequestData
}

// ------------------------------------------------
// GET: Return labQueRequest List
// ------------------------------------------------
mock.onGet('/lab/queue/request').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = config
  /* eslint-enable */
  // console.log(data.labQueRequest, 'labQueRequest')
  const dataAsc = data.labQueRequest[0].sort((a, b) => {
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
  const filteredData = dataToFilter.filter(labQueRequest => {
    const oneName = labQueRequest.patient.surname
    const twoName = labQueRequest.patient.other_names
    const allName = `${oneName} ${twoName}`
    /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
    return (
      (
        String(labQueRequest.id).toLowerCase().includes(queryLowered) ||
        String(labQueRequest.group_code).toLowerCase().includes(queryLowered) ||
        allName.toLowerCase().includes(queryLowered) ||
        String(labQueRequest.item.labTest.name).toLowerCase().includes(queryLowered) ||
        String(labQueRequest.createdBy).toLowerCase().includes(queryLowered)
      )
    )
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.labQueRequest[0],
      total: filteredData.length,
      labQueRequest: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

mock.onGet('/lab/queue/queue').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = config
  /* eslint-enable */
  // console.log(data.labQueRequest, 'labQueRequest')
  const dataAsc = data.labQueRequest[0].sort((a, b) => {
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
  const filteredData = dataToFilter.filter(labQueRequest => {
    /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
    return (
      (
        String(labQueRequest.id).toLowerCase().includes(queryLowered) ||
        String(labQueRequest.createdBy).toLowerCase().includes(queryLowered)

      )
    )
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.labQueRequest[0],
      total: filteredData.length,
      labQueue: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single labQueRequest
// ------------------------------------------------
mock.onGet(/\/api\/queue\/request\/\d+/).reply(config => {
  //   // // Get event id from URL
  const labQueRequestId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const labQueRequestIndex = data.labQueRequest[0].findIndex(e => e.id === labQueRequestId)
  const responseData = {
    labQueRequest: data.labQueRequest[0][labQueRequestIndex],
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
// // DELETE: Deletes labQueRequest
// // ------------------------------------------------
mock.onDelete('/lab/queue/request/delete').reply(config => {
  //   // Get labQueRequest id from URL
  let labQueRequestId = config.id

  //   // Convert Id to number
  labQueRequestId = Number(labQueRequestId)

  const labQueRequestIndex = data.labQueRequest[0].findIndex(t => t.id === labQueRequestId)
  data.labQueRequest[0].splice(labQueRequestIndex, 1)

  return [200]
})

// // ------------------------------------------------
// // GET: Return Clients
// // ------------------------------------------------
mock.onGet('/api/lab/clients').reply(() => {
  const labQueRequest = data.labQueRequest[0].map(labQueRequest => labQueRequest)
  return [200, labQueRequest.slice(0, 5)]
})
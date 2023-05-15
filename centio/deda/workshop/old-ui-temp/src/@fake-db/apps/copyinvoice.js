import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'
import { patientData } from './fetchItems'

// fetchData()

const data = {
  invoices: patientData
}

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = config
  /* eslint-enable */
  // console.log(data.invoices)
  const dataAsc = data.invoices[0].sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    } else {
      const splitColumn = sortColumn.split('.')
      const columnA = a[splitColumn[0]][splitColumn[1]]
      const columnB = b[splitColumn[0]][splitColumn[1]]
      return columnA < columnB ? -1 : 1
    }
  })
  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const queryLowered = q.toLowerCase()
  const filteredData = dataToFilter.filter(invoice => {
    const oneName = invoice.surname
    const twoName = invoice.other_names
    const allName = `${oneName} ${''} ${twoName}`
    const newDate = `${new Date(invoice.updated_at).toDateString()}`
    const newTime = `${new Date(invoice.updated_at).toLocaleTimeString()}`
    const sorted = invoice.hmo.hmoType.name
    // console.log(sorted, 'sorting')
    if (String('paid').includes(queryLowered) && invoice.balance === 0) {
      return invoice.balance === 0
    } else {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (
          String(invoice.id).toLowerCase().includes(queryLowered) ||
          String(invoice.balance).toLowerCase().includes(queryLowered) ||
          String(invoice.email).toLowerCase().includes(queryLowered) ||
          String(invoice.phone_number).toLowerCase().includes(queryLowered) ||
          allName.toLowerCase().includes(queryLowered) ||
          String(newDate).toLowerCase().includes(queryLowered) ||
          String(newTime).toLowerCase().includes(queryLowered) ||
          String(sorted).toLowerCase().includes(queryLowered)
        ))
    }
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.invoices[0],
      total: filteredData.length,
      invoices: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet(/\/api\/invoice\/invoices\/\d+/).reply(config => {
  //   // // Get event id from URL
  const invoiceId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const invoiceIndex = data.invoices[0].findIndex(e => e.id === invoiceId)
  const responseData = {
    invoice: data.invoices[0][invoiceIndex],
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
// // DELETE: Deletes Invoice
// // ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  //   // Get invoice id from URL
  let invoiceId = config.id

  //   // Convert Id to number
  invoiceId = Number(invoiceId)

  const invoiceIndex = data.invoices[0].findIndex(t => t.id === invoiceId)
  data.invoices[0].splice(invoiceIndex, 1)

  return [200]
})

// // ------------------------------------------------
// // GET: Return Clients
// // ------------------------------------------------
mock.onGet('/api/invoice/clients').reply(() => {
  const invoices = data.invoices[0].map(invoice => invoice)
  return [200, invoices.slice(0, 5)]
})
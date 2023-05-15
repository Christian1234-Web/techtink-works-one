// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { paginateArray } from '../../../../@fake-db/utils'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('labQueueRequest/getData', async params => {
  const response = await axios.get('http://localhost:3002/requests/list/labs?limit=5', params)
  const { q = '', perPage = 10, page = 1, sort, sortColumn } = params
  const dataAsc = response.data.result.sort((a, b) => {
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
  return [200,
    {
      params,
      data: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page),
      allData: response.data.result,
      totalPages: filteredData.length,
    }]

})
export const getQueData = createAsyncThunk('labQueueQueue/getQueData', async params => {
  const response = await axios.get('/lab/queue/queue', params)
  return {
    params,
    data: response.data.labQueue,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const deleteLab = createAsyncThunk('labQueueRequest/deleteLab', async (id, { dispatch, getState }) => {
  await axios.delete('/lab/queue/request/delete', { id })
  await dispatch(getData(getState().queueRequest.params))
  return id
})

export const labQueueRequestSlice = createSlice({
  name: 'labQueueRequest',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
  }
})

export default labQueueRequestSlice.reducer

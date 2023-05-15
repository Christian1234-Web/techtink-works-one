// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appInsurance/getData', async params => {
  const response = await axios.get('/apps/insurance/insurance', params)
  return {
    params,
    data: response.data.insurance,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const deleteInsurance = createAsyncThunk('appInsurance/deleteInsurance', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/insurance/delete', { id })
  await dispatch(getData(getState().insurance.params))
  return id
})

export const appInsuranceSlice = createSlice({
  name: 'appInsurance',
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

export default appInsuranceSlice.reducer

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appAdmitted/getData', async params => {
  const response = await axios.get('/apps/admitted/admitted', params)
  return {
    params,
    data: response.data.admitted,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const deleteAdmitted = createAsyncThunk('appAdmitted/deleteAdmitted', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/admitted/delete', { id })
  await dispatch(getData(getState().admitted.params))
  return id
})

export const appAdmittedSlice = createSlice({
  name: 'appAdmitted',
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

export default appAdmittedSlice.reducer

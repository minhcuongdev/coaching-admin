import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'api/axiosClient'
import { Admin } from 'models'

export const fetchAccountInfo = createAsyncThunk<
  Admin,
  void,
  {
    rejectValue: {
      message: string
    }
  }
>('auth/fetchAccountInfo', async (_, thunkApi) => {
  try {
    const res = await axiosClient.get('/users/profile')
    return res.data as Admin
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'fetching account info failed',
    })
  }
})

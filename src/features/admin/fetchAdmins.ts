import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'api/axiosClient'
import { Admin } from 'models/common'

type FetchAdminsErrors = {
  message: string
}

export const fetchAdmins = createAsyncThunk<
  Admin[],
  void,
  {
    rejectValue: FetchAdminsErrors
  }
>('admin/fetchAdmins', async (_: void, thunkApi) => {
  try {
    const res = await axiosClient.get('/admin/?limit=1000')
    return res.data.data as Admin[]
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch admins',
    })
  }
})

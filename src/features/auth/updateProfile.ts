import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'api/axiosClient'
import { Admin } from 'models'

export interface UpdateProfilePayload {
  name: string
  birthday: string
  phone: string
}

export const updateProfile = createAsyncThunk<
  Admin,
  UpdateProfilePayload,
  {
    rejectValue: {
      message: string
    }
  }
>('auth/updateProfile', async (data, thunkApi) => {
  try {
    const res = await axiosClient.patch('/users/profile', data)
    return res.data as Admin
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'fetching account info failed',
    })
  }
})

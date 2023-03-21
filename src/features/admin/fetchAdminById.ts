import { createAsyncThunk } from '@reduxjs/toolkit'
import { Admin } from 'models'
import { adminApi } from 'api'

export const fetchAdminById = createAsyncThunk<
  Admin,
  number,
  {
    rejectValue: {
      message: string
    }
  }
>('admin/fetchAdminById', async (id, thunkAPI) => {
  try {
    const response = await adminApi.fetchAdminById(id)
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue({ message: 'Fetch admin failed' })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminFormData, Admin } from 'models'
import { adminApi } from 'api/index'

interface CreateAdminErrors {
  message: string
}
export const createAdmin = createAsyncThunk<
  Admin,
  AdminFormData,
  {
    rejectValue: CreateAdminErrors
  }
>('admin/createAdmin', async (formData, thunkApi) => {
  try {
    const res = await adminApi.createAdmin(formData)
    const { data } = res
    return data as Admin
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to create admin',
    })
  }
})

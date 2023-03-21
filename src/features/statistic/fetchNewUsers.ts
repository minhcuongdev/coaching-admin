import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from 'api'

export const fetchNewUsers = createAsyncThunk<
  any,
  void,
  {
    rejectValue: { message: string }
  }
>('statistic/fetchNewUsers', async (_, thunkApi) => {
  try {
    const res = await adminApi.getNumberOfNewUsers()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch new users',
    })
  }
})

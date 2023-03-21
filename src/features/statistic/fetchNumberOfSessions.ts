import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from 'api'

export const fetchNumberOfSessions = createAsyncThunk<
  any,
  void,
  {
    rejectValue: { message: string }
  }
>('statistic/fetchNumberOfSessions', async (_, thunkApi) => {
  try {
    const res = await adminApi.getNumberOfSessions()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch number of sessions',
    })
  }
})

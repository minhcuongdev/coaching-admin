import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from 'api'

export const fetchNumberOfDoneSessions = createAsyncThunk<
  any,
  void,
  {
    rejectValue: { message: string }
  }
>('statistic/fetchNumberOfDoneSessions', async (_, thunkApi) => {
  try {
    const res = await adminApi.getNumberOfDoneSessions()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch statistic ',
    })
  }
})

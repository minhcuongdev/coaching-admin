import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from 'api'

export const fetchProfit = createAsyncThunk<
  any,
  void,
  {
    rejectValue: { message: string }
  }
>('statistic/fetchProfit', async (_, thunkApi) => {
  try {
    const res = await adminApi.getProfit()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch profit ',
    })
  }
})

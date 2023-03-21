import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from 'api'

export const fetchStatistic = createAsyncThunk<
  any,
  void,
  {
    rejectValue: { message: string }
  }
>('statistic/fetchStatistic', async (_, thunkApi) => {
  try {
    const res = await adminApi.getStatistic()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch statistic ',
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { transactionApi } from 'api/transaction-api'
import { Transaction } from 'models'

export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  void,
  {
    rejectValue: {
      message: string
    }
  }
>('transaction/fetchAllTransactions', async (_, thunkApi) => {
  try {
    const res = await transactionApi.getTransactions()
    return res.data.data as Transaction[]
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: err.message,
    })
  }
})

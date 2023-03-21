import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderTransaction } from 'models'
import { orderApi } from 'api/order-api'

export const fetchOrders = createAsyncThunk<
  OrderTransaction[],
  void,
  {
    rejectValue: { message: string }
  }
>('order/fetchOrders', async (_: void, thunkApi) => {
  try {
    const res = await orderApi.getAllOrders()
    return res.data.data as OrderTransaction[]
  } catch (err) {
    return thunkApi.rejectWithValue({ message: 'Failed to fetch orders' })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderApi } from 'api'
import { OrderTransaction } from 'models'

export const processOrder = createAsyncThunk<
  OrderTransaction,
  { orderId: string; isWithdraw: boolean },
  {
    rejectValue: { message: string }
  }
>('order/processOrder', async (orderPayload, thunkApi) => {
  try {
    const res = await orderApi.processOrder(
      orderPayload.orderId,
      orderPayload.isWithdraw
    )
    return res.data as OrderTransaction
  } catch (err) {
    return thunkApi.rejectWithValue({ message: "Can't process order" })
  }
})

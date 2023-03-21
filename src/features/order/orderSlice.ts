import { createSlice } from '@reduxjs/toolkit'
import { OrderTransaction } from 'models/index'
import { fetchOrders } from 'features/order/fetchOrders'
import { processOrder } from 'features/order/processOrder'

interface OrderState {
  orders: OrderTransaction[]
}

const initialState = {
  orders: [],
} as OrderState

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })

    builder.addCase(processOrder.fulfilled, (state, action) => {
      const index = state.orders.findIndex((order) => {
        return order.id === action.payload.id
      })

      state.orders[index] = action.payload
    })
  },
})

export const selectOrders = (state: any) => state.orders
export default orderSlice.reducer

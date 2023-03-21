import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from 'models/transaction'
import { fetchAllTransactions } from './fetchAllTransactions'

export interface TransactionsState {
  transactions: Transaction[]
}

const initialState = {
  transactions: [],
} as TransactionsState

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload
    })
  },
})

export const selectTransactions = (state: any) => state.transactions

export default transactionSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { GiftCode } from 'models'
import { createGiftCode } from './createGiftCode'
import { fetchAllGiftCode } from './fetchAllGiftCode'

export interface GiftCodeState {
  giftCodes: GiftCode[]
  status: 'idle' | 'pending' | 'error' | 'success'
}

const initialValue = {
  giftCodes: [],
  status: 'idle',
} as GiftCodeState

const giftCodeSlice = createSlice({
  name: 'giftCode',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGiftCode.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(createGiftCode.fulfilled, (state, action) => {
      state.giftCodes.push(action.payload)
      state.status = 'success'
    })

    builder.addCase(fetchAllGiftCode.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchAllGiftCode.fulfilled, (state, action) => {
      state.giftCodes = action.payload
      state.status = 'success'
    })
  },
})

export const selectGiftCodes = (state: RootState) => state.giftCodes
export default giftCodeSlice.reducer

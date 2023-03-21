import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1
    },
    decrease: (state) => {
      state.value -= 1
    },
  },
})

export const { increase, decrease } = counterSlice.actions
export const selectCount = (state: RootState) => state.count.value
export default counterSlice.reducer

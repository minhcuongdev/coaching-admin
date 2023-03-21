import { createSlice } from '@reduxjs/toolkit'
import { fetchStatistic } from 'features/statistic/fetchStatistic'
import { fetchProfit } from './fetchProfit'
import { fetchNumberOfSessions } from './fetchNumberOfSessions'
import { fetchNewUsers } from './fetchNewUsers'
import { fetchNumberOfDoneSessions } from './fetchNumberOfDoneSessions'

interface StatisticState {
  statistic: any
  profit: any
  sessions: any
  newUsers: any
  doneSessions: any
}

const initialState = {
  statistic: undefined,
  profit: undefined,
  sessions: undefined,
  newUsers: undefined,
} as StatisticState

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatistic.fulfilled, (state, action) => {
      state.statistic = action.payload
    })

    builder.addCase(fetchProfit.fulfilled, (state, action) => {
      state.profit = action.payload
    })

    builder.addCase(fetchNumberOfSessions.fulfilled, (state, action) => {
      state.sessions = action.payload
    })

    builder.addCase(fetchNewUsers.fulfilled, (state, action) => {
      state.newUsers = action.payload
    })

    builder.addCase(fetchNumberOfDoneSessions.fulfilled, (state, action) => {
      state.doneSessions = action.payload
    })
  },
})

export const selectStatistic = (state: any) => state.statistic
export default statisticSlice.reducer

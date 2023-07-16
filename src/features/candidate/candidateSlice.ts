import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Mentor } from 'models'
import { fetchCandidates } from './fetchCandidates'
import { acceptCandidate } from './acceptCandidate'
import { object } from 'yup'
import { rejectCandidate } from './rejectCandidate'

export interface CandidateSlice {
  candidates: Mentor[]
  status: 'idle' | 'pending' | 'success' | 'error'
}

const initialState = {
  candidates: [],
  status: 'idle',
} as CandidateSlice

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCandidates.pending, (state, action) => {
      state.status = 'pending'
    })
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.candidates = action.payload
      state.status = 'success'
    })

    builder.addCase(acceptCandidate.fulfilled, (state, action) => {
      const index = state.candidates.findIndex(
        (candidate) => candidate.id === action.payload.id
      )
      state.candidates.splice(index, 1)
    })

    builder.addCase(rejectCandidate.fulfilled, (state, action) => {
      state.candidates = state.candidates.filter(
        (candidate) => candidate.id !== action.payload
      )
    })
  },
})

export const selectCandidates = (state: RootState) => state.candidates

export default candidateSlice.reducer

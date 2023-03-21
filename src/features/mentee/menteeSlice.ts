import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Mentee } from 'models'
import { fetchAllMentees } from './fetchAllMentees'
import { fetchMenteeById } from './fetchMenteeById'
import { unlockMentee } from './unlockMentee'
import { lockMentee } from './lockMentee'
interface MenteeState {
  mentees: Mentee[]
  status: 'idle' | 'pending' | 'error' | 'success'
}

const initialState = {
  mentees: [],
  status: 'idle',
} as MenteeState

export const menteeSlice = createSlice({
  name: 'mentee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMentees.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchAllMentees.fulfilled, (state, action) => {
      state.mentees = action.payload
      state.status = 'success'
    })

    builder.addCase(fetchMenteeById.fulfilled, (state, action) => {
      const index = state.mentees.findIndex(
        (mentee) => mentee.id === action.payload.id
      )
      if (index !== -1) {
        state.mentees[index] = action.payload
      } else {
        state.mentees = [...state.mentees, action.payload]
      }
    })

    builder.addCase(lockMentee.fulfilled, (state, action) => {
      const index = state.mentees.findIndex(
        (mentee) => mentee.id === action.payload.id
      )
      if (index !== -1) {
        state.mentees[index] = action.payload
      } else {
        state.mentees = [...state.mentees, action.payload]
      }
    })

    builder.addCase(unlockMentee.fulfilled, (state, action) => {
      const index = state.mentees.findIndex(
        (mentee) => mentee.id === action.payload.id
      )
      if (index !== -1) {
        state.mentees[index] = action.payload
      } else {
        state.mentees = [...state.mentees, action.payload]
      }
    })
  },
})

export const selecteMentees = (state: RootState) => state.mentees
export default menteeSlice.reducer

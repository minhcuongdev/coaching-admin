import { createSlice } from '@reduxjs/toolkit'
import { Mentor } from 'models'
import { fetchMentors } from 'features/mentor/fetchMentors'
import { fetchMentorById } from 'features/mentor/fetchMentorById'
import { lockMentor } from './lockMentor'
import { unlockMentor } from './unlockMentor'
interface MentorState {
  mentors: Mentor[]
}

const initialState = {
  mentors: [],
} as MentorState

export const mentorSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMentors.fulfilled, (state, action) => {
      state.mentors = action.payload
    })

    builder.addCase(fetchMentorById.fulfilled, (state, action) => {
      const index = state.mentors.findIndex(
        (mentor) => mentor.id === action.payload.id
      )
      if (index === -1) {
        state.mentors.push(action.payload)
      } else {
        state.mentors[index] = action.payload
      }
    })

    builder.addCase(lockMentor.fulfilled, (state, action) => {
      const index = state.mentors.findIndex(
        (mentor) => mentor.id === action.payload.id
      )
      if (index === -1) {
        state.mentors.push(action.payload)
      } else {
        state.mentors[index] = action.payload
      }
    })

    builder.addCase(unlockMentor.fulfilled, (state, action) => {
      const index = state.mentors.findIndex(
        (mentor) => mentor.id === action.payload.id
      )
      if (index === -1) {
        state.mentors.push(action.payload)
      } else {
        state.mentors[index] = action.payload
      }
    })
  },
})

export const selectMentors = (state: any) => state.mentors

export default mentorSlice.reducer

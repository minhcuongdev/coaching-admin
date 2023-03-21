import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Skill } from 'models/index'
import { fetchSkills } from './fetchSkills'
import { createSkill } from './createSkill'
import { editSkill } from './editSkill'
import { fetchSkill } from './fetchSkill'
import { deleteSkill } from './deleteSkill'

interface SkillState {
  skills: Skill[]
  status: 'idle' | 'pending' | 'success' | 'error'
  error?: string
}

const initialState = {
  skills: [],
  status: 'idle',
  error: '',
} as SkillState

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkills.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchSkills.fulfilled, (state, action) => {
      state.skills = action.payload
      state.status = 'success'
    })

    builder.addCase(fetchSkills.rejected, (state, action) => {
      state.error = action.payload?.message as string
    })

    builder.addCase(fetchSkill.fulfilled, (state, action) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id
      )
      if (index !== -1) {
        state.skills[index] = action.payload
      } else {
        state.skills.push(action.payload)
      }
      state.status = 'success'
    })

    builder.addCase(createSkill.fulfilled, (state, action) => {
      state.skills.push(action.payload)
      state.status = 'success'
    })

    builder.addCase(editSkill.fulfilled, (state, action) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id
      )
      state.skills[index] = action.payload
      state.status = 'success'
    })

    builder.addCase(deleteSkill.fulfilled, (state, action) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload.id
      )
    })
  },
})

export const selectSkills = (state: RootState) => state.skills
export default skillSlice.reducer

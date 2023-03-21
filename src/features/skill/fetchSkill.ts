import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill } from 'models'
import { skillApi } from 'api/index'

interface FetchSkillErrors {
  message: string
}

export const fetchSkill = createAsyncThunk<
  Skill,
  number,
  {
    rejectValue: FetchSkillErrors
  }
>('skill/fetchSkill', async (id: number, thunkApi) => {
  try {
    const res = await skillApi.fetchSkill(id)
    return res.data as Skill
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: 'Failed to edit skill',
    })
  }
})

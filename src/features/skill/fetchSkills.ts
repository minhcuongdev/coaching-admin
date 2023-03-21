import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill } from 'models'
import { skillApi } from 'api/index'

interface fetchSkillErrors {
  message: string
}

export const fetchSkills = createAsyncThunk<
  Skill[],
  void,
  {
    rejectValue: fetchSkillErrors
  }
>('skill/fetchSkills', async (_: void, thunkApi) => {
  try {
    const res = await skillApi.getAllSkills()
    return res.data as Skill[]
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch skills',
    })
  }
})

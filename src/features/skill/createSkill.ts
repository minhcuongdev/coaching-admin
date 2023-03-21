import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill } from 'models'
import { skillApi } from 'api/index'
import { CreateSkillFormData } from 'models'

interface CreateSkillErrors {
  message: string
}

export const createSkill = createAsyncThunk<
  Skill,
  CreateSkillFormData,
  {
    rejectValue: CreateSkillErrors
  }
>('skill/createSkill', async (formData, thunkApi) => {
  try {
    const res = await skillApi.createSkill(formData)
    return res.data as Skill
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: 'Failed to create skill',
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { skillApi } from 'api/index'
import { Skill } from 'models'

interface EditSkillErrors {
  message: string
}

export const deleteSkill = createAsyncThunk<
  Skill,
  number,
  {
    rejectValue: EditSkillErrors
  }
>('skill/deleteSkill', async (skillId: number, thunkApi) => {
  try {
    const res = await skillApi.deleteSkill(skillId)
    return res.data as Skill
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to delete skill',
    })
  }
})

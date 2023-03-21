import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill } from 'models'
import { skillApi } from 'api/index'
import { CreateSkillFormData } from 'models'

interface EditSkillErrors {
  message: string
}

interface EditSkillParams {
  id: number
  data: CreateSkillFormData
}

export const editSkill = createAsyncThunk<
  Skill,
  EditSkillParams,
  {
    rejectValue: EditSkillErrors
  }
>('skill/editSkill', async (args, thunkApi) => {
  try {
    const res = await skillApi.updateSkill(args.id, args.data)
    return res.data as Skill
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: 'Failed to edit skill',
    })
  }
})

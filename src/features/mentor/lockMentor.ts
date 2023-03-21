import { createAsyncThunk } from '@reduxjs/toolkit'
import { mentorApi } from 'api'
import { Mentor } from 'models'

export const lockMentor = createAsyncThunk<
  Mentor,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentor/lockMentor', async (mentorId: string, thunkApi) => {
  try {
    const res = await mentorApi.lockMentor(mentorId)
    return res.data as Mentor
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Can't lock mentor",
    })
  }
})

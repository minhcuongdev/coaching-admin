import { createAsyncThunk } from '@reduxjs/toolkit'
import { mentorApi } from 'api'
import { Mentor } from 'models'

export const unlockMentor = createAsyncThunk<
  Mentor,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentor/unlockMentor', async (mentorId: string, thunkApi) => {
  try {
    const res = await mentorApi.unlockMentor(mentorId)
    return res.data as Mentor
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Can't unlock mentor",
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenteeApi } from 'api'
import { Mentee } from 'models'

export const lockMentee = createAsyncThunk<
  Mentee,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentee/lockMentee', async (menteeId: string, thunkApi) => {
  try {
    const res = await MenteeApi.lockMentee(menteeId)
    return res.data as Mentee
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Can't lock mentee",
    })
  }
})

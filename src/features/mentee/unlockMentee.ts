import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenteeApi } from 'api'
import { Mentee } from 'models'

export const unlockMentee = createAsyncThunk<
  Mentee,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentee/unlockMentee', async (menteeId: string, thunkApi) => {
  try {
    const res = await MenteeApi.unlockMentee(menteeId)
    return res.data as Mentee
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Can't unlock mentee",
    })
  }
})

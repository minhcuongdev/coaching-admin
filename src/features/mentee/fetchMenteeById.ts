import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenteeApi } from 'api'
import { Mentee } from 'models'

export const fetchMenteeById = createAsyncThunk<
  Mentee,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentee/fetchMenteeById', async (menteeId: string, thunkApi) => {
  try {
    const res = await MenteeApi.getMenteeById(menteeId)
    return res.data as Mentee
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Can't fetch mentee",
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Mentee } from 'models'
import { MenteeApi } from 'api'

export const fetchAllMentees = createAsyncThunk<
  Mentee[],
  void,
  {
    rejectValue: {
      message: string
    }
  }
>('mentee/fetchAllMentees', async (_, { rejectWithValue }) => {
  try {
    const res = await MenteeApi.getAllMentees()
    return res.data.data as Mentee[]
  } catch (error) {
    return rejectWithValue({
      message: "Couldn't fetch mentees",
    })
  }
})

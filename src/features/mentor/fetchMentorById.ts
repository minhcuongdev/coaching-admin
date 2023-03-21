import { createAsyncThunk } from '@reduxjs/toolkit'
import { Mentor } from 'models'
import { mentorApi } from 'api'

export const fetchMentorById = createAsyncThunk<
  Mentor,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('mentor/fetchMentorById', async (id: string, thunkApi) => {
  try {
    const res = await mentorApi.getMentorById(id)
    return res.data as Mentor
  } catch (err) {
    return thunkApi.rejectWithValue({ message: 'Failed to fetch mentor' })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Mentor } from 'models'
import { mentorApi } from 'api'

export const fetchMentors = createAsyncThunk<
  Mentor[],
  void,
  {
    rejectValue: {
      message: string
    }
  }
>('mentor/fetchMentors', async (_: void, thunkApi) => {
  try {
    const res = await mentorApi.getAllMentors()
    return res.data as Mentor[]
  } catch (err: any) {
    return thunkApi.rejectWithValue({ message: 'Failed to fetch mentors' })
  }
})

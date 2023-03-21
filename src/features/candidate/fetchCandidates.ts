import { createAsyncThunk } from '@reduxjs/toolkit'
import { Mentor } from 'models'
import { mentorApi } from 'api'

export const fetchCandidates = createAsyncThunk<
  Mentor[],
  void,
  {
    rejectValue: {
      message: string
    }
  }
>('candidate/fetchCandidates', async (_, { rejectWithValue }) => {
  try {
    const res = await mentorApi.getMentorCandidates()
    return res.data as Mentor[]
  } catch (error) {
    return rejectWithValue({
      message: 'featchCandidates failed',
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { mentorApi } from 'api'
import { Mentor } from 'models'

export const acceptCandidate = createAsyncThunk<
  Mentor,
  string,
  {
    rejectValue: {
      message: string
    }
  }
>('candidate/acceptCandidate', async (id, thunkApi) => {
  try {
    const res = await mentorApi.acceptCandidate(id)
    return res.data as Mentor
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Couldn't accept candidate",
    })
  }
})

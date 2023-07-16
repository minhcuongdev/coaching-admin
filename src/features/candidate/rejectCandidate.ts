import { createAsyncThunk } from '@reduxjs/toolkit'
import { mentorApi } from 'api'

interface PayloadProps {
  id: string
  reasons: string[]
}

export const rejectCandidate = createAsyncThunk<
  string,
  PayloadProps,
  {
    rejectValue: {
      message: string
    }
  }
>('candidate/rejectCandidate', async (payload, thunkApi) => {
  try {
    const res = await mentorApi.rejectCandidate(payload.id, payload.reasons)
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Couldn't accept candidate",
    })
  }
})

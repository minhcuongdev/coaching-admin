import { createAsyncThunk } from '@reduxjs/toolkit'
import { GiftCode } from 'models'

export const fetchGiftCodeById = createAsyncThunk<
  GiftCode,
  number,
  {
    rejectValue: { message: string }
  }
>('giftcode/fetchGiftCodeById', async (id, { rejectWithValue }) => {
  const response = await fetch(`/api/giftcode/${id}`)
  if (!response.ok) {
    return rejectWithValue({ message: response.statusText })
  }
  const giftCode = await response.json()
  return giftCode
})

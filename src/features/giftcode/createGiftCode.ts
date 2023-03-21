import { createAsyncThunk } from '@reduxjs/toolkit'
import { GiftCode } from 'models'
import { giftCodeApi } from 'api/giftcode-api'

export const createGiftCode = createAsyncThunk<
  GiftCode,
  GiftCode,
  {
    rejectValue: {
      message: string
    }
  }
>('giftCode/create', async (giftCode, { rejectWithValue }) => {
  try {
    const res = await giftCodeApi.createGiftCode(giftCode)
    return res.data as GiftCode
  } catch (error) {
    return rejectWithValue({
      message: "Can't create gift code",
    })
  }
})

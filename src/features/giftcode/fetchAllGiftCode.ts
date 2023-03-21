import { createAsyncThunk } from '@reduxjs/toolkit'
import { giftCodeApi } from 'api/giftcode-api'
import { GiftCode } from 'models'

export const fetchAllGiftCode = createAsyncThunk<
  GiftCode[],
  void,
  {
    rejectValue: { message: string }
  }
>('giftCode/fetchAllGiftCode', async (_, thunkApi) => {
  try {
    const res = await giftCodeApi.getAllGiftCode()
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch gift code',
    })
  }
})

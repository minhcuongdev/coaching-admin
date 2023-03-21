import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'models'
import { categoryApi } from 'api/index'

interface FetchCategoryErrors {
  message: string
}

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  {
    rejectValue: FetchCategoryErrors
  }
>('category/fetchCategories', async (_: void, thunkApi) => {
  try {
    const res = await categoryApi.getCategories()
    return res.data as Category[]
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch categories',
    })
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'models'
import { categoryApi } from 'api'

export const fetchCategoryById = createAsyncThunk<
  Category,
  number,
  {
    rejectValue: {
      message: string
    }
  }
>('category/fetchCategoryById', async (categoryId: number, thunkApi) => {
  try {
    const res = await categoryApi.getCategoryById(categoryId)
    return res.data as Category
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch category',
    })
  }
})

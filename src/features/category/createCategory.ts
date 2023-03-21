import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'models'
import { categoryApi } from 'api'
import { CreateCategoryFormData } from 'models'

export const createCategory = createAsyncThunk<
  Category,
  CreateCategoryFormData,
  {
    rejectValue: {
      message: string
    }
  }
>('category/createCategory', async (formData, thunkApi) => {
  try {
    const res = await categoryApi.createCategory(formData)
    return res.data as Category
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Tạo danh mục thất bại',
    })
  }
})

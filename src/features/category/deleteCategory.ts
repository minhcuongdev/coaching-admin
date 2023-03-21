import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'models'
import { categoryApi } from 'api'

export const deleteCategory = createAsyncThunk<
  Category,
  number,
  { rejectValue: { message: string } }
>('category/deleteCategory', async (categoryId: number, thunkApi) => {
  try {
    const res = await categoryApi.deleteCategory(categoryId)
    return res.data as Category
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Xóa danh mục thất bại',
    })
  }
})

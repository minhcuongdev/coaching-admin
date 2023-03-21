import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'models'
import { categoryApi } from 'api'
import { CreateCategoryFormData } from 'models'

interface UpdateCategoryParams {
  categoryId: number
  formData: CreateCategoryFormData
}

export const updateCategory = createAsyncThunk<
  Category,
  UpdateCategoryParams,
  {
    rejectValue: {
      message: string
    }
  }
>('category/updateCategory', async (args, thunkApi) => {
  try {
    const res = await categoryApi.updateCategory(args.categoryId, args.formData)
    return res.data as Category
  } catch (err) {
    return thunkApi.rejectWithValue({
      message: 'Cập nhật danh mục thất bại',
    })
  }
})

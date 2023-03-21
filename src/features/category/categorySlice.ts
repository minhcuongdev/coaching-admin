import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { fetchCategories } from './fetchCategories'
import { createCategory } from './createCategory'
import { deleteCategory } from './deleteCategory'
import { fetchCategoryById } from './fetchCategoryById'
import { updateCategory } from './updateCategory'
import { Category } from 'models'

export interface CategoryState {
  categories: Category[]
}

const initialState = {
  categories: [],
} as CategoryState

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })

    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload
        }
        return category
      })
    })

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload]
    })

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload
        }
        return category
      })
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id
      )
    })
  },
})

export default categorySlice.reducer
export const selectCategories = (state: RootState) => state.categories

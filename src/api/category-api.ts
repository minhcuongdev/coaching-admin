import { CreateCategoryFormData } from 'models'
import axiosClient from './axiosClient'

export const categoryApi = {
  getCategories: () => {
    return axiosClient.get('/category')
  },
  getCategoryById: (id: number) => {
    return axiosClient.get(`/category/${id}`)
  },
  createCategory: (formData: CreateCategoryFormData) => {
    return axiosClient.post('/category', formData)
  },
  updateCategory: (id: number, formData: CreateCategoryFormData) => {
    return axiosClient.patch(`/category/${id}`, formData)
  },
  deleteCategory: (id: number) => {
    return axiosClient.delete(`/category/${id}`)
  },
}

import axiosClient from './axiosClient'
import { AdminFormData } from 'models'

export const adminApi = {
  createAdmin: async (formData: AdminFormData) => {
    return axiosClient.post('/admin', formData)
  },
  fetchAdminById: async (id: number) => {
    return axiosClient.get(`/admin/${id}`)
  },
  updateAdmin: async (id: number, formData: AdminFormData) => {
    return axiosClient.patch(`/admin/${id}`, formData)
  },
  getStatistic: async () => {
    return axiosClient.get('/statistic/admin/common')
  },
  getProfit: async () => {
    return axiosClient.get('/statistic/admin/profit?months=7')
  },
  getNumberOfSessions: async () => {
    return axiosClient.get('/statistic/admin/session-total')
  },
  getNumberOfNewUsers: async () => {
    return axiosClient.get('/statistic/admin/new-user?months=7')
  },
  getNumberOfDoneSessions: async () => {
    return axiosClient.get('/statistic/admin/session-done?months=7')
  },
}

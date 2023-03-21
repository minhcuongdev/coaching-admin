import axiosClient from './axiosClient'

export const transactionApi = {
  getTransactions: async () => {
    return axiosClient.get('/transaction?limit=10000&orderByDirection=desc')
  },
}

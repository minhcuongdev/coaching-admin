import axiosClient from './axiosClient'

export const MenteeApi = {
  getAllMentees: () => {
    return axiosClient.get('mentee?limit=10000')
  },
  getMenteeById: (menteeId: string) => {
    return axiosClient.get(`mentee/${menteeId}`)
  },
  topUpMentee: (userId: string, amount: number) => {
    return axiosClient.post('transaction/topup', {
      userId,
      amount,
    })
  },
  lockMentee: (menteeId: string) => {
    return axiosClient.patch(`users/${menteeId}/lock`)
  },
  unlockMentee: (menteeId: string) => {
    return axiosClient.patch(`users/${menteeId}/unlock`)
  },
}

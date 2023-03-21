import axiosClient from './axiosClient'
import { GiftCode } from 'models'

export const giftCodeApi = {
  getAllGiftCode: () => {
    return axiosClient.get('/transaction/card')
  },
  createGiftCode: (giftCode: GiftCode) => {
    return axiosClient.post('/transaction/card', giftCode)
  },
}

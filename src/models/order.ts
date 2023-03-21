import { Mentee } from './mentee'

export interface OrderTransaction {
  id: number
  orderId: string
  name: string
  email: string
  userId: number
  user: Mentee
  orderType: 'TopUp' | 'Withdraw'
  paymentMethod:
    | 'Paypal'
    | 'ZaloPay'
    | 'Momo'
    | 'WireTransfer'
    | 'ZaloPay'
    | 'ViettelPay'
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'HOLD'
  note: string
  token: number
  total: number
  createAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: number
  userId: number
  user: any
  amount: number
  type: 'TOPUP' | 'WITHDRAW' | 'APPLY' | 'RECIEVE' | 'TRANSFER'
  message: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'HOLD'
  relatedId?: string
  createAt: Date
}

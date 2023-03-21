export interface GiftCode {
  id: string
  code: string
  type: string
  validFrom: Date
  validTo: Date
  valid: boolean
  usageLeft: number
  coin: number
  createAt: Date
}

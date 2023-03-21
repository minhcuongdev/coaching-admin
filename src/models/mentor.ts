export interface Mentor {
  id: string
  email: string
  name: string
  birthday: Date
  phone: number
  avatar: string
  isActive: boolean
  createAt?: Date
  coin?: number
  User_mentor: any
}

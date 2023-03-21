export interface Admin {
  id: string
  name: string
  email: string
  birthday: Date
  phone: string
  avatar: string
  createAt: Date
}

export interface AdminFormData {
  name: string
  email: string
  birthday: Date
  phone: string
  avatar: string
  password: string
}

export interface CreateSkillFormData {
  descrtipion: string
}

export interface CreateCategoryFormData {
  name: string
}

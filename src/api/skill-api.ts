import { CreateSkillFormData } from 'models'
import axiosClient from './axiosClient'

export const skillApi = {
  getAllSkills: async () => {
    return axiosClient.get('/skill')
  },
  fetchSkill: async (id: number) => {
    return axiosClient.get(`/skill/${id}`)
  },
  createSkill: async (formData: CreateSkillFormData) => {
    return axiosClient.post('/skill', formData)
  },
  updateSkill: async (id: number, FormData: CreateSkillFormData) => {
    return axiosClient.patch(`/skill/${id}`, FormData)
  },
  deleteSkill: async (id: number) => {
    return axiosClient.delete('/skill/' + id)
  },
}

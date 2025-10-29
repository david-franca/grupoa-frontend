import type { AuthReponse, Login, Register } from '@/types/Auth'
import api from './api'

export const login = async (payload: Login) => {
  const response = await api.post<AuthReponse>('/login', payload)
  return response.data
}

export const register = async (payload: Register) => {
  const response = await api.post<AuthReponse>('/register', payload)
  return response.data
}

export const logout = async () => {
  const response = await api.post('/logout')
  return response.data
}

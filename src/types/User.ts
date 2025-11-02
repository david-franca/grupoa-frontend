export interface User {
  id: number
  name: string
  email: string
  password: string
  isActive: boolean
  created_at: string
  updated_at: string
}

export interface UpdateUser {
  name?: string
  email?: string
  password?: string
}

export interface UpdateUserProps {
  id: number
  payload: UpdateUser
}

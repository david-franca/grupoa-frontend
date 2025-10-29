import api from './api'
import type { CreateStudent, Student, UpdateStudent } from '@/types/Student'

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students')
  return response.data
}

export const getStudentById = async (ra: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${ra}`)
  return response.data
}

export const createStudent = async (payload: CreateStudent): Promise<Student> => {
  const response = await api.post<Student>('/students', payload)
  return response.data
}

export const updateStudent = async (ra: string, payload: UpdateStudent): Promise<Student> => {
  const response = await api.put<Student>(`/students/${ra}`, payload)
  return response.data
}

export const deleteStudent = async (ra: string): Promise<void> => {
  const response = await api.delete<void>(`/students/${ra}`)
  return response.data
}

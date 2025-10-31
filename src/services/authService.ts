import type { AuthReponse, Login, Register } from '@/types/Auth'
import api from './api'

class AuthService {
  private readonly TOKEN_KEY = 'authToken'

  setAuthHeader(token: string | null): void {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }

  async login(credentials: Login): Promise<AuthReponse> {
    try {
      // Ajuste o endpoint '/auth/login' se for diferente no seu NestJS
      const { data } = await api.post<AuthReponse>('/auth/login', credentials)

      // Se a resposta tiver o accessToken, armazene-o
      if (data.access_token) {
        localStorage.setItem(this.TOKEN_KEY, data.access_token)

        // **IMPORTANTE**: Após salvar o token, precisamos configurar
        // o Axios para usá-lo em TODAS as requisições futuras.
        this.setAuthHeader(data.access_token)
      }

      return data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      // Limpa qualquer token antigo se o login falhar
      this.logout()
      throw error
    }
  }

  async register(payload: Register): Promise<AuthReponse> {
    try {
      const { data } = await api.post<AuthReponse>('/register', payload)
      return data
    } catch (error) {
      console.error('Erro ao fazer registro:', error)
      throw error
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    // Remove o header de autorização das requisições futuras
    delete api.defaults.headers.common['Authorization']
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null
  }

  setupAuthOnAppInit(): void {
    const token = this.getToken()
    if (token) {
      this.setAuthHeader(token)
    }
  }
}

export default new AuthService()

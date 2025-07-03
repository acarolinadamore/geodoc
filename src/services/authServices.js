import { authAPI } from '@/api/auth'

class AuthService {
  constructor() {
    this.user = null
    this.token = null
    this.refreshToken = null
    this.isAuthenticated = false
    this.loadFromStorage()
  }

  // Carrega dados do localStorage
  loadFromStorage() {
    const token = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const user = localStorage.getItem('user')

    if (token && refreshToken && user) {
      this.token = token
      this.refreshToken = refreshToken
      this.user = JSON.parse(user)
      this.isAuthenticated = true
      this.setAuthHeader()
    }
  }

  // Salva dados no localStorage
  saveToStorage() {
    if (this.token && this.refreshToken && this.user) {
      localStorage.setItem('authToken', this.token)
      localStorage.setItem('refreshToken', this.refreshToken)
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }

  // Remove dados do localStorage
  clearStorage() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  // Define header de autorização
  setAuthHeader() {
    if (this.token) {
      // Isso seria definido na instância do axios em api/index.js
      // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  // Login
  async login(credentials) {
    try {
      const response = await authAPI.login(credentials)
      const { token, refreshToken, user } = response.data

      this.token = token
      this.refreshToken = refreshToken
      this.user = user
      this.isAuthenticated = true

      this.setAuthHeader()
      this.saveToStorage()

      return { success: true, user, token }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login',
      }
    }
  }

  // Logout
  async logout() {
    try {
      await authAPI.logout()
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error)
    } finally {
      this.token = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false
      this.clearStorage()
    }
  }

  // Refresh token
  async refreshTokens() {
    try {
      if (!this.refreshToken) {
        throw new Error('Refresh token não encontrado')
      }

      const response = await authAPI.refreshToken(this.refreshToken)
      const { token, refreshToken } = response.data

      this.token = token
      this.refreshToken = refreshToken
      this.setAuthHeader()
      this.saveToStorage()

      return { success: true, token }
    } catch (error) {
      this.logout()
      return {
        success: false,
        error: 'Sessão expirada. Faça login novamente.',
      }
    }
  }

  // Verificar se o token é válido
  async verifyToken() {
    try {
      const response = await authAPI.verifyToken()
      return response.data.valid
    } catch (error) {
      return false
    }
  }

  // Recuperar senha
  async forgotPassword(email) {
    try {
      await authAPI.forgotPassword(email)
      return {
        success: true,
        message: 'Email de recuperação enviado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao enviar email de recuperação',
      }
    }
  }

  // Resetar senha
  async resetPassword(token, newPassword) {
    try {
      await authAPI.resetPassword(token, newPassword)
      return {
        success: true,
        message: 'Senha alterada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao alterar senha',
      }
    }
  }

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      await authAPI.changePassword(currentPassword, newPassword)
      return {
        success: true,
        message: 'Senha alterada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao alterar senha',
      }
    }
  }

  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await authAPI.getProfile()
      this.user = response.data
      this.saveToStorage()
      return { success: true, user: this.user }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter perfil',
      }
    }
  }

  // Atualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await authAPI.updateProfile(profileData)
      this.user = response.data
      this.saveToStorage()
      return {
        success: true,
        user: this.user,
        message: 'Perfil atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar perfil',
      }
    }
  }

  // Getters
  getUser() {
    return this.user
  }

  getToken() {
    return this.token
  }

  getIsAuthenticated() {
    return this.isAuthenticated
  }

  // Verificar permissão
  hasPermission(permission) {
    return this.user?.permissions?.includes(permission) || false
  }

  // Verificar role
  hasRole(role) {
    return this.user?.roles?.includes(role) || false
  }

  // Verificar se é admin
  isAdmin() {
    return this.hasRole('admin') || this.hasRole('administrator')
  }
}

// Instância singleton
const authService = new AuthService()

export default authService

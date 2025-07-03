import api from './index'

export const authAPI = {
  // Login do usuário
  login: credentials => {
    return api.post('/auth/login', credentials)
  },

  // Logout do usuário
  logout: () => {
    return api.post('/auth/logout')
  },

  // Refresh token
  refreshToken: refreshToken => {
    return api.post('/auth/refresh', { refreshToken })
  },

  // Verificar se o token é válido
  verifyToken: () => {
    return api.get('/auth/verify')
  },

  // Recuperar senha
  forgotPassword: email => {
    return api.post('/auth/forgot-password', { email })
  },

  // Resetar senha
  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword })
  },

  // Alterar senha
  changePassword: (currentPassword, newPassword) => {
    return api.post('/auth/change-password', { currentPassword, newPassword })
  },

  // Obter perfil do usuário logado
  getProfile: () => {
    return api.get('/auth/profile')
  },

  // Atualizar perfil do usuário
  updateProfile: profileData => {
    return api.put('/auth/profile', profileData)
  },
}

export default authAPI

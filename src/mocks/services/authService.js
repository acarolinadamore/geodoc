// src/services/authService.js

import { getUsuario } from '@/mocks/services/usuarios.js'

class AuthService {
  constructor() {
    // ✅ USUÁRIO SIMULADO LOGADO (pode ser alterado facilmente)
    this.currentUserId = 'user001' // Maria Silva Santos
    this.currentUserData = null
  }

  // ✅ SIMULAR LOGIN COM DIFERENTES USUÁRIOS
  async simulateLogin(userId = 'user001') {
    try {
      console.log('🔐 Simulando login do usuário:', userId)

      const userData = await getUsuario(userId)

      if (!userData) {
        throw new Error(`Usuário ${userId} não encontrado`)
      }

      this.currentUserId = userId
      this.currentUserData = {
        ...userData,
        // ✅ ADICIONAR FOTO BASEADA NO ID
        avatar: this.getAvatarForUser(userId),
      }

      console.log('✅ Login simulado com sucesso:', this.currentUserData.nome)
      return this.currentUserData
    } catch (error) {
      console.error('❌ Erro no login simulado:', error)
      throw error
    }
  }

  // ✅ OBTER USUÁRIO ATUAL
  async getCurrentUser() {
    if (!this.currentUserData) {
      // Se não tem dados em cache, buscar
      await this.simulateLogin(this.currentUserId)
    }
    return this.currentUserData
  }

  // ✅ VERIFICAR SE ESTÁ LOGADO
  isAuthenticated() {
    return !!this.currentUserData
  }

  // ✅ LOGOUT
  logout() {
    console.log('🚪 Logout realizado')
    this.currentUserId = null
    this.currentUserData = null
  }

  // ✅ TROCAR USUÁRIO (para testes)
  async switchUser(userId) {
    console.log('🔄 Trocando para usuário:', userId)
    await this.simulateLogin(userId)
    return this.currentUserData
  }

  // ✅ FOTOS FICTÍCIAS BASEADAS NO ID
  getAvatarForUser(userId) {
    const avatars = {
      user001:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format', // Maria Silva Santos
      user002:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format', // João Pedro Oliveira
      user003:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format', // Ana Carolina Ferreira
      user004:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format', // Carlos Eduardo Lima
      user005:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format', // Fernanda Costa Alves
      user006:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format', // Roberto Lima Costa
      user007:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face&auto=format', // João Silva
      user008:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format', // Patricia Mendes
    }

    return (
      avatars[userId] ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&auto=format'
    )
  }
}

// ✅ INSTÂNCIA SINGLETON
export default new AuthService()

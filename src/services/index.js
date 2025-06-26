// src/services/index.js

// ========================================
// CONFIGURAÇÃO: Mude aqui para alternar entre mock e real
// ========================================
const USE_MOCK = true

// ========================================
// IMPORTAÇÕES DOS SERVIÇOS
// ========================================
import mockCaixaEntrada from '@/mocks/services/caixaEntradaService.js'
import mockUsers from '@/mocks/services/usuarios.js'
import * as mockNotifications from '@/mocks/notifications'

// ========================================
// SERVIÇOS EXPORTADOS
// ========================================
export const caixaEntradaService = USE_MOCK ? mockCaixaEntrada : null
export const userService = USE_MOCK ? mockUsers : null
export const notificationService = USE_MOCK ? mockNotifications : null

// ========================================
// EXPORT DEFAULT PARA COMPATIBILIDADE
// ========================================
export default {
  caixaEntrada: caixaEntradaService,
  users: userService,
  notifications: notificationService,
}

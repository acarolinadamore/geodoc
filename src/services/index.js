// ========================================
// CONFIGURAÇÃO: Mude aqui para alternar entre mock e real
// ========================================
const USE_MOCK = true // ← true = dados falsos | false = dados reais

// Importa funções dos MOCKS (dados falsos) - CORRIGIDO!
import * as mockCards from '@/mocks/cards' // ← SEM /data/
import * as mockNotifications from '@/mocks/notifications' // ← SEM /data/
import * as mockUsers from '@/mocks/users' // ← SEM /data/

// Importa funções da API (dados reais)
import * as apiCards from '@/api/cards'
import * as apiNotifications from '@/api/notifications'
import * as apiUsers from '@/api/users'

// ========================================
// SERVIÇOS: Aqui decide qual usar
// ========================================

export const cardService = USE_MOCK ? mockCards : apiCards
export const notificationService = USE_MOCK
  ? mockNotifications
  : apiNotifications
export const userService = USE_MOCK ? mockUsers : apiUsers

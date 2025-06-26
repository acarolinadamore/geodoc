// src/mocks/services/index.js

// ========================================
// CENTRALIZADOR DOS SERVIÇOS MOCK
// ========================================

// ✅ SERVIÇOS EXISTENTES (que funcionam)
export { default as usuariosService } from './usuarios.js'

// ✅ NOVOS SERVIÇOS ORGANIZADOS (que criamos)
export { default as caixaEntradaService } from './caixaEntradaService.js'

// ========================================
// EXPORT DEFAULT PARA COMPATIBILIDADE
// ========================================

export default {
  // Serviços atuais que funcionam
  usuarios: () => import('./usuarios.js'),

  // Novos serviços que criamos
  caixaEntrada: () => import('./caixaEntradaService.js'),
}

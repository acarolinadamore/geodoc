// src/mocks/transformers/index.js

// ========================================
// CENTRALIZADOR DE TRANSFORMERS
// ========================================

export { default as caixaEntradaTransformer } from './caixaEntradaTransformer.js'

export default {
  caixaEntrada: () => import('./caixaEntradaTransformer.js'),
}

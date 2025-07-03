// src/data/index.js

// ========================================
// CENTRALIZADOR DE DADOS
// ========================================

export { documentos, documentoAndamentos } from './documentos.js'
export { modelosDocumento, fluxosVersao, fluxoVersaoEtapas } from './modelos.js'

export default {
  documentos: () => import('./documentos.js'),
  modelos: () => import('./modelos.js'),
}

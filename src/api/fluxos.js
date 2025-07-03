import api from './index'

export const fluxosAPI = {
  // Listar todos os fluxos
  getAll: (params = {}) => {
    return api.get('/fluxos', { params })
  },

  // Buscar fluxo por ID
  getById: id => {
    return api.get(`/fluxos/${id}`)
  },

  // Criar novo fluxo
  create: fluxoData => {
    return api.post('/fluxos', fluxoData)
  },

  // Atualizar fluxo
  update: (id, fluxoData) => {
    return api.put(`/fluxos/${id}`, fluxoData)
  },

  // Deletar fluxo
  delete: id => {
    return api.delete(`/fluxos/${id}`)
  },

  // Buscar fluxos por nome
  search: query => {
    return api.get('/fluxos/search', { params: { q: query } })
  },

  // Duplicar fluxo
  duplicate: id => {
    return api.post(`/fluxos/${id}/duplicar`)
  },

  // Ativar/desativar fluxo
  toggleStatus: id => {
    return api.patch(`/fluxos/${id}/toggle-status`)
  },

  // Obter etapas do fluxo
  getSteps: id => {
    return api.get(`/fluxos/${id}/etapas`)
  },

  // Atualizar etapas do fluxo
  updateSteps: (id, etapas) => {
    return api.put(`/fluxos/${id}/etapas`, { etapas })
  },

  // Adicionar etapa ao fluxo
  addStep: (id, etapaData) => {
    return api.post(`/fluxos/${id}/etapas`, etapaData)
  },

  // Atualizar etapa específica
  updateStep: (id, etapaId, etapaData) => {
    return api.put(`/fluxos/${id}/etapas/${etapaId}`, etapaData)
  },

  // Remover etapa do fluxo
  removeStep: (id, etapaId) => {
    return api.delete(`/fluxos/${id}/etapas/${etapaId}`)
  },

  // Reordenar etapas do fluxo
  reorderSteps: (id, etapasOrder) => {
    return api.put(`/fluxos/${id}/etapas/ordem`, { etapas: etapasOrder })
  },

  // Obter responsáveis do fluxo
  getResponsibles: id => {
    return api.get(`/fluxos/${id}/responsaveis`)
  },

  // Atualizar responsáveis do fluxo
  updateResponsibles: (id, responsaveis) => {
    return api.put(`/fluxos/${id}/responsaveis`, { responsaveis })
  },

  // Obter documentos em execução do fluxo
  getRunningDocuments: (id, params = {}) => {
    return api.get(`/fluxos/${id}/documentos/executando`, { params })
  },

  // Obter histórico de execuções do fluxo
  getExecutionHistory: (id, params = {}) => {
    return api.get(`/fluxos/${id}/historico`, { params })
  },

  // Validar fluxo
  validate: fluxoData => {
    return api.post('/fluxos/validar', fluxoData)
  },

  // Iniciar execução do fluxo para um documento
  startExecution: (id, documentoId) => {
    return api.post(`/fluxos/${id}/iniciar`, { documentoId })
  },

  // Pausar execução do fluxo
  pauseExecution: (id, documentoId) => {
    return api.post(`/fluxos/${id}/pausar`, { documentoId })
  },

  // Retomar execução do fluxo
  resumeExecution: (id, documentoId) => {
    return api.post(`/fluxos/${id}/retomar`, { documentoId })
  },

  // Cancelar execução do fluxo
  cancelExecution: (id, documentoId, motivo) => {
    return api.post(`/fluxos/${id}/cancelar`, { documentoId, motivo })
  },
}

export default fluxosAPI

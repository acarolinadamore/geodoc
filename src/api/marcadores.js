import api from './index'

export const marcadoresAPI = {
  // Listar todos os marcadores
  getAll: (params = {}) => {
    return api.get('/marcadores', { params })
  },

  // Buscar marcador por ID
  getById: id => {
    return api.get(`/marcadores/${id}`)
  },

  // Criar novo marcador
  create: marcadorData => {
    return api.post('/marcadores', marcadorData)
  },

  // Atualizar marcador
  update: (id, marcadorData) => {
    return api.put(`/marcadores/${id}`, marcadorData)
  },

  // Deletar marcador
  delete: id => {
    return api.delete(`/marcadores/${id}`)
  },

  // Buscar marcadores por nome
  search: query => {
    return api.get('/marcadores/search', { params: { q: query } })
  },

  // Listar marcadores por categoria
  getByCategory: categoria => {
    return api.get(`/marcadores/categoria/${categoria}`)
  },

  // Listar marcadores do usuário
  getByUser: userId => {
    return api.get(`/marcadores/usuario/${userId}`)
  },

  // Aplicar marcador a um documento
  applyToDocument: (marcadorId, documentoId) => {
    return api.post(`/marcadores/${marcadorId}/aplicar`, { documentoId })
  },

  // Remover marcador de um documento
  removeFromDocument: (marcadorId, documentoId) => {
    return api.delete(`/marcadores/${marcadorId}/remover`, {
      data: { documentoId },
    })
  },

  // Listar documentos com determinado marcador
  getDocuments: (marcadorId, params = {}) => {
    return api.get(`/marcadores/${marcadorId}/documentos`, { params })
  },

  // Atualizar ordem dos marcadores
  updateOrder: marcadoresOrder => {
    return api.put('/marcadores/ordem', { marcadores: marcadoresOrder })
  },
}

export default marcadoresAPI

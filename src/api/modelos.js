import api from './index'

export const modelosAPI = {
  // Listar todos os modelos
  getAll: (params = {}) => {
    return api.get('/modelos', { params })
  },

  // Buscar modelo por ID
  getById: id => {
    return api.get(`/modelos/${id}`)
  },

  // Criar novo modelo
  create: modeloData => {
    return api.post('/modelos', modeloData)
  },

  // Atualizar modelo
  update: (id, modeloData) => {
    return api.put(`/modelos/${id}`, modeloData)
  },

  // Deletar modelo
  delete: id => {
    return api.delete(`/modelos/${id}`)
  },

  // Buscar modelos por nome
  search: query => {
    return api.get('/modelos/search', { params: { q: query } })
  },

  // Listar modelos por categoria
  getByCategory: categoria => {
    return api.get(`/modelos/categoria/${categoria}`)
  },

  // Duplicar modelo
  duplicate: id => {
    return api.post(`/modelos/${id}/duplicar`)
  },

  // Ativar/desativar modelo
  toggleStatus: id => {
    return api.patch(`/modelos/${id}/toggle-status`)
  },

  // Obter campos do modelo
  getFields: id => {
    return api.get(`/modelos/${id}/campos`)
  },

  // Atualizar campos do modelo
  updateFields: (id, campos) => {
    return api.put(`/modelos/${id}/campos`, { campos })
  },

  // Obter template do modelo
  getTemplate: id => {
    return api.get(`/modelos/${id}/template`)
  },

  // Atualizar template do modelo
  updateTemplate: (id, template) => {
    return api.put(`/modelos/${id}/template`, { template })
  },

  // Obter versões do modelo
  getVersions: id => {
    return api.get(`/modelos/${id}/versoes`)
  },

  // Criar nova versão do modelo
  createVersion: (id, versionData) => {
    return api.post(`/modelos/${id}/versoes`, versionData)
  },

  // Restaurar versão específica
  restoreVersion: (id, versionId) => {
    return api.post(`/modelos/${id}/versoes/${versionId}/restaurar`)
  },

  // Listar documentos criados a partir do modelo
  getDocuments: (id, params = {}) => {
    return api.get(`/modelos/${id}/documentos`, { params })
  },

  // Validar modelo
  validate: modeloData => {
    return api.post('/modelos/validar', modeloData)
  },
}

export default modelosAPI

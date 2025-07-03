import api from './index'

export const usuariosAPI = {
  // Listar todos os usuários
  getAll: (params = {}) => {
    return api.get('/usuarios', { params })
  },

  // Buscar usuário por ID
  getById: id => {
    return api.get(`/usuarios/${id}`)
  },

  // Criar novo usuário
  create: usuarioData => {
    return api.post('/usuarios', usuarioData)
  },

  // Atualizar usuário
  update: (id, usuarioData) => {
    return api.put(`/usuarios/${id}`, usuarioData)
  },

  // Deletar usuário
  delete: id => {
    return api.delete(`/usuarios/${id}`)
  },

  // Buscar usuários por nome ou email
  search: query => {
    return api.get('/usuarios/search', { params: { q: query } })
  },

  // Listar usuários por departamento
  getByDepartment: departamento => {
    return api.get(`/usuarios/departamento/${departamento}`)
  },

  // Listar usuários por cargo
  getByRole: cargo => {
    return api.get(`/usuarios/cargo/${cargo}`)
  },

  // Listar usuários ativos
  getActive: (params = {}) => {
    return api.get('/usuarios/ativos', { params })
  },

  // Listar usuários inativos
  getInactive: (params = {}) => {
    return api.get('/usuarios/inativos', { params })
  },

  // Ativar usuário
  activate: id => {
    return api.patch(`/usuarios/${id}/ativar`)
  },

  // Desativar usuário
  deactivate: id => {
    return api.patch(`/usuarios/${id}/desativar`)
  },

  // Resetar senha do usuário
  resetPassword: id => {
    return api.post(`/usuarios/${id}/reset-senha`)
  },

  // Alterar senha do usuário
  changePassword: (id, senhaData) => {
    return api.put(`/usuarios/${id}/senha`, senhaData)
  },

  // Obter perfil do usuário
  getProfile: id => {
    return api.get(`/usuarios/${id}/perfil`)
  },

  // Atualizar perfil do usuário
  updateProfile: (id, profileData) => {
    return api.put(`/usuarios/${id}/perfil`, profileData)
  },

  // Upload de avatar
  uploadAvatar: (id, avatarFile) => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)
    return api.post(`/usuarios/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // Remover avatar
  removeAvatar: id => {
    return api.delete(`/usuarios/${id}/avatar`)
  },

  // Obter permissões do usuário
  getPermissions: id => {
    return api.get(`/usuarios/${id}/permissoes`)
  },

  // Atualizar permissões do usuário
  updatePermissions: (id, permissoes) => {
    return api.put(`/usuarios/${id}/permissoes`, { permissoes })
  },

  // Obter grupos do usuário
  getGroups: id => {
    return api.get(`/usuarios/${id}/grupos`)
  },

  // Adicionar usuário a um grupo
  addToGroup: (id, grupoId) => {
    return api.post(`/usuarios/${id}/grupos/${grupoId}`)
  },

  // Remover usuário de um grupo
  removeFromGroup: (id, grupoId) => {
    return api.delete(`/usuarios/${id}/grupos/${grupoId}`)
  },

  // Obter documentos do usuário
  getDocuments: (id, params = {}) => {
    return api.get(`/usuarios/${id}/documentos`, { params })
  },

  // Obter tarefas pendentes do usuário
  getPendingTasks: (id, params = {}) => {
    return api.get(`/usuarios/${id}/tarefas/pendentes`, { params })
  },

  // Obter histórico de atividades do usuário
  getActivityHistory: (id, params = {}) => {
    return api.get(`/usuarios/${id}/atividades`, { params })
  },

  // Obter estatísticas do usuário
  getStatistics: (id, params = {}) => {
    return api.get(`/usuarios/${id}/estatisticas`, { params })
  },

  // Validar dados do usuário
  validate: usuarioData => {
    return api.post('/usuarios/validar', usuarioData)
  },

  // Verificar se email já existe
  checkEmail: email => {
    return api.get('/usuarios/verificar-email', { params: { email } })
  },

  // Verificar se username já existe
  checkUsername: username => {
    return api.get('/usuarios/verificar-username', { params: { username } })
  },
}

export default usuariosAPI

import { usuariosAPI } from '@/api/usuarios'

class UsuarioService {
  constructor() {
    this.usuarios = []
    this.loading = false
    this.error = null
    this.currentUser = null
    this.departamentos = []
    this.cargos = []
  }

  // Listar todos os usuários
  async getUsuarios(params = {}) {
    this.loading = true
    this.error = null

    try {
      const response = await usuariosAPI.getAll(params)
      this.usuarios = response.data

      return {
        success: true,
        data: this.usuarios,
      }
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao buscar usuários'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar usuário por ID
  async getUsuarioById(id) {
    try {
      const response = await usuariosAPI.getById(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar usuário',
      }
    }
  }

  // Criar novo usuário
  async createUsuario(usuarioData) {
    try {
      const validation = this.validateUsuario(usuarioData)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await usuariosAPI.create(usuarioData)

      // Adicionar à lista local
      this.usuarios.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Usuário criado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar usuário',
      }
    }
  }

  // Atualizar usuário
  async updateUsuario(id, usuarioData) {
    try {
      const validation = this.validateUsuario(usuarioData, true)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await usuariosAPI.update(id, usuarioData)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Usuário atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar usuário',
      }
    }
  }

  // Deletar usuário
  async deleteUsuario(id) {
    try {
      await usuariosAPI.delete(id)

      // Remover da lista local
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)

      return {
        success: true,
        message: 'Usuário excluído com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir usuário',
      }
    }
  }

  // Buscar usuários
  async searchUsuarios(query) {
    try {
      const response = await usuariosAPI.search(query)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar usuários',
      }
    }
  }

  // Listar usuários por departamento
  async getUsuariosByDepartment(departamento) {
    try {
      const response = await usuariosAPI.getByDepartment(departamento)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar usuários por departamento',
      }
    }
  }

  // Listar usuários por cargo
  async getUsuariosByRole(cargo) {
    try {
      const response = await usuariosAPI.getByRole(cargo)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar usuários por cargo',
      }
    }
  }

  // Listar usuários ativos
  async getActiveUsuarios(params = {}) {
    try {
      const response = await usuariosAPI.getActive(params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar usuários ativos',
      }
    }
  }

  // Listar usuários inativos
  async getInactiveUsuarios(params = {}) {
    try {
      const response = await usuariosAPI.getInactive(params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar usuários inativos',
      }
    }
  }

  // Ativar usuário
  async activateUsuario(id) {
    try {
      const response = await usuariosAPI.activate(id)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index].ativo = true
      }

      return {
        success: true,
        data: response.data,
        message: 'Usuário ativado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao ativar usuário',
      }
    }
  }

  // Desativar usuário
  async deactivateUsuario(id) {
    try {
      const response = await usuariosAPI.deactivate(id)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index].ativo = false
      }

      return {
        success: true,
        data: response.data,
        message: 'Usuário desativado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao desativar usuário',
      }
    }
  }

  // Resetar senha do usuário
  async resetPassword(id) {
    try {
      const response = await usuariosAPI.resetPassword(id)
      return {
        success: true,
        data: response.data,
        message: 'Senha resetada com sucesso. Nova senha enviada por email.',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao resetar senha',
      }
    }
  }

  // Alterar senha do usuário
  async changePassword(id, senhaData) {
    try {
      await usuariosAPI.changePassword(id, senhaData)
      return {
        success: true,
        message: 'Senha alterada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao alterar senha',
      }
    }
  }

  // Obter perfil do usuário
  async getUserProfile(id) {
    try {
      const response = await usuariosAPI.getProfile(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter perfil',
      }
    }
  }

  // Atualizar perfil do usuário
  async updateUserProfile(id, profileData) {
    try {
      const response = await usuariosAPI.updateProfile(id, profileData)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarios[index], ...response.data }
      }

      return {
        success: true,
        data: response.data,
        message: 'Perfil atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar perfil',
      }
    }
  }

  // Upload de avatar
  async uploadAvatar(id, avatarFile) {
    try {
      const response = await usuariosAPI.uploadAvatar(id, avatarFile)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index].avatar = response.data.avatar
      }

      return {
        success: true,
        data: response.data,
        message: 'Avatar atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao fazer upload do avatar',
      }
    }
  }

  // Remover avatar
  async removeAvatar(id) {
    try {
      await usuariosAPI.removeAvatar(id)

      // Atualizar na lista local
      const index = this.usuarios.findIndex(usuario => usuario.id === id)
      if (index !== -1) {
        this.usuarios[index].avatar = null
      }

      return {
        success: true,
        message: 'Avatar removido com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao remover avatar',
      }
    }
  }

  // Obter permissões do usuário
  async getUserPermissions(id) {
    try {
      const response = await usuariosAPI.getPermissions(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter permissões',
      }
    }
  }

  // Atualizar permissões do usuário
  async updateUserPermissions(id, permissoes) {
    try {
      const response = await usuariosAPI.updatePermissions(id, permissoes)
      return {
        success: true,
        data: response.data,
        message: 'Permissões atualizadas com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar permissões',
      }
    }
  }

  // Obter grupos do usuário
  async getUserGroups(id) {
    try {
      const response = await usuariosAPI.getGroups(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter grupos',
      }
    }
  }

  // Adicionar usuário a um grupo
  async addUserToGroup(id, grupoId) {
    try {
      await usuariosAPI.addToGroup(id, grupoId)
      return {
        success: true,
        message: 'Usuário adicionado ao grupo com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao adicionar usuário ao grupo',
      }
    }
  }

  // Remover usuário de um grupo
  async removeUserFromGroup(id, grupoId) {
    try {
      await usuariosAPI.removeFromGroup(id, grupoId)
      return {
        success: true,
        message: 'Usuário removido do grupo com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao remover usuário do grupo',
      }
    }
  }

  // Obter documentos do usuário
  async getUserDocuments(id, params = {}) {
    try {
      const response = await usuariosAPI.getDocuments(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao obter documentos do usuário',
      }
    }
  }

  // Obter tarefas pendentes do usuário
  async getUserPendingTasks(id, params = {}) {
    try {
      const response = await usuariosAPI.getPendingTasks(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao obter tarefas pendentes',
      }
    }
  }

  // Obter histórico de atividades do usuário
  async getUserActivityHistory(id, params = {}) {
    try {
      const response = await usuariosAPI.getActivityHistory(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao obter histórico de atividades',
      }
    }
  }

  // Obter estatísticas do usuário
  async getUserStatistics(id, params = {}) {
    try {
      const response = await usuariosAPI.getStatistics(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter estatísticas',
      }
    }
  }

  // Verificar se email já existe
  async checkEmail(email) {
    try {
      const response = await usuariosAPI.checkEmail(email)
      return {
        success: true,
        exists: response.data.exists,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao verificar email',
      }
    }
  }

  // Verificar se username já existe
  async checkUsername(username) {
    try {
      const response = await usuariosAPI.checkUsername(username)
      return {
        success: true,
        exists: response.data.exists,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao verificar username',
      }
    }
  }

  // Validar dados do usuário
  validateUsuario(usuarioData, isUpdate = false) {
    const errors = []

    if (!isUpdate || usuarioData.nome !== undefined) {
      if (!usuarioData.nome || usuarioData.nome.trim() === '') {
        errors.push('Nome é obrigatório')
      }
    }

    if (!isUpdate || usuarioData.email !== undefined) {
      if (!usuarioData.email || usuarioData.email.trim() === '') {
        errors.push('Email é obrigatório')
      } else if (!this.isValidEmail(usuarioData.email)) {
        errors.push('Email inválido')
      }
    }

    if (!isUpdate || usuarioData.senha !== undefined) {
      if (
        !isUpdate &&
        (!usuarioData.senha || usuarioData.senha.trim() === '')
      ) {
        errors.push('Senha é obrigatória')
      } else if (usuarioData.senha && usuarioData.senha.length < 6) {
        errors.push('Senha deve ter pelo menos 6 caracteres')
      }
    }

    if (usuarioData.nome && usuarioData.nome.length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres')
    }

    if (usuarioData.telefone && usuarioData.telefone.length > 20) {
      errors.push('Telefone deve ter no máximo 20 caracteres')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Validar email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Obter departamentos únicos
  getDepartamentos() {
    const departamentos = [
      ...new Set(this.usuarios.map(u => u.departamento).filter(Boolean)),
    ]
    return departamentos.sort()
  }

  // Obter cargos únicos
  getCargos() {
    const cargos = [...new Set(this.usuarios.map(u => u.cargo).filter(Boolean))]
    return cargos.sort()
  }

  // Filtrar usuários por departamento
  filterByDepartment(departamento) {
    if (!departamento) return this.usuarios
    return this.usuarios.filter(
      usuario => usuario.departamento === departamento
    )
  }

  // Filtrar usuários por cargo
  filterByRole(cargo) {
    if (!cargo) return this.usuarios
    return this.usuarios.filter(usuario => usuario.cargo === cargo)
  }

  // Filtrar usuários ativos
  getActiveUsers() {
    return this.usuarios.filter(usuario => usuario.ativo)
  }

  // Filtrar usuários inativos
  getInactiveUsers() {
    return this.usuarios.filter(usuario => !usuario.ativo)
  }

  // Obter usuários por permissão
  getUsuariosByPermission(permission) {
    return this.usuarios.filter(
      usuario => usuario.permissoes && usuario.permissoes.includes(permission)
    )
  }

  // Obter usuários administradores
  getAdmins() {
    return this.usuarios.filter(
      usuario =>
        usuario.roles &&
        (usuario.roles.includes('admin') ||
          usuario.roles.includes('administrator'))
    )
  }

  // Buscar usuário por email
  findByEmail(email) {
    return this.usuarios.find(
      usuario => usuario.email.toLowerCase() === email.toLowerCase()
    )
  }

  // Buscar usuário por username
  findByUsername(username) {
    return this.usuarios.find(
      usuario =>
        usuario.username &&
        usuario.username.toLowerCase() === username.toLowerCase()
    )
  }

  // Verificar se usuário existe
  existsByEmail(email) {
    return this.findByEmail(email) !== undefined
  }

  // Verificar se username existe
  existsByUsername(username) {
    return this.findByUsername(username) !== undefined
  }

  // Obter iniciais do nome
  getInitials(nome) {
    if (!nome) return ''
    return nome
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Formatar nome para exibição
  formatDisplayName(usuario) {
    if (!usuario) return ''
    return `${usuario.nome} ${usuario.sobrenome || ''}`.trim()
  }

  // Obter cor do avatar baseada no nome
  getAvatarColor(nome) {
    if (!nome) return '#6B7280'

    const colors = [
      '#EF4444',
      '#F59E0B',
      '#10B981',
      '#3B82F6',
      '#8B5CF6',
      '#EC4899',
      '#06B6D4',
      '#84CC16',
    ]

    const index = nome.length % colors.length
    return colors[index]
  }

  // Verificar se usuário está online (mockado - seria via WebSocket)
  isUserOnline(/* userId */) {
    // Esta funcionalidade seria implementada com WebSocket
    return Math.random() > 0.5 // Mock
  }

  // Obter último acesso formatado
  getLastAccessFormatted(usuario) {
    if (!usuario.ultimo_acesso) return 'Nunca'

    const now = new Date()
    const lastAccess = new Date(usuario.ultimo_acesso)
    const diffMs = now - lastAccess
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Ontem'
    if (diffDays < 7) return `${diffDays} dias atrás`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`

    return lastAccess.toLocaleDateString('pt-BR')
  }

  // Exportar lista de usuários
  exportUsuarios(format = 'csv') {
    const data = this.usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      departamento: usuario.departamento,
      cargo: usuario.cargo,
      ativo: usuario.ativo ? 'Sim' : 'Não',
      created_at: new Date(usuario.created_at).toLocaleDateString('pt-BR'),
    }))

    if (format === 'json') {
      return JSON.stringify(data, null, 2)
    }

    // CSV
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [headers, ...rows].join('\n')
  }

  // Gerar relatório de usuários
  generateReport() {
    const total = this.usuarios.length
    const ativos = this.usuarios.filter(u => u.ativo).length
    const inativos = total - ativos
    const departamentos = this.getDepartamentos().length
    const cargos = this.getCargos().length

    return {
      total,
      ativos,
      inativos,
      departamentos,
      cargos,
      porcentagemAtivos: total > 0 ? ((ativos / total) * 100).toFixed(1) : 0,
      usuariosPorDepartamento: this.getDepartamentos().map(dep => ({
        departamento: dep,
        count: this.filterByDepartment(dep).length,
      })),
      usuariosPorCargo: this.getCargos().map(cargo => ({
        cargo: cargo,
        count: this.filterByRole(cargo).length,
      })),
    }
  }

  // Obter lista de usuários
  getAllUsers() {
    return this.usuarios
  }

  getCurrentUser() {
    return this.currentUser
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }

  // Setter para usuário atual
  setCurrentUser(user) {
    this.currentUser = user
  }

  // Limpar dados
  clearData() {
    this.usuarios = []
    this.currentUser = null
    this.error = null
  }
}

// Instância singleton
const usuarioService = new UsuarioService()

export default usuarioService

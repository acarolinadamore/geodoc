import { notificacoesAPI } from '@/api/notificacoes'

class NotificacaoService {
  constructor() {
    this.notificacoes = []
    this.loading = false
    this.error = null
    this.unreadCount = 0
    this.settings = {
      email: true,
      push: true,
      inApp: true,
      frequency: 'immediate',
    }
  }

  // Listar notificações do usuário
  async getAllNotificacoes(params = {}) {
    this.loading = true
    this.error = null

    try {
      const response = await notificacoesAPI.getAll(params)
      this.notificacoes = response.data

      return {
        success: true,
        data: this.notificacoes,
      }
    } catch (error) {
      this.error =
        error.response?.data?.message || 'Erro ao buscar notificações'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar notificação por ID
  async getNotificacaoById(id) {
    try {
      const response = await notificacoesAPI.getById(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar notificação',
      }
    }
  }

  // Marcar notificação como lida
  async markAsRead(id) {
    try {
      const response = await notificacoesAPI.markAsRead(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].lida = true
        this.notificacoes[index].data_leitura = new Date()
      }

      // Atualizar contador
      this.unreadCount = Math.max(0, this.unreadCount - 1)

      return {
        success: true,
        data: response.data,
        message: 'Notificação marcada como lida',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao marcar notificação como lida',
      }
    }
  }

  // Marcar todas as notificações como lidas
  async markAllAsRead() {
    try {
      await notificacoesAPI.markAllAsRead()

      // Atualizar na lista local
      this.notificacoes.forEach(notif => {
        if (!notif.lida) {
          notif.lida = true
          notif.data_leitura = new Date()
        }
      })

      // Resetar contador
      this.unreadCount = 0

      return {
        success: true,
        message: 'Todas as notificações foram marcadas como lidas',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao marcar todas as notificações como lidas',
      }
    }
  }

  // Marcar notificação como não lida
  async markAsUnread(id) {
    try {
      const response = await notificacoesAPI.markAsUnread(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].lida = false
        this.notificacoes[index].data_leitura = null
      }

      // Atualizar contador
      this.unreadCount += 1

      return {
        success: true,
        data: response.data,
        message: 'Notificação marcada como não lida',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao marcar notificação como não lida',
      }
    }
  }

  // Arquivar notificação
  async archiveNotificacao(id) {
    try {
      const response = await notificacoesAPI.archive(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].arquivada = true
        this.notificacoes[index].data_arquivamento = new Date()
      }

      return {
        success: true,
        data: response.data,
        message: 'Notificação arquivada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao arquivar notificação',
      }
    }
  }

  // Desarquivar notificação
  async unarchiveNotificacao(id) {
    try {
      const response = await notificacoesAPI.unarchive(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].arquivada = false
        this.notificacoes[index].data_arquivamento = null
      }

      return {
        success: true,
        data: response.data,
        message: 'Notificação desarquivada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao desarquivar notificação',
      }
    }
  }

  // Deletar notificação
  async deleteNotificacao(id) {
    try {
      await notificacoesAPI.delete(id)

      // Remover da lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        const notificacao = this.notificacoes[index]
        this.notificacoes.splice(index, 1)

        // Atualizar contador se não estava lida
        if (!notificacao.lida) {
          this.unreadCount = Math.max(0, this.unreadCount - 1)
        }
      }

      return {
        success: true,
        message: 'Notificação excluída com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir notificação',
      }
    }
  }

  // Deletar múltiplas notificações
  async deleteMultipleNotificacoes(ids) {
    try {
      await notificacoesAPI.deleteMultiple(ids)

      // Remover da lista local
      const deletedNotifications = this.notificacoes.filter(notif =>
        ids.includes(notif.id)
      )
      this.notificacoes = this.notificacoes.filter(
        notif => !ids.includes(notif.id)
      )

      // Atualizar contador
      const unreadDeleted = deletedNotifications.filter(
        notif => !notif.lida
      ).length
      this.unreadCount = Math.max(0, this.unreadCount - unreadDeleted)

      return {
        success: true,
        message: `${ids.length} notificações excluídas com sucesso`,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir notificações',
      }
    }
  }

  // Obter contagem de notificações não lidas
  async getUnreadCount() {
    try {
      const response = await notificacoesAPI.getUnreadCount()
      this.unreadCount = response.data.count
      return {
        success: true,
        count: this.unreadCount,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao obter contagem de não lidas',
      }
    }
  }

  // Listar notificações não lidas
  async getUnreadNotifications(params = {}) {
    try {
      const response = await notificacoesAPI.getUnread(params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar notificações não lidas',
      }
    }
  }

  // Listar notificações arquivadas
  async getArchivedNotificacoes(params = {}) {
    try {
      const response = await notificacoesAPI.getArchived(params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar notificações arquivadas',
      }
    }
  }

  // Listar notificações por tipo
  async getNotificacoesByType(tipo, params = {}) {
    try {
      const response = await notificacoesAPI.getByType(tipo, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar notificações por tipo',
      }
    }
  }

  // Listar notificações por prioridade
  async getNotificacoesByPriority(prioridade, params = {}) {
    try {
      const response = await notificacoesAPI.getByPriority(prioridade, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar notificações por prioridade',
      }
    }
  }

  // Obter configurações de notificação
  async getNotificationSettings() {
    try {
      const response = await notificacoesAPI.getSettings()
      this.settings = response.data
      return {
        success: true,
        data: this.settings,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter configurações',
      }
    }
  }

  // Atualizar configurações de notificação
  async updateSettings(configuracoes) {
    try {
      const response = await notificacoesAPI.updateSettings(configuracoes)
      this.settings = response.data
      return {
        success: true,
        data: this.settings,
        message: 'Configurações atualizadas com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao atualizar configurações',
      }
    }
  }

  // Marcar notificação como importante
  async markAsImportant(id) {
    try {
      const response = await notificacoesAPI.markAsImportant(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].importante = true
      }

      return {
        success: true,
        data: response.data,
        message: 'Notificação marcada como importante',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao marcar como importante',
      }
    }
  }

  // Remover marcação de importante
  async removeImportant(id) {
    try {
      const response = await notificacoesAPI.removeImportant(id)

      // Atualizar na lista local
      const index = this.notificacoes.findIndex(notif => notif.id === id)
      if (index !== -1) {
        this.notificacoes[index].importante = false
      }

      return {
        success: true,
        data: response.data,
        message: 'Marcação de importante removida',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao remover marcação de importante',
      }
    }
  }

  // Filtrar notificações por status
  filterByStatus(status) {
    switch (status) {
      case 'lidas':
        return this.notificacoes.filter(notif => notif.lida)
      case 'nao-lidas':
        return this.notificacoes.filter(notif => !notif.lida)
      case 'arquivadas':
        return this.notificacoes.filter(notif => notif.arquivada)
      case 'importantes':
        return this.notificacoes.filter(notif => notif.importante)
      default:
        return this.notificacoes
    }
  }

  // Filtrar notificações por tipo
  filterByType(tipo) {
    if (!tipo) return this.notificacoes
    return this.notificacoes.filter(notif => notif.tipo === tipo)
  }

  // Filtrar notificações por prioridade
  filterByPriority(prioridade) {
    if (!prioridade) return this.notificacoes
    return this.notificacoes.filter(notif => notif.prioridade === prioridade)
  }

  // Obter tipos únicos de notificações
  getUniqueTypes() {
    const tipos = [
      ...new Set(this.notificacoes.map(notif => notif.tipo).filter(Boolean)),
    ]
    return tipos.sort()
  }

  // Obter notificações recentes (últimas 24h)
  getRecentNotificacoes() {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)

    return this.notificacoes.filter(
      notif => new Date(notif.created_at) >= oneDayAgo
    )
  }

  // Agrupar notificações por data
  groupByDate() {
    const grupos = {}

    this.notificacoes.forEach(notif => {
      const data = new Date(notif.created_at).toDateString()
      if (!grupos[data]) {
        grupos[data] = []
      }
      grupos[data].push(notif)
    })

    return grupos
  }

  // Limpar todas as notificações lidas
  async clearReadNotifications() {
    try {
      const lidas = this.notificacoes.filter(notif => notif.lida)
      const ids = lidas.map(notif => notif.id)

      if (ids.length > 0) {
        await this.deleteMultipleNotificacoes(ids)
      }

      return {
        success: true,
        message: `${ids.length} notificações lidas foram removidas`,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao limpar notificações lidas',
      }
    }
  }

  // Getters
  getNotificacoes() {
    return this.notificacoes
  }

  getUnreadNotificacoes() {
    return this.notificacoes.filter(notif => !notif.lida)
  }

  getUnreadCountLocal() {
    return this.unreadCount
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }

  getSettings() {
    return this.settings
  }

  // Verificar se há notificações importantes não lidas
  hasImportantUnread() {
    return this.notificacoes.some(notif => notif.importante && !notif.lida)
  }

  // Verificar se há notificações urgentes
  hasUrgentNotifications() {
    return this.notificacoes.some(
      notif => notif.prioridade === 'urgente' && !notif.lida
    )
  }
}

// Instância singleton
const notificacaoService = new NotificacaoService()

export default notificacaoService

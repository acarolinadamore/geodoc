import api from './index'

export const notificacoesAPI = {
  // Listar notificações do usuário
  getAll: (params = {}) => {
    return api.get('/notificacoes', { params })
  },

  // Buscar notificação por ID
  getById: id => {
    return api.get(`/notificacoes/${id}`)
  },

  // Marcar notificação como lida
  markAsRead: id => {
    return api.patch(`/notificacoes/${id}/lida`)
  },

  // Marcar todas as notificações como lidas
  markAllAsRead: () => {
    return api.patch('/notificacoes/todas/lidas')
  },

  // Marcar notificação como não lida
  markAsUnread: id => {
    return api.patch(`/notificacoes/${id}/nao-lida`)
  },

  // Arquivar notificação
  archive: id => {
    return api.patch(`/notificacoes/${id}/arquivar`)
  },

  // Desarquivar notificação
  unarchive: id => {
    return api.patch(`/notificacoes/${id}/desarquivar`)
  },

  // Deletar notificação
  delete: id => {
    return api.delete(`/notificacoes/${id}`)
  },

  // Deletar múltiplas notificações
  deleteMultiple: ids => {
    return api.delete('/notificacoes/multiplas', { data: { ids } })
  },

  // Obter contagem de notificações não lidas
  getUnreadCount: () => {
    return api.get('/notificacoes/nao-lidas/count')
  },

  // Listar notificações não lidas
  getUnread: (params = {}) => {
    return api.get('/notificacoes/nao-lidas', { params })
  },

  // Listar notificações arquivadas
  getArchived: (params = {}) => {
    return api.get('/notificacoes/arquivadas', { params })
  },

  // Listar notificações por tipo
  getByType: (tipo, params = {}) => {
    return api.get(`/notificacoes/tipo/${tipo}`, { params })
  },

  // Listar notificações por prioridade
  getByPriority: (prioridade, params = {}) => {
    return api.get(`/notificacoes/prioridade/${prioridade}`, { params })
  },

  // Obter configurações de notificação do usuário
  getSettings: () => {
    return api.get('/notificacoes/configuracoes')
  },

  // Atualizar configurações de notificação
  updateSettings: configuracoes => {
    return api.put('/notificacoes/configuracoes', configuracoes)
  },

  // Enviar notificação (para administradores)
  send: notificacaoData => {
    return api.post('/notificacoes/enviar', notificacaoData)
  },

  // Enviar notificação para múltiplos usuários
  sendToMultiple: (notificacaoData, userIds) => {
    return api.post('/notificacoes/enviar-multiplos', {
      ...notificacaoData,
      userIds,
    })
  },

  // Agendar notificação
  schedule: (notificacaoData, dataAgendamento) => {
    return api.post('/notificacoes/agendar', {
      ...notificacaoData,
      dataAgendamento,
    })
  },

  // Cancelar notificação agendada
  cancelScheduled: id => {
    return api.delete(`/notificacoes/agendadas/${id}`)
  },

  // Listar notificações agendadas
  getScheduled: (params = {}) => {
    return api.get('/notificacoes/agendadas', { params })
  },

  // Marcar notificação como importante
  markAsImportant: id => {
    return api.patch(`/notificacoes/${id}/importante`)
  },

  // Remover marcação de importante
  removeImportant: id => {
    return api.patch(`/notificacoes/${id}/remover-importante`)
  },
}

export default notificacoesAPI

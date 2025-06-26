// src/mocks/notifications.js

// ========================================
// DADOS DE NOTIFICAÇÕES (inline)
// ========================================
const notificationsData = [
  {
    id: 1,
    title: 'Novo documento recebido',
    message: 'Você recebeu um novo documento para aprovação',
    type: 'inbox',
    read: false,
    created_at: '2025-01-26T10:30:00Z',
    priority: 'normal',
  },
  {
    id: 2,
    title: 'Documento vencido',
    message: 'O documento DOC-2025-001 está vencido há 5 dias',
    type: 'alert',
    read: false,
    created_at: '2025-01-26T09:15:00Z',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Aprovação concluída',
    message: 'O documento DOC-2025-003 foi aprovado com sucesso',
    type: 'inbox',
    read: true,
    created_at: '2025-01-25T16:20:00Z',
    priority: 'normal',
  },
  {
    id: 4,
    title: 'Sistema em manutenção',
    message: 'O sistema estará em manutenção das 02:00 às 04:00',
    type: 'alert',
    read: false,
    created_at: '2025-01-25T14:00:00Z',
    priority: 'low',
  },
  {
    id: 5,
    title: 'Nova versão disponível',
    message: 'Uma nova versão do sistema está disponível',
    type: 'inbox',
    read: true,
    created_at: '2025-01-24T11:00:00Z',
    priority: 'normal',
  },
]

// ========================================
// FUNÇÕES DE SERVIÇO
// ========================================

export function getNotifications() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(
        '🔔 Mock Notifications: Carregando notificações...',
        notificationsData.length
      )
      resolve([...notificationsData])
    }, 800)
  })
}

export function getNotificationsByType(type) {
  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = notificationsData.filter(n => n.type === type)
      console.log(
        '🔔 Mock Notifications: Filtrando por tipo',
        type,
        filtered.length
      )
      resolve(filtered)
    }, 400)
  })
}

export function getUnreadCount() {
  return new Promise(resolve => {
    setTimeout(() => {
      const count = notificationsData.filter(n => !n.read).length
      console.log('🔔 Mock Notifications: Não lidas', count)
      resolve(count)
    }, 200)
  })
}

export function markAsRead(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const notification = notificationsData.find(n => n.id === id)
      if (notification) {
        notification.read = true
        console.log('✅ Mock Notifications: Marcada como lida', id)
      }
      resolve({ success: true, message: 'Notificação marcada como lida!' })
    }, 300)
  })
}

export function markAllAsRead(type = null) {
  return new Promise(resolve => {
    setTimeout(() => {
      let updated = 0
      notificationsData.forEach(n => {
        if (!type || n.type === type) {
          if (!n.read) {
            n.read = true
            updated++
          }
        }
      })
      console.log('✅ Mock Notifications: Todas marcadas como lidas', updated)
      resolve({
        success: true,
        message: `${updated} notificações marcadas como lidas!`,
      })
    }, 500)
  })
}

export function addNotification(notification) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newNotification = {
        id: Math.max(...notificationsData.map(n => n.id)) + 1,
        ...notification,
        read: false,
        created_at: new Date().toISOString(),
      }
      notificationsData.unshift(newNotification)
      console.log(
        '➕ Mock Notifications: Nova notificação adicionada',
        newNotification.id
      )
      resolve(newNotification)
    }, 300)
  })
}

export default {
  getNotifications,
  getNotificationsByType,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  addNotification,
}

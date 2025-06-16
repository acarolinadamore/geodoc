import notificationsData from './data/notifications.json'

export function getNotifications() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(notificationsData)
    }, 800)
  })
}

export function markAsRead(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simula marcar como lida
      const notification = notificationsData.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
      resolve({ success: true, message: 'Notificação marcada como lida!' })
    }, 300)
  })
}

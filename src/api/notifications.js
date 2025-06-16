import axios from 'axios'

export function getNotifications() {
  return axios.get('/api/notifications').then(response => response.data)
}

export function markAsRead(id) {
  return axios
    .put(`/api/notifications/${id}/read`)
    .then(response => response.data)
}

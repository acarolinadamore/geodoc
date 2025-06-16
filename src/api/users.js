import axios from 'axios'

export function getUsers() {
  return axios.get('/api/users').then(response => response.data)
}

export function createUser(userData) {
  return axios.post('/api/users', userData).then(response => response.data)
}

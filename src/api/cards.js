import axios from 'axios'

// Quando o backend estiver pronto
export function getCards() {
  return axios.get('/api/cards').then(response => response.data)
}

export function updateCard(id, data) {
  return axios.put(`/api/cards/${id}`, data).then(response => response.data)
}

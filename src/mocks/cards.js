// Importa os dados JSON
import cardsData from './data/cards.json'

// Simula requisição que demora um pouco
export function getCards() {
  return new Promise(resolve => {
    setTimeout(() => {
      // Retorna o array completo de cards
      resolve(cardsData)
    }, 1000) // Simula 1 segundo de carregamento
  })
}

export function getCardById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const card = cardsData.find(card => card.id === parseInt(id))
      resolve(card)
    }, 500)
  })
}

export function updateCard(id, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Mock: Atualizando card ${id}`, data)
      resolve({ success: true, message: 'Card atualizado com sucesso!' })
    }, 500)
  })
}

export function deleteCard(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Mock: Deletando card ${id}`)
      resolve({ success: true, message: 'Card deletado com sucesso!' })
    }, 500)
  })
}

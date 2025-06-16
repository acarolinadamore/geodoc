// Importa os dados JSON
import cardsData from './data/cards.json'

// Simula requisição que demora um pouco
export function getCards() {
  return new Promise(resolve => {
    setTimeout(() => {
      // Retorna array com o card (pode ter vários)
      resolve([cardsData])
    }, 1000) // Simula 1 segundo de carregamento
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

// composables/useSelecaoCards.js
import { ref, computed } from 'vue'

export const useSelecaoCards = () => {
  const cardsSelecionados = ref([])
  const cardsVisiveis = ref([])

  const todosCardsSelecionados = computed(() => {
    if (cardsVisiveis.value.length === 0) return false
    return cardsVisiveis.value.every(card =>
      cardsSelecionados.value.includes(card.id)
    )
  })

  const quantidadeSelecionados = computed(() => cardsSelecionados.value.length)

  const alternarSelecaoCard = cardId => {
    const index = cardsSelecionados.value.indexOf(cardId)
    if (index > -1) {
      cardsSelecionados.value.splice(index, 1)
    } else {
      cardsSelecionados.value.push(cardId)
    }
  }

  const selecionarTodos = () => {
    const idsVisiveis = cardsVisiveis.value.map(card => card.id)
    idsVisiveis.forEach(id => {
      if (!cardsSelecionados.value.includes(id)) {
        cardsSelecionados.value.push(id)
      }
    })
  }

  const limparSelecoes = () => {
    cardsSelecionados.value.splice(0)
  }

  const alternarTodosCards = selecionar => {
    if (selecionar) {
      selecionarTodos()
    } else {
      limparSelecoes()
    }
  }

  const atualizarCardsVisiveis = cards => {
    cardsVisiveis.value = cards
  }

  const resetarSelecoes = () => {
    limparSelecoes()
  }

  return {
    cardsSelecionados,
    todosCardsSelecionados,
    quantidadeSelecionados,
    alternarSelecaoCard,
    alternarTodosCards,
    limparSelecoes,
    resetarSelecoes,
    atualizarCardsVisiveis,
  }
}

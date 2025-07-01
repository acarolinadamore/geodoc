// composables/useCards.js - Versão corrigida com contadores separados
import Vue from 'vue'

// Estado global reativo usando Vue.observable (Vue 2)
const state = Vue.observable({
  cards: [],
  loading: false,
  error: null,
  filtros: {
    tipoCaixa: 'todos', // Filtro de tipo de caixa
    modelos: ['todos'], // Array para seleção múltipla de modelos
    busca: '',
    dataInicio: null,
    dataFim: null,
    page: 1,
    limit: 20,
  },
  cardsSelecionados: [],
  contadores: {}, // Contadores filtrados (para lógica interna)
  contagemOriginais: {}, // NOVO: Contadores originais/totais (para exibição nas abas)
  total: 0,
  totalPages: 0,
})

export function useCards() {
  // Computed properties usando Vue 2 style
  const possuiFiltrosAtivos = () => {
    return !!(
      state.filtros.busca ||
      state.filtros.dataInicio ||
      state.filtros.tipoCaixa !== 'todos' ||
      (state.filtros.modelos.length > 0 &&
        !state.filtros.modelos.includes('todos'))
    )
  }

  const todosCardsSelecionados = () => {
    if (state.cards.length === 0) return false
    return state.cards.every(card => state.cardsSelecionados.includes(card.id))
  }

  // Actions
  async function buscarCards(cardService) {
    try {
      state.loading = true
      state.error = null

      // Usa a função getCards com filtros
      const response = await cardService.getCards(state.filtros)

      state.cards = response.cards
      state.total = response.total
      state.totalPages = response.totalPages

      // Contadores filtrados (para lógica interna)
      state.contadores = response.contadores

      // NOVO: Preservar contadores originais
      // Se é o primeiro carregamento (sem filtros ativos), salva como originais
      if (
        !possuiFiltrosAtivos() ||
        Object.keys(state.contagemOriginais).length === 0
      ) {
        state.contagemOriginais = { ...response.contadores }
      }
    } catch (error) {
      state.error = error.message || 'Erro ao carregar documentos'
      console.error('Erro ao buscar cards:', error)
    } finally {
      state.loading = false
    }
  }

  // NOVA FUNÇÃO: Carregar contadores originais explicitamente
  async function carregarContagemOriginais(cardService) {
    try {
      // Faz uma busca sem filtros para obter contadores originais
      const filtrosSemFiltro = {
        tipoCaixa: 'todos',
        modelos: ['todos'],
        busca: '',
        dataInicio: null,
        dataFim: null,
        page: 1,
        limit: 1, // Só precisamos dos contadores, não dos cards
      }

      const response = await cardService.getCards(filtrosSemFiltro)
      state.contagemOriginais = { ...response.contadores }
    } catch (error) {
      console.error('Erro ao carregar contagem originais:', error)
    }
  }

  function alterarFiltros(novosFiltros) {
    // Reset página ao alterar filtros (exceto quando é mudança de página)
    if (!Object.prototype.hasOwnProperty.call(novosFiltros, 'page')) {
      novosFiltros.page = 1
    }

    Object.assign(state.filtros, novosFiltros)
  }

  function limparFiltros() {
    Object.assign(state.filtros, {
      tipoCaixa: 'todos',
      modelos: ['todos'],
      busca: '',
      dataInicio: null,
      dataFim: null,
      page: 1,
      limit: 20,
    })
    state.cardsSelecionados.splice(0)
  }

  function toggleCardSelection(cardId) {
    const index = state.cardsSelecionados.indexOf(cardId)
    if (index > -1) {
      state.cardsSelecionados.splice(index, 1)
    } else {
      state.cardsSelecionados.push(cardId)
    }
  }

  function selectAllVisible() {
    const visibleIds = state.cards.map(card => card.id)
    const newSelections = visibleIds.filter(
      id => !state.cardsSelecionados.includes(id)
    )
    state.cardsSelecionados.push(...newSelections)
  }

  function deselectAllVisible() {
    const visibleIds = state.cards.map(card => card.id)
    state.cardsSelecionados.splice(
      0,
      state.cardsSelecionados.length,
      ...state.cardsSelecionados.filter(id => !visibleIds.includes(id))
    )
  }

  function clearSelections() {
    state.cardsSelecionados.splice(0)
  }

  function limparErro() {
    state.error = null
  }

  // Toggle modelo na seleção múltipla
  function toggleModelo(modeloId) {
    const modelos = [...state.filtros.modelos]

    if (modeloId === 'todos') {
      // Se clicou em "todos", limpa outros e deixa só "todos"
      state.filtros.modelos.splice(0, state.filtros.modelos.length, 'todos')
    } else {
      // Remove "todos" se existir
      const todosIndex = modelos.indexOf('todos')
      if (todosIndex > -1) {
        modelos.splice(todosIndex, 1)
      }

      // Toggle do modelo específico
      const modeloIndex = modelos.indexOf(modeloId)
      if (modeloIndex > -1) {
        modelos.splice(modeloIndex, 1)
      } else {
        modelos.push(modeloId)
      }

      // Se não sobrou nenhum modelo, volta para "todos"
      if (modelos.length === 0) {
        modelos.push('todos')
      }

      state.filtros.modelos.splice(0, state.filtros.modelos.length, ...modelos)
    }
  }

  // Retorna estado e métodos
  return {
    // Estado
    state,

    // Computed
    possuiFiltrosAtivos,
    todosCardsSelecionados,

    // Actions
    buscarCards,
    carregarContagemOriginais, // NOVA FUNÇÃO
    alterarFiltros,
    limparFiltros,
    toggleCardSelection,
    selectAllVisible,
    deselectAllVisible,
    clearSelections,
    limparErro,
    toggleModelo,
  }
}

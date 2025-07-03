import Vue from 'vue'

// Estado global reativo usando Vue.observable (Vue 2)
const state = Vue.observable({
  cards: [],
  loading: false,
  error: null,
  filtros: {
    tipoCaixa: 'todos',
    modelos: ['todos'],
    busca: '',
    dataInicio: null,
    dataFim: null,
    page: 1,
    limit: 20,
  },
  cardsSelecionados: [],
  contadores: {},
  contagemOriginais: {},
  total: 0,
  totalPages: 0,
})

export function useCards() {
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

      console.log('🔍 Buscando cards com filtros:', state.filtros)

      // Usa a função getCards com filtros
      const response = await cardService.getCards(state.filtros)

      state.cards = response.cards
      state.total = response.total
      state.totalPages = response.totalPages

      // Contadores filtrados (para lógica interna)
      state.contadores = response.contadores

      console.log('📊 Resposta da busca:', {
        cards: response.cards.length,
        total: response.total,
        contadores: response.contadores,
      })

      // Se é o primeiro carregamento (sem filtros ativos), salva como originais
      if (
        !possuiFiltrosAtivos() ||
        Object.keys(state.contagemOriginais).length === 0
      ) {
        state.contagemOriginais = { ...response.contadores }
        console.log('💾 Contadores originais salvos:', state.contagemOriginais)
      }
    } catch (error) {
      state.error = error.message || 'Erro ao carregar documentos'
      console.error('❌ Erro ao buscar cards:', error)
    } finally {
      state.loading = false
    }
  }

  // Carregar contadores originais explicitamente
  async function carregarContagemOriginais(cardService) {
    try {
      console.log('🔄 Carregando contagem originais...')

      // Faz uma busca sem filtros para obter contadores originais
      const filtrosSemFiltro = {
        tipoCaixa: 'todos',
        modelos: ['todos'],
        busca: '',
        dataInicio: null,
        dataFim: null,
        page: 1,
        limit: 1,
      }

      const response = await cardService.getCards(filtrosSemFiltro)
      state.contagemOriginais = { ...response.contadores }

      console.log(
        '✅ Contadores originais carregados:',
        state.contagemOriginais
      )
    } catch (error) {
      console.error('❌ Erro ao carregar contagem originais:', error)
    }
  }
  function forcarLimpezaSelecoes() {
    console.log('🧹 [useCards] Forçando limpeza total das seleções')
    state.cardsSelecionados.splice(0)
    console.log('✅ [useCards] Seleções totalmente limpas')
  }
  function alterarFiltros(novosFiltros) {
    console.log('🔧 Alterando filtros:', novosFiltros)

    // Reset página ao alterar filtros (exceto quando é mudança de página)
    if (!Object.prototype.hasOwnProperty.call(novosFiltros, 'page')) {
      novosFiltros.page = 1
    }

    Object.assign(state.filtros, novosFiltros)

    console.log('📋 Filtros atualizados:', state.filtros)
  }

  function limparFiltros() {
    console.log('🧹 Limpando todos os filtros')

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
      console.log(`❌ Card ${cardId} desmarcado`)
    } else {
      state.cardsSelecionados.push(cardId)
      console.log(`✅ Card ${cardId} marcado`)
    }

    console.log('📝 Cards selecionados:', state.cardsSelecionados.length)
  }

  function selectAllVisible() {
    const visibleIds = state.cards.map(card => card.id)
    const newSelections = visibleIds.filter(
      id => !state.cardsSelecionados.includes(id)
    )
    state.cardsSelecionados.push(...newSelections)

    console.log(`✅ Selecionados todos os ${visibleIds.length} cards visíveis`)
  }

  function deselectAllVisible() {
    const visibleIds = state.cards.map(card => card.id)
    state.cardsSelecionados.splice(
      0,
      state.cardsSelecionados.length,
      ...state.cardsSelecionados.filter(id => !visibleIds.includes(id))
    )

    console.log(`❌ Desmarcados todos os cards visíveis`)
  }

  function clearSelections() {
    const quantidade = state.cardsSelecionados.length
    state.cardsSelecionados.splice(0)

    console.log(`🧹 Limpou ${quantidade} seleções`)
  }

  function limparErro() {
    state.error = null
    console.log('🧹 Erro limpo')
  }

  // Toggle modelo na seleção múltipla
  function toggleModelo(modeloId) {
    console.log('🔄 Toggle modelo:', modeloId)

    const modelos = [...state.filtros.modelos]

    if (modeloId === 'todos') {
      // Se clicou em "todos", limpa outros e deixa só "todos"
      state.filtros.modelos.splice(0, state.filtros.modelos.length, 'todos')
      console.log('✅ Selecionou "Todos" - limpou outras seleções')
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
        console.log(`❌ Removeu modelo: ${modeloId}`)
      } else {
        modelos.push(modeloId)
        console.log(`✅ Adicionou modelo: ${modeloId}`)
      }

      // Se não sobrou nenhum modelo, volta para "todos"
      if (modelos.length === 0) {
        modelos.push('todos')
        console.log('🔄 Nenhum modelo restante - voltando para "Todos"')
      }

      state.filtros.modelos.splice(0, state.filtros.modelos.length, ...modelos)
    }

    console.log('📋 Modelos selecionados finais:', state.filtros.modelos)
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
    carregarContagemOriginais,
    alterarFiltros,
    limparFiltros,
    toggleCardSelection,
    selectAllVisible,
    deselectAllVisible,
    clearSelections,
    limparErro,
    toggleModelo,
    forcarLimpezaSelecoes,
  }
}

// composables/useCards.js
import Vue from 'vue'
import { ContagemService } from '@/composables/ContagemService'

// Estado global reativo usando Vue.observable (Vue 2)
const state = Vue.observable({
  cards: [],
  loading: false,
  error: null,

  // Contagens separadas para maior clareza
  contagemTipoCaixa: {}, // Contagem dos tipos de caixa (primeira linha)
  contagemModelosAtual: {}, // Contagem dos modelos do tipo atual (segunda linha)
  contagemOriginais: {}, // Mantido para compatibilidade (deprecated)

  filtros: {
    tipoCaixa: 'todos',
    modelos: ['todos'],
    busca: '',
    dataInicio: null,
    dataFim: null,
    page: 1,
    limit: 20,
    pageSize: 20, // Alias para limit
    filterType: null,
    day: null,
    month: null,
  },

  cardsSelecionados: [],
  contadores: {}, // Contadores da busca atual
  total: 0,
  totalPages: 0,
})

export function useCards() {
  // === COMPUTED FUNCTIONS ===
  const possuiFiltrosAtivos = () => {
    return !!(
      state.filtros.busca ||
      state.filtros.dataInicio ||
      state.filtros.dataFim ||
      state.filtros.filterType ||
      state.filtros.tipoCaixa !== 'todos' ||
      (state.filtros.modelos.length > 0 &&
        !state.filtros.modelos.includes('todos'))
    )
  }

  const todosCardsSelecionados = () => {
    if (state.cards.length === 0) return false
    return state.cards.every(card => state.cardsSelecionados.includes(card.id))
  }

  // === MÉTODOS DE CONTAGEM ===
  const carregarContagemTipoCaixa = async () => {
    try {
      console.log('🔄 [useCards] Carregando contagem por tipo de caixa...')
      const contagem = await ContagemService.obterContagemPorTipo()

      // Atualiza o estado reativo
      Object.keys(contagem).forEach(key => {
        Vue.set(state.contagemTipoCaixa, key, contagem[key])
      })

      console.log(
        '✅ [useCards] Contagem por tipo carregada:',
        state.contagemTipoCaixa
      )
    } catch (error) {
      console.error('❌ [useCards] Erro ao carregar contagem por tipo:', error)
      // Limpa contagens em caso de erro
      Object.keys(state.contagemTipoCaixa).forEach(key => {
        Vue.delete(state.contagemTipoCaixa, key)
      })
    }
  }

  const carregarContagemModelosAtual = async tipoCaixa => {
    try {
      console.log(
        `🔄 [useCards] Carregando contagem de modelos para: ${tipoCaixa}`
      )
      const contagem = await ContagemService.obterContagemModelosPorTipo(
        tipoCaixa
      )

      // Limpa contagens anteriores
      Object.keys(state.contagemModelosAtual).forEach(key => {
        Vue.delete(state.contagemModelosAtual, key)
      })

      // Adiciona novas contagens
      Object.keys(contagem).forEach(key => {
        Vue.set(state.contagemModelosAtual, key, contagem[key])
      })

      console.log(
        '✅ [useCards] Contagem de modelos carregada:',
        state.contagemModelosAtual
      )
    } catch (error) {
      console.error(
        '❌ [useCards] Erro ao carregar contagem de modelos:',
        error
      )
      // Em caso de erro, mantém apenas "todos: 0"
      Object.keys(state.contagemModelosAtual).forEach(key => {
        Vue.delete(state.contagemModelosAtual, key)
      })
      Vue.set(state.contagemModelosAtual, 'todos', 0)
    }
  }

  const inicializarContagens = async () => {
    console.log('🚀 [useCards] Inicializando todas as contagens...')
    await carregarContagemTipoCaixa()
    await carregarContagemModelosAtual(state.filtros.tipoCaixa)
    console.log('✅ [useCards] Contagens inicializadas com sucesso')
  }

  // === MÉTODOS DE FILTROS ===
  const alterarFiltros = async novosFiltros => {
    console.log('🔧 [useCards] Alterando filtros:', novosFiltros)

    const filtrosAnteriores = { ...state.filtros }

    // Reset página ao alterar filtros (exceto quando é mudança de página)
    if (!Object.prototype.hasOwnProperty.call(novosFiltros, 'page')) {
      novosFiltros.page = 1
    }

    // Sincronizar pageSize e limit
    if (novosFiltros.pageSize) {
      novosFiltros.limit = novosFiltros.pageSize
    }
    if (novosFiltros.limit) {
      novosFiltros.pageSize = novosFiltros.limit
    }

    // Aplicar novos filtros
    Object.assign(state.filtros, novosFiltros)

    console.log('📋 [useCards] Filtros atualizados:', state.filtros)

    // Se mudou o tipo de caixa, recarregar contagem de modelos
    if (
      novosFiltros.tipoCaixa &&
      novosFiltros.tipoCaixa !== filtrosAnteriores.tipoCaixa
    ) {
      console.log(
        `📊 [useCards] Tipo de caixa mudou para: ${novosFiltros.tipoCaixa}`
      )
      await carregarContagemModelosAtual(novosFiltros.tipoCaixa)
    }
  }

  const limparFiltros = () => {
    console.log('🧹 [useCards] Limpando todos os filtros')

    Object.assign(state.filtros, {
      tipoCaixa: 'todos',
      modelos: ['todos'],
      busca: '',
      dataInicio: null,
      dataFim: null,
      filterType: null,
      day: null,
      month: null,
      page: 1,
      limit: 20,
      pageSize: 20,
    })

    // Limpa seleções também
    state.cardsSelecionados.splice(0)
  }

  // === MÉTODOS DE CARDS ===
  const buscarCards = async cardService => {
    if (!cardService) {
      console.error('❌ [useCards] CardService não fornecido')
      state.error = 'Serviço de cards não disponível'
      return
    }

    try {
      state.loading = true
      state.error = null

      console.log('🔍 [useCards] Buscando cards com filtros:', state.filtros)

      // Usa a função getCards com filtros
      const response = await cardService.getCards(state.filtros)

      state.cards = response.cards || []
      state.total = response.total || 0
      state.totalPages = response.totalPages || 1

      // Contadores filtrados (para lógica interna)
      state.contadores = response.contadores || {}

      console.log('📊 [useCards] Resposta da busca:', {
        cards: state.cards.length,
        total: state.total,
        totalPages: state.totalPages,
        contadores: state.contadores,
      })

      // Se é o primeiro carregamento (sem filtros ativos), salva como originais
      // Mantido para compatibilidade
      if (
        !possuiFiltrosAtivos() ||
        Object.keys(state.contagemOriginais).length === 0
      ) {
        // Limpa contagens originais anteriores
        Object.keys(state.contagemOriginais).forEach(key => {
          Vue.delete(state.contagemOriginais, key)
        })

        // Adiciona novas contagens
        Object.keys(response.contadores || {}).forEach(key => {
          Vue.set(state.contagemOriginais, key, response.contadores[key])
        })

        console.log(
          '💾 [useCards] Contadores originais salvos:',
          state.contagemOriginais
        )
      }
    } catch (error) {
      state.error = error.message || 'Erro ao carregar documentos'
      state.cards = []
      state.total = 0
      state.totalPages = 0
      console.error('❌ [useCards] Erro ao buscar cards:', error)
    } finally {
      state.loading = false
    }
  }

  // === MÉTODOS DE COMPATIBILIDADE ===
  // Mantido para compatibilidade com código existente
  const carregarContagemOriginais = async cardService => {
    console.warn(
      '⚠️ [useCards] carregarContagemOriginais está deprecated. Use inicializarContagens()'
    )

    try {
      console.log(
        '🔄 [useCards] Carregando contagem originais (compatibilidade)...'
      )

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

      // Limpa contagens anteriores
      Object.keys(state.contagemOriginais).forEach(key => {
        Vue.delete(state.contagemOriginais, key)
      })

      // Adiciona novas contagens
      Object.keys(response.contadores || {}).forEach(key => {
        Vue.set(state.contagemOriginais, key, response.contadores[key])
      })

      console.log(
        '✅ [useCards] Contadores originais carregados:',
        state.contagemOriginais
      )

      // Também inicializa as novas contagens
      await inicializarContagens()
    } catch (error) {
      console.error('❌ [useCards] Erro ao carregar contagem originais:', error)
    }
  }

  // === MÉTODOS DE SELEÇÃO ===
  const forcarLimpezaSelecoes = () => {
    console.log('🧹 [useCards] Forçando limpeza total das seleções')
    state.cardsSelecionados.splice(0)
    console.log('✅ [useCards] Seleções totalmente limpas')
  }

  const toggleCardSelection = cardId => {
    const index = state.cardsSelecionados.indexOf(cardId)
    if (index > -1) {
      state.cardsSelecionados.splice(index, 1)
      console.log(`❌ [useCards] Card ${cardId} desmarcado`)
    } else {
      state.cardsSelecionados.push(cardId)
      console.log(`✅ [useCards] Card ${cardId} marcado`)
    }

    console.log(
      '📝 [useCards] Cards selecionados:',
      state.cardsSelecionados.length
    )
  }

  const selectAllVisible = () => {
    const visibleIds = state.cards.map(card => card.id)
    const newSelections = visibleIds.filter(
      id => !state.cardsSelecionados.includes(id)
    )
    state.cardsSelecionados.push(...newSelections)

    console.log(
      `✅ [useCards] Selecionados todos os ${visibleIds.length} cards visíveis`
    )
  }

  const deselectAllVisible = () => {
    const visibleIds = state.cards.map(card => card.id)
    state.cardsSelecionados.splice(
      0,
      state.cardsSelecionados.length,
      ...state.cardsSelecionados.filter(id => !visibleIds.includes(id))
    )

    console.log(`❌ [useCards] Desmarcados todos os cards visíveis`)
  }

  const clearSelections = () => {
    const quantidade = state.cardsSelecionados.length
    state.cardsSelecionados.splice(0)

    console.log(`🧹 [useCards] Limpou ${quantidade} seleções`)
  }

  // === MÉTODOS DE MODELO ===
  const toggleModelo = modeloId => {
    console.log('🔄 [useCards] Toggle modelo:', modeloId)

    const modelos = [...state.filtros.modelos]

    if (modeloId === 'todos') {
      // Se clicou em "todos", limpa outros e deixa só "todos"
      state.filtros.modelos.splice(0, state.filtros.modelos.length, 'todos')
      console.log('✅ [useCards] Selecionou "Todos" - limpou outras seleções')
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
        console.log(`❌ [useCards] Removeu modelo: ${modeloId}`)
      } else {
        modelos.push(modeloId)
        console.log(`✅ [useCards] Adicionou modelo: ${modeloId}`)
      }

      // Se não sobrou nenhum modelo, volta para "todos"
      if (modelos.length === 0) {
        modelos.push('todos')
        console.log(
          '🔄 [useCards] Nenhum modelo restante - voltando para "Todos"'
        )
      }

      state.filtros.modelos.splice(0, state.filtros.modelos.length, ...modelos)
    }

    console.log(
      '📋 [useCards] Modelos selecionados finais:',
      state.filtros.modelos
    )
  }

  // === MÉTODOS DE ESTADO ===
  const limparErro = () => {
    state.error = null
    console.log('🧹 [useCards] Erro limpo')
  }

  const limparErroState = () => {
    state.error = null
    console.log('🧹 [useCards] Estado de erro limpo')
  }

  const resetarState = () => {
    console.log('🔄 [useCards] Resetando state completo')

    state.cards.splice(0)
    state.loading = false
    state.error = null
    state.total = 0
    state.totalPages = 0

    // Limpa contagens
    Object.keys(state.contagemTipoCaixa).forEach(key => {
      Vue.delete(state.contagemTipoCaixa, key)
    })
    Object.keys(state.contagemModelosAtual).forEach(key => {
      Vue.delete(state.contagemModelosAtual, key)
    })
    Object.keys(state.contagemOriginais).forEach(key => {
      Vue.delete(state.contagemOriginais, key)
    })
    Object.keys(state.contadores).forEach(key => {
      Vue.delete(state.contadores, key)
    })

    // Limpa filtros
    limparFiltros()
  }

  // === MÉTODOS UTILITÁRIOS ===
  const obterCardPorId = cardId => {
    return state.cards.find(card => card.id === cardId)
  }

  const obterCardsComFiltro = filtroFn => {
    return state.cards.filter(filtroFn)
  }

  const contarCardsComCondicao = condicaoFn => {
    return state.cards.filter(condicaoFn).length
  }

  // === DEBUG ===
  const debugState = () => {
    console.log('🐛 [useCards] Estado atual completo:', {
      totalCards: state.cards.length,
      loading: state.loading,
      error: state.error,
      filtros: state.filtros,
      cardsSelecionados: state.cardsSelecionados.length,
      contagemTipoCaixa: state.contagemTipoCaixa,
      contagemModelosAtual: state.contagemModelosAtual,
      contagemOriginais: state.contagemOriginais, // Deprecated
      contadores: state.contadores,
      total: state.total,
      totalPages: state.totalPages,
    })
  }

  // Retorna estado e métodos
  return {
    // Estado
    state,

    // Computed functions
    possuiFiltrosAtivos,
    todosCardsSelecionados,

    // Métodos de contagem (novos)
    carregarContagemTipoCaixa,
    carregarContagemModelosAtual,
    inicializarContagens,

    // Métodos de filtros
    alterarFiltros,
    limparFiltros,

    // Métodos de cards
    buscarCards,

    // Métodos de seleção
    toggleCardSelection,
    selectAllVisible,
    deselectAllVisible,
    clearSelections,
    forcarLimpezaSelecoes,

    // Métodos de modelo
    toggleModelo,

    // Métodos de estado
    limparErro,
    limparErroState,
    resetarState,

    // Métodos de compatibilidade (deprecated)
    carregarContagemOriginais,

    // Utilitários
    obterCardPorId,
    obterCardsComFiltro,
    contarCardsComCondicao,

    // Debug
    debugState,
  }
}

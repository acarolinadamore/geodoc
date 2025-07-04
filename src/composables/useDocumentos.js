import { reactive, getCurrentInstance } from 'vue'

export const useDocumentos = () => {
  // Acessar o service mock do prototype Vue
  const instance = getCurrentInstance()
  const cardService = instance?.proxy.$cardService

  // Estado reativo
  const state = reactive({
    cards: [],
    loading: false,
    error: null,
    total: 0,
    totalPages: 1,
    currentPage: 1,
    contadores: {},
    contagemTipoCaixa: {},
    contagemModelosAtual: {},
  })

  // Carregar cards com filtros
  const carregarCards = async (filtros = {}) => {
    try {
      state.loading = true
      state.error = null

      console.log('🔄 [useDocumentos] Carregando cards com filtros:', filtros)

      const resposta = await cardService.getCards(filtros)

      state.cards = resposta.cards || []
      state.total = resposta.total || 0
      state.totalPages = resposta.totalPages || 1
      state.currentPage = resposta.page || 1

      // Atualizar contadores se disponíveis
      if (resposta.contadores) {
        state.contadores = resposta.contadores
      }

      if (resposta.contagemTipoCaixa) {
        state.contagemTipoCaixa = resposta.contagemTipoCaixa
      }

      if (resposta.contagemModelosAtual) {
        state.contagemModelosAtual = resposta.contagemModelosAtual
      }

      console.log('✅ [useDocumentos] Cards carregados com sucesso:', {
        total: state.total,
        cards: state.cards.length,
      })

      return resposta
    } catch (error) {
      state.error = error.message || 'Erro ao carregar documentos'
      console.error('❌ [useDocumentos] Erro ao carregar cards:', error)
      throw error
    } finally {
      state.loading = false
    }
  }

  // Carregar contagens iniciais
  const inicializarContagens = async () => {
    try {
      console.log(
        '🔄 [useDocumentos] Inicializando contagens por tipo de caixa (MOCK)'
      )

      // Para mocks, usar contagens estáticas
      const contagens = {
        todos: 12,
        'a-configurar': 2,
        recebidos: 7,
        solicitados: 3,
        agendamentos: 1,
        urgente: 0,
        importante: 0,
        revisao: 0,
      }

      state.contagemTipoCaixa = contagens
      console.log('✅ [useDocumentos] Contagens inicializadas:', contagens)
    } catch (error) {
      console.error('❌ [useDocumentos] Erro ao inicializar contagens:', error)
    }
  }

  // Carregar contagem de modelos para um tipo específico
  const carregarContagemModelosAtual = async tipoCaixa => {
    try {
      console.log(
        `🔄 [useDocumentos] Carregando contagem de modelos para: ${tipoCaixa} (MOCK)`
      )

      // Para mocks, usar contagens estáticas baseadas no tipo
      const contagensPorTipo = {
        todos: {
          todos: 12,
          'solicitacao-fabrica-software': 4,
          'relatorio-progresso': 3,
          'auditoria-processo': 2,
          'conciliacao-bancaria': 2,
          'folha-de-pagamento': 1,
        },
        recebidos: {
          todos: 7,
          'solicitacao-fabrica-software': 4,
          'conciliacao-bancaria': 2,
          'auditoria-processo': 1,
        },
        solicitados: {
          todos: 3,
          'relatorio-progresso': 3,
        },
        'a-configurar': {
          todos: 2,
          'auditoria-processo': 2,
        },
        agendamentos: {
          todos: 1,
          'folha-de-pagamento': 1,
        },
      }

      const contagens = contagensPorTipo[tipoCaixa] || contagensPorTipo['todos']
      state.contagemModelosAtual = contagens

      console.log(
        '✅ [useDocumentos] Contagem de modelos carregada:',
        contagens
      )
    } catch (error) {
      console.error(
        '❌ [useDocumentos] Erro ao carregar contagem de modelos:',
        error
      )
    }
  }

  // Alterar filtros (mantido para compatibilidade)
  const alterarFiltros = async novosFiltros => {
    console.log('🔄 [useDocumentos] Alterando filtros:', novosFiltros)
    return await carregarCards(novosFiltros)
  }

  // Atualizar card específico no estado
  const atualizarCard = (cardId, novosDados) => {
    const index = state.cards.findIndex(card => card.id === cardId)
    if (index !== -1) {
      state.cards[index] = { ...state.cards[index], ...novosDados }
      console.log('✅ [useDocumentos] Card atualizado:', cardId)
    }
  }

  // Remover card do estado
  const removerCard = cardId => {
    state.cards = state.cards.filter(card => card.id !== cardId)
    state.total = Math.max(0, state.total - 1)
    console.log('✅ [useDocumentos] Card removido:', cardId)
  }

  // Adicionar card ao estado
  const adicionarCard = novoCard => {
    state.cards.unshift(novoCard)
    state.total += 1
    console.log('✅ [useDocumentos] Card adicionado:', novoCard.id)
  }

  // Limpar estado
  const limparEstado = () => {
    state.cards = []
    state.total = 0
    state.totalPages = 1
    state.currentPage = 1
    state.error = null
    console.log('🔄 [useDocumentos] Estado limpo')
  }

  // Recarregar dados
  const recarregar = async (filtros = {}) => {
    console.log('🔄 [useDocumentos] Recarregando todos os dados')
    await carregarCards(filtros)
    await inicializarContagens()
  }

  // Atualizar contagens após ação
  const atualizarContagensAposAcao = async acao => {
    console.log(`🔄 [useDocumentos] Atualizando contagens após ação: ${acao}`)
    try {
      // Recarregar contagens
      await inicializarContagens()

      // Se houver um tipo de caixa específico, recarregar modelos também
      if (
        state.contagemModelosAtual &&
        Object.keys(state.contagemModelosAtual).length > 0
      ) {
        // Tentar detectar o tipo de caixa atual (pode ser passado como parâmetro se necessário)
        const tipoCaixaAtual = 'todos' // Ou pegar de algum lugar
        await carregarContagemModelosAtual(tipoCaixaAtual)
      }

      console.log('✅ [useDocumentos] Contagens atualizadas após ação')
    } catch (error) {
      console.error('❌ [useDocumentos] Erro ao atualizar contagens:', error)
    }
  }

  return {
    state,
    carregarCards,
    inicializarContagens,
    carregarContagemModelosAtual,
    alterarFiltros,
    atualizarCard,
    removerCard,
    adicionarCard,
    limparEstado,
    recarregar,
    atualizarContagensAposAcao,
  }
}

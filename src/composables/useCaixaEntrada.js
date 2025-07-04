import { computed, ref, watch, onMounted, getCurrentInstance } from 'vue'
import { useDocumentos } from '@/composables/useDocumentos'
import { useSelecaoCards } from '@/composables/useSelecaoCards'
import { useNotificacoes } from '@/composables/useNotificacoes'
import { useFiltrosCaixa } from '@/composables/useFiltrosCaixa'
import { useCoresModelo } from '@/composables/useCoresModelo'
import { useAcoesCaixa } from '@/composables/useAcoesCaixa'
import { TIPOS_CAIXA } from '@/constants/caixa'

export const useCaixaEntrada = () => {
  // Acessar o service mock do prototype Vue
  const instance = getCurrentInstance()
  const cardService = instance?.proxy.$cardService

  // Composables
  const cardsComposable = useDocumentos()
  const selecaoCards = useSelecaoCards()
  const notificacoes = useNotificacoes()
  const filtrosCaixa = useFiltrosCaixa()
  const coresModelo = useCoresModelo()
  const acoesCaixa = useAcoesCaixa(selecaoCards, notificacoes)

  // Estado local
  const ordenacaoAtual = ref('modelos')
  const marcadoresPessoais = ref([])

  // Computeds
  const temCards = computed(() => cardsComposable.state.cards.length > 0)

  const temCardsSelecionados = computed(
    () => selecaoCards.cardsSelecionados.value.length > 0
  )

  const tituloAtual = computed(() => {
    const tipo = filtrosCaixa.filtros.value.tipoCaixa
    const tipoConfig = TIPOS_CAIXA.find(t => t.id === tipo)

    if (tipoConfig?.titulo) {
      return tipoConfig.titulo
    }

    return tipoConfig ? `Marcador: ${tipoConfig.label}` : 'Caixa de Entrada'
  })

  const abasTipoCaixaComContadores = computed(() => {
    const contagens = cardsComposable.state.contagemTipoCaixa || {}
    return TIPOS_CAIXA.map(aba => ({
      ...aba,
      count: contagens[aba.id] || 0,
    }))
  })

  const modelosDaCaixaAtual = computed(() => {
    const contagens = cardsComposable.state.contagemModelosAtual || {}

    // Sempre inclui "Todos" primeiro
    const todos = {
      id: 'todos',
      label: 'Todos',
      color: '#1a82d9',
      count: contagens['todos'] || 0,
    }

    // Adiciona outros modelos que têm contagem > 0
    const outrosModelos = coresModelo.modelosDisponiveis.value
      .filter(modelo => modelo.id !== 'todos')
      .map(modelo => ({
        id: modelo.id,
        label: modelo.nome,
        color: modelo.cor,
        count: contagens[modelo.id] || 0,
      }))
      .filter(modelo => modelo.count > 0)

    return [todos, ...outrosModelos]
  })

  const filtrosAtivos = computed(() => {
    const ativos = []
    const f = filtrosCaixa.filtros.value

    if (f.busca) {
      ativos.push({
        tipo: 'busca',
        valor: f.busca,
        label: `🔍 "${f.busca}"`,
      })
    }

    if (filtrosCaixa.filtroDataTexto.value) {
      ativos.push({
        tipo: 'data',
        valor: null,
        label: `📅 ${filtrosCaixa.filtroDataTexto.value}`,
      })
    }

    if (filtrosCaixa.modelosSelecionadosTexto.value) {
      const modelosTexto = filtrosCaixa.modelosSelecionadosTexto.value
        .split(', ')
        .map(modelo => modelo.charAt(0).toUpperCase() + modelo.slice(1))
        .join(', ')

      ativos.push({
        tipo: 'modelos',
        valor: null,
        label: `📋 ${modelosTexto}`,
      })
    }

    return ativos
  })

  // Watchers
  watch(
    () => cardsComposable.state.cards,
    novosCards => selecaoCards.atualizarCardsVisiveis(novosCards || []),
    { immediate: true }
  )

  watch(
    () => filtrosCaixa.obterFiltrosParaApi(),
    async novosFiltros => {
      await cardsComposable.alterarFiltros(novosFiltros)
      await carregarCards()
    },
    { deep: true }
  )

  // Métodos de filtro
  const alterarTipoCaixa = async tipoCaixa => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.alterarTipoCaixa(tipoCaixa)
    await cardsComposable.carregarContagemModelosAtual(tipoCaixa)
  }

  const alterarFiltroModelo = async modeloId => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.alterarFiltroModelo(modeloId)
  }

  const alterarFiltroBusca = async busca => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.alterarFiltroBusca(busca)
  }

  const alterarFiltroData = async dadosData => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.alterarFiltroData(dadosData)
  }

  const limparFiltroBusca = () => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.limparFiltro('busca')
  }

  const alterarOrdenacao = ordenacao => {
    ordenacaoAtual.value = ordenacao
  }

  const limparFiltroEspecifico = tipoFiltro => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.limparFiltro(tipoFiltro)
  }

  const limparTodosFiltros = () => {
    selecaoCards.resetarSelecoes()
    filtrosCaixa.limparTodosFiltros()
  }

  const alternarSelecaoCard = cardId => {
    selecaoCards.alternarSelecaoCard(cardId)
  }

  const adicionarMarcador = novoMarcador => {
    marcadoresPessoais.value.push(novoMarcador)
    notificacoes.mostrarSucesso('Marcador adicionado com sucesso')
  }

  // Carregar dados
  const carregarCards = async () => {
    try {
      cardsComposable.state.loading = true
      cardsComposable.state.error = null

      const filtrosApi = filtrosCaixa.obterFiltrosParaApi()
      const response = await cardService.getCards(filtrosApi)

      if (response.cards) {
        cardsComposable.state.cards = response.cards
        cardsComposable.state.total = response.total || 0
        cardsComposable.state.totalPages = response.totalPages || 1

        if (response.contadores) {
          cardsComposable.state.contadores = response.contadores
        }
      }
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao carregar documentos'
      cardsComposable.state.error = mensagem
      notificacoes.mostrarErro(mensagem)
    } finally {
      cardsComposable.state.loading = false
    }
  }

  // Inicialização
  const inicializar = async () => {
    try {
      // Primeiro carrega as contagens gerais
      await cardsComposable.inicializarContagens()

      // Depois carrega a contagem específica do tipo atual
      const tipoAtual = filtrosCaixa.filtros.value.tipoCaixa
      await cardsComposable.carregarContagemModelosAtual(tipoAtual)

      // Por último carrega os cards
      await carregarCards()
    } catch (error) {
      console.error('Erro na inicialização:', error)
    }
  }

  // Lifecycle
  onMounted(() => {
    inicializar()
  })

  return {
    // Estados
    cardsComposable,
    selecaoCards,
    filtrosCaixa,
    ordenacaoAtual,
    marcadoresPessoais,

    // Computeds
    temCards,
    temCardsSelecionados,
    tituloAtual,
    abasTipoCaixaComContadores,
    modelosDaCaixaAtual,
    filtrosAtivos,

    // Métodos de filtro
    alterarTipoCaixa,
    alterarFiltroModelo,
    alterarFiltroBusca,
    alterarFiltroData,
    limparFiltroBusca,
    alterarOrdenacao,
    limparFiltroEspecifico,
    limparTodosFiltros,
    alternarSelecaoCard,
    adicionarMarcador,

    // Carregar dados
    carregarCards,
    inicializar,

    // Ações
    ...acoesCaixa,
  }
}

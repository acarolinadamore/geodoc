import { computed, ref, watch, onMounted, getCurrentInstance } from 'vue'
import { useDocumentos } from '@/composables/useDocumentos'
import { useSelecaoCards } from '@/composables/useSelecaoCards'
import { useNotificacoes } from '@/composables/useNotificacoes'
import { useFiltrosCaixa } from '@/composables/useFiltrosCaixa'
import { useCoresModelo } from '@/composables/useCoresModelo'
import { useAcoesCaixa } from '@/composables/useAcoesCaixa'
import { useFiltroData } from '@/composables/useFiltroData'
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
  const { filtroData, aplicarFiltroData, definirFiltroData, limparFiltroData } =
    useFiltroData()

  // Estado local
  const ordenacaoAtual = ref('modelos')
  const marcadoresPessoais = ref([])

  // Computeds - VOLTA AO ORIGINAL COM ADIÇÃO DO FILTRO
  // Computeds - VOLTA AO ORIGINAL COM ADIÇÃO DO FILTRO
  const cardsFiltrados = computed(() => {
    let cards = cardsComposable.state.cards || []

    console.log(
      '🔍 Cards originais:',
      cards.length,
      Array.isArray(cards) ? 'Array' : typeof cards
    )

    // GARANTE que é sempre um array
    if (!Array.isArray(cards)) {
      console.error('⚠️ Cards não é array:', cards)
      return []
    }

    // APLICA o filtro de data progressivo se existir
    if (filtroData.value) {
      cards = aplicarFiltroData(cards, filtroData.value)
      console.log(
        '🔍 Cards após filtro:',
        cards.length,
        Array.isArray(cards) ? 'Array' : typeof cards
      )

      // ✨ ADICIONE ESTAS LINHAS AQUI:
      console.log('🔍 Cards FINAIS que vão para a tela:', cards.length)
      console.log(
        '📋 Lista dos cards que vão aparecer:',
        cards.map(c => {
          const data = new Date(c.documento.dataInicio)
          const dia = String(data.getDate()).padStart(2, '0')
          const mes = String(data.getMonth() + 1).padStart(2, '0')
          return `${dia}/${mes} - ${c.remetente.nome}`
        })
      )
    }

    return cards
  })

  const temCards = computed(() => cardsFiltrados.value.length > 0)

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
    () => cardsFiltrados.value,
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

  // Métodos de filtro - VOLTA AO ORIGINAL
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

    // APENAS adiciona suporte ao novo filtro, mantém o antigo funcionando
    if (dadosData && (dadosData.filterType || dadosData.start)) {
      definirFiltroData(dadosData)
    } else {
      filtrosCaixa.alterarFiltroData(dadosData)
      limparFiltroData()
    }
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
    limparFiltroData()
  }

  const alternarSelecaoCard = cardId => {
    selecaoCards.alternarSelecaoCard(cardId)
  }

  const adicionarMarcador = novoMarcador => {
    marcadoresPessoais.value.push(novoMarcador)
    notificacoes.mostrarSucesso('Marcador adicionado com sucesso')
  }

  // Carregar dados - EXATAMENTE COMO ESTAVA
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

  // Inicialização - EXATAMENTE COMO ESTAVA
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
    // Estados - VOLTA AO ORIGINAL
    cardsComposable,
    selecaoCards,
    filtrosCaixa,
    ordenacaoAtual,
    marcadoresPessoais,
    cardsFiltrados,

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

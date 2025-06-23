<template>
  <layout-sidebar-header
    :show-header-date="false"
    :show-header-notification="true"
  >
    <div class="caixa-entrada-container">
      <!-- Header Fixo com Padding -->
      <div class="header-fixo">
        <div class="header-content">
          <!-- Título da Página -->
          <div class="flex pt-2">
            <h1 class="text-xl font-semibold text-gray-700 m-0">
              Caixa de Entrada
            </h1>
          </div>

          <!-- Filtros de Clique -->
          <div class="flex flex-col">
            <GdFilterBar />
            <GdFilterBarBadge
              :initial-tabs="filterTabs"
              @filter-change="alterarFiltro"
              @marker-added="adicionarMarcador"
            />
          </div>

          <!-- Botoes - Search e DatePicker -->
          <div class="flex justify-between items-center gap-4 mt-2">
            <div class="flex gap-2 flex-wrap">
              <GdButton
                label="Atribuir em Lotes"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                @click="atribuirEmLotes"
              />
              <GdButton
                label="Atribuir a mim"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                @click="atribuirAMim"
              />
              <GdButton
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                @click="aprovar"
              />
              <GdButton
                label="Agrupar"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#ffffff"
                @click="agrupar"
              />
            </div>

            <div class="flex gap-3 items-center">
              <GdSearchBar
                v-model="termoBusca"
                @search="buscar"
                @clear="limparBusca"
              />
              <GdDatePicker
                v-model="intervaloData"
                :placeholder="'Selecionar período'"
                @change="alterarData"
              />
            </div>
          </div>

          <!-- Indicador de filtros ativos -->
          <div
            v-if="temFiltrosAtivos"
            class="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md gap-3"
            role="status"
            aria-live="polite"
          >
            <div class="flex gap-2 flex-wrap">
              <span
                v-if="termoBusca"
                class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                <span class="texto-acessibilidade">Filtro de busca ativo:</span>
                🔍 "{{ termoBusca }}"
                <button
                  @click="limparBusca"
                  class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
                  :aria-label="`Remover filtro de busca: ${termoBusca}`"
                >
                  ×
                </button>
              </span>
              <span
                v-if="intervaloData && intervaloData.length === 2"
                class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                <span class="texto-acessibilidade">Filtro de data ativo:</span>
                📅 {{ formatarIntervaloData(intervaloData) }}
                <button
                  @click="limparFiltroData"
                  class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
                  :aria-label="`Remover filtro de data: ${formatarIntervaloData(
                    intervaloData
                  )}`"
                >
                  ×
                </button>
              </span>
            </div>
            <button
              @click="limparTodosFiltros"
              class="px-2 py-1 bg-transparent border border-red-600 text-red-600 rounded text-xs cursor-pointer hover:bg-red-600 hover:text-white transition-all"
              aria-label="Limpar todos os filtros ativos"
            >
              Limpar todos os filtros
            </button>
          </div>
        </div>

        <!-- Linha separadora sem padding -->
        <div class="separador-linha"></div>

        <!-- Título dos Cards com Dropdowns - Com padding -->
        <div class="header-cards-title">
          <div class="flex items-center gap-4 py-2">
            <div class="flex gap-2 items-center">
              <GdCheckboxDropdown
                :checked-all="todosCardsSelecionados"
                :actions="acaoesCheckbox"
                @toggle-all="alternarTodos"
                @action="executarAcaoCheckbox"
              />
              <GdEnviarParaDropdown
                :markers="opcoesEnviarPara"
                @select-marker="enviarPara"
              />
            </div>
            <div class="flex flex-1 gap-4 title-cards-container">
              <div class="flex-1">
                <span>Remetente</span>
              </div>
              <div class="flex-1">
                <span>Documento</span>
              </div>
              <div class="flex-1">
                <span>Âncora</span>
              </div>
              <div class="flex-1">
                <span>Ações</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Rolagem - Apenas Lista de Cards -->
      <div class="area-scroll">
        <!-- Conteúdo com padding -->
        <div class="scroll-content">
          <!-- Loading -->
          <div
            v-if="carregando"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
          >
            <div
              class="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"
              aria-label="Carregando"
            ></div>
            <p>Carregando documentos...</p>
            <div
              v-if="contadorTentativas > 0"
              class="mt-3 text-xs text-gray-400"
            >
              Tentativa {{ contadorTentativas }} de {{ maximoTentativas }}
            </div>
          </div>

          <!-- Estado de Erro -->
          <div
            v-else-if="erro"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center bg-red-50 border border-red-200 rounded-lg m-5"
          >
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-red-600 mb-2 text-lg font-semibold">
              Ops! Algo deu errado
            </h3>
            <p class="mb-5 text-gray-600">{{ erro }}</p>
            <div class="flex gap-3 justify-center flex-wrap">
              <button
                @click="carregarCards"
                class="px-4 py-2 rounded-md border-0 cursor-pointer font-medium transition-all text-sm bg-red-600 text-white hover:bg-red-700"
              >
                Tentar novamente
              </button>
              <button
                @click="limparErro"
                class="px-4 py-2 rounded-md cursor-pointer font-medium transition-all text-sm bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
              >
                Limpar erro
              </button>
            </div>
          </div>

          <!-- Estados Vazios -->
          <div
            v-else-if="cardsFiltrados.length === 0 && todosCards.length === 0"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
          >
            <div class="text-5xl mb-4">📄</div>
            <h3 class="text-gray-700 mb-2 text-lg font-semibold">
              Nenhum documento encontrado
            </h3>
            <p class="mb-5 text-gray-600">
              Sua caixa de entrada está vazia no momento.
            </p>
          </div>
          <div
            v-else-if="cardsFiltrados.length === 0"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
          >
            <div class="text-5xl mb-4">🔍</div>
            <h3 class="text-gray-700 mb-2 text-lg font-semibold">
              Nenhum resultado encontrado
            </h3>
            <p class="mb-5 text-gray-600">
              Nenhum documento encontrado com os filtros aplicados.
            </p>
            <button
              @click="limparTodosFiltros"
              class="px-4 py-2 bg-transparent border border-red-600 text-red-600 rounded text-xs cursor-pointer hover:bg-red-600 hover:text-white transition-all"
            >
              Limpar filtros
            </button>
          </div>

          <!-- Lista de Cards - ADICIONADOS OS EVENTOS E PROPS -->
          <GdCardList
            v-else
            :cards="cardsFiltrados"
            :selected-cards="cardsSelecionados"
            @toggle-card-selection="alternarSelecaoCard"
            @modelo-action="executarAcaoModelo"
          />
        </div>
      </div>
    </div>
  </layout-sidebar-header>
</template>

<script>
import LayoutSidebarHeader from '@/layouts/LayoutSidebarHeader.vue'
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdFilterBarBadge from '@/components/ui/GdFilterBarBadge.vue'
import GdCardList from '@/components/ui/GdCardList.vue'
import GdCheckboxDropdown from '@/components/ui/GdCheckboxDropdown.vue'
import GdEnviarParaDropdown from '@/components/ui/GdEnviarParaDropdown.vue'
import GdButton from '@/components/ui/GdButton.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'
import { cardService } from '@/services/index.js'

export default {
  name: 'GdCaixaEntrada',
  components: {
    LayoutSidebarHeader,
    GdFilterBar,
    GdFilterBarBadge,
    GdCardList,
    GdCheckboxDropdown,
    GdEnviarParaDropdown,
    GdButton,
    GdSearchBar,
    GdDatePicker,
  },
  data() {
    return {
      // Filtros Badge - MODELOS de documento da caixa de entrada
      filterTabs: [
        { id: 'todos', label: 'Todos', count: 10, color: '#1a82d9' },
        {
          id: 'solicitacao-fabrica-software',
          label: 'Solicitação à Fábrica de Software',
          count: 2,
          color: '#10b981',
          modelo: 'Solicitação à Fábrica de Software',
        },
        {
          id: 'solicitacao-orcamento',
          label: 'Solicitação de Orçamento',
          count: 2,
          color: '#f59e0b',
          modelo: 'Solicitação de Orçamento',
        },
        {
          id: 'relatorio-progresso',
          label: 'Relatório de Progresso',
          count: 2,
          color: '#8b5cf6',
          modelo: 'Relatório de Progresso',
        },
        {
          id: 'auditoria-processo',
          label: 'Auditoria de Processo',
          count: 2,
          color: '#ef4444',
          modelo: 'Auditoria de Processo',
        },
        {
          id: 'conciliacao-bancaria',
          label: 'Conciliação Bancária',
          count: 2,
          color: '#06b6d4',
          modelo: 'Conciliação Bancária',
        },
      ],

      // Opções do dropdown checkbox
      acaoesCheckbox: [
        { label: 'Marcar como não lido', value: 'marcar-nao-lido' },
        { label: 'Aprovar', value: 'aprovar' },
        { label: 'Atualizar Fluxo', value: 'atualizar-fluxo' },
        { label: 'Atribuir a Mim', value: 'atribuir-mim' },
        { label: 'Identificar', value: 'identificar' },
        { label: 'Somar Âncoras', value: 'somar-ancoras' },
        { label: 'Agrupar', value: 'agrupar' },
        { label: 'Cancelar', value: 'cancelar' },
        { label: 'Vincular ModeloDocumento', value: 'vincular-modelo' },
        { label: 'Vincular Pasta Digital', value: 'vincular-pasta' },
      ],

      // Opções do dropdown enviar para (marcações/pastas)
      opcoesEnviarPara: [
        { label: 'Diretoria', value: 'diretoria', color: '#2563eb' },
        { label: 'Negócios', value: 'negocios', color: '#16a34a' },
        { label: 'Financeiro', value: 'financeiro', color: '#f59e0b' },
        { label: 'RH', value: 'rh', color: '#ef4444' },
        { label: 'Jurídico', value: 'juridico', color: '#8b5cf6' },
        { label: 'Operações', value: 'operacoes', color: '#06b6d4' },
      ],

      todosCards: [],
      cardsSelecionados: [], // ✅ Array para gerenciar cards selecionados
      carregando: false,
      erro: null,
      contadorTentativas: 0,
      maximoTentativas: 3,
      termoBusca: '',
      intervaloData: null,
      filtroAbaAtiva: 'todos',
      todosCardsSelecionados: false,
    }
  },
  computed: {
    temFiltrosAtivos() {
      return (
        !!(this.termoBusca && this.termoBusca.trim()) ||
        !!(this.intervaloData && this.intervaloData.length === 2)
      )
    },

    cardsFiltrados() {
      return this.obterCardsFiltrados()
    },
  },

  async mounted() {
    await this.carregarCards()
  },

  methods: {
    // ✅ Handler para seleção individual de cards
    alternarSelecaoCard(cardId) {
      console.log('🔄 Alternar seleção do card:', cardId)

      const indice = this.cardsSelecionados.indexOf(cardId)

      if (indice > -1) {
        // Card já está selecionado, remove da seleção
        this.cardsSelecionados.splice(indice, 1)
        console.log('➖ Card desselecionado:', cardId)
      } else {
        // Card não está selecionado, adiciona à seleção
        this.cardsSelecionados.push(cardId)
        console.log('➕ Card selecionado:', cardId)
      }

      console.log('📋 Cards selecionados:', this.cardsSelecionados)

      // Atualizar estado do checkbox "selecionar todos"
      this.atualizarEstadoTodosSelecionados()
    },

    // ✅ Handler para ações em grupo por modelo
    executarAcaoModelo({ action, modelo, cardIds }) {
      console.log('🎯 Ação do modelo:', { action, modelo, cardIds })

      switch (action) {
        case 'atribuir':
          console.log(`📌 Atribuindo todos os cards do modelo "${modelo}"`)
          break
        case 'aprovar':
          console.log(`✅ Aprovando todos os cards do modelo "${modelo}"`)
          break
        case 'processar':
          console.log(`⚙️ Processando conciliação para modelo "${modelo}"`)
          break
        default:
          console.log(`🔧 Executando ação "${action}" para modelo "${modelo}"`)
      }
    },

    // ✅ Atualizar estado do checkbox "selecionar todos"
    atualizarEstadoTodosSelecionados() {
      const totalCardsVisiveis = this.cardsFiltrados.length
      const cardsVisiveisSelecionados = this.cardsFiltrados.filter(card =>
        this.cardsSelecionados.includes(card.id)
      ).length

      this.todosCardsSelecionados =
        totalCardsVisiveis > 0 &&
        cardsVisiveisSelecionados === totalCardsVisiveis

      console.log(
        `📊 Estado "todos selecionados": ${this.todosCardsSelecionados} (${cardsVisiveisSelecionados}/${totalCardsVisiveis})`
      )
    },

    // ✅ Handler do checkbox "selecionar todos" do header
    alternarTodos() {
      console.log(
        '🔄 Alternar todos os cards - Estado atual:',
        this.todosCardsSelecionados
      )

      if (this.todosCardsSelecionados) {
        // Desselecionar todos os cards visíveis
        this.cardsFiltrados.forEach(card => {
          const indice = this.cardsSelecionados.indexOf(card.id)
          if (indice > -1) {
            this.cardsSelecionados.splice(indice, 1)
          }
        })
        console.log('➖ Todos os cards visíveis foram desselecionados')
      } else {
        // Selecionar todos os cards visíveis
        this.cardsFiltrados.forEach(card => {
          if (!this.cardsSelecionados.includes(card.id)) {
            this.cardsSelecionados.push(card.id)
          }
        })
        console.log('➕ Todos os cards visíveis foram selecionados')
      }

      this.atualizarEstadoTodosSelecionados()
      console.log(
        '📋 Cards selecionados após alternar todos:',
        this.cardsSelecionados
      )
    },

    // === CARREGAMENTO DE DADOS ===
    async carregarCards() {
      try {
        this.carregando = true
        this.erro = null

        const cards = await cardService.getCards()
        this.todosCards = Array.isArray(cards) ? cards : []

        // Atualizar contadores dos modelos
        this.atualizarContadoresModelo()

        // ✅ Limpar seleções ao recarregar
        this.cardsSelecionados = []
        this.todosCardsSelecionados = false

        this.contadorTentativas = 0
      } catch (error) {
        console.error('Erro ao carregar cards:', error)
        this.erro = this.obterMensagemErro(error)
        this.todosCards = []

        if (this.contadorTentativas < this.maximoTentativas) {
          this.contadorTentativas++
          setTimeout(() => this.carregarCards(), 2000 * this.contadorTentativas)
        }
      } finally {
        this.carregando = false
      }
    },

    // Atualizar contadores baseado nos modelos dos cards
    atualizarContadoresModelo() {
      // Contar total
      const totalContador = this.todosCards.length
      const abaTotal = this.filterTabs.find(tab => tab.id === 'todos')
      if (abaTotal) abaTotal.count = totalContador

      // Contar por modelo
      this.filterTabs.forEach(tab => {
        if (tab.modelo) {
          const contador = this.todosCards.filter(
            card => card.documento?.modelo === tab.modelo
          ).length
          tab.count = contador
        }
      })
    },

    obterMensagemErro(error) {
      if (error.response?.status === 404) {
        return 'Serviço não encontrado. Tente novamente mais tarde.'
      }
      if (error.response?.status >= 500) {
        return 'Erro interno do servidor. Tente novamente mais tarde.'
      }
      if (error.code === 'NETWORK_ERROR') {
        return 'Erro de conexão. Verifique sua internet.'
      }
      return error.message || 'Erro desconhecido ao carregar documentos'
    },

    limparErro() {
      this.erro = null
      this.contadorTentativas = 0
    },

    // === LÓGICA DE FILTROS ===
    obterCardsFiltrados() {
      let filtrados = [...this.todosCards]

      // Filtro por modelo (aba ativa)
      if (this.filtroAbaAtiva && this.filtroAbaAtiva !== 'todos') {
        filtrados = this.filtrarPorModelo(filtrados)
      }

      if (this.termoBusca?.trim()) {
        filtrados = this.filtrarPorBusca(filtrados)
      }

      if (this.intervaloData?.length === 2) {
        filtrados = this.filtrarPorData(filtrados)
      }

      return this.ordenarCardsPorVencimento(filtrados)
    },

    // Filtro por modelo do documento
    filtrarPorModelo(cards) {
      const abaAtiva = this.filterTabs.find(
        tab => tab.id === this.filtroAbaAtiva
      )
      if (!abaAtiva || !abaAtiva.modelo) return cards

      return cards.filter(card => {
        return card.documento?.modelo === abaAtiva.modelo
      })
    },

    filtrarPorBusca(cards) {
      const buscaMinuscula = this.termoBusca.toLowerCase().trim()

      return cards.filter(card => {
        const camposPesquisaveis = [
          card.remetente?.nome || '',
          card.remetente?.funcao || '',
          card.documento?.modelo || '',
          card.documento?.id || '',
          card.documento?.fluxo || '',
          card.documento?.dirPath || '',
          card.ancora?.projeto || '',
          card.ancora?.prestadorServico || '',
          card.ancora?.unidade || '',
        ]

        return camposPesquisaveis.some(campo =>
          campo.toLowerCase().includes(buscaMinuscula)
        )
      })
    },

    filtrarPorData(cards) {
      const [dataInicio, dataFim] = this.intervaloData

      return cards.filter(card => {
        const dataInicioCard = this.analisarDataCard(card.documento?.dataInicio)
        const vencimentoCard = this.analisarVencimentoCard(card)
        const dataPagamentoCard = this.analisarDataBR(
          card.ancora?.dataPagamento
        )

        return (
          this.dataEstaNoIntervalo(dataInicioCard, dataInicio, dataFim) ||
          this.dataEstaNoIntervalo(vencimentoCard, dataInicio, dataFim) ||
          this.dataEstaNoIntervalo(dataPagamentoCard, dataInicio, dataFim)
        )
      })
    },

    ordenarCardsPorVencimento(cards) {
      return cards.sort((a, b) => {
        const dataA = this.analisarVencimentoCard(a)
        const dataB = this.analisarVencimentoCard(b)

        // Cards sem data vão para o final
        if (!dataA && !dataB) return 0
        if (!dataA) return 1
        if (!dataB) return -1

        // Ordenação crescente (mais vencidos primeiro)
        return dataA - dataB
      })
    },

    // === HANDLERS DE FILTROS ===
    buscar(termo) {
      this.termoBusca = termo || ''
      // Atualizar estado de seleção após filtro
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    limparBusca() {
      this.termoBusca = ''
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    alterarData({ date }) {
      this.intervaloData =
        Array.isArray(date) && date.length === 2 ? date : null
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    limparFiltroData() {
      this.intervaloData = null
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    limparTodosFiltros() {
      this.termoBusca = ''
      this.intervaloData = null
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    // === HANDLERS DOS DROPDOWNS ===
    executarAcaoCheckbox(acao) {
      console.log(
        '🔧 Ação do checkbox:',
        acao,
        'Cards selecionados:',
        this.cardsSelecionados
      )

      if (this.cardsSelecionados.length === 0) {
        console.log('⚠️ Nenhum card selecionado para executar a ação')
        return
      }

      // Aqui você pode implementar as ações específicas
      switch (acao) {
        case 'aprovar':
          console.log(
            '✅ Aprovando cards selecionados:',
            this.cardsSelecionados
          )
          break
        case 'atribuir-mim':
          console.log('📌 Atribuindo cards a mim:', this.cardsSelecionados)
          break
        default:
          console.log(
            `🔧 Executando ação "${acao}" nos cards:`,
            this.cardsSelecionados
          )
      }
    },

    enviarPara(marcador) {
      console.log(
        '📤 Enviar para:',
        marcador,
        'Cards selecionados:',
        this.cardsSelecionados
      )
    },

    // === UTILITÁRIOS DE DATA ===
    analisarDataCard(stringData) {
      if (!stringData) return null

      try {
        // Para formato ISO: "2025-04-15T08:30:00"
        if (stringData.includes('T')) {
          return new Date(stringData)
        }

        // Para formato BR: "15/04/2025"
        const partes = stringData.split('/')
        if (partes.length !== 3) return null

        const [dia, mes, ano] = partes.map(parte => parseInt(parte, 10))

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return null

        return new Date(ano, mes - 1, dia)
      } catch (error) {
        console.warn('Erro ao analisar data:', stringData, error)
        return null
      }
    },

    analisarDataBR(stringData) {
      if (!stringData || typeof stringData !== 'string') return null

      try {
        const partes = stringData.split('/')
        if (partes.length !== 3) return null

        const [dia, mes, ano] = partes.map(parte => parseInt(parte, 10))

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return null

        return new Date(ano, mes - 1, dia)
      } catch (error) {
        console.warn('Erro ao analisar data BR:', stringData, error)
        return null
      }
    },

    analisarVencimentoCard(card) {
      return this.analisarDataBR(card?.vencimento?.data)
    },

    dataEstaNoIntervalo(data, dataInicio, dataFim) {
      if (!data || !dataInicio || !dataFim) return false

      const normalizarData = d =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate())

      const dataNormalizada = normalizarData(data)
      const inicioNormalizado = normalizarData(dataInicio)
      const fimNormalizado = normalizarData(dataFim)

      return (
        dataNormalizada >= inicioNormalizado &&
        dataNormalizada <= fimNormalizado
      )
    },

    formatarIntervaloData(intervaloData) {
      if (
        !intervaloData ||
        !Array.isArray(intervaloData) ||
        intervaloData.length !== 2
      ) {
        return ''
      }

      const [inicio, fim] = intervaloData
      const formatarData = data => {
        try {
          return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        } catch (error) {
          return 'Data inválida'
        }
      }

      return `${formatarData(inicio)} - ${formatarData(fim)}`
    },

    // === OUTROS HANDLERS ===
    alterarFiltro(idAba) {
      this.filtroAbaAtiva = idAba
      console.log('Filtro ativo por modelo:', idAba)
      this.$nextTick(() => {
        this.atualizarEstadoTodosSelecionados()
      })
    },

    adicionarMarcador(novaAba) {
      console.log('Novo marcador adicionado:', novaAba)
    },

    atribuirEmLotes() {
      console.log('Atribuir em lotes')
    },

    atribuirAMim() {
      console.log('Atribuir a mim')
    },

    aprovar() {
      console.log('Aprovar')
    },

    agrupar() {
      console.log('Agrupar')
    },
  },
}
</script>

<style scoped>
/* Layout principal */
.caixa-entrada-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
}

/* Header fixo - não rola */
.header-fixo {
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

/* Conteúdo do header com padding */
.header-content {
  padding: 0 16px;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

/* Linha separadora que vai de canto a canto */
.separador-linha {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
  margin: 0;
}

/* Título dos cards com padding */
.header-cards-title {
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
}

/* Área de scroll - apenas lista de cards */
.area-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

/* Conteúdo da área de scroll com padding */
.scroll-content {
  padding: 0 16px;
}

/* Classe para acessibilidade */
.texto-acessibilidade {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.title-cards-container span {
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 400;
}

@media (max-width: 1024px) and (min-width: 769px) {
  .header-cards-title {
    display: none;
  }
}
</style>

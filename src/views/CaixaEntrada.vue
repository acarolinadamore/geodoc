<template>
  <layout-menu-lateral v-slot="{ sidebarExpanded }">
    <div class="caixa-entrada-container">
      <div class="header-fixo">
        <div class="header-content">
          <div
            class="flex pt-3 pb-1"
            :class="{ 'adicionar-espaco': !sidebarExpanded }"
          >
            <h1 class="text-xl font-semibold text-gray-700 m-0">
              {{ tituloAtual }}
            </h1>
          </div>
          <div class="flex flex-col gap-1">
            <FiltroPaginaMarcador
              :initial-tabs="abasTipoCaixaComContadores"
              :initial-active-tab-id="cardsState.filtros.tipoCaixa || 'todos'"
              @atualizar-aba="alterarTipoCaixa"
              @adicionar-marcador="adicionarMarcador"
            />
            <FiltroModeloDocumento
              :initial-tabs="modelosDaCaixaAtual"
              :selected-tabs="cardsState.filtros.modelos || ['todos']"
              :multiple-selection="true"
              @filter-change="alterarFiltroModelo"
            />
          </div>
          <div
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-2"
          >
            <div
              class="flex flex-col lg:flex-row gap-3 lg:items-center w-full lg:w-auto order-1 lg:order-2"
            >
              <Searchbar
                :initial-value="cardsState.filtros.busca"
                @search-changed="alterarFiltroBusca"
                @clear="limparFiltroBusca"
                class="w-full lg:w-auto flex-1 lg:flex-none"
              />
              <div class="flex gap-2">
                <DatePicker
                  :value="intervaloDataLocal"
                  @change="alterarFiltroData"
                  class="w-full lg:w-auto"
                />
                <DropdownOrdenarPor
                  v-model="ordenacaoAtual"
                  @change="alterarOrdenacao"
                />
              </div>
            </div>
            <div
              class="flex gap-2 flex-wrap w-full lg:w-auto order-2 lg:order-1"
            >
              <Button
                label="Atribuir Documentos em Lotes"
                icon="fa-list"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#fff"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="atribuirEmLotes"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Atribuir a mim"
                :iconSrc="handIcon"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="atribuirAMim"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="aprovarSelecionados"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Agrupar"
                icon="fa-users"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#ffffff"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="agruparSelecionados"
                class="flex-1 lg:flex-none"
              />
            </div>
          </div>
          <!-- Indicadores de Filtros Ativos -->
          <div
            v-if="possuiFiltrosAtivos"
            class="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md gap-3"
            role="status"
            aria-live="polite"
          >
            <div class="flex gap-2 flex-wrap">
              <span
                v-if="cardsState.filtros.busca"
                class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                <span class="sr-only">Filtro de busca ativo:</span>
                🔍 "{{ cardsState.filtros.busca }}"
                <button
                  @click="limparFiltroBusca"
                  class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
                  :aria-label="`Remover filtro de busca: ${cardsState.filtros.busca}`"
                >
                  ×
                </button>
              </span>
              <span
                v-if="filtroDataTexto"
                class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                <span class="sr-only">Filtro de data ativo:</span>
                📅 {{ filtroDataTexto }}
                <button
                  @click="limparFiltroData"
                  class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
                  aria-label="Remover filtro de data"
                >
                  ×
                </button>
              </span>
              <!-- Indicador de modelos selecionados -->
              <span
                v-if="modelosSelecionadosTexto"
                class="inline-flex items-center gap-1 px-2 py-1 bg-purple-600 text-white rounded text-xs"
              >
                <span class="sr-only">Modelos selecionados:</span>
                📋 {{ modelosSelecionadosTexto }}
                <button
                  @click="limparFiltroModelos"
                  class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
                  aria-label="Remover filtro de modelos"
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

        <div class="separador-linha"></div>

        <div v-if="ordenacaoAtual === 'modelos'" class="header-cards-title">
          <div class="flex items-center gap-4 py-2">
            <div class="flex gap-2 items-center">
              <DropdownCheckbox
                :checked-all="checkboxPrincipalMarcado"
                :actions="acoesCheckbox"
                :selected-count="cardsState.cardsSelecionados.length"
                @toggle-all="alternarTodosCards"
                @action="executarAcaoCheckbox"
              />
              <DropdownEnviarPara
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

        <!-- Header simplificado quando ordenado por vencimento -->
        <div v-else class="header-cards-title-simples">
          <div class="flex items-center gap-4 py-2">
            <div class="flex gap-2 items-center">
              <DropdownCheckbox
                :checked-all="todosCardsSelecionados"
                :actions="acoesCheckbox"
                :selected-count="cardsState.cardsSelecionados.length"
                @toggle-all="alternarTodosCards"
                @action="executarAcaoCheckbox"
              />
              <DropdownEnviarPara
                :markers="opcoesEnviarPara"
                @select-marker="enviarPara"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Conteúdo -->
      <div class="area-scroll">
        <div class="scroll-content">
          <!-- Loading -->
          <div
            v-if="cardsState.loading"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
          >
            <div
              class="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"
              aria-label="Carregando"
            ></div>
            <p>Carregando documentos...</p>
          </div>

          <!-- Estado de Erro -->
          <div
            v-else-if="cardsState.error"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center bg-red-50 border border-red-200 rounded-lg m-5"
          >
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-red-600 mb-2 text-lg font-semibold">
              Ops! Algo deu errado
            </h3>
            <p class="mb-5 text-gray-600">{{ cardsState.error }}</p>
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
            v-else-if="cardsState.cards.length === 0 && !possuiFiltrosAtivos"
            class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
          >
            <div class="text-5xl mb-4">📄</div>
            <h3 class="text-gray-700 mb-2 text-lg font-semibold">
              Nenhum documento encontrado
            </h3>
            <p class="mb-5 text-gray-600">
              Sua {{ tituloAtual.toLowerCase() }} está vazia no momento.
            </p>
          </div>

          <div
            v-else-if="cardsState.cards.length === 0 && possuiFiltrosAtivos"
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

          <!-- Lista de Cards -->
          <CardDocumentoLista
            v-if="
              !cardsState.loading &&
              !cardsState.error &&
              cardsState.cards.length > 0
            "
            :cards="cardsState.cards"
            :selected-cards="cardsState.cardsSelecionados"
            :ordenacao="ordenacaoAtual"
            @toggle-card-selection="manipularSelecaoCard"
            @modelo-action="executarAcaoModelo"
          />

          <!-- Paginação -->
          <div
            v-if="cardsState.totalPages > 1"
            class="flex justify-center items-center gap-4 py-6"
          >
            <div class="flex items-center gap-2">
              <button
                :disabled="cardsState.filtros.page === 1"
                @click="alterarPagina(cardsState.filtros.page - 1)"
                class="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>

              <div class="flex gap-1">
                <button
                  v-for="page in paginasVisiveis"
                  :key="page"
                  :class="[
                    'px-3 py-2 rounded border transition-colors',
                    page === cardsState.filtros.page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50',
                  ]"
                  @click="alterarPagina(page)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                :disabled="cardsState.filtros.page === cardsState.totalPages"
                @click="alterarPagina(cardsState.filtros.page + 1)"
                class="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Próxima
              </button>
            </div>

            <div class="text-sm text-gray-600">
              Página {{ cardsState.filtros.page }} de
              {{ cardsState.totalPages }} ({{ cardsState.total }} itens)
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-menu-lateral>
</template>

<script>
import LayoutMenuLateral from '@/layouts/LayoutMenuLateral.vue'
import FiltroPaginaMarcador from '@/components/FiltroPaginaMarcador.vue'
import FiltroModeloDocumento from '@/components/FiltroModeloDocumento.vue'
import CardDocumentoLista from '@/components/CardDocumentoLista.vue'
import DropdownCheckbox from '@/components/DropdownCheckbox.vue'
import DropdownEnviarPara from '@/components/DropdownEnviarPara.vue'
import Button from '@/components/Button.vue'
import Searchbar from '@/components/Searchbar.vue'
import DatePicker from '@/components/DatePicker.vue'
import DropdownOrdenarPor from '@/components/DropdownOrdenarPor.vue'
import { useCards } from '@/composables/useCards'
import handIcon from '@/assets/icons/hand.svg'

export default {
  name: 'CaixaEntrada',
  components: {
    LayoutMenuLateral,
    FiltroPaginaMarcador,
    FiltroModeloDocumento,
    CardDocumentoLista,
    DropdownCheckbox,
    DropdownEnviarPara,
    Button,
    Searchbar,
    DatePicker,
    DropdownOrdenarPor,
  },

  setup() {
    return useCards()
  },

  data() {
    return {
      handIcon,
      intervaloDataLocal: null,
      tituloAtual: 'Caixa de Entrada',
      ordenacaoAtual: 'modelos',

      // NOVO: controle manual do estado do checkbox principal
      checkboxPrincipalMarcado: false,

      abasTipoCaixa: [
        { id: 'todos', label: 'Todos' },
        { id: 'a-configurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'agendamentos', label: 'Pré-agendamento' },
      ],
      marcadoresPessoais: [],
      modelosDisponiveis: [
        { id: 'todos', label: 'Todos', color: '#1a82d9' },
        {
          id: 'solicitacao-fabrica-software',
          label: 'Solicitação à Fábrica de Software',
          color: '#10b981',
        },
        {
          id: 'solicitacao-orcamento',
          label: 'Solicitação de Orçamento',
          color: '#f59e0b',
        },
        {
          id: 'relatorio-progresso',
          label: 'Relatório de Progresso',
          color: '#8b5cf6',
        },
        {
          id: 'auditoria-processo',
          label: 'Auditoria de Processo',
          color: '#ef4444',
        },
        {
          id: 'conciliacao-bancaria',
          label: 'Conciliação Bancária',
          color: '#06b6d4',
        },
        {
          id: 'folha-de-pagamento',
          label: 'Folha de Pagamento',
          color: '#f97316',
        },
      ],
      acoesCheckbox: [
        { label: 'Aprovar', value: 'aprovar' },
        { label: 'Atualizar Fluxo', value: 'atualizar-fluxo' },
        { label: 'Cancelar Documento', value: 'cancelar-documento' },
        { label: 'Identificar', value: 'identificar' },
        { label: 'Somar Âncoras', value: 'somar-ancoras' },
        { label: 'Vincular Modelo Documento', value: 'vincular-modelo' },
        { label: 'Vincular Pasta Digital', value: 'vincular-pasta' },
      ],
    }
  },

  computed: {
    cardsState() {
      return this.state
    },

    // TESTE: FORÇAR SEMPRE FALSE PARA DEBUG
    todosCardsSelecionados() {
      const totalCards = this.cardsState?.cards?.length || 0
      const selecionados = this.cardsState?.cardsSelecionados?.length || 0

      if (totalCards === 0) return false

      return selecionados === totalCards
    },

    abasTipoCaixaComContadores() {
      const contadores = this.cardsState.contagemOriginais || {}

      return this.abasTipoCaixa.map(aba => ({
        ...aba,
        count: contadores[aba.id] || 0,
      }))
    },

    modelosDaCaixaAtual() {
      const contagemOriginais = this.cardsState.contagemOriginais || {}
      const contagemFiltrada = this.cardsState.contadores || {}

      const modelosVisiveis = []

      let totalParaTodos
      if (this.cardsState.filtros.tipoCaixa === 'todos') {
        totalParaTodos =
          contagemOriginais['todos'] || this.cardsState.total || 0
      } else {
        totalParaTodos = this.cardsState.total || 0
      }

      modelosVisiveis.push({
        id: 'todos',
        label: 'Todos',
        color: '#1a82d9',
        count: totalParaTodos,
      })

      this.modelosDisponiveis.forEach(modelo => {
        if (modelo.id !== 'todos') {
          let count

          if (this.cardsState.filtros.tipoCaixa === 'todos') {
            count = contagemOriginais[modelo.id] || 0
          } else {
            count = contagemFiltrada[modelo.id] || 0
          }

          if (count > 0) {
            modelosVisiveis.push({
              ...modelo,
              count: count,
            })
          }
        }
      })

      return modelosVisiveis
    },

    opcoesEnviarPara() {
      const opcoes = []

      if (this.cardsState.filtros.tipoCaixa !== 'todos') {
        opcoes.push({
          label: 'Caixa de Entrada',
          value: 'todos',
          color: '#1a82d9',
        })
      }

      const marcadoresOpcoes = this.marcadoresPessoais
        .filter(m => m.id !== this.cardsState.filtros.tipoCaixa)
        .map(m => ({
          label: m.label,
          value: m.id,
          color: '#2563eb',
        }))

      return [...opcoes, ...marcadoresOpcoes]
    },

    modelosSelecionadosTexto() {
      const filtrosModelos = this.cardsState.filtros.modelos || ['todos']

      if (
        filtrosModelos.length === 0 ||
        (filtrosModelos.length === 1 && filtrosModelos.includes('todos'))
      ) {
        return ''
      }

      const labels = filtrosModelos
        .filter(id => id !== 'todos')
        .map(id => {
          const modelo = this.modelosDisponiveis.find(m => m.id === id)
          return modelo ? modelo.label : id
        })
        .filter(Boolean)

      return labels.length > 0 ? labels.join(', ') : ''
    },

    filtroDataTexto() {
      if (this.cardsState.filtros.filterType === 'day') {
        return `Dia ${this.cardsState.filtros.day}`
      } else if (this.cardsState.filtros.filterType === 'dayMonth') {
        return `${this.cardsState.filtros.day}/${this.cardsState.filtros.month}`
      } else if (
        this.cardsState.filtros.dataInicio &&
        this.cardsState.filtros.dataFim
      ) {
        return this.formatarIntervaloData(
          this.cardsState.filtros.dataInicio,
          this.cardsState.filtros.dataFim
        )
      }
      return ''
    },

    possuiFiltrosAtivos() {
      return !!(
        this.cardsState.filtros.busca ||
        this.filtroDataTexto ||
        this.modelosSelecionadosTexto
      )
    },

    paginasVisiveis() {
      const total = this.cardsState.totalPages || 1
      const atual = this.cardsState.filtros.page || 1
      const paginas = []

      const inicio = Math.max(1, atual - 2)
      const fim = Math.min(total, atual + 2)

      for (let i = inicio; i <= fim; i++) {
        paginas.push(i)
      }

      return paginas
    },
  },

  async mounted() {
    if (!this.verificarServices()) {
      return
    }
    try {
      // Garantir que checkbox inicia desmarcado
      this.checkboxPrincipalMarcado = false

      // Limpar seleções iniciais
      if (this.clearSelections) {
        this.clearSelections()
      }

      // Carregar dados
      await this.carregarMarcadoresPessoais()
      await this.carregarContagemOriginais(this.$cardService)
      await this.carregarCards()

      // Reset final
      this.forcarResetCompleto()
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      this.showToast('Erro ao carregar dados', 'error')
    }
  },

  methods: {
    // MÉTODO DE RESET FORÇADO
    forcarResetCompleto() {
      console.log('🚨 [RESET] FORÇANDO RESET COMPLETO...')

      // 1. Resetar estado manual
      this.checkboxPrincipalMarcado = false

      // 2. Limpar arrays de seleção de todas as formas possíveis
      if (this.cardsState?.cardsSelecionados) {
        this.cardsState.cardsSelecionados.length = 0
        this.cardsState.cardsSelecionados.splice(0)
      }

      if (this.state?.cardsSelecionados) {
        this.state.cardsSelecionados.length = 0
        this.state.cardsSelecionados.splice(0)
      }

      // 3. Chamar métodos de limpeza se existirem
      if (this.clearSelections) {
        this.clearSelections()
      }

      // 4. Forçar atualização reativa
      this.$forceUpdate()

      console.log('✅ [RESET] Reset completo finalizado:', {
        checkboxPrincipalMarcado: this.checkboxPrincipalMarcado,
        cardsStateSelecionados: this.cardsState?.cardsSelecionados?.length || 0,
        todosCardsSelecionados: this.todosCardsSelecionados,
      })
    },

    async carregarMarcadoresPessoais() {
      try {
        const marcadores = await this.$marcadoresService.listar()
        this.marcadoresPessoais = marcadores

        // Adicionar marcadores às abas se não existirem
        marcadores.forEach(m => {
          const jaExiste = this.abasTipoCaixa.some(aba => aba.id === m.id)
          if (!jaExiste) {
            this.abasTipoCaixa.push({ id: m.id, label: m.label })
          }
        })
      } catch (error) {
        console.error('Erro ao carregar marcadores pessoais:', error)
        this.showToast('Erro ao carregar marcadores', 'error')
      }
    },

    async carregarCards() {
      try {
        // Resetar checkbox antes de carregar
        this.checkboxPrincipalMarcado = false

        await this.buscarCards(this.$cardService)

        // Garantir que checkbox permanece desmarcado após carregar
        this.checkboxPrincipalMarcado = false
      } catch (error) {
        console.error('Erro ao carregar cards:', error)
        this.showToast('Erro ao carregar documentos', 'error')
      }
    },

    async alterarTipoCaixa(tipoCaixa) {
      // Reset checkbox quando muda filtro
      this.checkboxPrincipalMarcado = false

      this.alterarFiltros({ tipoCaixa, modelos: ['todos'] })
      await this.buscarCards(this.$cardService)

      const titulosEspecificos = {
        todos: 'Caixa de Entrada',
        'a-configurar': 'A Configurar',
        recebidos: 'Recebidos',
        solicitados: 'Solicitados',
        agendamentos: 'Pré-agendamento',
      }

      if (titulosEspecificos[tipoCaixa]) {
        this.tituloAtual = titulosEspecificos[tipoCaixa]
      } else {
        const aba = this.abasTipoCaixa.find(a => a.id === tipoCaixa)
        if (aba) {
          this.tituloAtual = `Marcador: ${aba.label}`
        }
      }
    },

    async alterarFiltroModelo(modeloId) {
      // Reset checkbox quando muda filtro
      this.checkboxPrincipalMarcado = false

      const selecaoAtual = this.cardsState.filtros.modelos || ['todos']
      let novaSelecao = [...selecaoAtual]

      if (modeloId === 'todos') {
        novaSelecao = ['todos']
      } else {
        novaSelecao = novaSelecao.filter(id => id !== 'todos')

        if (novaSelecao.includes(modeloId)) {
          novaSelecao = novaSelecao.filter(id => id !== modeloId)
        } else {
          novaSelecao.push(modeloId)
        }

        if (novaSelecao.length === 0) {
          novaSelecao = ['todos']
        }
      }

      this.alterarFiltros({ modelos: novaSelecao })
      await this.buscarCards(this.$cardService)
    },

    async alterarFiltroBusca(busca) {
      // Reset checkbox quando muda filtro
      this.checkboxPrincipalMarcado = false

      this.alterarFiltros({ busca })
      await this.buscarCards(this.$cardService)
    },

    async alterarFiltroData(dadosData) {
      // Reset checkbox quando muda filtro
      this.checkboxPrincipalMarcado = false

      if (!dadosData) {
        this.limparFiltroData()
        return
      }

      if (dadosData.filterType) {
        this.alterarFiltros({
          filterType: dadosData.filterType,
          day: dadosData.day,
          month: dadosData.month,
          dataInicio: null,
          dataFim: null,
        })
      } else {
        this.intervaloDataLocal = dadosData
        this.alterarFiltros({
          dataInicio: dadosData.start,
          dataFim: dadosData.end,
          filterType: null,
          day: null,
          month: null,
        })
      }
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroBusca() {
      this.checkboxPrincipalMarcado = false
      this.alterarFiltros({ busca: '' })
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroData() {
      this.checkboxPrincipalMarcado = false
      this.intervaloDataLocal = null
      this.alterarFiltros({
        dataInicio: null,
        dataFim: null,
        filterType: null,
        day: null,
        month: null,
      })
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroModelos() {
      this.checkboxPrincipalMarcado = false
      this.alterarFiltros({ modelos: ['todos'] })
      await this.buscarCards(this.$cardService)
    },

    async limparTodosFiltros() {
      this.checkboxPrincipalMarcado = false
      this.intervaloDataLocal = null
      this.limparFiltros()
      await this.buscarCards(this.$cardService)
    },

    limparErro() {
      this.limparErro()
    },

    async alterarPagina(novaPagina) {
      this.checkboxPrincipalMarcado = false
      this.alterarFiltros({ page: novaPagina })
      await this.buscarCards(this.$cardService)
    },

    alterarOrdenacao(novaOrdenacao) {
      this.checkboxPrincipalMarcado = false
      this.ordenacaoAtual = novaOrdenacao
    },

    async adicionarMarcador(marcador) {
      try {
        await this.$marcadoresService.adicionar(marcador)

        const jaExiste = this.abasTipoCaixa.some(aba => aba.id === marcador.id)
        if (!jaExiste) {
          this.abasTipoCaixa.push({ id: marcador.id, label: marcador.label })
        }

        this.marcadoresPessoais = await this.$marcadoresService.listar()
        await this.carregarContagemOriginais(this.$cardService)
      } catch (error) {
        console.error('Erro ao adicionar marcador:', error)
      }
    },

    verificarServices() {
      const servicesNecessarios = [
        'this.$cardService',
        'this.$marcadoresService',
      ]

      const servicesFaltando = servicesNecessarios.filter(service => {
        return !eval(service)
      })

      if (servicesFaltando.length > 0) {
        console.error('Services não encontrados:', servicesFaltando)
        this.showToast('Erro na inicialização dos services', 'error')
        return false
      }

      return true
    },

    async enviarPara(marcadorId) {
      if (this.cardsState.cardsSelecionados.length === 0) {
        alert('Selecione pelo menos um documento para enviar')
        return
      }

      try {
        const quantidadeDocs = this.cardsState.cardsSelecionados.length

        await this.$cardService.moverParaMarcador(
          this.cardsState.cardsSelecionados,
          marcadorId
        )

        this.clearSelections()
        this.checkboxPrincipalMarcado = false
        await this.carregarContagemOriginais(this.$cardService)
        await this.carregarCards()

        const marcador = this.marcadoresPessoais.find(m => m.id === marcadorId)
        const nomeDestino = marcador ? marcador.label : marcadorId

        alert(
          `${quantidadeDocs} documento${quantidadeDocs > 1 ? 's' : ''} enviado${
            quantidadeDocs > 1 ? 's' : ''
          } para "${nomeDestino}"`
        )
      } catch (error) {
        console.error('Erro ao enviar para marcador:', error)
        alert('Erro ao enviar documentos para o marcador')
      }
    },

    // MÉTODO PRINCIPAL COM DEBUG COMPLETO
    alternarTodosCards(selecionado) {
      console.log('🔄 [HEADER] === INÍCIO alternarTodosCards ===')
      console.log('🔄 [HEADER] Parâmetro recebido:', selecionado)
      console.log('🔄 [HEADER] Estado ANTES:', {
        checkboxPrincipalMarcado: this.checkboxPrincipalMarcado,
        cardsSelecionados: this.cardsState.cardsSelecionados.length,
        cardsTotal: this.cardsState.cards.length,
        metodos: {
          selectAllVisible: typeof this.selectAllVisible,
          clearSelections: typeof this.clearSelections,
        },
      })

      // ATUALIZA o estado manual primeiro
      this.checkboxPrincipalMarcado = selecionado
      console.log(
        '✅ [HEADER] checkboxPrincipalMarcado atualizado para:',
        this.checkboxPrincipalMarcado
      )

      if (selecionado) {
        console.log('✅ [HEADER] Tentando selecionar todos...')

        if (this.selectAllVisible) {
          console.log('🔧 [HEADER] Executando selectAllVisible()...')
          this.selectAllVisible()
          console.log('✅ [HEADER] selectAllVisible() executado')
        } else {
          console.log(
            '🔧 [HEADER] selectAllVisible não disponível, usando fallback...'
          )
          const idsParaSelecionar = this.cardsState.cards.map(card => card.id)
          console.log('📝 [HEADER] IDs para selecionar:', idsParaSelecionar)

          idsParaSelecionar.forEach(id => {
            if (!this.cardsState.cardsSelecionados.includes(id)) {
              this.cardsState.cardsSelecionados.push(id)
              console.log(`✅ [HEADER] Card ${id} adicionado`)
            }
          })
        }
      } else {
        console.log('❌ [HEADER] Tentando deselecionar todos...')

        if (this.clearSelections) {
          console.log('🔧 [HEADER] Executando clearSelections()...')
          this.clearSelections()
          console.log('❌ [HEADER] clearSelections() executado')
        } else {
          console.log(
            '🔧 [HEADER] clearSelections não disponível, usando fallback...'
          )
          this.cardsState.cardsSelecionados.splice(0)
          console.log('❌ [HEADER] Array limpo manualmente')
        }
      }

      console.log('📊 [HEADER] Estado FINAL:', {
        checkboxPrincipalMarcado: this.checkboxPrincipalMarcado,
        cardsSelecionados: this.cardsState.cardsSelecionados.length,
        cardsIds: this.cardsState.cardsSelecionados,
      })
      console.log('🏁 [HEADER] === FIM alternarTodosCards ===')
    },

    // MÉTODO PARA SINCRONIZAR checkbox quando cards são selecionados individualmente
    sincronizarCheckboxPrincipal() {
      if (this.cardsState.cards.length > 0) {
        const idsVisiveis = this.cardsState.cards.map(card => card.id)
        const todosSelecionados = idsVisiveis.every(id =>
          this.cardsState.cardsSelecionados.includes(id)
        )

        if (todosSelecionados && !this.checkboxPrincipalMarcado) {
          this.checkboxPrincipalMarcado = true
          console.log(
            '✅ [SYNC] Checkbox marcado automaticamente - todos selecionados'
          )
        } else if (!todosSelecionados && this.checkboxPrincipalMarcado) {
          this.checkboxPrincipalMarcado = false
          console.log(
            '❌ [SYNC] Checkbox desmarcado automaticamente - nem todos selecionados'
          )
        }
      } else {
        this.checkboxPrincipalMarcado = false
      }
    },

    // MÉTODO MODIFICADO para sincronizar checkbox
    manipularSelecaoCard(cardId) {
      console.log('🔄 [CARD] Manipulando seleção do card:', cardId)
      this.toggleCardSelection(cardId)

      // Sincronizar o checkbox principal após mudança individual
      this.$nextTick(() => {
        this.sincronizarCheckboxPrincipal()
      })
    },

    executarAcaoCheckbox(acao) {
      console.log('🔧 [ACTION] Executando ação:', acao)
      switch (acao) {
        case 'aprovar':
          this.aprovarSelecionados()
          break
        case 'atualizar-fluxo':
          console.log('Atualizar fluxo:', this.cardsState.cardsSelecionados)
          break
        case 'cancelar-documento':
          console.log('Cancelar documento:', this.cardsState.cardsSelecionados)
          break
        case 'identificar':
          console.log('Identificar:', this.cardsState.cardsSelecionados)
          break
        case 'somar-ancoras':
          console.log('Somar âncoras:', this.cardsState.cardsSelecionados)
          break
        case 'vincular-modelo':
          console.log('Vincular modelo:', this.cardsState.cardsSelecionados)
          break
        case 'vincular-pasta':
          console.log(
            'Vincular pasta digital:',
            this.cardsState.cardsSelecionados
          )
          break
      }
    },

    async atribuirEmLotes() {
      console.log('Atribuir em lotes:', this.cardsState.cardsSelecionados)
    },

    async atribuirAMim() {
      if (this.cardsState.cardsSelecionados.length === 0) return
      try {
        const res = await this.$cardService.atribuirCards(
          this.cardsState.cardsSelecionados,
          'eu'
        )
        this.showToast(res.message, 'success')
        this.clearSelections()
        this.checkboxPrincipalMarcado = false
        await this.buscarCards(this.$cardService)
      } catch (error) {
        this.showToast('Erro ao atribuir cards', 'error')
      }
    },

    async aprovarSelecionados() {
      if (this.cardsState.cardsSelecionados.length === 0) return
      try {
        const res = await this.$cardService.aprovarCards(
          this.cardsState.cardsSelecionados
        )
        this.showToast(res.message, 'success')
        this.clearSelections()
        this.checkboxPrincipalMarcado = false
        await this.buscarCards(this.$cardService)
      } catch (error) {
        this.showToast('Erro ao aprovar cards', 'error')
      }
    },

    async agruparSelecionados() {
      if (this.cardsState.cardsSelecionados.length === 0) return
      try {
        const res = await this.$cardService.agruparCards(
          this.cardsState.cardsSelecionados,
          'grupo-padrao'
        )
        this.showToast(res.message, 'success')
        this.clearSelections()
        this.checkboxPrincipalMarcado = false
        await this.buscarCards(this.$cardService)
      } catch (error) {
        this.showToast('Erro ao agrupar cards', 'error')
      }
    },

    executarAcaoModelo({ action, modelo, cardIds }) {
      console.log('Ação do modelo:', { action, modelo, cardIds })
    },

    formatarIntervaloData(inicio, fim) {
      if (!inicio || !fim) return ''

      const formatarData = data => {
        const d = new Date(data)
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${d.getFullYear()}`
      }

      return `${formatarData(inicio)} - ${formatarData(fim)}`
    },

    showToast(message, type = 'info') {
      console.log(`Toast ${type}:`, message)
    },
  },
}
</script>
<style scoped>
.adicionar-espaco {
  padding-left: 50px;
}

.caixa-entrada-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  max-width: 100%;
}
.header-fixo {
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 20;
}
.header-content {
  padding: 0 16px;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.separador-linha {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
  margin: 0;
}
.header-cards-title,
.header-cards-title-simples {
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
}
.area-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
.scroll-content {
  padding: 0 16px;
}
.title-cards-container span {
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 400;
}
.sr-only {
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
@media (max-width: 1024px) and (min-width: 769px) {
  .header-cards-title {
    display: none;
  }
}
</style>

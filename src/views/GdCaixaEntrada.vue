<template>
  <layout-sidebar v-slot="{ sidebarExpanded }">
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
              <GdSearchBar
                :initial-value="cardsState.filtros.busca"
                @search-changed="alterarFiltroBusca"
                @clear="limparFiltroBusca"
                class="w-full lg:w-auto flex-1 lg:flex-none"
              />
              <GdDatePicker
                :value="intervaloDataLocal"
                @change="alterarFiltroData"
                class="w-full lg:w-auto"
              />
            </div>
            <div
              class="flex gap-2 flex-wrap w-full lg:w-auto order-2 lg:order-1"
            >
              <GdButton
                label="Atribuir Documentos em Lotes"
                icon="fa-list"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#fff"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="atribuirEmLotes"
                class="flex-1 lg:flex-none"
              />
              <GdButton
                label="Atribuir a mim"
                :iconSrc="handIcon"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="atribuirAMim"
                class="flex-1 lg:flex-none"
              />
              <GdButton
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                :disabled="cardsState.cardsSelecionados.length === 0"
                @click="aprovarSelecionados"
                class="flex-1 lg:flex-none"
              />
              <GdButton
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
                v-if="
                  cardsState.filtros.dataInicio && cardsState.filtros.dataFim
                "
                class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                <span class="sr-only">Filtro de data ativo:</span>
                📅
                {{
                  formatarIntervaloData(
                    cardsState.filtros.dataInicio,
                    cardsState.filtros.dataFim
                  )
                }}
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

        <!-- Header dos Cards -->
        <div class="header-cards-title">
          <div class="flex items-center gap-4 py-2">
            <div class="flex gap-2 items-center">
              <GdCheckboxDropdown
                :checked-all="todosCardsSelecionados"
                :actions="acoesCheckbox"
                @toggle-all="alternarTodosCards"
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
          <GdCardList
            v-if="
              !cardsState.loading &&
              !cardsState.error &&
              cardsState.cards.length > 0
            "
            :cards="cardsState.cards"
            :selected-cards="cardsState.cardsSelecionados"
            @toggle-card-selection="toggleCardSelection"
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
  </layout-sidebar>
</template>

<script>
import LayoutSidebar from '@/layouts/LayoutSidebar.vue'
import FiltroPaginaMarcador from '@/components/ui/FiltroPaginaMarcador.vue'
import FiltroModeloDocumento from '@/components/ui/FiltroModeloDocumento.vue'
import GdCardList from '@/components/ui/GdCardList.vue'
import GdCheckboxDropdown from '@/components/ui/GdCheckboxDropdown.vue'
import GdEnviarParaDropdown from '@/components/ui/GdEnviarParaDropdown.vue'
import GdButton from '@/components/ui/GdButton.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'
import { useCards } from '@/composables/useCards'
import handIcon from '@/assets/icons/hand.svg'

export default {
  name: 'GdCaixaEntrada',
  components: {
    LayoutSidebar,
    FiltroPaginaMarcador,
    FiltroModeloDocumento,
    GdCardList,
    GdCheckboxDropdown,
    GdEnviarParaDropdown,
    GdButton,
    GdSearchBar,
    GdDatePicker,
  },

  setup() {
    return useCards()
  },

  data() {
    return {
      handIcon,
      intervaloDataLocal: null,
      tituloAtual: 'Caixa de Entrada',
      abasTipoCaixa: [
        { id: 'todos', label: 'Todos' },
        { id: 'a-configurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'lembretes', label: 'Lembretes' },
        // Marcadores pessoais serão inseridos dinamicamente aqui
      ],
      marcadoresPessoais: [], // Lista de marcadores pessoais
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
        { label: 'Atribuir a Mim', value: 'atribuir-mim' },
        { label: 'Marcar como não lido', value: 'marcar-nao-lido' },
        { label: 'Agrupar', value: 'agrupar' },
        { label: 'Cancelar', value: 'cancelar' },
      ],
    }
  },

  computed: {
    cardsState() {
      return this.state
    },

    abasTipoCaixaComContadores() {
      // Usa contagemOriginais para mostrar os totais nas abas
      const contadores = this.cardsState.contagemOriginais || {}

      return this.abasTipoCaixa.map(aba => ({
        ...aba,
        count: contadores[aba.id] || 0,
      }))
    },

    modelosDaCaixaAtual() {
      // Se estamos em "todos", mostra TODOS os modelos disponíveis
      if (this.cardsState.filtros.tipoCaixa === 'todos') {
        return this.modelosDisponiveis.map(modelo => ({
          ...modelo,
          count:
            modelo.id === 'todos'
              ? this.cardsState.total || 0
              : this.cardsState.contadores[modelo.id] || 0,
        }))
      }

      // Para outras caixas, filtra apenas modelos com documentos
      const contadores = this.cardsState.contadores || {}

      const modelosFiltrados = this.modelosDisponiveis.filter(modelo => {
        if (modelo.id === 'todos') return true

        // Verifica se existe contador para este modelo na caixa atual
        const chaveModelo = modelo.id
        return contadores[chaveModelo] && contadores[chaveModelo] > 0
      })

      return modelosFiltrados.map(modelo => ({
        ...modelo,
        count:
          modelo.id === 'todos'
            ? contadores['todos-modelos'] || 0
            : contadores[modelo.id] || 0,
      }))
    },

    opcoesEnviarPara() {
      const opcoes = []

      // Se não estamos em "todos", adiciona opção de voltar para caixa de entrada
      if (this.cardsState.filtros.tipoCaixa !== 'todos') {
        opcoes.push({
          label: 'Caixa de Entrada',
          value: 'todos',
          color: '#1a82d9',
        })
      }

      // Adiciona marcadores pessoais, excluindo a página atual
      const marcadoresOpcoes = this.marcadoresPessoais
        .filter(m => m.id !== this.cardsState.filtros.tipoCaixa)
        .map(m => ({
          label: m.label,
          value: m.id,
          color: '#2563eb', // Cor padrão para marcadores
        }))

      return [...opcoes, ...marcadoresOpcoes]
    },

    modelosSelecionadosTexto() {
      if (
        !this.cardsState.filtros.modelos ||
        this.cardsState.filtros.modelos.length === 0 ||
        this.cardsState.filtros.modelos.includes('todos')
      ) {
        return ''
      }

      const labels = this.cardsState.filtros.modelos
        .map(id => {
          const modelo = this.modelosDisponiveis.find(m => m.id === id)
          return modelo ? modelo.label : id
        })
        .filter(Boolean)

      return labels.join(', ')
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
    console.log('🚀 GdCaixaEntrada mounted')
    console.log('📦 $cardService:', this.$cardService)
    console.log('📦 $marcadoresService:', this.$marcadoresService)

    try {
      // Carrega marcadores primeiro
      await this.carregarMarcadoresPessoais()
      console.log('📌 Marcadores carregados:', this.marcadoresPessoais)
      console.log('📌 Abas atualizadas:', this.abasTipoCaixa)

      // Depois carrega contadores e cards
      await this.carregarContagemOriginais(this.$cardService)
      await this.carregarCards()
    } catch (error) {
      console.error('❌ Erro no mounted da Caixa de Entrada:', error)
    }
  },

  methods: {
    async carregarMarcadoresPessoais() {
      try {
        console.log('🔄 Carregando marcadores pessoais...')
        const marcadores = await this.$marcadoresService.listar()
        console.log('✅ Marcadores recebidos:', marcadores)

        this.marcadoresPessoais = marcadores

        // Adiciona marcadores às abas de tipo de caixa
        marcadores.forEach(m => {
          const jaExiste = this.abasTipoCaixa.some(aba => aba.id === m.id)
          if (!jaExiste) {
            console.log('➕ Adicionando marcador às abas:', m)
            this.abasTipoCaixa.push({ id: m.id, label: m.label })
          }
        })
      } catch (error) {
        console.error('Erro ao carregar marcadores pessoais:', error)
      }
    },

    async carregarCards() {
      await this.buscarCards(this.$cardService)
    },

    async alterarTipoCaixa(tipoCaixa) {
      this.alterarFiltros({ tipoCaixa, modelos: ['todos'] })
      await this.buscarCards(this.$cardService)

      // Atualiza título baseado na aba selecionada
      const aba = this.abasTipoCaixa.find(a => a.id === tipoCaixa)
      if (aba) {
        if (
          [
            'todos',
            'a-configurar',
            'recebidos',
            'solicitados',
            'lembretes',
          ].includes(tipoCaixa)
        ) {
          this.tituloAtual = 'Caixa de Entrada'
        } else {
          this.tituloAtual = `Marcador: ${aba.label}`
        }
      }
    },

    async alterarFiltroModelo(modeloId) {
      this.toggleModelo(modeloId)
      await this.buscarCards(this.$cardService)
    },

    async alterarFiltroBusca(busca) {
      this.alterarFiltros({ busca })
      await this.buscarCards(this.$cardService)
    },

    async alterarFiltroData(intervalo) {
      this.intervaloDataLocal = intervalo
      this.alterarFiltros({
        dataInicio: intervalo?.start || null,
        dataFim: intervalo?.end || null,
      })
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroBusca() {
      this.alterarFiltros({ busca: '' })
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroData() {
      this.intervaloDataLocal = null
      this.alterarFiltros({ dataInicio: null, dataFim: null })
      await this.buscarCards(this.$cardService)
    },

    async limparFiltroModelos() {
      this.alterarFiltros({ modelos: ['todos'] })
      await this.buscarCards(this.$cardService)
    },

    async limparTodosFiltros() {
      this.intervaloDataLocal = null
      this.limparFiltros()
      await this.buscarCards(this.$cardService)
    },

    async alterarPagina(novaPagina) {
      this.alterarFiltros({ page: novaPagina })
      await this.buscarCards(this.$cardService)
    },

    async adicionarMarcador(marcador) {
      try {
        // Salva o marcador no service
        await this.$marcadoresService.adicionar(marcador)

        // Atualiza a lista local
        const jaExiste = this.abasTipoCaixa.some(aba => aba.id === marcador.id)
        if (!jaExiste) {
          this.abasTipoCaixa.push({ id: marcador.id, label: marcador.label })
        }

        // Atualiza lista de marcadores pessoais
        this.marcadoresPessoais = await this.$marcadoresService.listar()

        // Recarrega contadores
        await this.carregarContagemOriginais(this.$cardService)
      } catch (error) {
        console.error('Erro ao adicionar marcador:', error)
      }
    },

    async enviarPara(marcadorId) {
      if (this.cardsState.cardsSelecionados.length === 0) {
        alert('Selecione pelo menos um documento para enviar')
        return
      }

      try {
        const quantidadeDocs = this.cardsState.cardsSelecionados.length

        // Move os cards para o marcador
        await this.$cardService.moverParaMarcador(
          this.cardsState.cardsSelecionados,
          marcadorId
        )

        // Limpa seleção
        this.clearSelections()

        // Recarrega os cards e contadores
        await this.carregarContagemOriginais(this.$cardService)
        await this.carregarCards()

        // Feedback ao usuário
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

    alternarTodosCards(selecionado) {
      if (selecionado) {
        this.selectAllVisible()
      } else {
        this.clearSelections()
      }
    },

    executarAcaoCheckbox(acao) {
      switch (acao) {
        case 'aprovar':
          this.aprovarSelecionados()
          break
        case 'atribuir-mim':
          this.atribuirAMim()
          break
        case 'agrupar':
          this.agruparSelecionados()
          break
        case 'marcar-nao-lido':
          console.log(
            'Marcar como não lido:',
            this.cardsState.cardsSelecionados
          )
          break
        case 'cancelar':
          this.clearSelections()
          break
      }
    },

    // Métodos de ação dos botões
    async atribuirEmLotes() {
      console.log('Atribuir em lotes:', this.cardsState.cardsSelecionados)
      // Implementar lógica
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
        await this.buscarCards(this.$cardService)
      } catch (error) {
        this.showToast('Erro ao agrupar cards', 'error')
      }
    },

    executarAcaoModelo({ action, modelo, cardIds }) {
      console.log('Ação do modelo:', { action, modelo, cardIds })
      // Implementar lógica
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
      // Implementar toast real
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
.header-cards-title {
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

<template>
  <layout-sidebar v-slot="{ sidebarExpanded }">
    <div class="caixa-entrada-container">
      <!-- Header Fixo -->
      <div class="header-fixo">
        <div class="header-content">
          <!-- Título -->
          <div
            class="flex pt-3 pb-1"
            :class="{ 'adicionar-espaco': !sidebarExpanded }"
          >
            <h1 class="text-xl font-semibold text-gray-700 m-0">
              {{ tituloAtual }}
            </h1>
          </div>

          <!-- Filtros -->
          <div class="flex flex-col gap-1">
            <!-- Filtro 1: Tipo de Caixa COM CONTADORES -->
            <GdFilterBar
              :initial-tabs="abasTipoCaixaComContadores"
              :initial-active-tab-id="cardsState.filtros.tipoCaixa || 'todos'"
              @atualizar-aba="alterarTipoCaixa"
              @adicionar-marcador="adicionarMarcador"
            />

            <!-- Filtro 2: Modelos da Caixa Atual COM SELEÇÃO MÚLTIPLA -->
            <GdFilterBarBadge
              :initial-tabs="modelosDaCaixaAtual"
              :selected-tabs="cardsState.filtros.modelos || ['todos']"
              :multiple-selection="true"
              @filter-change="alterarFiltroModelo"
            />
          </div>

          <!-- Controles Simplificados -->
          <div
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-2"
          >
            <!-- Search e DatePicker -->
            <div
              class="flex flex-col lg:flex-row gap-3 lg:items-center w-full lg:w-auto order-1 lg:order-2"
            >
              <GdSearchBar
                :initial-value="cardsState.filtros.busca"
                @search-changed="alterarFiltroBusca"
                @clear="limparFiltroBusca"
                class="w-full lg:w-auto"
              />
              <GdDatePicker
                :value="intervaloDataLocal"
                @change="alterarFiltroData"
                class="w-full lg:w-auto"
              />
            </div>

            <!-- Botões de Ação -->
            <div
              class="flex gap-2 flex-wrap w-full lg:w-auto order-2 lg:order-1"
            >
              <GdButton
                label="Atribuir Documentos em Lotes"
                icon="fa-users"
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
            v-if="possuiFiltrosAtivos()"
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
                :checked-all="todosCardsSelecionados()"
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
                @click="buscarCards($cardService)"
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
            v-else-if="cardsState.cards.length === 0 && !possuiFiltrosAtivos()"
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
            v-else-if="cardsState.cards.length === 0 && possuiFiltrosAtivos()"
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
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdFilterBarBadge from '@/components/ui/GdFilterBarBadge.vue'
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
      intervaloDataLocal: null,
      handIcon,
      showDebug: false,
      abasTipoCaixa: [
        { id: 'todos', label: 'Todos' },
        { id: 'a-configurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'lembretes', label: 'Lembretes' },
      ],
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
      opcoesEnviarPara: [
        { label: 'Diretoria', value: 'diretoria', color: '#2563eb' },
        { label: 'Negócios', value: 'negocios', color: '#16a34a' },
        { label: 'Financeiro', value: 'financeiro', color: '#f59e0b' },
        { label: 'RH', value: 'rh', color: '#ef4444' },
        { label: 'Jurídico', value: 'juridico', color: '#8b5cf6' },
        { label: 'Operações', value: 'operacoes', color: '#06b6d4' },
      ],
    }
  },

  setup() {
    return useCards()
  },

  computed: {
    cardsState() {
      return this.state
    },
    tituloAtual() {
      const titulos = {
        todos: 'Caixa de Entrada',
        'a-configurar': 'A Configurar',
        recebidos: 'Recebidos',
        solicitados: 'Solicitados',
        lembretes: 'Lembretes',
      }
      return titulos[this.cardsState.filtros.tipoCaixa] || 'Caixa de Entrada'
    },
    abasTipoCaixaComContadores() {
      return this.abasTipoCaixa.map(aba => ({
        ...aba,
        count: this.cardsState.contadores[aba.id] || 0,
      }))
    },
    modelosDaCaixaAtual() {
      return this.modelosDisponiveis.map(modelo => ({
        ...modelo,
        count:
          modelo.id === 'todos'
            ? this.cardsState.total
            : this.cardsState.contadores[modelo.id] || 0,
      }))
    },
    modelosSelecionadosTexto() {
      if (
        !this.cardsState.filtros.modelos ||
        this.cardsState.filtros.modelos.includes('todos')
      )
        return null
      const nomes = this.cardsState.filtros.modelos
        .map(id => this.modelosDisponiveis.find(m => m.id === id)?.label)
        .filter(Boolean)
      if (nomes.length === 0) return null
      if (nomes.length === 1) return nomes[0]
      if (nomes.length <= 3) return nomes.join(', ')
      return `${nomes.slice(0, 2).join(', ')} e mais ${nomes.length - 2}`
    },
    paginasVisiveis() {
      const pages = []
      const start = Math.max(1, this.cardsState.filtros.page - 2)
      const end = Math.min(
        this.cardsState.totalPages,
        this.cardsState.filtros.page + 2
      )
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    },
  },

  async mounted() {
    if (this.$cardService) {
      await this.buscarCards(this.$cardService)
    } else {
      console.error('$cardService não está disponível!')
    }
  },

  methods: {
    async alterarTipoCaixa(tipoCaixa) {
      this.alterarFiltros({ tipoCaixa, modelos: ['todos'] })
      await this.buscarCards(this.$cardService)
    },
    async alterarFiltroModelo(modeloId) {
      this.toggleModelo(modeloId)
      await this.buscarCards(this.$cardService)
    },
    async alterarFiltroBusca(busca) {
      this.alterarFiltros({ busca })
      await this.buscarCards(this.$cardService)
    },
    async alterarFiltroData(event) {
      const { date } = event
      let dataInicio = null,
        dataFim = null
      if (Array.isArray(date) && date.length === 2) {
        ;[dataInicio, dataFim] = date
      } else if (date instanceof Date) {
        dataInicio = dataFim = date
      }
      this.alterarFiltros({ dataInicio, dataFim })
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
    async alterarPagina(page) {
      this.alterarFiltros({ page })
      await this.buscarCards(this.$cardService)
    },
    alternarTodosCards() {
      this.todosCardsSelecionados()
        ? this.deselectAllVisible()
        : this.selectAllVisible()
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
    atribuirEmLotes() {
      console.log('Atribuir em lotes:', this.cardsState.cardsSelecionados)
    },
    executarAcaoCheckbox(acao) {
      const actions = {
        aprovar: this.aprovarSelecionados,
        'atribuir-mim': this.atribuirAMim,
        agrupar: this.agruparSelecionados,
      }
      actions[acao]?.()
    },
    executarAcaoModelo({ action, modelo, cardIds }) {
      console.log('Ação do modelo:', { action, modelo, cardIds })
    },
    enviarPara(destino) {
      console.log('Enviar para:', destino, this.cardsState.cardsSelecionados)
    },
    adicionarMarcador(marcador) {
      this.abasTipoCaixa.push({ id: marcador.id, label: marcador.label })
    },
    formatarIntervaloData(dataInicio, dataFim) {
      const formatar = data => {
        if (!data) return ''
        const d = new Date(data)
        return `${String(d.getDate()).padStart(2, '0')}/${String(
          d.getMonth() + 1
        ).padStart(2, '0')}`
      }
      const inicioF = formatar(dataInicio),
        fimF = formatar(dataFim)
      return inicioF === fimF ? inicioF : `${inicioF} - ${fimF}`
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
.debug-contadores {
  background: #f0f0f0;
  border: 2px solid #ff0000;
  padding: 10px;
  margin: 10px 0;
  font-size: 12px;
}
.debug-contadores pre {
  background: white;
  padding: 5px;
  border-radius: 4px;
  overflow-x: auto;
}
@media (max-width: 1024px) and (min-width: 769px) {
  .header-cards-title {
    display: none;
  }
}
</style>

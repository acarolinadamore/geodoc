<template>
  <layout-sidebar-header
    :show-header-date="false"
    :show-header-notification="true"
  >
    <div class="caixa-entrada-container">
      <!-- Header Fixo -->
      <div class="caixa-entrada-header-fixo">
        <!-- Linha 1: Título da Página -->
        <div class="page-title-container">
          <h1 class="titulo-pagina">Caixa de Entrada</h1>
        </div>

        <!-- Linha 2: Filtros de Clique -->
        <div class="filters-container">
          <GdFilterBar class="espacamento-xs" />
          <GdFilterBarBadge
            class="espacamento-xs"
            :initial-tabs="filterTabs"
            @filter-change="handleFilterChange"
            @marker-added="handleMarkerAdded"
          />
        </div>

        <!-- Linha 3: Botões com Search e DatePicker -->
        <div class="buttons-container">
          <div class="grupo-botoes">
            <GdButton
              label="Atribuir a mim"
              variant="outlined"
              border-color="#37c989"
              text-color="#37c989"
              @click="handleAtribuirMim"
            />
            <GdButton
              label="Aprovar"
              icon="fa-check"
              variant="filled"
              bg-color="#37c989"
              text-color="#ffffff"
              @click="handleAprovar"
            />
            <GdButton
              label="Agrupar"
              variant="filled"
              bg-color="#1a82d9"
              text-color="#ffffff"
              @click="handleAgrupar"
            />
            <GdButton
              label="Mais Ações"
              variant="outlined"
              border-color="#6b7280"
              text-color="#6b7280"
              @click="handleMaisAcoes"
            />
          </div>

          <div class="grupo-busca-data">
            <GdSearchBar
              v-model="searchTerm"
              @search="handleSearch"
              @clear="handleClearSearch"
            />
            <GdDatePicker
              v-model="dateRange"
              :placeholder="'Selecionar período'"
              @change="handleDateChange"
            />
          </div>
        </div>

        <!-- Linha 4: Indicador de filtros ativos -->
        <div
          v-if="hasActiveFilters"
          class="filtros-ativos"
          role="status"
          aria-live="polite"
        >
          <div class="indicadores-filtro">
            <span v-if="searchTerm" class="badge-filtro">
              <span class="sr-only">Filtro de busca ativo:</span>
              🔍 "{{ searchTerm }}"
              <button
                @click="clearSearch"
                class="limpar-filtro"
                :aria-label="`Remover filtro de busca: ${searchTerm}`"
              >
                ×
              </button>
            </span>
            <span
              v-if="dateRange && dateRange.length === 2"
              class="badge-filtro"
            >
              <span class="sr-only">Filtro de data ativo:</span>
              📅 {{ formatDateRange(dateRange) }}
              <button
                @click="clearDateFilter"
                class="limpar-filtro"
                :aria-label="`Remover filtro de data: ${formatDateRange(
                  dateRange
                )}`"
              >
                ×
              </button>
            </span>
          </div>
          <button
            @click="clearAllFilters"
            class="limpar-todos-filtros"
            aria-label="Limpar todos os filtros ativos"
          >
            Limpar todos os filtros
          </button>
        </div>

        <!-- Linha 5: Título dos Cards com Dropdowns -->
        <div class="title-card-container">
          <div class="dropdowns-titulo">
            <GdCheckboxDropdown
              :checked-all="allCardsSelected"
              :actions="checkboxActions"
              @toggle-all="handleToggleAll"
              @action="handleCheckboxAction"
            />
            <GdEnviarParaDropdown
              :markers="enviarParaOptions"
              @select-marker="handleEnviarPara"
            />
          </div>
          <div class="titulos-colunas">
            <div class="coluna-titulo"><span>Remetente</span></div>
            <div class="coluna-titulo"><span>Documento</span></div>
            <div class="coluna-titulo"><span>Âncora</span></div>
            <div class="coluna-titulo"><span>Ações</span></div>
          </div>
        </div>
      </div>

      <!-- Área de Rolagem - Apenas Lista de Cards -->
      <div class="area-rolagem">
        <!-- Loading -->
        <div v-if="loading" class="estado-carregamento">
          <div class="spinner-carregamento" aria-label="Carregando"></div>
          <p>Carregando documentos...</p>
          <div v-if="retryCount > 0" class="retry-info">
            Tentativa {{ retryCount }} de {{ maxRetries }}
          </div>
        </div>

        <!-- Estado de Erro -->
        <div v-else-if="error" class="estado-erro">
          <div class="icone-erro">⚠️</div>
          <h3>Ops! Algo deu errado</h3>
          <p>{{ error }}</p>
          <div class="acoes-erro">
            <button @click="loadCards" class="botao-tentar-novamente">
              Tentar novamente
            </button>
            <button @click="clearError" class="botao-limpar-erro">
              Limpar erro
            </button>
          </div>
        </div>

        <!-- Estados Vazios -->
        <div
          v-else-if="filteredCards.length === 0 && allCards.length === 0"
          class="estado-vazio"
        >
          <div class="icone-vazio">📄</div>
          <h3>Nenhum documento encontrado</h3>
          <p>Sua caixa de entrada está vazia no momento.</p>
        </div>
        <div v-else-if="filteredCards.length === 0" class="estado-vazio">
          <div class="icone-vazio">🔍</div>
          <h3>Nenhum resultado encontrado</h3>
          <p>Nenhum documento encontrado com os filtros aplicados.</p>
          <button @click="clearAllFilters" class="botao-limpar-filtros">
            Limpar filtros
          </button>
        </div>

        <!-- Lista de Cards -->
        <GdCardList v-else :cards="filteredCards" />
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
      checkboxActions: [
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
      enviarParaOptions: [
        { label: 'Diretoria', value: 'diretoria', color: '#2563eb' },
        { label: 'Negócios', value: 'negocios', color: '#16a34a' },
        { label: 'Financeiro', value: 'financeiro', color: '#f59e0b' },
        { label: 'RH', value: 'rh', color: '#ef4444' },
        { label: 'Jurídico', value: 'juridico', color: '#8b5cf6' },
        { label: 'Operações', value: 'operacoes', color: '#06b6d4' },
      ],

      allCards: [],
      loading: false,
      error: null,
      retryCount: 0,
      maxRetries: 3,
      searchTerm: '',
      dateRange: null,
      activeTabFilter: 'todos',
      allCardsSelected: false,
    }
  },
  computed: {
    hasActiveFilters() {
      return (
        !!(this.searchTerm && this.searchTerm.trim()) ||
        !!(this.dateRange && this.dateRange.length === 2)
      )
    },

    filteredCards() {
      return this.getFilteredCards()
    },
  },

  async mounted() {
    await this.loadCards()
  },

  methods: {
    // === CARREGAMENTO DE DADOS ===
    async loadCards() {
      try {
        this.loading = true
        this.error = null

        const cards = await cardService.getCards()
        this.allCards = Array.isArray(cards) ? cards : []

        // Atualizar contadores dos modelos
        this.updateModeloCounters()

        this.retryCount = 0
      } catch (error) {
        console.error('Erro ao carregar cards:', error)
        this.error = this.getErrorMessage(error)
        this.allCards = []

        if (this.retryCount < this.maxRetries) {
          this.retryCount++
          setTimeout(() => this.loadCards(), 2000 * this.retryCount)
        }
      } finally {
        this.loading = false
      }
    },

    // Atualizar contadores baseado nos modelos dos cards
    updateModeloCounters() {
      // Contar total
      const totalCount = this.allCards.length
      const todosTab = this.filterTabs.find(tab => tab.id === 'todos')
      if (todosTab) todosTab.count = totalCount

      // Contar por modelo
      this.filterTabs.forEach(tab => {
        if (tab.modelo) {
          const count = this.allCards.filter(
            card => card.documento?.modelo === tab.modelo
          ).length
          tab.count = count
        }
      })
    },

    getErrorMessage(error) {
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

    clearError() {
      this.error = null
      this.retryCount = 0
    },

    // === LÓGICA DE FILTROS ===
    getFilteredCards() {
      let filtered = [...this.allCards]

      // Filtro por modelo (aba ativa)
      if (this.activeTabFilter && this.activeTabFilter !== 'todos') {
        filtered = this.filterByModelo(filtered)
      }

      if (this.searchTerm?.trim()) {
        filtered = this.filterBySearch(filtered)
      }

      if (this.dateRange?.length === 2) {
        filtered = this.filterByDate(filtered)
      }

      return this.sortCardsByVencimento(filtered)
    },

    // Filtro por modelo do documento
    filterByModelo(cards) {
      const activeTab = this.filterTabs.find(
        tab => tab.id === this.activeTabFilter
      )
      if (!activeTab || !activeTab.modelo) return cards

      return cards.filter(card => {
        return card.documento?.modelo === activeTab.modelo
      })
    },

    filterBySearch(cards) {
      const searchLower = this.searchTerm.toLowerCase().trim()

      return cards.filter(card => {
        const searchableFields = [
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

        return searchableFields.some(field =>
          field.toLowerCase().includes(searchLower)
        )
      })
    },

    filterByDate(cards) {
      const [startDate, endDate] = this.dateRange

      return cards.filter(card => {
        const cardDataInicio = this.parseCardDate(card.documento?.dataInicio)
        const cardVencimento = this.parseCardVencimento(card)
        const cardDataPagamento = this.parseCardDateBR(
          card.ancora?.dataPagamento
        )

        return (
          this.isDateInRange(cardDataInicio, startDate, endDate) ||
          this.isDateInRange(cardVencimento, startDate, endDate) ||
          this.isDateInRange(cardDataPagamento, startDate, endDate)
        )
      })
    },

    sortCardsByVencimento(cards) {
      return cards.sort((a, b) => {
        const dateA = this.parseCardVencimento(a)
        const dateB = this.parseCardVencimento(b)

        // Cards sem data vão para o final
        if (!dateA && !dateB) return 0
        if (!dateA) return 1
        if (!dateB) return -1

        // Ordenação crescente (mais vencidos primeiro)
        return dateA - dateB
      })
    },

    // === HANDLERS DE FILTROS ===
    handleSearch(term) {
      this.searchTerm = term || ''
    },

    handleClearSearch() {
      this.searchTerm = ''
    },

    handleDateChange({ date }) {
      this.dateRange = Array.isArray(date) && date.length === 2 ? date : null
    },

    clearSearch() {
      this.searchTerm = ''
    },

    clearDateFilter() {
      this.dateRange = null
    },

    clearAllFilters() {
      this.searchTerm = ''
      this.dateRange = null
    },

    // === HANDLERS DOS DROPDOWNS ===
    handleToggleAll() {
      this.allCardsSelected = !this.allCardsSelected
      console.log('Toggle all cards:', this.allCardsSelected)
    },

    handleCheckboxAction(action) {
      console.log('Checkbox action:', action)
    },

    handleEnviarPara(marker) {
      console.log('Enviar para:', marker)
    },

    // === UTILITÁRIOS DE DATA ===
    parseCardDate(dateString) {
      if (!dateString) return null

      try {
        // Para formato ISO: "2025-04-15T08:30:00"
        if (dateString.includes('T')) {
          return new Date(dateString)
        }

        // Para formato BR: "15/04/2025"
        const parts = dateString.split('/')
        if (parts.length !== 3) return null

        const [day, month, year] = parts.map(part => parseInt(part, 10))

        if (isNaN(day) || isNaN(month) || isNaN(year)) return null
        if (day < 1 || day > 31 || month < 1 || month > 12) return null

        return new Date(year, month - 1, day)
      } catch (error) {
        console.warn('Erro ao parsear data:', dateString, error)
        return null
      }
    },

    parseCardDateBR(dateString) {
      if (!dateString || typeof dateString !== 'string') return null

      try {
        const parts = dateString.split('/')
        if (parts.length !== 3) return null

        const [day, month, year] = parts.map(part => parseInt(part, 10))

        if (isNaN(day) || isNaN(month) || isNaN(year)) return null
        if (day < 1 || day > 31 || month < 1 || month > 12) return null

        return new Date(year, month - 1, day)
      } catch (error) {
        console.warn('Erro ao parsear data BR:', dateString, error)
        return null
      }
    },

    parseCardVencimento(card) {
      return this.parseCardDateBR(card?.vencimento?.data)
    },

    isDateInRange(date, startDate, endDate) {
      if (!date || !startDate || !endDate) return false

      const normalizeDate = d =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate())

      const normalizedDate = normalizeDate(date)
      const normalizedStart = normalizeDate(startDate)
      const normalizedEnd = normalizeDate(endDate)

      return (
        normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd
      )
    },

    formatDateRange(dateRange) {
      if (!dateRange || !Array.isArray(dateRange) || dateRange.length !== 2) {
        return ''
      }

      const [start, end] = dateRange
      const formatDate = date => {
        try {
          return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        } catch (error) {
          return 'Data inválida'
        }
      }

      return `${formatDate(start)} - ${formatDate(end)}`
    },

    // === OUTROS HANDLERS ===
    handleFilterChange(tabId) {
      this.activeTabFilter = tabId
      console.log('Filtro ativo por modelo:', tabId)
    },

    handleMarkerAdded(newTab) {
      console.log('Novo marcador adicionado:', newTab)
    },

    handleAtribuirMim() {
      console.log('Atribuir a mim')
    },

    handleAprovar() {
      console.log('Aprovar')
    },

    handleAgrupar() {
      console.log('Agrupar')
    },

    handleMaisAcoes() {
      console.log('Mais ações')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* Variáveis CSS */
:root {
  --primary-color: #1a82d9;
  --success-color: #37c989;
  --danger-color: #dc2626;
  --warning-color: #f59e0b;
  --text-primary: #4b5563;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --background-light: #f8fafc;
  --background-error: #fef2f2;
  --border-error: #fecaca;
}

.caixa-entrada-container {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Header Fixo */
.caixa-entrada-header-fixo {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  gap: 8px;
  flex-shrink: 0;
}

/* Linha 1: Título */
.page-title-container {
  display: flex;
}

.titulo-pagina {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* Linha 2: Filtros */
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Linha 3: Botões */
.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.grupo-botoes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.grupo-busca-data {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Linha 4: Filtros Ativos */
.filtros-ativos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--background-light);
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  gap: 12px;
}

.indicadores-filtro {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-filtro {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.limpar-filtro {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
  transition: background-color 0.2s ease;
  border-radius: 2px;
}

.limpar-filtro:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.limpar-todos-filtros,
.botao-limpar-filtros {
  padding: 4px 8px;
  background: none;
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.limpar-todos-filtros:hover,
.botao-limpar-filtros:hover {
  background-color: var(--danger-color);
  color: white;
}

/* Linha 5: Título dos Cards */
.title-card-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-top: 1px solid var(--border-color);
}

.dropdowns-titulo {
  display: flex;
  gap: 8px;
  align-items: center;
}

.titulos-colunas {
  display: flex;
  flex: 1;
  gap: 16px;
}

.coluna-titulo {
  flex: 1;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Área de Rolagem */
.area-rolagem {
  flex: 1;
  overflow-y: auto;
}

/* Estados */
.estado-carregamento,
.estado-vazio,
.estado-erro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--text-muted);
  text-align: center;
}

.estado-erro {
  background-color: var(--background-error);
  border: 1px solid var(--border-error);
  border-radius: 8px;
  margin: 20px 0;
}

.icone-erro,
.icone-vazio {
  font-size: 48px;
  margin-bottom: 16px;
}

.estado-erro h3,
.estado-vazio h3 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}

.estado-erro h3 {
  color: var(--danger-color);
}

.estado-erro p,
.estado-vazio p {
  margin-bottom: 20px;
  color: var(--text-muted);
}

.retry-info {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

.acoes-erro {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.botao-tentar-novamente,
.botao-limpar-erro {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}

.botao-tentar-novamente {
  background-color: var(--danger-color);
  color: white;
}

.botao-tentar-novamente:hover {
  background-color: #b91c1c;
}

.botao-limpar-erro {
  background-color: transparent;
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
}

.botao-limpar-erro:hover {
  background-color: var(--danger-color);
  color: white;
}

/* Spinner */
.spinner-carregamento {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: girar 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes girar {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Classes utilitárias para espaçamento */
.espacamento-xs {
  margin-bottom: 4px;
}

.espacamento-sm {
  margin-bottom: 8px;
}

.espacamento-md {
  margin-bottom: 12px;
}

.espacamento-lg {
  margin-bottom: 16px;
}

/* Acessibilidade */
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

/* Responsividade */
@media (max-width: 768px) {
  .caixa-entrada-header-fixo {
    padding: 12px 16px;
    gap: 8px;
  }

  .buttons-container {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .grupo-botoes {
    justify-content: center;
  }

  .grupo-busca-data {
    flex-direction: column;
    gap: 8px;
  }

  .title-card-container {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .dropdowns-titulo {
    justify-content: center;
  }

  .area-rolagem {
    padding: 0 16px 16px;
  }

  /* Responsivo para vencimento */
  .card-vencimento-responsivo {
    display: flex;
    flex-direction: column-reverse;
  }
}

@media (max-width: 640px) {
  .titulo-pagina {
    font-size: 20px;
  }

  .grupo-botoes {
    flex-direction: column;
  }

  .estado-carregamento,
  .estado-vazio,
  .estado-erro {
    padding: 24px 16px;
  }

  .icone-erro,
  .icone-vazio {
    font-size: 36px;
  }
}
</style>

<template>
  <div class="flex min-h-screen">
    <GdSidebar class="flex-shrink-0" />
    <div class="flex-1 flex flex-col">
      <GdHeader />
      <div class="flex-1 p-6 font-sans antialiased">
        <h1 class="title mb-5">Caixa de Entrada</h1>

        <GdFilterBar class="mb-1" />
        <GdFilterBarBadge
          class="mb-4"
          :initial-tabs="filterTabs"
          @filter-change="handleFilterChange"
          @marker-added="handleMarkerAdded"
        />

        <div class="controls-container mb-6 mt-8">
          <!-- Grupo 1: Dropdowns -->
          <div class="dropdowns-group">
            <GdCheckboxDropdown />
            <GdEnviarParaDropdown />
          </div>

          <!-- Grupo 2: Botões -->
          <div class="buttons-group">
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
          </div>

          <!-- Grupo 3: Search e Date Picker -->
          <div class="search-group">
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

        <!-- Indicador de filtros ativos -->
        <div v-if="hasActiveFilters" class="active-filters mb-4">
          <div class="filter-indicators">
            <span v-if="searchTerm" class="filter-badge">
              🔍 "{{ searchTerm }}"
              <button @click="clearSearch" class="clear-filter">×</button>
            </span>
            <span
              v-if="dateRange && dateRange.length === 2"
              class="filter-badge"
            >
              📅 {{ formatDateRange(dateRange) }}
              <button @click="clearDateFilter" class="clear-filter">×</button>
            </span>
          </div>
          <button @click="clearAllFilters" class="clear-all-filters">
            Limpar todos os filtros
          </button>
        </div>

        <div
          class="card-heading flex items-center justify-between p-3 mb-4 text-sm text-gray-400"
        >
          <div class="flex-1"><span>Remetente</span></div>
          <div class="flex-1"><span>Documento</span></div>
          <div class="flex-1"><span>Âncora</span></div>
          <div class="flex-1"><span>Ações</span></div>
        </div>

        <!-- Loading ou Cards -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Carregando documentos...</p>
        </div>
        <div
          v-else-if="filteredCards.length === 0 && allCards.length === 0"
          class="empty-state"
        >
          <p>Nenhum documento encontrado.</p>
        </div>
        <div v-else-if="filteredCards.length === 0" class="empty-state">
          <p>Nenhum documento encontrado com os filtros aplicados.</p>
          <button @click="clearAllFilters" class="clear-filters-btn">
            Limpar filtros
          </button>
        </div>
        <GdCardList v-else :cards="filteredCards" />
      </div>
    </div>
  </div>
</template>

<script>
import GdHeader from '@/components/ui/GdHeader.vue'
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdFilterBarBadge from '@/components/ui/GdFilterBarBadge.vue'
import GdCardList from '@/components/ui/GdCardList.vue'
import GdSidebar from '@/components/ui/GdSidebar.vue'
import GdCheckboxDropdown from '@/components/ui/GdCheckboxDropdown.vue'
import GdEnviarParaDropdown from '@/components/ui/GdEnviarParaDropdown.vue'
import GdButton from '@/components/ui/GdButton.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'
import { cardService } from '@/services/index.js'

export default {
  name: 'GdCaixaEntrada',
  components: {
    GdHeader,
    GdFilterBar,
    GdFilterBarBadge,
    GdCardList,
    GdSidebar,
    GdCheckboxDropdown,
    GdEnviarParaDropdown,
    GdButton,
    GdSearchBar,
    GdDatePicker,
  },
  data() {
    return {
      filterTabs: [
        { id: 'todos', label: 'Todos', count: 15, color: '#1a82d9' },
        {
          id: 'aConfigurar',
          label: 'A Configurar',
          count: 3,
          color: '#f59e0b',
        },
        { id: 'recebidos', label: 'Recebidos', count: 8, color: '#10b981' },
        { id: 'solicitados', label: 'Solicitados', count: 2, color: '#8b5cf6' },
        { id: 'lembretes', label: 'Lembretes', count: 1, color: '#ef4444' },
      ],
      allCards: [],
      loading: false,
      searchTerm: '',
      dateRange: null,
      activeTabFilter: 'todos',
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
      let filtered = [...this.allCards]

      // Filtro por busca
      if (this.searchTerm && this.searchTerm.trim()) {
        const searchLower = this.searchTerm.toLowerCase().trim()
        filtered = filtered.filter(card => {
          const searchableFields = [
            card.remetente?.nome || '',
            card.documento?.tipo || '',
            card.documento?.id || '',
            card.ancora?.projeto || '',
            card.ancora?.prestadorServico || '',
          ]

          return searchableFields.some(field =>
            field.toLowerCase().includes(searchLower)
          )
        })
      }

      // Filtro por data
      if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange
        filtered = filtered.filter(card => {
          const cardDate = this.parseCardDate(card.documento?.dataInicio)
          const cardVencimento = this.parseCardVencimento(card)

          return (
            this.isDateInRange(cardDate, startDate, endDate) ||
            this.isDateInRange(cardVencimento, startDate, endDate)
          )
        })
      }

      // Ordenação por vencimento (mais vencidos primeiro)
      return this.sortCardsByVencimento(filtered)
    },
  },

  async mounted() {
    await this.loadCards()
  },

  methods: {
    async loadCards() {
      try {
        this.loading = true
        const cards = await cardService.getCards()
        this.allCards = Array.isArray(cards) ? cards : []
      } catch (error) {
        console.error('Erro ao carregar cards:', error)
        this.allCards = []
      } finally {
        this.loading = false
      }
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

    // === UTILITÁRIOS DE DATA ===
    parseCardDate(dateString) {
      if (!dateString || typeof dateString !== 'string') return null

      try {
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

    parseCardVencimento(card) {
      return this.parseCardDate(card?.vencimento?.data)
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
      // TODO: Implementar filtro por aba se necessário
    },

    handleMarkerAdded(newTab) {
      // TODO: Implementar se necessário
      console.log('Novo marcador adicionado:', newTab)
    },

    handleAtribuirMim() {
      // TODO: Implementar ação
      console.log('Atribuir a mim')
    },

    handleAprovar() {
      // TODO: Implementar ação
      console.log('Aprovar')
    },

    handleAgrupar() {
      // TODO: Implementar ação
      console.log('Agrupar')
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  margin: 0;
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  color: #4b5563;
}

.card-heading {
  border-bottom: 1px solid #e5e7eb;
}

.controls-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 32px;
}

.dropdowns-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.buttons-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.search-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.active-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.filter-indicators {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #1a82d9;
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.clear-filter {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
}

.clear-filter:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.clear-all-filters,
.clear-filters-btn {
  padding: 6px 12px;
  background: none;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.clear-all-filters:hover,
.clear-filters-btn:hover {
  background-color: #dc2626;
  color: white;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #1a82d9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .controls-container {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .controls-container {
    flex-direction: column;
    gap: 16px;
  }

  .dropdowns-group,
  .buttons-group,
  .search-group {
    width: 100%;
  }

  .active-filters {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
}

@media (max-width: 640px) {
  .dropdowns-group,
  .buttons-group,
  .search-group {
    flex-direction: column;
  }
}
</style>

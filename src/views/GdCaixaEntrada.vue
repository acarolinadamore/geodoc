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

        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 mt-8"
        >
          <div class="flex flex-col xl:flex-row gap-4">
            <div class="flex flex-col sm:flex-row gap-3">
              <GdCheckboxDropdown />
              <GdEnviarParaDropdown />
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <GdButton
                label="Atribuir a mim"
                :iconSrc="require('@/assets/icons/hand.svg')"
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
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <GdSearchBar />
            <GdDatePicker />
          </div>
        </div>

        <div
          class="card-heading flex items-center justify-between p-3 mb-4 text-sm text-gray-400"
        >
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

        <GdCardList :cards="sampleTasks" />
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
      sampleTasks: [],
      loading: false,
    }
  },
  async mounted() {
    await this.loadCards()
  },
  methods: {
    async loadCards() {
      try {
        this.loading = true
        const cards = await cardService.getCards()
        this.sampleTasks = cards
      } catch (error) {
        console.error('Erro ao carregar cards:', error)
      } finally {
        this.loading = false
      }
    },
    handleFilterChange(tabId) {
      console.log('Filtro alterado:', tabId)
    },
    handleMarkerAdded(newTab) {
      console.log('Novo marcador adicionado:', newTab)
    },
    handleAtribuirMim() {
      console.log('Atribuir a mim clicado')
    },
    handleAprovar() {
      console.log('Aprovar clicado')
    },
    handleAgrupar() {
      console.log('Agrupar clicado')
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
</style>

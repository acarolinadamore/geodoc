<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Barra de busca + abas horizontal -->
    <div
      class="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4"
    >
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar abas..."
        class="flex-shrink-0 w-64 px-3 py-2 border rounded focus:outline-none focus:ring-2"
        style="--tw-ring-color: #42b983"
      />

      <nav class="flex space-x-4 overflow-x-auto">
        <button
          v-for="tab in filteredTabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          :class="[
            'whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium cursor-pointer',
            activeTabId === tab.id
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-500',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Conteúdo da aba selecionada -->
    <main class="flex-grow overflow-auto p-0 bg-white w-full">
      <!-- removido max-w-5xl e mx-auto -->
      <component
        :is="activeTab.component"
        v-bind="activeTab.props || {}"
        :key="activeTabId"
      />
    </main>
  </div>
</template>

<script>
import UserProfileDropdown from '@/components/ui/UserProfileDropdown.vue'
import GdHeader from '@/components/ui/GdHeader.vue'
import StatusCard from '@/components/ui/StatusCard.vue'
import GdButton from '@/components/ui/GdButton.vue'
import GdHeadingExemplo from '@/views/exemplos/GdHeadingExemplo.vue'
import GdHeaderExemplo from '@/views/exemplos/GdHeaderExemplo.vue'
import GdButtonExemplo from '@/views/exemplos/GdButtonExemplo.vue'
import GdSidebar from '@/components/ui/GdSidebar.vue'
import GdSidebarExemplo from './exemplos/GdSidebarExemplo.vue'
import GdCardExemplo from './exemplos/GdCardExemplo.vue'
import FiltroPaginaMarcador from '@/components/ui/FiltroPaginaMarcador.vue'
import GdCardList from '@/components/ui/GdCardList.vue'

const StatusCardsExample = {
  components: { StatusCard },
  template: `
    <div class="p-6">
      <p class="text-gray-600 mb-8">
        Lista de componentes de status disponíveis no sistema:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard
          titulo="Documentos Aprovados"
          :total="42"
          :documentos="['Requisição A', 'Relatório B']"
          cor-bg="bg-green-100"
        />
        <StatusCard
          titulo="Pendentes de Assinatura"
          :total="18"
          :documentos="['Contrato X', 'Proc. Y']"
          cor-bg="bg-yellow-100"
        />
        <StatusCard
          titulo="Arquivados"
          :total="73"
          :documentos="['Doc A', 'Doc B', 'Doc C']"
          cor-bg="bg-gray-100"
        />
        <StatusCard
          titulo="Rejeitados"
          :total="5"
          :documentos="['Relatório 3', 'Formulário Z']"
          cor-bg="bg-red-100"
        />
      </div>
    </div>
  `,
}

export default {
  name: 'ComponentesExemplo',
  components: {
    GdButton,
    UserProfileDropdown,
    GdHeader,
    StatusCard,
    GdHeadingExemplo,
    GdHeaderExemplo,
    GdButtonExemplo,
    GdSidebar,
    GdSidebarExemplo,
    GdCardExemplo,
    FiltroPaginaMarcador,
    GdCardList,
  },
  data() {
    return {
      searchTerm: '',
      tabs: [
        { id: 'button', label: 'Button', component: GdButtonExemplo },
        { id: 'heading', label: 'Heading', component: GdHeadingExemplo },
        { id: 'header', label: 'Header', component: GdHeaderExemplo },
        { id: 'sidebar', label: 'Sidebar', component: GdSidebarExemplo },
        {
          id: 'filterbar',
          label: 'FilterBar',
          component: FiltroPaginaMarcador,
        },
        { id: 'cardlist', label: 'CardList', component: GdCardList },
        { id: 'card', label: 'Card', component: GdCardExemplo },
        {
          id: 'status-card',
          label: 'Status Card',
          component: StatusCardsExample,
        },
      ],
      activeTabId: 'card',
    }
  },
  computed: {
    tabsSorted() {
      return [...this.tabs].sort((a, b) => a.label.localeCompare(b.label))
    },
    filteredTabs() {
      if (!this.searchTerm) return this.tabsSorted
      const term = this.searchTerm.toLowerCase()
      return this.tabsSorted.filter(tab =>
        tab.label.toLowerCase().includes(term)
      )
    },
    activeTab() {
      return this.tabs.find(t => t.id === this.activeTabId) || this.tabs[0]
    },
  },
  methods: {
    selectTab(id) {
      this.activeTabId = id
    },
  },
}
</script>

<style scoped>
nav::-webkit-scrollbar {
  height: 6px;
}
nav::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 3px;
}
</style>

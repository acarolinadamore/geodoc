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
        class="flex-shrink-0 w-64 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"
      />

      <nav class="flex space-x-4 overflow-x-auto">
        <button
          v-for="tab in filteredTabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          :class="[
            'whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium cursor-pointer',
            activeTabId === tab.id
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Conteúdo da aba selecionada -->
    <main class="flex-grow overflow-auto p-6 max-w-5xl mx-auto">
      <component :is="activeTab.component" />
    </main>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'
import UserProfileDropdown from '@/components/UserProfileDropdown.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import StatusCard from '@/components/StatusCard.vue'

// Componente demo para Status Card (se quiser incluir)
const StatusCardsExample = {
  components: { StatusCard },
  template: `
    <div>
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
    SidebarMenu,
    UserProfileDropdown,
    HeaderComponent,
    StatusCard,
  },
  data() {
    return {
      searchTerm: '',
      tabs: [
        {
          id: 'header',
          label: 'Header',
          component: HeaderComponent,
        },
        {
          id: 'sidebar',
          label: 'Sidebar',
          component: SidebarMenu,
        },
        {
          id: 'dropdown-user',
          label: 'Dropdown User',
          component: UserProfileDropdown,
          props: {
            'user-name': 'Maria Oliveira',
            'user-image': '/assets/users/maria.jpg',
          },
        },
        {
          id: 'status-card',
          label: 'Status Card',
          component: StatusCardsExample,
        },
      ],
      activeTabId: 'header',
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
      // Se tiver props, passamos para o componente via extends
      const tab = this.tabs.find(t => t.id === this.activeTabId) || this.tabs[0]
      if (tab.props) {
        return {
          ...tab,
          extends: tab.component,
          propsData: tab.props,
        }
      }
      return tab
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
/* Barra de abas horizontal */
nav::-webkit-scrollbar {
  height: 6px;
}
nav::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 3px;
}
</style>

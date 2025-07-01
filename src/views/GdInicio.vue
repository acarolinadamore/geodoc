<template>
  <layout-sidebar v-slot="{ sidebarExpanded }">
    <div class="min-h-screen space-y-6 bg-inicio">
      <!-- Seção Boas-Vindas -->
      <div class="bg-white shadow-sm flex flex-col gap-1">
        <div
          class="flex items-center space-x-1 px-3 pt-3"
          :class="{ 'adicionar-espaco': !sidebarExpanded }"
        >
          <span class="text-3xl">👋</span>
          <h1 class="text-3xl font-semibold text-gray-800">
            Bem-vinda, <strong>Melanie</strong>
          </h1>
        </div>
        <p class="text-gray-600 px-6 pb-6 text-left">
          Ao seu sistema de Gestão de Processos internos
        </p>
      </div>
      <!-- Container Painel Cards -->
      <div
        class="px-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 container-cards"
      >
        <!-- Card Pendentes -->
        <div
          class="relative rounded-xl p-6 text-left text-white bg-yellow-400 shadow hover:shadow-md transition-all max-h-[160px] overflow-hidden"
        >
          <div class="mb-4">
            <h3 class="text-lg font-medium">Pendentes</h3>
          </div>
          <div class="text-4xl font-bold text-left">2</div>
          <a
            href="/painel/pendentes"
            class="absolute top-4 right-4 w-7 h-7 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center transition-all"
            title="Ver detalhes"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-black"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 14.707a1 1 0 010-1.414L13.586 5H9a1 1 0 110-2h7a1 1 0 011 1v7a1 1 0 11-2 0V6.414l-8.293 8.293a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <!-- Outros Cards -->
        <div
          v-for="card in cards"
          :key="card.titulo"
          class="relative rounded-xl p-5 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-800 text-left max-h-[160px] overflow-hidden"
        >
          <div class="mb-4">
            <h3 class="text-lg font-medium">{{ card.titulo }}</h3>
          </div>
          <div class="text-4xl font-bold text-left">{{ card.valor }}</div>
          <a
            :href="card.link"
            class="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            title="Ver detalhes"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 14.707a1 1 0 010-1.414L13.586 5H9a1 1 0 110-2h7a1 1 0 011 1v7a1 1 0 11-2 0V6.414l-8.293 8.293a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <!-- Últimos Documentos e Lembretes lado a lado -->
      <div class="flex flex-col md:flex-row gap-6 mx-6">
        <!-- Últimos Documentos -->
        <div
          class="flex-1 rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-800"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-medium text-left">
              Últimos Documentos Acessados
            </h3>
            <v-icon name="sync" class="w-5 h-5 text-gray-500" />
          </div>
          <div class="flex flex-col gap-1 text-left">
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Folha de Pagamento / Abril 2025
            </div>
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Contrato Prestador / Jurídico
            </div>
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Relatório de Indicadores / Financeiro
            </div>
          </div>
        </div>

        <!-- Lembretes -->
        <div
          class="flex-1 rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-800"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-medium text-left">Lembretes</h3>
            <v-icon name="bell" class="w-5 h-5 text-gray-500" />
          </div>
          <div class="flex flex-col gap-1 text-left">
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Documento pendente assinatura
            </div>
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Folha de Pagamento / Maio 2025
            </div>
            <div
              class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            >
              Relatório de Progresso / Projeto X
            </div>
          </div>
        </div>
      </div>
      <!--  Busca -->
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-6 space-y-4 container-busca"
      >
        <h2 class="text-xl font-semibold text-gray-800 text-left">
          Busca Rápida de Documento
        </h2>
        <p class="text-gray-600 text-sm text-left">
          Encontre rapidamente documentos pelo título, número, unidade ou etapa.
          Use os filtros para refinar sua busca.
        </p>
        <div class="w-full">
          <gd-search-bar
            v-model="busca"
            placeholder="Buscar documentos..."
            @search-changed="busca = $event"
            @clear="busca = ''"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </layout-sidebar>
</template>

<script>
import LayoutSidebar from '@/layouts/LayoutSidebar.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'

export default {
  name: 'GdInicio',
  components: {
    LayoutSidebar,
    GdSearchBar,
  },
  data() {
    return {
      busca: '',
      cards: [
        {
          titulo: 'A Configurar',
          valor: 2,
          link: '/painel/configurar',
        },
        {
          titulo: 'Recebidos',
          valor: 8,
          link: '/painel/recebidos',
        },
        {
          titulo: 'Solicitados',
          valor: 4,
          link: '/painel/solicitados',
        },
      ],
    }
  },
  methods: {
    limparBusca() {
      this.busca = ''
    },
  },
}
</script>

<style scoped>
.search-container {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
}

.bg-inicio {
  background-color: #f5f7fa;
}

.adicionar-espaco {
  padding-left: 50px;
}
</style>

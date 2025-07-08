<template>
  <layout-menu-lateral v-slot="{ sidebarExpanded }">
    <div class="min-h-screen space-y-6">
      <div class="bg-white sombra flex flex-col gap-1 pl-6 pb-4">
        <div
          class="flex items-center space-x-1 pt-3"
          :class="{ 'adicionar-espaco': !sidebarExpanded }"
        >
          <span class="text-2xl">👋</span>
          <h1 class="text-2xl font-semibold text-gray-800">
            Bem-vinda, <strong>Melanie</strong>
          </h1>
        </div>
        <div>
          <p class="text-gray-600 text-left">
            Ao seu sistema de Gestão de Processos internos
          </p>
        </div>
      </div>

      <div
        class="px-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 container-cards"
      >
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

      <div class="flex flex-col md:flex-row gap-6 mx-6">
        <card-links
          titulo="Últimos Documentos Acessados"
          :links="ultimosDocumentos"
        />

        <card-links titulo="Pré-agendamento" :links="preAgendamento" />
      </div>

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
          <div
            class="input-busca flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
          >
            <svg
              class="w-4 h-4 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              v-model="busca"
              type="text"
              class="flex-1 border-none outline-none"
              placeholder="Buscar documentos..."
            />
            <button
              v-if="busca"
              @click="limparBusca"
              class="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </layout-menu-lateral>
</template>

<script>
import LayoutMenuLateral from '@/layouts/LayoutMenuLateral.vue'
import CardLinks from '@/components/CardLinks.vue'

export default {
  name: 'Painel',
  components: {
    LayoutMenuLateral,
    CardLinks,
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
      ultimosDocumentos: [
        {
          id: 1,
          titulo: 'Folha de Pagamento / Abril 2025',
          url: '/documento/1',
        },
        {
          id: 2,
          titulo: 'Contrato Prestador / Jurídico',
          url: '/documento/2',
        },
        {
          id: 3,
          titulo: 'Relatório de Indicadores / Financeiro',
          url: '/documento/3',
        },
      ],
      preAgendamento: [
        {
          id: 1,
          titulo: 'Documento pendente assinatura',
          url: '/documento/pendente/1',
        },
        {
          id: 2,
          titulo: 'Folha de Pagamento / Maio 2025',
          url: '/documento/agendado/2',
        },
        {
          id: 3,
          titulo: 'Relatório de Progresso / Projeto X',
          url: '/documento/agendado/3',
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
.input-busca {
  border-width: 1px;
  border-color: rgb(209 213 219);
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  transition: border-color 0.2s ease;
}

.input-busca:focus-within {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 2px rgb(59 130 246 / 0.2);
}

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
  padding-left: 40px;
}

.sombra {
  box-shadow: 0 1.5px 5px 0.5px rgba(65, 65, 65, 0.09);
}
</style>

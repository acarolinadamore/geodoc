<template>
  <div>
    <!-- Loading -->
    <div
      v-if="loading"
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
      v-else-if="erro"
      class="flex flex-col items-center justify-center p-10 text-gray-600 text-center bg-red-50 border border-red-200 rounded-lg m-5"
    >
      <div class="text-5xl mb-4">⚠️</div>
      <h3 class="text-red-600 mb-2 text-lg font-semibold">
        Ops! Algo deu errado
      </h3>
      <p class="mb-5 text-gray-600">{{ erro }}</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button
          @click="$emit('tentar-novamente')"
          class="px-4 py-2 rounded-md border-0 cursor-pointer font-medium transition-all text-sm bg-red-600 text-white hover:bg-red-700"
        >
          Tentar novamente
        </button>
        <button
          @click="$emit('limpar-erro')"
          class="px-4 py-2 rounded-md cursor-pointer font-medium transition-all text-sm bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
        >
          Limpar erro
        </button>
      </div>
    </div>

    <!-- Estados Vazios -->
    <div
      v-else-if="cards.length === 0 && !filtrosAtivos"
      class="flex flex-col items-center justify-center p-10 text-gray-600 text-center"
    >
      <div class="text-5xl mb-4">📄</div>
      <h3 class="text-gray-700 mb-2 text-lg font-semibold">
        Nenhum documento encontrado
      </h3>
      <p class="mb-5 text-gray-600">
        Sua caixa de entrada está vazia no momento.
      </p>
    </div>

    <div
      v-else-if="cards.length === 0 && filtrosAtivos"
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
        @click="$emit('limpar-filtros')"
        class="px-4 py-2 bg-transparent border border-red-600 text-red-600 rounded text-xs cursor-pointer hover:bg-red-600 hover:text-white transition-all"
      >
        Limpar filtros
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdEstadosConteudo',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    erro: {
      type: String,
      default: null,
    },
    cards: {
      type: Array,
      default: () => [],
    },
    filtrosAtivos: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

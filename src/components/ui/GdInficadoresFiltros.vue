<template>
  <div
    class="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md gap-3"
    role="status"
    aria-live="polite"
  >
    <div class="flex gap-2 flex-wrap">
      <span
        v-if="filtros.busca"
        class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
      >
        <span class="sr-only">Filtro de busca ativo:</span>
        🔍 "{{ filtros.busca }}"
        <button
          @click="$emit('limpar-busca')"
          class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
          :aria-label="`Remover filtro de busca: ${filtros.busca}`"
        >
          ×
        </button>
      </span>

      <span
        v-if="filtros.dataInicio && filtros.dataFim"
        class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
      >
        <span class="sr-only">Filtro de data ativo:</span>
        📅 {{ formatarIntervaloData(filtros.dataInicio, filtros.dataFim) }}
        <button
          @click="$emit('limpar-data')"
          class="bg-transparent border-0 text-white cursor-pointer text-sm p-0.5 hover:bg-white hover:bg-opacity-20 rounded"
          :aria-label="`Remover filtro de data`"
        >
          ×
        </button>
      </span>
    </div>

    <button
      @click="$emit('limpar-todos')"
      class="px-2 py-1 bg-transparent border border-red-600 text-red-600 rounded text-xs cursor-pointer hover:bg-red-600 hover:text-white transition-all"
      aria-label="Limpar todos os filtros ativos"
    >
      Limpar todos os filtros
    </button>
  </div>
</template>

<script>
export default {
  name: 'GdIndicadoresFiltros',
  props: {
    filtros: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatarIntervaloData(dataInicio, dataFim) {
      const formatarData = data => {
        if (!data) return ''
        try {
          const d = new Date(data)
          const dia = String(d.getDate()).padStart(2, '0')
          const mes = String(d.getMonth() + 1).padStart(2, '0')
          return `${dia}/${mes}`
        } catch (error) {
          return 'Data inválida'
        }
      }

      if (dataInicio && dataFim) {
        const inicioFormatado = formatarData(dataInicio)
        const fimFormatado = formatarData(dataFim)

        if (inicioFormatado === fimFormatado) {
          return inicioFormatado
        }
        return `${inicioFormatado} - ${fimFormatado}`
      }

      return formatarData(dataInicio || dataFim)
    },
  },
}
</script>

<style scoped>
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
</style>

<template>
  <div class="flex flex-col items-center space-y-3 p-4">
    <!-- Data e Hora do Documento com classes customizadas -->
    <div class="text-center">
      <p class="gd-data-documento">{{ formatDataHora(dataInicio) }}</p>
      <p class="gd-hora-documento">{{ formatHora(dataInicio) }}</p>
    </div>

    <!-- Tag de Vencimento Existente -->
    <GdTagVencimento :dataVencimento="dataVencimento" />
  </div>
</template>

<script>
import GdTagVencimento from '@/components/ui/GdTagVencimento.vue'

export default {
  name: 'GdCardColunaData',
  components: {
    GdTagVencimento,
  },
  props: {
    dataInicio: {
      type: String,
      default: null,
    },
    dataVencimento: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    formatDataHora(dataISO) {
      if (!dataISO) return 'Data não informada'
      const data = new Date(dataISO)
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    formatHora(dataISO) {
      if (!dataISO) return ''
      const data = new Date(dataISO)
      return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
  },
}
</script>

<style scoped>
/* Classes CSS customizadas para data e hora */
.gd-data-documento {
  @apply text-sm font-semibold text-gray-900;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.025em;
}

.gd-hora-documento {
  @apply text-xs font-medium text-gray-600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 0.025em;
}

/* Hover effects */
.gd-data-documento:hover {
  @apply text-gray-700;
}

.gd-hora-documento:hover {
  @apply text-gray-500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gd-data-documento {
    @apply text-xs;
  }

  .gd-hora-documento {
    @apply text-xs;
  }
}
</style>

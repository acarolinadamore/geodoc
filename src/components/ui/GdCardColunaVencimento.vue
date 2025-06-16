<template>
  <div class="mt-0 xl:mt-4 flex items-center justify-between w-full xl:w-auto">
    <GdTagVencimento :data-vencimento="dataVencimento" />
  </div>
</template>

<script>
import GdTagVencimento from './GdTagVencimento.vue'

export default {
  name: 'GdCardColunaVencimento',
  components: {
    GdTagVencimento,
  },
  props: {
    dataVencimento: {
      type: Object,
      required: false, // ← Mudado para false para evitar erros
      default: () => null,
      validator(value) {
        // ✅ Validação mais flexível para aceitar todos os status dos seus mocks
        if (!value) return true // Aceita null/undefined

        return (
          typeof value === 'object' &&
          'status' in value &&
          ['vencido', 'vence_em', 'no_prazo', 'vencendo'].includes(
            value.status
          ) && // ← Todos os status
          'days' in value &&
          'unit' in value &&
          'data' in value
        )
      },
    },
  },
}
</script>

<style scoped>
/* Mobile: ocupa toda largura */
@media (max-width: 767px) {
  .card-vencimento {
    min-width: 100%;
    max-width: 100%;
  }
}

/* Desktop: tamanho original */
@media (min-width: 768px) {
  .card-vencimento {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>

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
      required: true,
      validator: value =>
        'status' in value &&
        ['vencido', 'vencendo'].includes(value.status) &&
        'days' in value &&
        'unit' in value,
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

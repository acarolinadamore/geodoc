<template>
  <div class="mt-0 md:mt-4 flex items-center justify-between w-full md:w-auto">
    <div
      :class="[
        'card-vencimento',
        'w-full md:w-auto',
        dataVencimento.status === 'vencido' ? 'vencido' : '',
        dataVencimento.status === 'vencendo' ? 'vencendo' : '',
      ]"
    >
      <span v-if="dataVencimento.status === 'vencido'">
        Vencido faz {{ dataVencimento.days }} {{ dataVencimento.unit }}
      </span>
      <span v-else-if="dataVencimento.status === 'vencendo'">
        Vence em {{ dataVencimento.days }} {{ dataVencimento.unit }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdCardColunaVencimento',
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
.card-vencimento {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  min-height: 38px;
}

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
    min-width: 180px;
    max-width: max-content;
  }
}

.card-vencimento.vencido {
  background-color: #f05050;
}

.card-vencimento.vencendo {
  background-color: #ffd856;
}
</style>

<template>
  <div
    :class="[
      'card-vencimento',
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
</template>

<script>
export default {
  name: 'GdTagVencimento',
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
  min-height: 36px;
  width: 100%;
}

.card-vencimento.vencido {
  background-color: #f05050;
}

.card-vencimento.vencendo {
  background-color: #ffd856;
}
</style>

<template>
  <div
    :class="[
      'card-vencimento',
      dataVencimento.status === 'vencido' ? 'vencido' : '',
      dataVencimento.status === 'vence_em' ? 'vencendo' : '',
    ]"
  >
    <span v-if="dataVencimento.status === 'vencido'">
      Vencido faz {{ dataVencimento.days }} {{ dataVencimento.unit }}
    </span>
    <span v-else-if="dataVencimento.status === 'vence_em'">
      Vence em {{ dataVencimento.days }} {{ dataVencimento.unit }}
    </span>
    <span v-else>
      <!-- Fallback para status não mapeados -->
      Status: {{ dataVencimento.status }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GdTagVencimento',
  props: {
    dataVencimento: {
      type: Object,
      required: false,
      default: () => null,
      validator(value) {
        if (!value) return true

        return (
          typeof value === 'object' &&
          'status' in value &&
          ['vencido', 'vence_em'].includes(value.status) && // ✅ Apenas estes 2 status
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
.card-vencimento {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  min-height: 36px;
  width: 100%;
}

.card-vencimento.vencido {
  background-color: #f05050;
}

.card-vencimento.vencendo {
  background-color: #edbd1f;
  color: #ffffff; /* Cor escura para contraste no amarelo */
}
</style>

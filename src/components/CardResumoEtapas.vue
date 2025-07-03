<template>
  <div class="etapas-container">
    <!-- Se não há etapas, mostrar mensagem -->
    <div v-if="!etapas || etapas.length === 0" class="sem-etapas">
      Sem etapas
    </div>

    <!-- Lista de etapas com nomes -->
    <div v-else class="flex items-center space-x-1">
      <div
        v-for="(etapa, indice) in etapas"
        :key="`etapa-${indice}`"
        :class="[
          'etapa-item',
          {
            'etapa-completed': etapa.status === 'completed',
            'etapa-current': etapa.status === 'current',
            'etapa-pending': etapa.status === 'pending',
          },
        ]"
        :title="`${etapa.nome} - ${getStatusText(etapa.status)}`"
      >
        <div class="etapa-indicator"></div>
        <span class="etapa-nome">{{ etapa.nome }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardResumoEtapas',
  props: {
    etapas: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  mounted() {
    console.log('🔵 CardResumoEtapas mounted:')
    console.log('  - etapas recebidas:', this.etapas)
    console.log('  - quantidade:', this.etapas?.length)
    console.log('  - primeira etapa:', this.etapas?.[0])
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        completed: 'Concluída',
        current: 'Em andamento',
        pending: 'Pendente',
      }
      return statusMap[status] || 'Desconhecido'
    },
  },
}
</script>

<style scoped>
.etapas-container {
  display: flex;
  align-items: center;
  min-height: 20px;
}

.sem-etapas {
  font-size: 11px;
  color: #9ca3af;
  font-style: italic;
}

.etapa-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  background-color: #f3f4f6;
  max-width: 120px;
}

.etapa-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.etapa-nome {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.etapa-completed .etapa-indicator {
  background-color: #10b981;
}

.etapa-current .etapa-indicator {
  background-color: #f59e0b;
}

.etapa-pending .etapa-indicator {
  background-color: #d1d5db;
}

.etapa-completed {
  background-color: #ecfdf5;
  color: #065f46;
}

.etapa-current {
  background-color: #fffbeb;
  color: #92400e;
}

.etapa-pending {
  background-color: #f9fafb;
  color: #6b7280;
}

/* Responsivo */
@media (max-width: 1280px) {
  .etapa-item {
    font-size: 10px;
    padding: 1px 4px;
    max-width: 100px;
  }

  .etapa-indicator {
    width: 5px;
    height: 5px;
  }
}
</style>

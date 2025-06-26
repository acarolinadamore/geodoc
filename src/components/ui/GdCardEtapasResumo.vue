<template>
  <div class="etapas-container">
    <!-- Debug temporário - remova depois -->
    <div v-if="showDebug" class="debug-box">
      Etapas: {{ etapas?.length || 0 }} | {{ JSON.stringify(etapas) }}
    </div>

    <!-- Se não há etapas, mostrar mensagem -->
    <div v-if="!etapas || etapas.length === 0" class="sem-etapas">
      Sem etapas
    </div>

    <!-- Lista de etapas -->
    <div v-else class="flex items-center space-x-1">
      <div
        v-for="(etapa, indice) in etapas"
        :key="`etapa-${indice}`"
        :class="[
          'etapa-bolinha',
          {
            'etapa-concluida': etapa.concluida,
            'etapa-pendente': !etapa.concluida,
          },
        ]"
        :title="`${etapa.nome} - ${etapa.concluida ? 'Concluída' : 'Pendente'}`"
      >
        <!-- Ícone de check para concluídas -->
        <i v-if="etapa.concluida" class="fas fa-check etapa-check"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdEtapasResumo',
  props: {
    etapas: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      showDebug: true, // Mude para false depois de testar
    }
  },
  mounted() {
    console.log('🔵 GdEtapasResumo mounted:')
    console.log('  - etapas:', this.etapas)
    console.log('  - length:', this.etapas?.length)
    console.log('  - tipo:', typeof this.etapas)
  },
}
</script>

<style scoped>
.etapas-container {
  display: flex;
  align-items: center;
  min-height: 20px;
}

.debug-box {
  font-size: 10px;
  color: red;
  border: 1px solid red;
  padding: 2px;
  margin-bottom: 4px;
}

.sem-etapas {
  font-size: 11px;
  color: #9ca3af;
  font-style: italic;
}

.etapa-bolinha {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  border: 1px solid;
}

.etapa-concluida {
  background-color: #10b981;
  border-color: #10b981;
  color: white;
}

.etapa-pendente {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  color: #6b7280;
}

.etapa-check {
  font-size: 8px;
}
</style>

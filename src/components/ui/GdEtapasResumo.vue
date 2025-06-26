<template>
  <div class="etapas-container">
    <!-- Verificar se há etapas -->
    <div v-if="!etapas || etapas.length === 0" class="sem-etapas">
      <span class="texto-vazio">Sem etapas definidas</span>
    </div>

    <!-- Mostrar etapas -->
    <div v-else class="etapas-lista">
      <div
        v-for="(etapa, indice) in etapas"
        :key="`etapa-${indice}-${etapa.nome}`"
        :class="[
          'etapa-bolinha',
          {
            'etapa-concluida': etapa.concluida,
            'etapa-pendente': !etapa.concluida,
          },
        ]"
        :title="`${etapa.nome} - ${etapa.concluida ? 'Concluída' : 'Pendente'}`"
      >
        <!-- Ícone para concluídas -->
        <i v-if="etapa.concluida" class="fas fa-check etapa-icone"></i>
        <!-- Número para pendentes -->
        <span v-else class="etapa-numero">{{ indice + 1 }}</span>
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
  mounted() {
    console.log('🔵 GdEtapasResumo mounted:')
    console.log('  - etapas recebidas:', this.etapas)
    console.log('  - quantidade:', this.etapas?.length || 0)
    console.log('  - primeira etapa:', this.etapas?.[0])
  },
}
</script>

<style scoped>
.etapas-container {
  display: flex;
  align-items: center;
  min-height: 20px;
  width: 100%;
}

.sem-etapas {
  display: flex;
  align-items: center;
}

.texto-vazio {
  font-size: 11px;
  color: #9ca3af;
  font-style: italic;
}

.etapas-lista {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.etapa-bolinha {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  border: 2px solid;
  flex-shrink: 0;
}

.etapa-concluida {
  background-color: #10b981;
  border-color: #10b981;
  color: white;
}

.etapa-pendente {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #6b7280;
}

.etapa-icone {
  font-size: 10px;
  font-weight: bold;
}

.etapa-numero {
  font-size: 9px;
  font-weight: 600;
}
</style>

<template>
  <div class="indicadores-filtros" role="status" aria-live="polite">
    <div class="chips-container">
      <span
        v-for="filtro in filtros"
        :key="filtro.tipo"
        class="filtro-chip"
        :class="`filtro-${filtro.tipo}`"
      >
        <span class="sr-only">Filtro {{ filtro.tipo }} ativo:</span>
        {{ filtro.label }}
        <button
          @click="removerFiltro(filtro.tipo)"
          class="remover-filtro"
          :aria-label="`Remover filtro ${filtro.tipo}`"
        >
          ×
        </button>
      </span>
    </div>

    <button
      @click="$emit('limpar-todos')"
      class="limpar-todos"
      aria-label="Limpar todos os filtros ativos"
    >
      Limpar todos os filtros
    </button>
  </div>
</template>

<script>
export default {
  name: 'IndicadoresFiltros',
  props: {
    filtros: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ['limpar-filtro', 'limpar-todos'],
  methods: {
    removerFiltro(tipo) {
      this.$emit('limpar-filtro', tipo)
    },
  },
}
</script>

<style scoped>
.indicadores-filtros {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  gap: 12px;
}

.chips-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filtro-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.filtro-busca {
  background-color: #2563eb;
}

.filtro-data {
  background-color: #2563eb;
}

.filtro-modelos {
  background-color: #7c3aed;
}

.remover-filtro {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.remover-filtro:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.limpar-todos {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.limpar-todos:hover {
  background-color: #dc2626;
  color: white;
}

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

@media (max-width: 768px) {
  .indicadores-filtros {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .chips-container {
    justify-content: center;
  }
}
</style>

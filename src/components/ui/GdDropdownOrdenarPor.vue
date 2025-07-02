<template>
  <div class="ordenar-por-container">
    <button
      class="ordenar-por-button"
      @click="alternarDropdown"
      :title="opcaoSelecionadaLabel"
    >
      <svg
        class="ordenar-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 6h18M3 12h12M3 18h6" />
      </svg>
    </button>

    <div v-if="dropdownAberto" class="dropdown-menu">
      <div class="dropdown-header">Ordenar por:</div>
      <ul class="dropdown-list">
        <li v-for="opcao in opcoes" :key="opcao.value">
          <button
            @click="selecionarOpcao(opcao)"
            class="dropdown-item"
            :class="{ 'item-selecionado': value === opcao.value }"
          >
            <span>{{ opcao.label }}</span>
            <svg
              v-if="value === opcao.value"
              class="check-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdDropdownOrdenarPor',
  props: {
    value: {
      type: String,
      default: 'modelos',
    },
  },
  data() {
    return {
      dropdownAberto: false,
      opcoes: [
        { value: 'modelos', label: 'Modelos' },
        { value: 'vencimento', label: 'Vencimento' },
      ],
    }
  },
  computed: {
    opcaoSelecionadaLabel() {
      const opcao = this.opcoes.find(o => o.value === this.value)
      return opcao ? `Ordenado por: ${opcao.label}` : 'Ordenar por'
    },
  },
  methods: {
    alternarDropdown() {
      this.dropdownAberto = !this.dropdownAberto
    },
    selecionarOpcao(opcao) {
      this.$emit('input', opcao.value)
      this.$emit('change', opcao.value)
      this.dropdownAberto = false
    },
    fecharAoClicarFora(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownAberto = false
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.fecharAoClicarFora)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.fecharAoClicarFora)
  },
}
</script>

<style scoped>
.ordenar-por-container {
  position: relative;
  display: inline-block;
}

.ordenar-por-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.ordenar-por-button:hover {
  border-color: #9ca3af;
}

.ordenar-por-button:focus {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.ordenar-icon {
  color: #1a82d9;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 50;
  margin-top: 4px;
  min-width: 180px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.dropdown-header {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.item-selecionado {
  color: #1a82d9;
  font-weight: 500;
}

.check-icon {
  color: #1a82d9;
  flex-shrink: 0;
}
</style>

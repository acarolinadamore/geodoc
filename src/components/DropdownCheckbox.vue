<template>
  <div class="checkbox-dropdown-container">
    <button class="checkbox-dropdown-button" @click="alternarDropdown">
      <input
        type="checkbox"
        :checked="checkedAll"
        @change="manipularMudancaCheckbox"
        @click.stop
        class="checkbox-custom"
      />
      <svg
        class="dropdown-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M19 9l-7 7-7-7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>

    <div v-if="aberto" class="dropdown-menu">
      <ul class="dropdown-list">
        <!-- Aprovar com contador -->
        <li>
          <button @click="manipularAcao('aprovar')" class="dropdown-item">
            <span>Aprovar</span>
            <span v-if="selectedCount > 0" class="contador-acao">{{
              selectedCount
            }}</span>
          </button>
        </li>

        <!-- Linha separadora -->
        <li class="separador"></li>

        <!-- Outras opções -->
        <li>
          <button
            @click="manipularAcao('atualizar-fluxo')"
            class="dropdown-item"
          >
            <span>Atualizar Fluxo</span>
          </button>
        </li>
        <li>
          <button
            @click="manipularAcao('cancelar-documento')"
            class="dropdown-item"
          >
            <span>Cancelar Documento</span>
          </button>
        </li>
        <li>
          <button @click="manipularAcao('identificar')" class="dropdown-item">
            <span>Identificar</span>
          </button>
        </li>
        <li>
          <button @click="manipularAcao('somar-ancoras')" class="dropdown-item">
            <span>Somar Âncoras</span>
          </button>
        </li>
        <li>
          <button
            @click="manipularAcao('vincular-modelo')"
            class="dropdown-item"
          >
            <span>Vincular Modelo Documento</span>
          </button>
        </li>
        <li>
          <button
            @click="manipularAcao('vincular-pasta')"
            class="dropdown-item"
          >
            <span>Vincular Pasta Digital</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownCheckbox',
  props: {
    checkedAll: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    selectedCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      aberto: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.fecharAoClicarFora)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.fecharAoClicarFora)
  },
  methods: {
    alternarDropdown() {
      this.aberto = !this.aberto
    },

    manipularMudancaCheckbox() {
      this.$emit('toggle-all', !this.checkedAll)
    },

    manipularAcao(valor) {
      this.$emit('action', valor)
      this.aberto = false
    },

    fecharAoClicarFora(event) {
      if (!this.$el.contains(event.target)) {
        this.aberto = false
      }
    },
  },
}
</script>

<style scoped>
.checkbox-dropdown-container {
  position: relative;
  display: inline-block;
}

.checkbox-dropdown-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  color: #374151;
  transition: all 0.2s;
}

.checkbox-dropdown-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-custom:checked {
  background-color: #1a82d9;
  border-color: #1a82d9;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  margin-top: 4px;
  min-width: 220px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
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

.contador-acao {
  background-color: #1a82d9;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Separador visual */
.separador {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}
</style>

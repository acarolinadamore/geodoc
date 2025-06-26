<template>
  <div class="searchbar">
    <div class="container-entrada">
      <svg
        class="icone-busca"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        :value="value"
        type="text"
        :placeholder="placeholder"
        class="input-entrada"
        @input="handleInput"
        @keyup.enter="handleEnter"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button
        v-if="value"
        @click="clearSearch"
        class="botao-limpar"
        type="button"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdSearchBar',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Buscar...',
    },
    debounce: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      debounceTimer: null,
    }
  },
  methods: {
    handleInput(event) {
      const inputValue = event.target.value
      console.log('🔍 GdSearchBar - Input changed:', inputValue)

      // ✅ LIMPAR TIMER ANTERIOR
      clearTimeout(this.debounceTimer)

      // ✅ EMITIR IMEDIATAMENTE PARA V-MODEL
      this.$emit('input', inputValue)

      // ✅ DEBOUNCE APENAS PARA SEARCH EVENT
      this.debounceTimer = setTimeout(() => {
        console.log('🔍 GdSearchBar - Emitindo search:', inputValue)
        this.$emit('search', inputValue)
      }, this.debounce)
    },

    handleEnter(event) {
      const inputValue = event.target.value
      console.log('🔍 GdSearchBar - Enter pressed:', inputValue)
      clearTimeout(this.debounceTimer)
      this.$emit('input', inputValue)
      this.$emit('search', inputValue)
      this.$emit('enter', inputValue)
    },

    handleFocus() {
      console.log('🔍 GdSearchBar - Focus')
      this.$emit('focus')
    },

    handleBlur() {
      console.log('🔍 GdSearchBar - Blur')
      this.$emit('blur')
    },

    clearSearch() {
      console.log('🔍 GdSearchBar - Clear search')
      clearTimeout(this.debounceTimer)
      this.$emit('input', '')
      this.$emit('search', '')
      this.$emit('clear')
    },
  },

  // ✅ LIMPAR TIMER AO DESTRUIR COMPONENTE
  beforeDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
  },
}
</script>

<style scoped>
/* Mantém o mesmo CSS */
.searchbar {
  display: flex;
  width: 100%;
}

.container-entrada {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
  gap: 6px;
  padding: 0 8px;
}

.container-entrada:hover {
  border-color: #9ca3af;
}

.container-entrada:focus-within {
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.icone-busca {
  flex-shrink: 0;
  color: #6b7280;
}

.input-entrada {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #374151;
  min-width: 0;
}

.input-entrada::placeholder {
  color: #9ca3af;
  font-size: 14px;
}

.botao-limpar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.botao-limpar:hover {
  background-color: #f3f4f6;
  color: #374151;
}
</style>

<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
      >
        <path
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <input
        type="text"
        class="search-input"
        :placeholder="placeholder"
        v-model="localSearchTerm"
        @input="onSearchInput"
      />
      <button
        v-if="localSearchTerm"
        @click="clearSearch"
        class="clear-button"
        type="button"
        title="Limpar busca"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdSearchBar',
  props: {
    initialValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Buscar...',
    },
  },
  data() {
    return {
      localSearchTerm: this.initialValue,
      debounceTimer: null,
    }
  },
  watch: {
    initialValue(newValue) {
      this.localSearchTerm = newValue
    },
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer)
  },
  methods: {
    onSearchInput() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.$emit('search-changed', this.localSearchTerm)
      }, 400)
    },
    clearSearch() {
      this.localSearchTerm = ''
      this.$emit('clear')
    },
  },
}
</script>

<style scoped>
.search-container {
  position: relative;
  display: inline-block;
  width: 160px; /* Largura reduzida */
  max-width: 100%;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px; /* Altura fixa */
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0 12px; /* Ajuste no padding horizontal */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
}

.search-input-wrapper:hover {
  border-color: #9ca3af;
}

.search-input-wrapper:focus-within {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.search-icon {
  color: #9ca3af;
  margin-right: 8px;
  flex-shrink: 0;
}

.search-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px 4px 8px 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  color: #374151;
  min-width: 0;
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  margin-left: 4px;
}

.clear-button:hover {
  color: #ef4444;
}
</style>

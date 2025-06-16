<template>
  <div class="gd-search-bar">
    <div class="search-input-wrapper">
      <svg
        class="search-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        v-model="searchTerm"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="handleInput"
        @keyup.enter="handleEnter"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="clear-button"
        type="button"
      >
        <svg
          width="14"
          height="14"
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
      default: 'Buscar palavra-chave...',
    },
    debounce: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      searchTerm: this.value,
      debounceTimer: null,
    }
  },
  methods: {
    handleInput() {
      // Debounce para evitar muitas chamadas
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.$emit('input', this.searchTerm)
        this.$emit('search', this.searchTerm)
      }, this.debounce)
    },
    handleEnter() {
      this.$emit('enter', this.searchTerm)
      this.$emit('search', this.searchTerm)
    },
    handleFocus() {
      this.$emit('focus')
    },
    handleBlur() {
      this.$emit('blur')
    },
    clearSearch() {
      this.searchTerm = ''
      this.$emit('input', '')
      this.$emit('search', '')
      this.$emit('clear')
    },
  },
  watch: {
    value(newValue) {
      this.searchTerm = newValue
    },
  },
}
</script>

<style scoped>
.gd-search-bar {
  position: relative;
  display: inline-block;
  min-width: 250px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  padding-left: 36px;
  padding-right: 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
}

.search-input:hover {
  border-color: #9ca3af;
}

.search-input:focus {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
  pointer-events: none;
  z-index: 1;
}

.clear-button {
  position: absolute;
  right: 8px;
  padding: 4px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.clear-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}
</style>

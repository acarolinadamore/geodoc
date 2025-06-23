<template>
  <div class="gd-filter-bar-badge-component">
    <div
      class="tabs-container"
      ref="tabsContainer"
      @mousedown="iniciarArrastar"
      @mousemove="aoArrastar"
      @mouseup="finalizarArrastar"
      @mouseleave="finalizarArrastar"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'filter-tab-badge',
          {
            active: activeTabId === tab.id,
            'gd-text-gray': activeTabId !== tab.id,
          },
        ]"
        @click="definirTabAtiva(tab.id)"
        @mousedown.stop
        type="button"
      >
        <!-- Círculo com iniciais - apenas para tabs que não são "Todos" -->
        <div
          v-if="tab.id !== 'todos'"
          class="avatar-circle"
          :style="{ backgroundColor: tab.color || '#1a82d9' }"
        >
          {{ obterIniciais(tab.label) }}
        </div>

        <!-- Label -->
        <span class="tab-label">{{ tab.label }}</span>

        <!-- Badge contador-->
        <div
          :class="[
            'count-badge',
            { 'circulo-pequeno-ativo': activeTabId === tab.id },
          ]"
          v-if="tab.count !== undefined"
        >
          {{ tab.count }}
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdFilterBarBadge',
  props: {
    initialTabs: {
      type: Array,
      default: () => [
        { id: 'todos', label: 'Todos', count: 15, color: '#1a82d9' },
        {
          id: 'aConfigurar',
          label: 'A Configurar',
          count: 3,
          color: '#f59e0b',
        },
        { id: 'recebidos', label: 'Recebidos', count: 8, color: '#10b981' },
        { id: 'solicitados', label: 'Solicitados', count: 2, color: '#8b5cf6' },
        { id: 'lembretes', label: 'Lembretes', count: 1, color: '#ef4444' },
      ],
    },
    initialActiveTabId: {
      type: String,
      default: 'todos',
    },
  },
  data() {
    return {
      tabs: JSON.parse(JSON.stringify(this.initialTabs)),
      activeTabId: this.initialActiveTabId,
      estaArrastando: false,
      inicioX: 0,
      scrollEsquerda: 0,
    }
  },
  watch: {
    initialTabs: {
      handler(novasTabs) {
        this.tabs = JSON.parse(JSON.stringify(novasTabs))
        if (
          novasTabs.length > 0 &&
          !novasTabs.find(tab => tab.id === this.activeTabId)
        ) {
          this.activeTabId = novasTabs[0].id
        } else if (novasTabs.length === 0) {
          this.activeTabId = null
        }
      },
      deep: true,
    },
    initialActiveTabId(novoId) {
      this.activeTabId = novoId
    },
  },
  methods: {
    obterIniciais(nome) {
      return nome
        .split(' ')
        .filter(palavra => palavra.length > 2)
        .map(palavra => palavra.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    },
    definirTabAtiva(tabId) {
      if (!this.estaArrastando) {
        this.activeTabId = tabId
        this.$emit('filter-change', tabId)
      }
    },
    iniciarArrastar(evento) {
      this.estaArrastando = true
      this.inicioX = evento.pageX - this.$refs.tabsContainer.offsetLeft
      this.scrollEsquerda = this.$refs.tabsContainer.scrollLeft
      this.$refs.tabsContainer.style.cursor = 'grabbing'
    },
    aoArrastar(evento) {
      if (!this.estaArrastando) return
      evento.preventDefault()
      const x = evento.pageX - this.$refs.tabsContainer.offsetLeft
      const movimento = (x - this.inicioX) * 2
      this.$refs.tabsContainer.scrollLeft = this.scrollEsquerda - movimento
    },
    finalizarArrastar() {
      this.estaArrastando = false
      this.$refs.tabsContainer.style.cursor = 'grab'
      setTimeout(() => {
        this.estaArrastando = false
      }, 100)
    },
  },
}
</script>

<style scoped>
.gd-filter-bar-badge-component {
  display: flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 2px 0;
  width: 100%;
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  padding-bottom: 2px;
  margin-bottom: -2px;
  cursor: grab;
  user-select: none;
  flex-shrink: 1;
  min-width: 0;
  width: 100%;
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tabs-container:active {
  cursor: grabbing;
}

.filter-tab-badge {
  padding: 5px 12px;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #656565;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  pointer-events: auto;
  gap: 6px;
}

.filter-tab-badge.active {
  background-color: #1a82d9;
  color: #ffffff !important;
  border-color: #1a82d9;
}

.filter-tab-badge:not(.active):hover {
  border-color: #1a82d9;
  color: #1a82d9;
}

.avatar-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 600;
  color: #ffffff;
  flex-shrink: 0;
}

.tab-label {
  flex-shrink: 0;
}

.count-badge {
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 11px;
  font-weight: 500;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.circulo-pequeno-ativo {
  background-color: #4cb6f4 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

@media (max-width: 768px) {
  .tabs-container {
    gap: 4px;
  }

  .filter-tab-badge {
    gap: 4px;
    padding: 4px 10px;
    height: 26px;
    font-size: 12px;
  }

  .avatar-circle {
    width: 14px;
    height: 14px;
    font-size: 7px;
  }

  .count-badge {
    font-size: 10px;
    padding: 1px 5px;
    min-width: 14px;
    height: 14px;
  }
}
</style>

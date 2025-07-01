<template>
  <div class="filtro-pagina-marcador-component">
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
          'filter-tab',
          {
            active: activeTabId === tab.id,
            'gd-text-gray': activeTabId !== tab.id,
          },
        ]"
        @click="definirTabAtiva(tab.id)"
        @mousedown.stop
        type="button"
      >
        {{ tab.label }}
        <!-- Badge contador numérico -->
        <div
          v-if="tab.count !== undefined"
          :class="[
            'count-badge',
            { 'count-badge-active': activeTabId === tab.id },
          ]"
        >
          {{ tab.count }}
        </div>
      </button>
    </div>

    <div class="add-button-wrapper">
      <button class="add-button" @click.stop="abrirModal" type="button">
        +
      </button>
    </div>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay" @click="fecharModal">
      <div class="modal-container modal-small" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Adicionar Marcador</h3>
          <button class="modal-close" @click="fecharModal">×</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <input
              id="markerName"
              v-model="novoNomeMarcador"
              type="text"
              class="form-input"
              placeholder="Nome do marcador"
              @keyup.enter="adicionarMarcador"
              ref="markerInput"
            />
          </div>
        </div>

        <div class="modal-footer">
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="fecharModal">
              Cancelar
            </button>
            <button
              class="btn btn-primary"
              @click="adicionarMarcador"
              :disabled="!novoNomeMarcador.trim()"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltroPaginaMarcador',
  props: {
    initialTabs: {
      type: Array,
      default: () => [],
    },
    initialActiveTabId: {
      type: String,
      default: 'todos',
    },
  },
  emits: ['atualizar-aba', 'adicionar-marcador'],
  data() {
    return {
      tabs: [],
      activeTabId: this.initialActiveTabId,
      estaArrastando: false,
      inicioX: 0,
      scrollEsquerda: 0,
      mostrarModal: false,
      novoNomeMarcador: '',
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
      immediate: true,
    },
    initialActiveTabId(novoId) {
      this.activeTabId = novoId
    },
    mostrarModal(novoValor) {
      if (novoValor) {
        document.body.style.overflow = 'hidden'
        this.$nextTick(() => {
          if (this.$refs.markerInput) {
            this.$refs.markerInput.focus()
          }
        })
      } else {
        document.body.style.overflow = ''
      }
    },
  },
  beforeDestroy() {
    document.body.style.overflow = ''
  },
  methods: {
    definirTabAtiva(tabId) {
      if (!this.estaArrastando) {
        this.activeTabId = tabId
        this.$emit('atualizar-aba', tabId)
      }
    },

    abrirModal() {
      this.mostrarModal = true
      this.novoNomeMarcador = ''
    },

    fecharModal() {
      this.mostrarModal = false
      this.novoNomeMarcador = ''
    },

    adicionarMarcador() {
      if (!this.novoNomeMarcador.trim()) return

      // Gera um id único baseado no nome do marcador (sem espaços, lowercase)
      const id = this.novoNomeMarcador.trim().toLowerCase().replace(/\s+/g, '-')

      const novaTab = {
        id: id,
        label: this.novoNomeMarcador.trim(),
      }

      // Verifica se já existe
      const jaExiste = this.tabs.some(tab => tab.id === novaTab.id)
      if (jaExiste) {
        alert('Já existe um marcador com esse nome!')
        return
      }

      this.tabs.push(novaTab)
      this.activeTabId = novaTab.id
      this.mostrarModal = false
      this.novoNomeMarcador = ''

      this.$emit('atualizar-aba', novaTab.id)
      this.$emit('adicionar-marcador', novaTab)
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
.filtro-pagina-marcador-component {
  display: flex;
  align-items: center;
  gap: 8px;
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
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tabs-container:active {
  cursor: grabbing;
}

.filter-tab {
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

.filter-tab.active {
  background-color: #1a82d9;
  color: #ffffff !important;
  border-color: #1a82d9;
}

.filter-tab:not(.active):hover {
  border-color: #1a82d9;
  color: #1a82d9;
}

/* Badge contador numérico */
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

.count-badge-active {
  background-color: #4cb6f4 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

.add-button-wrapper {
  flex-shrink: 0;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  color: #9ca3af;
  text-align: center;
}

.add-button:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-family: inherit;
}

.modal-small {
  width: 100%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s ease;
  margin-left: 16px;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 0 24px 20px;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 0 24px 20px;
}

.form-group {
  margin-bottom: 0;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid;
  text-align: center;
}

.btn-secondary {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background-color: #1a82d9;
  border-color: #1a82d9;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1570c4;
  border-color: #1570c4;
}

.btn-primary:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Responsivo */
@media (max-width: 768px) {
  .filtro-pagina-marcador-component {
    gap: 4px;
  }

  .tabs-container {
    gap: 4px;
  }

  .filter-tab {
    gap: 4px;
    padding: 4px 10px;
    height: 26px;
    font-size: 12px;
  }

  .count-badge {
    font-size: 10px;
    padding: 1px 5px;
    min-width: 14px;
    height: 14px;
  }

  .add-button {
    width: 28px;
    height: 28px;
    min-width: 28px;
    font-size: 14px;
  }

  .modal-overlay {
    padding: 8px;
  }

  .modal-container {
    max-height: 95vh;
  }

  .modal-small {
    max-width: 100%;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .modal-title {
    font-size: 16px;
  }
}
</style>

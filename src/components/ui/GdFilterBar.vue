<template>
  <div class="gd-filter-bar-component">
    <div
      class="tabs-container"
      ref="tabsContainer"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
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
        @click="setActiveTab(tab.id)"
        @mousedown.stop
        type="button"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="add-button-wrapper">
      <button class="add-button" @click.stop="openModal" type="button">
        +
      </button>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-container modal-small" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Adicionar Marcador</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <input
                id="markerName"
                v-model="newMarkerName"
                type="text"
                class="form-input"
                placeholder="Nome do marcador"
                @keyup.enter="addMarker"
                ref="markerInput"
              />
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="closeModal">
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                @click="addMarker"
                :disabled="!newMarkerName.trim()"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'GdFilterBar',
  props: {
    initialTabs: {
      type: Array,
      default: () => [
        { id: 'todos', label: 'Todos' },
        { id: 'aConfigurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'lembretes', label: 'Lembretes' },
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
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      showModal: false,
      newMarkerName: '',
    }
  },
  watch: {
    initialTabs: {
      handler(newTabs) {
        this.tabs = JSON.parse(JSON.stringify(newTabs))
        if (
          newTabs.length > 0 &&
          !newTabs.find(tab => tab.id === this.activeTabId)
        ) {
          this.activeTabId = newTabs[0].id
        } else if (newTabs.length === 0) {
          this.activeTabId = null
        }
      },
      deep: true,
    },
    initialActiveTabId(newId) {
      this.activeTabId = newId
    },
    showModal(newValue) {
      if (newValue) {
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
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    setActiveTab(tabId) {
      if (!this.isDragging) {
        this.activeTabId = tabId
        this.$emit('filter-change', tabId)
      }
    },
    openModal() {
      this.showModal = true
      this.newMarkerName = ''
    },
    closeModal() {
      this.showModal = false
      this.newMarkerName = ''
    },
    addMarker() {
      if (!this.newMarkerName.trim()) return

      const newTab = {
        id: `marker_${Date.now()}`,
        label: this.newMarkerName.trim(),
      }

      this.tabs.push(newTab)
      this.activeTabId = newTab.id
      this.showModal = false
      this.newMarkerName = ''

      this.$emit('filter-change', newTab.id)
      this.$emit('marker-added', newTab)
    },
    startDrag(e) {
      this.isDragging = true
      this.startX = e.pageX - this.$refs.tabsContainer.offsetLeft
      this.scrollLeft = this.$refs.tabsContainer.scrollLeft
      this.$refs.tabsContainer.style.cursor = 'grabbing'
    },
    onDrag(e) {
      if (!this.isDragging) return
      e.preventDefault()
      const x = e.pageX - this.$refs.tabsContainer.offsetLeft
      const walk = (x - this.startX) * 2
      this.$refs.tabsContainer.scrollLeft = this.scrollLeft - walk
    },
    endDrag() {
      this.isDragging = false
      this.$refs.tabsContainer.style.cursor = 'grab'
      setTimeout(() => {
        this.isDragging = false
      }, 100)
    },
  },
}
</script>

<style scoped>
.gd-filter-bar-component {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 4px 0;
  width: 100%;
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 8px;
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
  padding: 7px 16px;
  border-radius: 80px;
  border-width: 1.5px;
  border-style: solid;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #656565;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  pointer-events: auto;
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

.add-button-wrapper {
  flex-shrink: 0;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  border: 1.5px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  font-size: 18px;
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

@media (max-width: 768px) {
  .gd-filter-bar-component {
    gap: 8px;
  }

  .tabs-container {
    gap: 6px;
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

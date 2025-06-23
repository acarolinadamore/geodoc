<template>
  <div class="gd-filter-bar-badge-component">
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
          'filter-tab-badge',
          {
            active: activeTabId === tab.id,
            'gd-text-gray': activeTabId !== tab.id,
          },
        ]"
        @click="setActiveTab(tab.id)"
        @mousedown.stop
        type="button"
      >
        <!-- Círculo com iniciais -->
        <div
          class="avatar-circle"
          :style="{ backgroundColor: tab.color || '#1a82d9' }"
        >
          {{ getInitials(tab.label) }}
        </div>

        <!-- Label -->
        <span class="tab-label">{{ tab.label }}</span>

        <!-- Badge contador -->
        <div class="count-badge" v-if="tab.count !== undefined">
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
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
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
  },
  methods: {
    getInitials(name) {
      return name
        .split(' ')
        .filter(word => word.length > 2)
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    },
    setActiveTab(tabId) {
      if (!this.isDragging) {
        this.activeTabId = tabId
        this.$emit('filter-change', tabId)
      }
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
.gd-filter-bar-badge-component {
  display: flex;
  align-items: center;
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
  width: 100%;
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tabs-container:active {
  cursor: grabbing;
}

.filter-tab-badge {
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
  gap: 8px;
}

.filter-tab-badge.active {
  background-color: #1a82d9;
  color: #ffffff !important;
  border-color: #1a82d9;
}

.filter-tab-badge.active .avatar-circle {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff;
}

.filter-tab-badge.active .count-badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.filter-tab-badge:not(.active):hover {
  border-color: #1a82d9;
  color: #1a82d9;
}

.avatar-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
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
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .tabs-container {
    gap: 6px;
  }

  .filter-tab-badge {
    gap: 6px;
    padding: 7px 12px;
  }

  .avatar-circle {
    width: 18px;
    height: 18px;
    font-size: 9px;
  }

  .count-badge {
    font-size: 11px;
    padding: 1px 6px;
    min-width: 18px;
    height: 18px;
  }
}
</style>

<template>
  <div class="layout-sidebar-header">
    <!-- Sidebar fixa à esquerda -->
    <gd-sidebar class="layout-sidebar" @sidebar-toggle="handleSidebarToggle" />

    <!-- Área principal com header e conteúdo -->
    <div class="layout-main" :class="{ 'sidebar-collapsed': !sidebarExpanded }">
      <!-- Header fixo no topo -->
      <gd-header
        class="layout-header"
        :show-date="showHeaderDate"
        :show-notification="showHeaderNotification"
      />

      <!-- Conteúdo rolável -->
      <main class="layout-content">
        <div class="content-container">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import GdSidebar from '@/components/ui/GdSidebar.vue'
import GdHeader from '@/components/ui/GdHeader.vue'

export default {
  name: 'LayoutSidebarHeader',
  components: {
    GdSidebar,
    GdHeader,
  },
  props: {
    showHeaderDate: {
      type: Boolean,
      default: false,
    },
    showHeaderNotification: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sidebarExpanded: true,
    }
  },
  methods: {
    handleSidebarToggle(isExpanded) {
      this.sidebarExpanded = isExpanded
    },
  },
}
</script>

<style scoped>
.layout-sidebar-header {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Área principal que se ajusta à sidebar */
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px; /* Ajustado para nova largura da sidebar */
  transition: margin-left 0.3s ease;
}

/* Quando sidebar está colapsada */
.layout-main.sidebar-collapsed {
  margin-left: 0; /* Sem margem quando colapsada */
}

/* Header fixo no topo da área principal */
.layout-header {
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
}

/* Conteúdo rolável */
.layout-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f8fafc;
}

.content-container {
  padding: 24px;
  min-height: calc(100vh - 70px);
}

/* Responsividade para telas pequenas */
@media (max-width: 768px) {
  .layout-main,
  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }

  .content-container {
    padding: 16px;
  }
}

/* Customização do scrollbar do conteúdo */
.layout-content::-webkit-scrollbar {
  width: 6px;
}

.layout-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.layout-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.layout-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Para Firefox */
.layout-content {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}
</style>

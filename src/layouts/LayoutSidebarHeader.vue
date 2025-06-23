<template>
  <div class="layout-sidebar-header">
    <!-- Sidebar fixo à esquerda -->
    <gd-sidebar
      class="layout-sidebar"
      @sidebar-toggle="handleSidebarToggle"
      ref="sidebar"
    />

    <!-- Área principal com header e conteúdo -->
    <div
      class="layout-main"
      :class="{
        'sidebar-collapsed': !sidebarExpanded,
      }"
    >
      <!-- Header fixo no topo -->
      <gd-header
        class="layout-header"
        :show-date="showHeaderDate"
        :show-notification="showHeaderNotification"
      />

      <!-- Conteúdo da página -->
      <main class="layout-content">
        <slot />
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

/* Sidebar fixa à esquerda */
.layout-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
}

/* Área principal que se ajusta à sidebar */
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100vh;
  overflow: hidden;
}

/* Quando sidebar está colapsada */
.layout-main.sidebar-collapsed {
  margin-left: 0;
}

/* Header fixo no topo da área principal */
.layout-header {
  flex-shrink: 0;
  width: 100%;
  z-index: 100;
}

/* Conteúdo da página - área intercambiável */
.layout-content {
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* === RESPONSIVIDADE === */

/* Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .layout-main {
    margin-left: 200px;
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }
}

/* Mobile - margem reduzida */
@media (max-width: 768px) {
  .layout-main {
    margin-left: 220px;
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .layout-main {
    margin-left: 200px;
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }
}

/* Mobile muito pequeno */
@media (max-width: 320px) {
  .layout-main {
    margin-left: 180px;
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>

<template>
  <div class="layout-sidebar-header">
    <!-- Sidebar fixa à esquerda -->
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
  margin-left: 200px; /* Desktop: largura fixa da sidebar */
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0; /* Importante para evitar overflow */
}

/* Quando sidebar está colapsada */
.layout-main.sidebar-collapsed {
  margin-left: 0;
}

/* Header fixo no topo da área principal */
.layout-header {
  position: sticky;
  top: 0;
  z-index: 998;
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

/* === RESPONSIVIDADE === */

/* Tablet - mantém igual ao desktop */
@media (max-width: 1024px) and (min-width: 769px) {
  .layout-main {
    margin-left: 200px; /* Mesmo que desktop */
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }

  .content-container {
    padding: 20px;
  }
}

/* Mobile - margem reduzida */
@media (max-width: 768px) {
  .layout-main {
    margin-left: 220px; /* Acompanha nova largura da sidebar */
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }

  .content-container {
    padding: 16px;
    min-height: calc(100vh - 60px);
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .layout-main {
    margin-left: 200px; /* Acompanha sidebar menor */
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }

  .content-container {
    padding: 12px;
  }
}

/* Mobile muito pequeno */
@media (max-width: 320px) {
  .layout-main {
    margin-left: 180px; /* Acompanha sidebar mínima */
  }

  .layout-main.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>

<template>
  <div class="layout-sidebar">
    <!-- Sidebar fixa à esquerda -->
    <gd-sidebar
      class="sidebar"
      @sidebar-toggle="handleSidebarToggle"
      ref="sidebar"
    />

    <!-- Área principal -->
    <div class="main" :class="{ 'sidebar-collapsed': !sidebarExpanded }">
      <!-- Conteúdo da página -->
      <main class="content">
        <slot :sidebar-expanded="sidebarExpanded" />
      </main>
    </div>
  </div>
</template>

<script>
import GdSidebar from '@/components/ui/GdSidebar.vue'

export default {
  name: 'LayoutSidebar',
  components: {
    GdSidebar,
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
.layout-sidebar {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar fixa à esquerda */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

/* Área principal */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100vh;
  overflow: hidden;
}

.main.sidebar-collapsed {
  margin-left: 0;
}

/* Conteúdo */
.content {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

/* Responsividade */
@media (max-width: 1024px) {
  .main {
    margin-left: 200px;
  }

  .main.sidebar-collapsed {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .main {
    margin-left: 220px;
  }

  .main.sidebar-collapsed {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .main {
    margin-left: 200px;
  }

  .main.sidebar-collapsed {
    margin-left: 0;
  }
}

@media (max-width: 320px) {
  .main {
    margin-left: 180px;
  }

  .main.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>

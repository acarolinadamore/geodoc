<template>
  <div class="layout-menu-lateral">
    <!-- Sidebar fixa à esquerda -->
    <MenuLateral
      class="sidebar"
      @sidebar-toggle="alternarBarraLateral"
      ref="barraLateral"
    />

    <!-- Área principal -->
    <div class="main" :class="{ 'sidebar-collapsed': !barraLateralExpandida }">
      <!-- Conteúdo da página -->
      <main class="content">
        <slot :sidebar-expanded="barraLateralExpandida" />
      </main>
    </div>
  </div>
</template>

<script>
import MenuLateral from '@/components/MenuLateral.vue'

export default {
  name: 'LayoutMenuLateral',
  components: {
    MenuLateral,
  },
  data() {
    return {
      barraLateralExpandida: true,
    }
  },
  methods: {
    alternarBarraLateral(expandida) {
      this.barraLateralExpandida = expandida
    },
  },
}
</script>

<style scoped>
.layout-menu-lateral {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

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

<template>
  <aside
    class="sidebar-menu"
    :class="{ expanded: isExpanded, collapsed: !isExpanded }"
    @click="handleSidebarClick"
  >
    <div class="logo-container" @click.stop>
      <img v-if="isExpanded" :src="logoPath" alt="Logo" class="logo-full" />
      <img v-else :src="logoMiniPath" alt="Logo Mini" class="logo-mini" />
      <button
        v-if="isExpanded"
        class="collapse-btn"
        @click.stop.prevent="toggleSidebar"
        title="Colapsar menu"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          class="icon icon-collapse"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M10 0L8.59 1.41 16.17 9H0v2h16.17l-7.58 7.59L10 20l10-10z"
          />
        </svg>
      </button>
    </div>

    <nav class="menu-content">
      <ul class="menu-list" ref="menuList">
        <!-- Principal -->
        <li class="menu-section-label">PRINCIPAL</li>
        <li class="menu-item" @click.stop="navigate('dashboard')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-dashboard.svg"
            alt="Dashboard"
          />
          <span v-if="isExpanded">Dashboard</span>
        </li>
        <li class="menu-item" @click.stop="navigate('caixa')">
          <img class="menu-icon" src="/img/sidebar/ico-caixa.svg" alt="Caixa" />
          <span v-if="isExpanded">Caixa</span>
        </li>
        <li class="menu-item" @click.stop="navigate('clientes')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-clientes.svg"
            alt="Clientes"
          />
          <span v-if="isExpanded">Clientes</span>
        </li>
        <li class="menu-item" @click.stop="navigate('equipamentos')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-equipamentos.svg"
            alt="Equipamentos"
          />
          <span v-if="isExpanded">Equipamentos</span>
        </li>

        <!-- Análise -->
        <li class="menu-section-label">ANÁLISE</li>
        <li class="menu-item" @click.stop="navigate('propostas')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-propostas.svg"
            alt="Propostas"
          />
          <span v-if="isExpanded">Propostas</span>
        </li>
        <li class="menu-item" @click.stop="navigate('vendas')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-vendas.svg"
            alt="Vendas"
          />
          <span v-if="isExpanded">Vendas</span>
        </li>
        <li class="menu-item" @click.stop="navigate('fat_vendedor')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-vendedor.svg"
            alt="Faturamento por Vendedor"
          />
          <span v-if="isExpanded">Faturamento por Vendedor</span>
        </li>

        <!-- Configurações -->
        <li class="menu-section-label">CONFIGURAÇÕES</li>
        <li class="menu-item" @click.stop="navigate('categorias')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-categorias.svg"
            alt="Categorias"
          />
          <span v-if="isExpanded">Categorias</span>
        </li>
        <li class="menu-item" @click.stop="navigate('usuarios')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-usuarios.svg"
            alt="Usuários"
          />
          <span v-if="isExpanded">Usuários</span>
        </li>
        <li class="menu-item" @click.stop="navigate('grupo_usuarios')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-grupo-usuarios.svg"
            alt="Grupos de Usuários"
          />
          <span v-if="isExpanded">Grupos de Usuários</span>
        </li>
        <li class="menu-item" @click.stop="navigate('produtos')">
          <img
            class="menu-icon"
            src="/img/sidebar/ico-produtos.svg"
            alt="Produtos"
          />
          <span v-if="isExpanded">Produtos</span>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer" v-if="isExpanded">
      <img
        :src="grupoImagetechPath"
        alt="Grupo Imagetech"
        class="footer-logo"
      />
    </footer>
  </aside>
</template>

<script>
export default {
  name: 'GdSidebar',
  data() {
    return {
      isExpanded: true,
      logoPath: '/img/logo-completo.svg',
      logoMiniPath: '/img/logo-mini.svg',
      grupoImagetechPath: '/img/grupo-imagetech.svg',
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = false
    },
    expandSidebar() {
      this.isExpanded = true
    },
    handleSidebarClick() {
      if (!this.isExpanded) {
        this.expandSidebar()
      }
    },
    navigate(page) {
      this.$emit('navigate', page)
    },
  },
}
</script>

<style scoped>
.sidebar-menu {
  background: linear-gradient(90deg, #0369a1 0%, #064e3b 100%);
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 280px;
  transition: width 0.3s ease;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  position: relative;
}
.sidebar-menu.collapsed {
  width: 60px;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: default;
  position: relative;
}
.logo-full {
  max-height: 45px;
  user-select: none;
}
.logo-mini {
  max-height: 30px;
  margin-left: 15px;
  user-select: none;
}
.collapse-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  color: white;
}
.collapse-btn:hover {
  color: #d1d5db;
}
.icon-collapse {
  width: 20px;
  height: 20px;
}
.menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}
.menu-list {
  list-style: none;
  margin: 0;
  padding: 0 0.5rem;
}
.menu-section-label {
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  opacity: 0.75;
  user-select: none;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  user-select: none;
}
.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}
.footer-logo {
  max-width: 120px;
  user-select: none;
}

/* Scrollbar invisível */
.menu-content::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

/* Ajusta o texto para esconder quando colapsado */
.sidebar-menu.collapsed .menu-item span {
  display: none;
}
</style>

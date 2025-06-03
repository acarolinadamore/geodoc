<template>
  <nav
    class="sidebar"
    :class="{ collapsed: !isExpanded }"
    @click="handleSidebarClick"
  >
    <div class="sidebar-container">
      <!-- Header -->
      <div class="header">
        <div class="top-bar">
          <div class="logo" :class="{ center: !isExpanded }">
            <img
              :src="isExpanded ? logoPath : logoMiniPath"
              alt="GeoDoc Logo"
              class="logo-image"
            />
          </div>
          <button
            v-if="isExpanded"
            class="toggle-btn"
            @click.stop="toggleSidebar"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
        <button class="new-doc-btn" :class="{ compact: !isExpanded }">
          <i class="lni lni-pencil"></i>
          <span v-if="isExpanded">Novo Documento</span>
        </button>
        <div class="divider special"></div>
      </div>

      <!-- Menu -->
      <div class="menu">
        <div v-for="section in menuConfig" :key="section.group" class="section">
          <h2 class="section-title" v-if="isExpanded">{{ section.group }}</h2>
          <ul>
            <li
              v-for="item in section.items"
              :key="item.route"
              @click="navigate(item.route)"
            >
              <img
                :src="getIconPath(item.icon)"
                :alt="item.name"
                class="icon"
              />
              <span v-if="isExpanded">{{ item.name }}</span>
              <div v-if="isExpanded && item.notification" class="notification">
                {{ item.notification }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="footer" v-if="isExpanded">
        <div class="footer-logo">
          <img
            :src="grupoImagetechPath"
            alt="Grupo Imagetech"
            class="grupo-image"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import menuConfig from '@/config/menuConfig'

export default {
  name: 'GdSidebar',
  data() {
    return {
      menuConfig,
      logoPath: require('@/assets/logos/logo.svg'),
      logoMiniPath: require('@/assets/logos/g.svg'),
      grupoImagetechPath: require('@/assets/logos/grupoimagetech.png'),
      isExpanded: true,
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded
    },
    expandSidebar() {
      if (!this.isExpanded) {
        this.isExpanded = true
      }
    },
    handleSidebarClick() {
      if (!this.isExpanded) {
        this.expandSidebar()
      }
    },
    navigate(route) {
      this.$router.push(route)
    },
    getIconPath(iconName) {
      try {
        return require(`@/assets/icons/${iconName}`)
      } catch (e) {
        console.error(`Icon not found: ${iconName}`)
        return ''
      }
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #004b9d 0%, #0078c8 100%);
  color: #d7dadd;
  font-family: 'Inter', sans-serif;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
}

.header {
  margin-bottom: 10px;
  padding: 0 10px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo.center {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo-image {
  height: 30px;
  width: auto;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.divider.special {
  background: rgba(146, 218, 255, 0.2);
  margin-top: 24px;
}

.new-doc-btn {
  background: #0470ae;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 20px;
  height: 45px;
  margin: 24px 0 0;
  width: 100%;
}

.new-doc-btn.compact {
  width: 45px;
  height: 45px;
  padding: 0;
  margin: 24px auto 0;
}

.new-doc-btn.compact i {
  font-size: 16px;
  margin: 0;
}

.sidebar.collapsed ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.sidebar.collapsed li {
  justify-content: center;
  padding: 10px 0;
  width: 100%;
}

.sidebar.collapsed li i {
  margin: 0 auto;
  text-align: center;
}

.sidebar.collapsed li span,
.sidebar.collapsed li .arrow,
.sidebar.collapsed li .notification {
  display: none;
}

.menu {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 10px;
  scrollbar-width: none;
}

.menu::-webkit-scrollbar {
  display: none;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  display: flex;
  font-size: 12px;
  font-weight: 300;
  line-height: 24px;
  text-transform: uppercase;
  color: #d7dadd;
  margin-bottom: 10px;
  padding-left: 10px;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
}

.divider {
  height: 1px;
  background: rgba(215, 218, 221, 0.2);
  margin: 15px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  vertical-align: middle;
  display: inline-block;
  flex-shrink: 0;
}

.icon-warning {
  width: 18px;
  height: 18px;
  margin-left: -2px;
  margin-right: 12px;
  vertical-align: middle;
  flex-shrink: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 24px;
}

.sidebar.collapsed li {
  justify-content: center;
  padding-left: 0;
}

li:hover {
  background: rgba(255, 255, 255, 0.1);
}

li span {
  display: inline-block;
  line-height: 1;
  position: relative;
  top: 1px;
}

.arrow {
  margin-left: auto;
  font-size: 14px;
  color: rgba(215, 218, 221, 0.5);
}

.lni-chevron-left {
  font-size: 18px;
}

.highlight {
  color: #ffc107;
  font-weight: 700;
}

.highlight i {
  color: #ffc107;
}

.notification {
  background-color: #ffc107;
  color: #004b9d;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-left: auto;
}

.footer {
  margin-top: auto;
  text-align: center;
  font-size: 12px;
  color: rgba(215, 218, 221, 0.7);
  padding: 20px 10px 0;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.sidebar.collapsed .footer {
  display: none;
}

.sidebar.collapsed li {
  justify-content: center;
  padding-left: 0;
}

.sidebar.collapsed li i {
  margin: 0;
}

.sidebar.collapsed li:hover::after {
  content: attr(title);
  position: absolute;
  left: 70px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.sidebar.collapsed .header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.sidebar.collapsed .top-bar {
  justify-content: center;
}
</style>

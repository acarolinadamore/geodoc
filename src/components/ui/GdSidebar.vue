<template>
  <div class="container-sidebar">
    <transition name="deslizar-sidebar" mode="out-in">
      <nav v-if="isExpanded" class="barra-lateral" @click="handleSidebarClick">
        <div class="container-conteudo">
          <!-- Sidebar - Cabeçalho -->
          <div class="cabecalho">
            <div class="barra-superior">
              <div class="logo">
                <img :src="logoPath" alt="GeoDoc Logo" class="imagem-logo" />
              </div>
              <button class="botao-colapsar" @click.stop="toggleSidebar">
                <i class="fas fa-chevron-left"></i>
              </button>
            </div>
            <button class="botao-novo-documento">
              <i class="lni lni-pencil"></i>
              <span>Novo Documento</span>
            </button>
            <div class="divisor especial"></div>
          </div>

          <!-- Sidebar - Content -->
          <div class="menu">
            <div
              v-for="(section, sectionIndex) in menuConfig"
              :key="`section-${section.group}-${sectionIndex}`"
              class="secao"
            >
              <h2 class="titulo-secao">{{ section.group }}</h2>
              <ul>
                <li
                  v-for="(item, itemIndex) in section.items"
                  :key="`item-${section.group}-${
                    item.route || item.name
                  }-${itemIndex}`"
                  @click="navigate(item.route)"
                  class="item-menu"
                >
                  <img
                    :src="getIconPath(item.icon)"
                    :alt="item.name"
                    class="icone"
                  />
                  <span class="texto-item">{{ item.name }}</span>
                  <div v-if="item.notification" class="notificacao">
                    {{ item.notification }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar - Rodapé fixo -->
          <div class="rodape">
            <div class="logo-rodape">
              <img
                :src="grupoImagetechPath"
                alt="Grupo Imagetech"
                class="imagem-grupo"
              />
            </div>
          </div>
        </div>
      </nav>
    </transition>

    <!-- Transição para o logo mini -->
    <transition name="aparecer-logo" mode="out-in">
      <div v-if="!isExpanded" class="logo-mini" @click="expandSidebar">
        <img
          :src="logoMiniPath"
          alt="GeoDoc Logo Mini"
          class="imagem-logo-mini"
        />
      </div>
    </transition>
  </div>
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
      this.$emit('sidebar-toggle', this.isExpanded)
    },
    expandSidebar() {
      if (!this.isExpanded) {
        this.isExpanded = true
        this.$emit('sidebar-toggle', this.isExpanded)
      }
    },
    handleSidebarClick() {
      // Removido para evitar expansão acidental
    },
    navigate(route) {
      if (route) {
        this.$router.push(route)
      }
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
.container-sidebar {
  position: relative;
}

.barra-lateral {
  width: 200px;
  height: 100vh;
  background: linear-gradient(180deg, #004b9d 0%, #0078c8 100%);
  color: #d7dadd;
  font-family: 'Inter', sans-serif;
  padding: 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container-conteudo {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 8px;
}

.cabecalho {
  margin-bottom: 8px;
  padding: 0 8px;
}

.barra-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.logo {
  display: flex;
  align-items: center;
  text-align: left;
}

.imagem-logo {
  height: 25px;
  width: auto;
}

.botao-colapsar {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-left: 4px;
  transform: rotate(0deg);
}

.botao-colapsar:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.divisor.especial {
  background: rgba(146, 218, 255, 0.2);
  margin-top: 16px;
  height: 1px;
}

.botao-novo-documento {
  background: #1988c8;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0 12px;
  height: 45px;
  margin: 16px 0 0;
  width: 100%;
  text-align: left;
}

.botao-novo-documento:hover {
  background: #4db9d2;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.menu {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 8px;
  scrollbar-width: none;
}

.menu::-webkit-scrollbar {
  display: none;
}

.secao {
  margin-bottom: 24px;
}

.titulo-secao {
  display: flex;
  font-size: 10px;
  font-weight: 300;
  line-height: 24px;
  text-transform: uppercase;
  color: #d7dadd;
  margin-bottom: 2px;
  padding-left: 8px;
  letter-spacing: 1px;
  font-family: 'Inter', sans-serif;
  text-align: left;
}

.divisor {
  height: 1px;
  background: rgba(215, 218, 221, 0.2);
  margin: 12px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 10px;
  margin-bottom: 2px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  line-height: 24px;
  gap: 8px;
}

.item-menu:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
  padding-left: 14px;
}

.icone {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.item-menu:hover .icone {
  transform: scale(1.1);
}

.texto-item {
  display: inline-block;
  line-height: 1.2;
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notificacao {
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
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.item-menu:hover .notificacao {
  transform: scale(1.1);
}

.rodape {
  margin-top: auto;
  text-align: left;
  font-size: 12px;
  color: rgba(215, 218, 221, 0.7);
  padding: 16px 8px 0;
}

.logo-rodape {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.imagem-grupo {
  max-width: 80%;
  height: auto;
  transition: opacity 0.3s ease;
}

.imagem-grupo:hover {
  opacity: 0.8;
}

/* Logo mini quando sidebar está colapsada */
.logo-mini {
  position: fixed;
  top: 16px;
  left: 12px;
  z-index: 1001;
  width: 40px;
  height: 40px;
  background: linear-gradient(180deg, #004b9d 0%, #0078c8 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo-mini:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.imagem-logo-mini {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.logo-mini:hover .imagem-logo-mini {
  transform: scale(1.1);
}

/* Transições da Sidebar */
.deslizar-sidebar-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.deslizar-sidebar-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.deslizar-sidebar-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.deslizar-sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Transições do Logo Mini */
.aparecer-logo-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
}

.aparecer-logo-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.aparecer-logo-enter {
  transform: scale(0) rotate(-180deg);
  opacity: 0;
}

.aparecer-logo-leave-to {
  transform: scale(0) rotate(180deg);
  opacity: 0;
}

/* Responsividade */

@media (max-width: 768px) {
  .barra-lateral {
    width: 220px;
  }

  .logo-mini {
    top: 8px;
    left: 8px;
  }

  .item-menu {
    padding: 12px 8px;
    font-size: 14px;
  }

  .botao-novo-documento {
    height: 48px;
    font-size: 14px;
  }

  .icone {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .barra-lateral {
    width: 200px;
  }

  .container-conteudo {
    padding: 0 6px;
  }

  .cabecalho {
    padding: 0 6px;
  }

  .menu {
    padding: 0 6px;
  }
}

@media (max-width: 320px) {
  .barra-lateral {
    width: 180px;
  }

  .texto-item {
    white-space: normal;
    text-align: left;
    font-size: 13px;
  }

  .item-menu {
    padding: 10px 6px;
  }
}
</style>

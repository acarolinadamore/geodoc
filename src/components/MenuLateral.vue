<template>
  <div class="container-barra-lateral">
    <transition name="deslizar-barra" mode="out-in">
      <nav v-if="expandida" class="barra-lateral" @click="clicarBarraLateral">
        <div class="container-conteudo">
          <!-- Superior -->
          <div class="header">
            <div class="barra-superior">
              <div
                class="logo"
                @click="navegar('/inicio')"
                style="cursor: pointer"
              >
                <img :src="caminhoLogo" alt="GeoDoc Logo" class="imagem-logo" />
              </div>
              <button class="botao-colapsar" @click.stop="alternarSidebar">
                <i class="fas fa-chevron-left"></i>
              </button>
            </div>
            <button
              class="botao-novo-documento"
              @click="navegar('/novo-documento')"
            >
              <i class="lni lni-pencil"></i>
              <span>Novo Documento</span>
            </button>
            <div class="divisor especial"></div>
          </div>

          <!-- Meio -->
          <div class="menu">
            <div
              v-for="(secao, indiceSecao) in configMenu"
              :key="`secao-${secao.group}-${indiceSecao}`"
              class="secao"
            >
              <h2 class="titulo-secao">{{ secao.group }}</h2>
              <ul>
                <li
                  v-for="(item, indiceItem) in secao.items"
                  :key="`item-${secao.group}-${
                    item.route || item.name
                  }-${indiceItem}`"
                  @click="navegar(item.route)"
                  class="item-menu"
                >
                  <img
                    :src="obterCaminhoIcone(item.icon)"
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

          <!-- Rodapé fixo -->
          <div class="rodape flex flex-col gap-1">
            <Notificacao
              :unread="2"
              @abrirNotificacoes="abrirPainelNotificacoes"
            />
            <DropdownMultiempresas />
          </div>
        </div>
      </nav>
    </transition>

    <!-- Transição para o logo mini -->
    <transition name="aparecer-logo" mode="out-in">
      <div v-if="!expandida" class="logo-mini" @click="expandirBarra">
        <img
          :src="caminhoLogoMini"
          alt="GeoDoc Logo Mini"
          class="imagem-logo-mini"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import configMenu from '@/menu/menuConfig'
import Notificacao from '@/components/Notificacao.vue'
import DropdownMultiempresas from '@/components/DropdownMultiempresas.vue'

export default {
  name: 'MenuLateral',
  components: {
    Notificacao,
    DropdownMultiempresas,
  },
  data() {
    return {
      configMenu,
      caminhoLogo: require('@/assets/logos/logo.svg'),
      caminhoLogoMini: require('@/assets/logos/g.svg'),
      caminhoGrupoImagetech: require('@/assets/logos/grupoimagetech.png'),
      expandida: true,
    }
  },
  methods: {
    alternarSidebar() {
      this.expandida = !this.expandida
      this.$emit('sidebar-toggle', this.expandida)
    },
    expandirBarra() {
      if (!this.expandida) {
        this.expandida = true
        this.$emit('sidebar-toggle', this.expandida)
      }
    },
    clicarBarraLateral() {
      // Método vazio para evitar expansão acidental
    },
    navegar(rota) {
      if (rota && this.$route.path !== rota) {
        this.$router.push(rota)
      }
    },
    obterCaminhoIcone(nomeIcone) {
      try {
        return require(`@/assets/icons/${nomeIcone}`)
      } catch (erro) {
        console.error(`Ícone não encontrado: ${nomeIcone}`)
        return ''
      }
    },
    abrirPainelNotificacoes() {
      console.log('Painel de notificações aberto')
    },
  },
}
</script>

<style scoped>
.container-barra-lateral {
  position: relative;
}

.barra-lateral {
  width: 200px;
  height: 100vh;
  background: linear-gradient(180deg, #004b9d 0%, #0078c8 100%);
  color: #d7dadd;
  font-family: 'Inter', sans-serif;
  padding: 16px 0 8px 0;
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
}

.header {
  margin-bottom: 8px;
  padding: 0 12px;
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

.logo-mini {
  position: fixed;
  top: 8px;
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

/* Transições da Barra Lateral */
.deslizar-barra-enter-active,
.deslizar-barra-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.deslizar-barra-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.deslizar-barra-leave-to {
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

  .header {
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

<template>
  <div class="gd-usuario" v-if="user">
    <button
      class="user-button"
      @click="expanded = !expanded"
      style="flex-direction: column; align-items: flex-start; gap: 2px"
    >
      <div
        class="top-row"
        style="display: flex; align-items: center; width: 100%"
      >
        <img
          v-if="perfilAtivo.avatar"
          :src="perfilAtivo.avatar"
          class="avatar"
        />
        <div v-else class="avatar placeholder">{{ perfilAtivo.inicial }}</div>

        <div class="info" style="margin-left: 0.5rem">
          <div class="nome">{{ perfilAtivo.nome }}</div>
        </div>

        <div class="chevron-wrapper" style="margin-left: auto">
          <svg
            class="chevron"
            :class="{ rotated: expanded }"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              stroke-width="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </button>

    <transition name="slide">
      <div v-if="expanded" class="dropdown">
        <!-- Abas Pessoal/Empresa -->
        <div class="abas-container">
          <button
            class="aba"
            :class="{ ativa: abaAtiva === 'pessoal' }"
            @click="abaAtiva = 'pessoal'"
          >
            Pessoal
          </button>
          <button
            class="aba"
            :class="{ ativa: abaAtiva === 'empresa' }"
            @click="abaAtiva = 'empresa'"
          >
            Empresa
          </button>
        </div>

        <!-- Lista de Perfis -->
        <div class="perfis-lista">
          <div
            v-for="perfil in perfisFiltrados"
            :key="perfil.id"
            class="perfil-item"
            :class="{ ativo: perfil.id === perfilAtivo.id }"
            @click="selecionarPerfil(perfil)"
          >
            <img
              v-if="perfil.avatar"
              :src="perfil.avatar"
              class="perfil-avatar"
            />
            <div v-else class="perfil-avatar placeholder">
              {{ perfil.inicial }}
            </div>
            <div class="perfil-info">
              <div class="perfil-nome">{{ perfil.nome }}</div>
            </div>
            <div v-if="perfil.id === perfilAtivo.id" class="check-selecionado">
              <svg viewBox="0 0 24 24" class="check-icon">
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Separador -->
        <div class="separador-completo"></div>

        <!-- Opções originais -->
        <div class="item">Certificado Digital (A1)</div>
        <div class="divider"></div>
        <div class="item">Perfil</div>
        <div class="divider"></div>
        <div class="item" @click="logout">Sair</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownMultiempresas',
  data() {
    return {
      expanded: false,
      user: null,
      abaAtiva: 'pessoal',
      perfilAtivo: null,
      perfis: [
        // Perfis pessoais
        {
          id: 1,
          nome: 'Melanie Xenia',
          avatar: null,
          tipo: 'pessoal',
          inicial: 'A',
        },
        {
          id: 2,
          nome: 'Ana Carolina',
          avatar: null,
          tipo: 'pessoal',
          inicial: 'J',
        },
        // Perfis empresariais
        {
          id: 3,
          nome: 'Imagetech',
          email: 'contato@techcorp.com.br',
          avatar: null,
          tipo: 'empresa',
          inicial: 'T',
        },
        {
          id: 4,
          nome: 'Inovação Brasil',
          email: 'admin@inovacaobrasil.com',
          avatar: null,
          tipo: 'empresa',
          inicial: 'I',
        },
      ],
    }
  },
  computed: {
    perfisFiltrados() {
      return this.perfis.filter(perfil => perfil.tipo === this.abaAtiva)
    },
  },
  methods: {
    selecionarPerfil(perfil) {
      this.perfilAtivo = perfil
      this.expanded = false
    },
    logout() {
      console.log('Logout executado')
      this.$router.push('/login')
    },
  },
  async created() {
    try {
      // Define o primeiro perfil como ativo
      this.perfilAtivo = this.perfis[0]
      this.user = this.perfilAtivo
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
    }
  },
}
</script>

<style scoped>
.gd-usuario {
  width: 100%;
  background-color: rgba(223, 237, 251, 0.2);
  border-radius: 10px;
  padding: 8px;
  color: white;
}

.user-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  cursor: pointer;
  padding: 0;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar.placeholder {
  background-color: #41bdd3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
}

.info {
  flex-grow: 1;
  text-align: left;
}

.nome {
  font-size: 13px;
  line-height: 1.3;
}

.chevron-wrapper {
  background-color: rgba(193, 224, 255, 0.2);
  border-radius: 2px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.3s;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.dropdown {
  margin-top: 6px;
}

/* Abas */
.abas-container {
  display: flex;
  background-color: rgba(193, 224, 255, 0.2);
  border-radius: 4px;
  padding: 2px;
  margin-bottom: 4px;
}

.aba {
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 9px;
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.aba.ativa {
  background-color: rgba(255, 255, 255, 0.2);
}

.aba:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Lista de perfis */
.perfis-lista {
  margin-bottom: 4px;
}

.perfil-item {
  display: flex;
  align-items: center;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.perfil-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.perfil-item.ativo {
  background-color: rgba(255, 255, 255, 0.15);
}

.perfil-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}

.perfil-avatar.placeholder {
  background-color: #41bdd3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
}

.perfil-info {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.perfil-nome {
  font-size: 11px;
  line-height: 1.2;
}

/* Check selecionado */
.check-selecionado {
  width: 16px;
  height: 16px;
  background-color: #41bdd3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-icon {
  width: 10px;
  height: 10px;
}

/* Separador completo */
.separador-completo {
  height: 0.5px;
  background-color: #a9dffe;
  opacity: 0.4;
  margin: 6px -8px;
}

/* Opções originais */
.item {
  padding: 6px 0 6px 38px;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.divider {
  height: 0.5px;
  background-color: #a9dffe;
  opacity: 0.4;
  margin: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

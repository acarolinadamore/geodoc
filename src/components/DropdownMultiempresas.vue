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

        <!-- Adicionar Conta -->
        <div class="adicionar-conta-container">
          <div class="adicionar-conta-item" @click="abrirModalLogin">
            <div class="adicionar-conta-icone">
              <svg viewBox="0 0 24 24" class="profile-add-icon">
                <path
                  d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="adicionar-conta-texto">Adicionar conta</div>
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

    <!-- Modal Login -->
    <div
      v-if="modalLoginAberto"
      class="modal-overlay"
      @click="fecharModalLogin"
    >
      <div class="modal-container" @click.stop>
        <div class="modal-header-custom">
          <div class="modal-header-inner">
            <img
              :src="require('@/assets/logos/logo-preta.svg')"
              alt="Logo"
              class="logo-img-grande"
            />
          </div>
        </div>

        <div class="modal-body">
          <div class="campo-container">
            <label class="campo-label">CPF ou CNPJ</label>
            <input
              type="text"
              v-model="dadosLogin.documento"
              class="campo-input"
              placeholder="Digite seu CPF ou CNPJ"
            />
          </div>

          <div class="campo-container">
            <label class="campo-label">Senha</label>
            <input
              type="password"
              v-model="dadosLogin.senha"
              class="campo-input"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-confirmar" @click="adicionarConta">
            Adicionar
          </button>
          <button class="btn-cancelar" @click="fecharModalLogin">
            Cancelar
          </button>
        </div>
      </div>
    </div>
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
      modalLoginAberto: false,
      dadosLogin: {
        documento: '',
        senha: '',
      },
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
    abrirModalLogin() {
      this.modalLoginAberto = true
      this.expanded = false
    },
    fecharModalLogin() {
      this.modalLoginAberto = false
      this.dadosLogin = {
        documento: '',
        senha: '',
      }
    },
    async adicionarConta() {
      try {
        // Aqui você fará a integração com o backend
        console.log('Dados para adicionar conta:', this.dadosLogin)

        // Exemplo de chamada para o service
        // const novaConta = await this.authService.adicionarConta(this.dadosLogin)
        // this.perfis.push(novaConta)

        this.fecharModalLogin()
      } catch (error) {
        console.error('Erro ao adicionar conta:', error)
        // Mostrar mensagem de erro para o usuário
      }
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

/* Adicionar Conta */
.adicionar-conta-container {
  margin-bottom: 4px;
}

.adicionar-conta-item {
  display: flex;
  align-items: center;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.adicionar-conta-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.adicionar-conta-icone {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.profile-add-icon {
  width: 16px;
  height: 16px;
}

.adicionar-conta-texto {
  font-size: 11px;
  color: white;
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

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-logo {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}

.logo-img {
  height: 40px;
  max-width: 120px;
  object-fit: contain;
}

.modal-body {
  padding: 16px 20px;
}

.campo-container {
  margin-bottom: 8px;
}

.campo-container:last-child {
  margin-bottom: 0;
}

.campo-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.campo-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background-color: #ffffff;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.campo-input:focus {
  outline: none;
  border-color: #41bdd3;
  box-shadow: 0 0 0 3px rgba(65, 189, 211, 0.1);
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 8px 20px;
  justify-content: flex-end;
}

.btn-cancelar {
  min-width: 160px;
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar:hover {
  background-color: #f9fafb;
}

.btn-confirmar {
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
  margin: 8px 0 0;
  width: 100%;
  text-align: left;
}

.btn-confirmar:hover {
  background: #4db9d2;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
.modal-header-custom {
  background-color: white;
  padding: 20px 20px 12px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 20px;
}

.btn-cancelar,
.btn-confirmar {
  width: 100%;
  justify-content: center;
}

.modal-header-inner {
  background-color: #e7f6ff;

  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-img-grande {
  height: 64px;
  max-width: 160px;
  object-fit: contain;
}
</style>

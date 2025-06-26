<template>
  <header class="gd-header">
    <div class="left-section">
      <gd-data-atual v-if="showDate" />
    </div>

    <div class="middle-section"></div>

    <div class="right-section">
      <gd-notification v-if="showNotification" />
      <user-profile-dropdown
        :user-name="currentUser.name"
        :user-image="currentUser.image"
      />

      <!--  ✅ BOTÃO PARA TROCAR USUÁRIO (só para desenvolvimento)
      <button
        v-if="showUserSwitcher"
        @click="showSwitchModal = true"
        class="dev-switch-btn"
        title="Trocar usuário (dev)"
      >
        🔐
      </button> -->
    </div>

    <!-- ✅ MODAL PARA TROCAR USUÁRIO -->
    <div
      v-if="showSwitchModal"
      class="switch-modal-overlay"
      @click="showSwitchModal = false"
    >
      <div class="switch-modal" @click.stop>
        <h3>Trocar Usuário (Desenvolvimento)</h3>
        <div class="user-list">
          <button
            v-for="user in availableUsers"
            :key="user.id"
            @click="switchToUser(user.id)"
            class="user-option"
            :class="{ active: user.id === currentUserId }"
          >
            <img
              :src="getAvatarForUser(user.id)"
              :alt="user.nome"
              class="user-option-avatar"
            />
            <div>
              <div class="user-option-name">{{ user.nome }}</div>
              <div class="user-option-function">{{ user.funcao }}</div>
            </div>
          </button>
        </div>
        <button @click="showSwitchModal = false" class="close-btn">
          Fechar
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import GdDataAtual from './GdDataAtual.vue'
import UserProfileDropdown from './UserProfileDropdown.vue'
import GdNotification from '@/components/ui/GdNotification.vue'
import authService from '@/mocks/services/authService.js'
import { getUsuarios } from '@/mocks/services/usuarios.js'

export default {
  name: 'GdHeader',
  components: {
    GdDataAtual,
    UserProfileDropdown,
    GdNotification,
  },
  props: {
    showDate: {
      type: Boolean,
      default: false,
    },
    showNotification: {
      type: Boolean,
      default: true,
    },
    // ✅ MOSTRAR BOTÃO DE TROCAR USUÁRIO (só em desenvolvimento)
    showUserSwitcher: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development',
    },
  },
  data() {
    return {
      currentUserData: null,
      loading: false,
      showSwitchModal: false,
      availableUsers: [],
    }
  },
  async mounted() {
    await this.loadCurrentUser()
    await this.loadAvailableUsers()
  },
  computed: {
    currentUser() {
      if (!this.currentUserData) {
        return { name: 'Carregando...', image: null }
      }

      return {
        name: this.currentUserData.nome,
        image: this.currentUserData.avatar,
      }
    },
    currentUserId() {
      return this.currentUserData?.id || null
    },
  },
  methods: {
    async loadCurrentUser() {
      try {
        this.loading = true
        console.log('👤 Carregando usuário atual...')

        this.currentUserData = await authService.getCurrentUser()

        console.log('✅ Usuário carregado:', this.currentUserData.nome)
      } catch (error) {
        console.error('❌ Erro ao carregar usuário atual:', error)
      } finally {
        this.loading = false
      }
    },

    async loadAvailableUsers() {
      try {
        this.availableUsers = await getUsuarios()
      } catch (error) {
        console.error('❌ Erro ao carregar usuários disponíveis:', error)
      }
    },

    async switchToUser(userId) {
      try {
        console.log('🔄 Trocando para usuário:', userId)
        this.currentUserData = await authService.switchUser(userId)
        this.showSwitchModal = false

        // ✅ EMITIR EVENTO PARA OUTROS COMPONENTES SABEREM DA TROCA
        this.$root.$emit('user-switched', this.currentUserData)

        console.log('✅ Usuário trocado com sucesso!')
      } catch (error) {
        console.error('❌ Erro ao trocar usuário:', error)
      }
    },

    getAvatarForUser(userId) {
      return authService.getAvatarForUser(userId)
    },
  },
}
</script>

<style scoped>
.gd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.left-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.middle-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  flex: 1;
}

/* ✅ ESTILOS DO BOTÃO DE DESENVOLVIMENTO */
.dev-switch-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.dev-switch-btn:hover {
  background: #e5e7eb;
  transform: scale(1.1);
}

/* ✅ ESTILOS DO MODAL */
.switch-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.switch-modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.switch-modal h3 {
  margin: 0 0 16px 0;
  color: #374151;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.user-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.user-option:hover {
  background: #f9fafb;
  border-color: #1a82d9;
}

.user-option.active {
  background: #ebf4fc;
  border-color: #1a82d9;
}

.user-option-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-option-name {
  font-weight: 500;
  color: #374151;
}

.user-option-function {
  font-size: 12px;
  color: #6b7280;
}

.close-btn {
  width: 100%;
  padding: 10px;
  background: #1a82d9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close-btn:hover {
  background: #1570c4;
}
</style>

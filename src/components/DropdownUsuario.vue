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
        <img v-if="user.avatar" :src="user.avatar" class="avatar" />
        <div v-else class="avatar placeholder">{{ userInitial }}</div>

        <div class="info" style="margin-left: 0.5rem">
          <div class="nome">{{ nomeCurto }}</div>
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
        <div class="item">Certificado Digital (A1)</div>
        <div class="divider"></div>
        <div class="item">Perfil</div>
        <div class="divider"></div>
        <div class="item">Sair</div>
      </div>
    </transition>
  </div>
</template>

<script>
import authService from '@/mocks/services/authService'

export default {
  name: 'DropdownUsuario',
  data() {
    return {
      expanded: false,
      user: null,
    }
  },
  computed: {
    userInitial() {
      return this.user?.nome?.charAt(0).toUpperCase() || 'U'
    },
    nomeCurto() {
      if (!this.user?.nome) return ''
      const partes = this.user.nome.trim().split(' ')
      return partes.slice(0, 2).join(' ')
    },
  },
  async created() {
    try {
      const currentUser = await authService.getCurrentUser()
      this.user = currentUser
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
}

.info {
  flex-grow: 1;
  text-align: left;
}

.nome {
  font-size: 13px;
  line-height: 1.3;
}

.email {
  font-size: 11px;
  opacity: 0.9;
  line-height: 1.1;
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

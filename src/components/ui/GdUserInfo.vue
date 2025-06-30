<template>
  <div class="sidebar-footer">
    <!-- Notificações -->
    <button class="notify-button" @click="toggleNotify">
      <img src="@/assets/icons/notification.svg" alt="Notificações" />
      <span class="text">Notificações</span>
      <span v-if="unread > 0" class="badge">{{ unread }}</span>
    </button>

    <!-- Perfil do Usuário -->
    <div class="user-section">
      <button @click="expanded = !expanded" class="user-button">
        <img v-if="userImage" :src="userImage" class="avatar" />
        <div v-else class="avatar placeholder">{{ userInitial }}</div>
        <div class="user-info">
          <span class="name">{{ fullName }}</span>
          <span class="email">{{ email }}</span>
        </div>
        <svg class="chevron" :class="{ rotated: expanded }" viewBox="0 0 24 24">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
        </svg>
      </button>

      <!-- Dropdown interno -->
      <transition name="slide">
        <div v-if="expanded" class="user-dropdown">
          <div class="item">Certificado Digital (A1)</div>
          <div class="item">Perfil</div>
          <div class="item">Sair</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdUserInfo',
  props: {
    fullName: {
      type: String,
      default: 'Maria Silva Santos',
    },
    email: {
      type: String,
      default: 'maria@exemplo.com',
    },
    userImage: {
      type: String,
      default: null,
    },
    unread: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    userInitial() {
      return this.fullName?.charAt(0).toUpperCase() || 'U'
    },
  },
  methods: {
    toggleNotify() {
      // Se quiser abrir painel, emitir evento aqui
    },
  },
}
</script>

<style scoped>
.sidebar-footer {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notify-button {
  background-color: #e5f1ff;
  color: #004b9d;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}

.notify-button img {
  width: 20px;
  height: 20px;
}

.notify-button .text {
  font-size: 14px;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ff3b30;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 8px;
}

.user-section {
  background-color: #e5f1ff;
  padding: 12px;
  border-radius: 10px;
}

.user-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar.placeholder {
  background-color: #1a82d9;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  flex-grow: 1;
  text-align: left;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: #004b9d;
}

.email {
  font-size: 12px;
  color: #4a6fa1;
}

.chevron {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.user-dropdown {
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.user-dropdown .item {
  padding: 10px 12px;
  font-size: 14px;
  color: #004b9d;
  border-top: 1px solid #dce8f7;
  cursor: pointer;
  transition: background 0.2s;
}

.user-dropdown .item:hover {
  background-color: #f0f7ff;
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

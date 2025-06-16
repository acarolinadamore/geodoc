<template>
  <div class="user-profile-dropdown">
    <button @click="toggleDropdown" class="profile-button">
      <!-- Imagem OU inicial -->
      <img
        v-if="computedUserImage"
        :src="computedUserImage"
        :alt="userName"
        class="user-avatar"
      />
      <div v-else class="user-avatar-placeholder">
        {{ userInitial }}
      </div>

      <span class="user-name">{{ userName }}</span>
      <svg
        class="dropdown-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <!-- Resto do dropdown continua igual -->
    <div v-if="dropdownOpen" class="dropdown-menu">
      <a href="#" class="dropdown-item">Perfil</a>
      <a href="#" class="dropdown-item">Configurações</a>
      <hr class="dropdown-divider" />
      <a href="#" class="dropdown-item">Sair</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileDropdown',
  props: {
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dropdownOpen: false,
    }
  },
  computed: {
    computedUserImage() {
      return this.userImage
    },
    userInitial() {
      return this.userName ? this.userName.charAt(0).toUpperCase() : '?'
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
  },
}
</script>

<style scoped>
.user-profile-dropdown {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.profile-button:hover {
  background-color: #f3f4f6;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 50;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 45px;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  transition: background-color 0.2s;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  border: none;
  line-height: 1;
}

.dropdown-item:hover {
  background-color: #ebf4fc;
}

.dropdown-item:first-child {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.dropdown-divider {
  margin: 0;
  border: none;
  border-top: 1px solid #e5e7eb;
  height: 1px;
}

.user-avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1a82d9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}
</style>

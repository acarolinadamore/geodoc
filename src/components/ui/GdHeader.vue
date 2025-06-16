<template>
  <header class="gd-header">
    <div class="left-section"></div>

    <div class="middle-section">
      <gd-data-atual v-if="showDate" />
    </div>

    <div class="right-section">
      <gd-notification v-if="showNotification" />
      <user-profile-dropdown
        :user-name="currentUser.name"
        :user-image="currentUser.image"
      />
    </div>
  </header>
</template>

<script>
import GdDataAtual from './GdDataAtual.vue'
import UserProfileDropdown from './UserProfileDropdown.vue'
import GdNotification from '@/components/ui/GdNotification.vue'
import { UserService } from '@/services/index.js'

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
      default: true,
    },
    showNotification: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      loading: false,
    }
  },
  async mounted() {
    await this.loadUsers()
  },
  computed: {
    currentUser() {
      return this.selectedUser || { name: '', image: null }
    },
  },
  methods: {
    async loadUsers() {
      try {
        this.loading = true
        this.users = await UserService.getUsers()
        this.selectedUser = this.users[0] || null
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
      } finally {
        this.loading = false
      }
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
  height: 70px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
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
</style>

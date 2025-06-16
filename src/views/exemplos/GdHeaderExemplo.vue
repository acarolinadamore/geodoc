<template>
  <div class="exemplo-container">
    <!-- Seletor de usuário -->
    <div v-if="loading" class="loading">Carregando usuários...</div>
    <div v-else class="user-selector">
      <label>Selecione um usuário:</label>
      <select v-model="selectedUserId">
        <option v-for="user in usuarios" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <!-- Exemplos de header -->
    <div class="header-examples">
      <div class="example-item">
        <h3>Header Default</h3>
        <gd-header :selected-user="currentUser" />
      </div>

      <div class="example-item">
        <h3>Header sem Data Atual</h3>
        <gd-header :show-date="false" :selected-user="currentUser" />
      </div>

      <div class="example-item">
        <h3>Header sem Data Atual e Notificações</h3>
        <gd-header
          :show-date="false"
          :show-notification="false"
          :selected-user="currentUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GdHeader from '@/components/ui/GdHeader.vue'
import { userService } from '@/services'

export default {
  components: {
    'gd-header': GdHeader,
  },
  data() {
    return {
      usuarios: [],
      selectedUserId: null,
      loading: true,
    }
  },
  computed: {
    currentUser() {
      if (!this.usuarios.length) return { name: '', image: '' }
      return (
        this.usuarios.find(user => user.id === this.selectedUserId) ||
        this.usuarios[0]
      )
    },
  },
  async created() {
    await this.loadUsers()
  },
  methods: {
    async loadUsers() {
      try {
        console.log('🔄 Carregando usuários...')
        this.usuarios = await userService.getUsers()
        if (this.usuarios.length > 0) {
          this.selectedUserId = this.usuarios[0].id
        }
        console.log('✅ Usuários carregados:', this.usuarios)
      } catch (error) {
        console.error('❌ Erro ao carregar usuários:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.exemplo-container {
  width: 100%;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.user-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.user-selector label {
  font-weight: 500;
}

.user-selector select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
}

.header-examples {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.example-item {
  width: 100%;
}

.example-item h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}
</style>

<template>
  <div class="w-full bg-white text-gray-800">
    <div class="space-y-10 p-10 max-w-3xl mx-auto">
      <div class="flex items-center gap-4">
        <p class="text-left font-semibold">Selecione um usuário:</p>
        <select id="user-select" v-model="selectedUserId">
          <option v-for="user in usuarios" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <p class="text-left font-semibold">1. Header Default</p>
      <gd-header :userName="currentUser.name" :userImage="currentUser.image" />

      <p class="text-left font-semibold">2. Header sem Data Atual</p>
      <gd-header
        :userName="currentUser.name"
        :userImage="currentUser.image"
        :showDate="false"
      />

      <p class="text-left font-semibold">
        3. Header sem Data Atual e Notificações
      </p>
      <gd-header
        :userName="currentUser.name"
        :userImage="currentUser.image"
        :showDate="false"
        :showNotification="false"
      />
    </div>
  </div>
</template>

<script>
import GdHeader from '@/components/ui/GdHeader.vue'
import users from '@/assets/mock-data/users.json'

export default {
  components: {
    'gd-header': GdHeader,
  },
  data() {
    return {
      usuarios: users,
      selectedUserId: users[1].id,
    }
  },
  computed: {
    currentUser() {
      return this.usuarios.find(user => user.id === this.selectedUserId)
    },
  },
}
</script>

<style scoped>
.space-y-10 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

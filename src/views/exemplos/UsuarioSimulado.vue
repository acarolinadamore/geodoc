<template>
  <div>
    <div v-for="usuario in usuarios" :key="usuario.id">
      <UserProfileDropdown
        :userName="usuario.name"
        :userImage="usuario.image"
      />
    </div>
  </div>
</template>

<script>
import users from '@/assets/mock-data/users.json'
import UserProfileDropdown from '@/components/ui/UserProfileDropdown.vue'

export default {
  name: 'UsuarioSimulado',
  components: {
    UserProfileDropdown,
  },
  data() {
    return {
      usuarios: users,
    }
  },
}
</script>

<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md focus:outline-none"
    >
      <span>{{ userName }}</span>
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
      <img
        :src="userImage"
        alt="Foto do usuário"
        class="w-8 h-8 rounded-full object-cover"
      />
    </button>

    <div
      v-if="dropdownOpen"
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
    >
      <div class="py-1">
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >Perfil</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >Configurações</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >Sair</a
        >
      </div>
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
      required: true,
    },
  },
  data() {
    return {
      dropdownOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
  },
}
</script>

<style scoped>
/* Nada específico ainda */
</style>

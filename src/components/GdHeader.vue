<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-end">
      <div class="flex items-center space-x-3">
        <div class="profile-image">
          <img
            :src="userImage"
            :alt="userName"
            class="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <span class="text-gray-700 font-medium">{{ userName }}</span>
        <svg
          class="w-4 h-4 text-gray-500 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GdHeader',
  props: {
    userName: {
      type: String,
      default: 'Ana Carolina',
    },
    userImage: {
      type: String,
      default: () => require('@/assets/images/perfil.png'),
    },
  },
}
</script>

<style scoped>
.profile-image {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

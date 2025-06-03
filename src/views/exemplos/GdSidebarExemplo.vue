<template>
  <div>
    <GdSidebar @navigate="handleNavigation" />
  </div>
</template>

<script>
import GdSidebar from '@/components/ui/GdSidebar.vue'

export default {
  name: 'GdSidebarExemplo',
  components: {
    GdSidebar,
  },
  methods: {
    handleNavigation(page) {
      // Handle the navigation logic here
      console.log('Navigating to:', page)
    },
  },
}
</script>

<style scoped></style>

<template>
  <header class="gd-header bg-white border-b border-slate-200">
    <div class="left-section px-6">
      <GdDataAtual v-if="showDate" />
    </div>
    <div class="right-section flex">
      <div class="border-l border-slate-200 h-full px-2 flex items-center">
        <GdNotification :showNotification="showNotification" />
      </div>
      <div class="border-l border-slate-200 h-full px-2 flex items-center">
        <UserProfileDropdown :userName="userName" :userImage="userImage" />
      </div>
    </div>
  </header>
</template>

<script>
import GdDataAtual from './GdDataAtual.vue'
import UserProfileDropdown from './UserProfileDropdown.vue'
import GdNotification from '@/components/ui/GdNotification.vue'

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
    return {}
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
}
.left-section,
.middle-section,
.right-section {
  display: flex;
  align-items: center;
}
</style>

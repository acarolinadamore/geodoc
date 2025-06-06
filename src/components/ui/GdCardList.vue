<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="space-y-6">
      <GdCard v-for="card in cards" :key="card.id" :cardData="card" />
    </div>
  </div>
</template>

<script>
import GdCard from '@/components/ui/GdCard.vue'

export default {
  name: 'GdCardList',
  components: {
    GdCard,
  },
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style scoped></style>

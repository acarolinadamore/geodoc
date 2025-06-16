<template>
  <div class="p-4 min-h-screen">
    <div class="space-y-6">
      <GdCard v-for="card in cards" :key="card.id" :card="card" />
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

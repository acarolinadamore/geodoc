<template>
  <div class="flex justify-center items-center gap-4 py-6">
    <div class="flex items-center gap-2">
      <button
        :disabled="currentPage === 1"
        @click="$emit('change-page', currentPage - 1)"
        class="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Anterior
      </button>

      <div class="flex gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="[
            'px-3 py-2 rounded border transition-colors',
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-50',
          ]"
          @click="$emit('change-page', page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        :disabled="currentPage === totalPages"
        @click="$emit('change-page', currentPage + 1)"
        class="px-3 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Próxima
      </button>
    </div>

    <div class="text-sm text-gray-600">
      Página {{ currentPage }} de {{ totalPages }} ({{ total }} itens)
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdPaginacao',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    },
  },
}
</script>

<template>
  <div
    class="flex-1 rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-800"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-medium text-left">{{ titulo }}</h3>
    </div>
    <div class="flex flex-col gap-1 text-left">
      <div
        v-for="link in links"
        :key="link.id"
        class="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
        @click="navegarPara(link)"
      >
        {{ link.titulo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardLinks',
  props: {
    titulo: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    navegarPara(link) {
      if (link.url) {
        this.$router.push(link.url)
      }
    },
  },
}
</script>

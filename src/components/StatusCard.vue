<template>
  <div
    :class="['p-4 rounded-xl shadow-sm transition-colors', corBg || 'bg-white']"
  >
    <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ titulo }}</h3>
    <p class="text-3xl font-bold text-gray-900 mb-2">{{ total }}</p>

    <ul
      v-if="documentos.length"
      class="list-disc list-inside text-sm text-gray-700 space-y-1"
    >
      <li v-for="(doc, index) in documentos" :key="index">{{ doc }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StatusCard',
  props: {
    titulo: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    documentos: {
      type: Array,
      default: () => [],
    },
    corBg: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
/* Mantido vazio, pois tudo está no Tailwind. Pode adicionar hover aqui se desejar */
</style>

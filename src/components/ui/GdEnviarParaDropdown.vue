<template>
  <div class="relative">
    <button
      class="flex items-center px-4 py-2 bg-white border rounded cursor-pointer text-gray-700 hover:bg-gray-50"
      @click="open = !open"
    >
      <svg
        class="w-5 h-5 text-blue-500 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 19a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V19z"
        />
      </svg>
      <span>Enviar para</span>
      <svg
        class="w-4 h-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M19 9l-7 7-7-7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
    <div
      v-if="open"
      class="absolute z-10 left-0 mt-2 w-48 bg-white border rounded shadow"
    >
      <ul>
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          v-for="marker in markers"
          :key="marker.value"
          @click="handleMarker(marker)"
        >
          <span
            class="inline-block w-2 h-2 rounded-full mr-2"
            :style="{ background: marker.color }"
          ></span>
          {{ marker.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      markers: [
        { label: 'Diretoria', value: 'diretoria', color: '#2563eb' },
        { label: 'Negócios', value: 'negocios', color: '#16a34a' },
        { label: 'Financeiro', value: 'financeiro', color: '#f59e0b' },
        { label: 'RH', value: 'rh', color: '#ef4444' },
        // Outras opções...
      ],
    }
  },
  methods: {
    handleMarker(marker) {
      this.$emit('select-marker', marker.value)
      this.open = false
    },
  },
}
</script>

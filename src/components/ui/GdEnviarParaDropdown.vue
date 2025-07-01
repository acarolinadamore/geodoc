<template>
  <div class="relative">
    <button
      class="flex items-center px-3 py-2 bg-white border rounded cursor-pointer text-gray-700 hover:bg-gray-50"
      @click="abrirFecharDropdown"
      aria-haspopup="true"
      :aria-expanded="open.toString()"
      aria-label="Abrir menu de marcadores"
    >
      <!-- Ícone azul seta -->
      <svg
        class="w-5 h-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>

      <!-- Setinha para baixo -->
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
      role="menu"
      aria-label="Menu de marcadores"
    >
      <ul>
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-left"
          v-for="marker in marcadoresParaMostrar"
          :key="marker.value"
          @click="selecionarMarcador(marker)"
          role="menuitem"
          tabindex="0"
        >
          {{ marker.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
      marcadoresPadrao: [
        { label: 'Urgente', value: 'urgente' },
        { label: 'Pessoal', value: 'pessoal' },
        { label: 'Todos', value: 'todos' },
      ],
    }
  },
  computed: {
    marcadoresParaMostrar() {
      const marcadores =
        !this.markers || this.markers.length === 0
          ? this.marcadoresPadrao
          : this.markers

      return marcadores.map(marcador => {
        if (marcador.value === 'todos') {
          return { ...marcador, label: 'Caixa de Entrada' }
        }
        return marcador
      })
    },
  },
  methods: {
    abrirFecharDropdown() {
      this.open = !this.open
    },
    selecionarMarcador(marcador) {
      this.$emit('select-marker', marcador.value)
      this.open = false
    },
  },
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>

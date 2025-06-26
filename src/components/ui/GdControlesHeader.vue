<template>
  <div
    class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-2"
  >
    <!-- Search e DatePicker -->
    <div
      class="flex flex-col lg:flex-row gap-3 lg:items-center w-full lg:w-auto order-1 lg:order-2"
    >
      <GdSearchBar
        :value="termoBusca"
        @search="$emit('buscar', $event)"
        @clear="$emit('buscar', '')"
        class="w-full lg:w-auto"
      />
      <GdDatePicker
        :value="intervaloData"
        placeholder="Selecionar período"
        @change="handleDateChange"
        class="w-full lg:w-auto"
      />
    </div>

    <!-- Botões de Ação -->
    <div class="flex gap-2 flex-wrap w-full lg:w-auto order-2 lg:order-1">
      <GdButton
        label="Atribuir em Lotes"
        variant="outlined"
        border-color="#37c989"
        text-color="#37c989"
        :disabled="cardsSelecionados.length === 0"
        @click="$emit('atribuir-lotes')"
        class="flex-1 lg:flex-none"
      />
      <GdButton
        label="Atribuir a mim"
        variant="outlined"
        border-color="#37c989"
        text-color="#37c989"
        :disabled="cardsSelecionados.length === 0"
        @click="$emit('atribuir-mim')"
        class="flex-1 lg:flex-none"
      />
      <GdButton
        label="Aprovar"
        icon="fa-check"
        variant="filled"
        bg-color="#37c989"
        text-color="#ffffff"
        :disabled="cardsSelecionados.length === 0"
        @click="$emit('aprovar')"
        class="flex-1 lg:flex-none"
      />
      <GdButton
        label="Agrupar"
        variant="filled"
        bg-color="#1a82d9"
        text-color="#ffffff"
        :disabled="cardsSelecionados.length === 0"
        @click="$emit('agrupar')"
        class="flex-1 lg:flex-none"
      />
    </div>
  </div>
</template>

<script>
import GdButton from '@/components/ui/GdButton.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'

export default {
  name: 'GdControlesHeader',
  components: {
    GdButton,
    GdSearchBar,
    GdDatePicker,
  },
  props: {
    termoBusca: {
      type: String,
      default: '',
    },
    intervaloData: {
      type: Array,
      default: () => [],
    },
    cardsSelecionados: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleDateChange(event) {
      const { date } = event
      let dataInicio = null
      let dataFim = null

      if (Array.isArray(date) && date.length === 2) {
        dataInicio = date[0]
        dataFim = date[1]
      } else if (date instanceof Date) {
        dataInicio = dataFim = date
      }

      this.$emit('alterar-data', { dataInicio, dataFim })
    },
  },
}
</script>

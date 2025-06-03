<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <div class="flex space-x-4 mb-4">
      <GdBadge
        type="rectangular"
        text="Todos"
        color="dark-blue"
        is-clickable
        size="large"
      />
      <GdBadge
        type="rectangular"
        text="À Configurar"
        color="gray"
        is-clickable
        size="large"
      />
      <GdBadge
        type="rectangular"
        text="Recebidos"
        color="gray"
        is-clickable
        size="large"
      />
      <GdBadge
        type="rectangular"
        text="Solicitados"
        color="gray"
        is-clickable
        size="large"
      />
      <GdBadge
        type="rectangular"
        text="Lembretes"
        color="gray"
        is-clickable
        size="large"
      />
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4"
    >
      <div class="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
        <GdBadge
          type="rectangular"
          text="Todos"
          color="blue"
          is-clickable
          size="small"
        />
        <GdBadge
          type="rectangular"
          text="Solicitação à Fábrica de Software"
          color="yellow"
          is-clickable
          size="small"
        />
        <GdBadge
          type="rectangular"
          text="Indicadores Diretoria de Negócios"
          color="blue"
          is-clickable
          size="small"
        />
      </div>
      <div
        class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto"
      >
        <GdSearchBar class="w-full sm:w-auto" />
        <GdDatePicker class="w-full sm:w-auto" />
      </div>
    </div>
    <GdAvisoAtraso class="mt-4" />
  </div>
</template>

<script>
import GdBadge from '@/components/ui/GdBadge.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'
import GdAvisoAtraso from '@/components/ui/GdAvisoAtraso.vue'

export default {
  name: 'GdFilterBar',
  components: {
    GdBadge,
    GdSearchBar,
    GdDatePicker,
    GdAvisoAtraso,
  },
}
</script>

<template>
  <div class="gd-data-atual">
    {{ currentDate }}
  </div>
</template>

<script>
export default {
  name: 'GdDataAtual',
  data() {
    const date = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return {
      currentDate: date,
    }
  },
}
</script>

<style scoped>
/* Estilize conforme necessário */
</style>

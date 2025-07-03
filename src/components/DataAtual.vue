<template>
  <div class="gd-data-atual">
    <img
      src="@/assets/images/calendario2.png"
      alt="Calendário"
      class="calendar-icon"
    />
    {{ dataAtual }}
  </div>
</template>

<script>
export default {
  name: 'DataAtual',
  data() {
    const data = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const capitalizarData = texto => {
      return texto
        .replace(/^./, texto[0].toUpperCase())
        .replace(/ de /g, ' ')
        .replace(/(?:^|\s)([a-z])/g, correspondencia =>
          correspondencia.toUpperCase()
        )
    }

    return {
      dataAtual: capitalizarData(data),
    }
  },
}
</script>

<style scoped>
.gd-data-atual {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.calendar-icon {
  margin-right: 8px;
  margin-bottom: 2px;
  width: 26px;
}
</style>

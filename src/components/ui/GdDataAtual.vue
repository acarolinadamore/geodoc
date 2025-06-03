<template>
  <div class="gd-data-atual">
    <img
      src="@/assets/images/calendario2.png"
      alt="Calendário"
      class="calendar-icon"
    />
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

    const capitalizeDate = string => {
      return string
        .replace(/^./, string[0].toUpperCase())
        .replace(/ de /g, ' ')
        .replace(/(?:^|\s)([a-z])/g, match => match.toUpperCase())
    }

    return {
      currentDate: capitalizeDate(date),
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

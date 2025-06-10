<template>
  <div class="mb-2 text-left flex flex-col gap-1">
    <p class="font-semibold gd-text-black">{{ remetente.nome }}</p>
    <p class="gd-text-gray">{{ remetente.funcao }}</p>
  </div>
</template>

<script>
export default {
  name: 'GdCardColunaRemetente',
  props: {
    remetente: {
      type: Object,
      required: true,
      validator: value => 'nome' in value && 'funcao' in value,
    },
    type: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped></style>

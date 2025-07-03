<template>
  <div class="mb-2 text-left flex flex-col justify-center h-full">
    <p class="gd-text-black remetente">{{ remetente.nome }}</p>
    <p class="card-span">{{ remetente.funcao }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardColunaRemetente',
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

<style scoped>
.remetente {
  font-size: 16px;
  font-weight: 400;
}
</style>

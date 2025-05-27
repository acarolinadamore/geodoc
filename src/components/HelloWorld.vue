<template>
  <div
    class="p-8 bg-blue-100 min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl font-bold text-blue-700 mb-4">
      Tailwind CSS está funcionando!
    </h1>
    <p class="text-gray-700 mb-6">
      Se você vê esse texto estilizado com espaçamento, cores e fonte do
      Tailwind, está tudo certo.
    </p>
    <button
      class="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded shadow"
      @click="clickHandler"
    >
      Clique aqui
    </button>
    <p v-if="clicked" class="mt-4 text-green-600 font-medium">
      Você clicou no botão!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      clicked: false,
    }
  },
  methods: {
    clickHandler() {
      this.clicked = true
    },
  },
}
</script>

<style scoped>
/* Não precisa adicionar nada aqui para Tailwind */
</style>

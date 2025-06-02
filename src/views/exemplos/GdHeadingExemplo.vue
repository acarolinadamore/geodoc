<template>
  <div class="w-full bg-white text-gray-800">
    <div class="space-y-10 p-10 max-w-5xl mx-auto">
      <p class="text-left font-semibold">
        1. Título padrão (centralizado com underline verde)
      </p>
      <gd-heading>Título</gd-heading>

      <p class="text-left font-semibold">2. Alinhado à esquerda</p>
      <gd-heading align="left">Título</gd-heading>

      <p class="text-left font-semibold">3. Alinhado à direita</p>
      <gd-heading align="right">Título</gd-heading>

      <p class="text-left font-semibold">4. Sem underline</p>
      <gd-heading :underline="false">Título</gd-heading>

      <p class="text-left font-semibold">
        5. Underline mudando a cor e width do underline
      </p>
      <gd-heading
        underline
        class="bg-gray-50 p-4 rounded"
        linhaClassName="bg-red-500 w-10"
      >
        Título
      </gd-heading>

      <p class="text-left font-semibold">
        6. Aumentando o size do título (text-5xl) com cor "primary"
      </p>
      <gd-heading size="text-5xl" color="primary">Título</gd-heading>

      <p class="text-left font-semibold">
        7. Diminuindo size do título (text-sm) com cor "secondary"
      </p>
      <gd-heading
        size="text-sm"
        color="secondary"
        linhaClassName="bg-red-500 w-10"
        >Título</gd-heading
      >
    </div>
  </div>
</template>

<script>
import GdHeading from '@/components/ui/GdHeading.vue'

export default {
  name: 'GdHeadingExemplo',
  components: {
    'gd-heading': GdHeading,
  },
}
</script>

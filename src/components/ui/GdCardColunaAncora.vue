<template>
  <div class="mt-3 text-sm text-left bg-aqua p-4 rounded-lg">
    <div class="space-y-1">
      <div class="flex items-center">
        <span
          class="gd-text-gray w-32 text-right flex-shrink-0 whitespace-nowrap"
          >Tipo:</span
        >
        <div class="ml-2">
          <GdTag :text="projeto.tipo" />
        </div>
      </div>

      <div class="flex items-center">
        <span
          class="gd-text-gray w-32 text-right flex-shrink-0 whitespace-nowrap"
          >Projeto:</span
        >
        <div class="ml-2">
          <GdTag :text="projeto.projeto" />
        </div>
      </div>

      <div class="flex items-center">
        <span
          class="gd-text-gray w-32 text-right flex-shrink-0 whitespace-nowrap"
          >Prestador de Serviço:</span
        >
        <div class="ml-2">
          <GdTag :text="projeto.prestadorServico" />
        </div>
      </div>

      <div class="flex items-center">
        <span
          class="gd-text-gray w-32 text-right flex-shrink-0 whitespace-nowrap"
          >Data de Pagamento:</span
        >
        <div class="ml-2">
          <GdTag :text="projeto.dataPagamento" />
        </div>
      </div>

      <div class="flex items-center">
        <span
          class="gd-text-gray w-32 text-right flex-shrink-0 whitespace-nowrap"
          >Unidade:</span
        >
        <div class="ml-2">
          <GdTag :text="projeto.unidade" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GdTag from '@/components/ui/GdTag.vue'

export default {
  name: 'GdCardColunaAncora',
  components: {
    GdTag,
  },
  props: {
    projeto: {
      type: Object,
      required: true,
      validator: value =>
        'tipo' in value &&
        'projeto' in value &&
        'prestadorServico' in value &&
        'dataPagamento' in value &&
        'unidade' in value,
    },
  },
}
</script>

<style scoped></style>

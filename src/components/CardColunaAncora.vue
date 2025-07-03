<template>
  <div class="mt-3 text-sm text-left bg-aqua rounded-lg">
    <div class="space-y-1">
      <div class="flex items-center">
        <span class="card-span w-32 text-right flex-shrink-0 whitespace-nowrap">
          Modelo
        </span>
        <div class="ml-2">
          <Tag :text="projeto.modelo" />
        </div>
      </div>

      <div class="flex items-center">
        <span class="card-span w-32 text-right flex-shrink-0 whitespace-nowrap">
          Projeto
        </span>
        <div class="ml-2">
          <Tag :text="projeto.projeto" />
        </div>
      </div>

      <div class="flex items-center">
        <span class="card-span w-32 text-right flex-shrink-0 whitespace-nowrap">
          Prestador de Serviço
        </span>
        <div class="ml-2">
          <Tag :text="projeto.prestadorServico" />
        </div>
      </div>

      <div class="flex items-center">
        <span class="card-span w-32 text-right flex-shrink-0 whitespace-nowrap">
          Data de Pagamento
        </span>
        <div class="ml-2">
          <Tag :text="projeto.dataPagamento" />
        </div>
      </div>

      <div class="flex items-center">
        <span class="card-span w-32 text-right flex-shrink-0 whitespace-nowrap">
          Unidade
        </span>
        <div class="ml-2">
          <Tag :text="projeto.unidade" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag.vue'

export default {
  name: 'CardColunaAncora',
  components: {
    Tag,
  },
  props: {
    projeto: {
      type: Object,
      required: true,
      validator: value =>
        'modelo' in value &&
        'projeto' in value &&
        'prestadorServico' in value &&
        'dataPagamento' in value &&
        'unidade' in value,
    },
  },
}
</script>

<style scoped></style>

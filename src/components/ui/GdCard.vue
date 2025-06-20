<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md overflow-hidden border-2 w-full flex flex-col xl:flex-row',
      selected ? 'border-blue-500' : 'border-transparent',
    ]"
  >
    <!-- Coluna Data/Vencimento - Mobile (topo) -->
    <div class="w-full xl:hidden">
      <GdCardColunaData
        :dataInicio="card.documento?.dataInicio"
        :dataVencimento="card.vencimento"
      />
    </div>

    <div
      class="flex flex-col xl:flex-row w-full p-4 xl:p-6 gap-6 xl:gap-4 min-h-[120px]"
    >
      <!-- Coluna 1 - Data/Vencimento (Desktop) -->
      <div class="hidden xl:flex flex-1 flex-col justify-center items-center">
        <GdCardColunaData
          :dataInicio="card.documento?.dataInicio"
          :dataVencimento="card.vencimento"
        />
      </div>

      <!-- Coluna 2 - Remetente -->
      <div class="flex flex-1 flex-col justify-start xl:justify-center">
        <GdCardColunaRemetente
          :remetente="card.remetente"
          :type="card.documento?.modelo"
        />
      </div>

      <!-- Coluna 3 - Documento -->
      <div
        class="flex w-full xl:w-1/3 flex-col justify-start xl:justify-center"
      >
        <GdCardColunaDocumento :documento="card.documento" />
      </div>

      <!-- Coluna 4 - Âncoras -->
      <div class="flex flex-1 flex-col justify-start xl:justify-center">
        <GdCardColunaAncora :projeto="card.ancora" />
      </div>

      <!-- Coluna 5 - Ações -->
      <div
        class="flex flex-1 flex-col gap-3 xl:gap-2 justify-start xl:justify-center items-stretch xl:items-center pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-200"
      >
        <GdButton
          v-for="acao in card.acoes"
          :key="acao"
          class="w-full xl:w-auto xl:min-w-[120px]"
        >
          {{ acao }}
        </GdButton>
      </div>
    </div>
  </div>
</template>

<script>
import GdCardColunaRemetente from '@/components/ui/GdCardColunaRemetente.vue'
import GdCardColunaDocumento from '@/components/ui/GdCardColunaDocumento.vue'
import GdCardColunaAncora from '@/components/ui/GdCardColunaAncora.vue'
import GdCardColunaData from '@/components/ui/GdCardColunaData.vue'
import GdButton from '@/components/ui/GdButton.vue'

export default {
  name: 'GdCard',
  components: {
    GdCardColunaRemetente,
    GdCardColunaDocumento,
    GdCardColunaAncora,
    GdCardColunaData,
    GdButton,
  },
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

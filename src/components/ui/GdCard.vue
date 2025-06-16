<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md overflow-hidden border-2 w-full flex flex-col xl:flex-row',
      isSelected ? 'border-green-500' : 'border-transparent',
    ]"
    @click="toggleSelection"
  >
    <div class="w-full xl:hidden">
      <GdCardColunaVencimento :dataVencimento="card.vencimento" />
    </div>
    <div class="flex flex-col xl:flex-row w-full p-4 xl:p-6 gap-6 xl:gap-4">
      <!-- Coluna 1 - Remetente -->
      <div
        class="flex flex-1 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaRemetente
          :remetente="card.remetente"
          :type="card.documento?.tipo"
        />
      </div>

      <!-- Coluna 2 - Documento -->
      <div
        class="flex w-full xl:w-1/3 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaDocumento :documento="card.documento" />
      </div>

      <!-- Coluna 3 - Âncoras -->
      <div
        class="flex flex-1 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaAncora :projeto="card.ancora" />
      </div>

      <!-- Coluna 4 - Prazo (Vencimento) - Apenas no desktop -->
      <div
        class="hidden xl:flex flex-1 flex-col justify-center items-center min-h-[120px]"
      >
        <GdCardColunaVencimento :dataVencimento="card.vencimento" />
      </div>

      <!-- Coluna 5 - Ações -->
      <div
        class="flex flex-1 flex-col gap-3 xl:gap-2 justify-start xl:justify-center items-stretch xl:items-center pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-200 min-h-0 xl:min-h-[120px]"
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
import GdCardColunaVencimento from '@/components/ui/GdCardColunaVencimento.vue'
import GdButton from '@/components/ui/GdButton.vue'

export default {
  name: 'GdCard',
  components: {
    GdCardColunaRemetente,
    GdCardColunaDocumento,
    GdCardColunaAncora,
    GdCardColunaVencimento,
    GdButton,
  },
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSelected: false,
    }
  },
  methods: {
    toggleSelection() {
      this.isSelected = !this.isSelected
    },
  },
}
</script>

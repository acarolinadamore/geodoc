<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md overflow-hidden border-2 w-full flex flex-col xl:flex-row',
      isSelected ? 'border-green-500' : 'border-transparent',
    ]"
    @click="toggleSelection"
  >
    <!-- Tag de vencimento no mobile - fixada no topo -->
    <div class="w-full xl:hidden">
      <GdCardColunaVencimento :dataVencimento="dataVencimento" />
    </div>

    <!-- Container das colunas principais -->
    <div class="flex flex-col xl:flex-row w-full p-4 xl:p-6 gap-6 xl:gap-4">
      <!-- Coluna 1 - Remetente -->
      <div
        class="flex flex-1 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaRemetente
          :remetente="remetenteData"
          :type="cardData.tipo"
        />
      </div>

      <!-- Coluna 2 - Documento -->
      <div
        class="flex w-full xl:w-1/3 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaDocumento :documento="cardData" />
      </div>

      <!-- Coluna 3 - Âncoras -->
      <div
        class="flex flex-1 flex-col justify-start xl:justify-center min-h-0 xl:min-h-[120px]"
      >
        <GdCardColunaAncora :projeto="ancoraData" />
      </div>

      <!-- Coluna 4 - Prazo (Vencimento) - Apenas no desktop -->
      <div
        class="hidden xl:flex flex-1 flex-col justify-center items-center min-h-[120px]"
      >
        <GdCardColunaVencimento :dataVencimento="dataVencimento" />
      </div>

      <!-- Coluna 5 - Ações -->
      <div
        class="flex flex-1 flex-col gap-3 xl:gap-2 justify-start xl:justify-center items-stretch xl:items-center pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-200 min-h-0 xl:min-h-[120px]"
      >
        <GdButton
          v-for="acao in acoes"
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
import cardData from '@/assets/mock-data/card-dados.json'

export default {
  name: 'GdCard',
  components: {
    GdCardColunaRemetente,
    GdCardColunaDocumento,
    GdCardColunaAncora,
    GdCardColunaVencimento,
    GdButton,
  },
  data() {
    return {
      cardData: cardData.documento,
      remetenteData: cardData.remetente,
      ancoraData: cardData.ancora,
      dataVencimento: cardData.vencimento,
      acoes: cardData.acoes,
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

<style scoped>
/* Melhorias adicionais para leitura */
@media (max-width: 1279px) {
  /* Mobile: espaçamento otimizado para leitura vertical */
  .flex-col > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

@media (min-width: 1280px) {
  /* Desktop: alinhamento centralizado para harmonia visual */
  .flex-row > div {
    min-height: 80px;
  }
}
</style>

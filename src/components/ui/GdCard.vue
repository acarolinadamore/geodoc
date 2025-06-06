<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md overflow-hidden border-2 w-full flex flex-col md:flex-row',
      isSelected ? 'border-green-500' : 'border-transparent',
    ]"
    @click="toggleSelection"
  >
    <div class="w-full md:hidden">
      <GdCardColunaVencimento :dataVencimento="dataVencimento" />
    </div>
    <!-- Container das colunas principais -->
    <div class="flex flex-col md:flex-row w-full p-4">
      <!-- Coluna 1 - Remetente -->
      <div class="flex flex-1 px-2 flex-col justify-center items-center">
        <GdCardColunaRemetente
          :remetente="remetenteData"
          :type="cardData.tipo"
        />
      </div>

      <!-- Coluna 2 - Documento -->
      <div class="flex w-full md:w-1/3 px-2 flex-col">
        <GdCardColunaDocumento :documento="cardData" />
      </div>

      <!-- Coluna 3 - Âncoras -->
      <div class="flex flex-1 px-2 flex-col">
        <GdCardColunaAncora :projeto="ancoraData" />
      </div>

      <!-- Coluna 4 - Prazo (Vencimento) - Apenas no desktop -->
      <div
        class="hidden md:flex flex-1 px-2 flex-col justify-center items-center"
      >
        <GdCardColunaVencimento :dataVencimento="dataVencimento" />
      </div>

      <!-- Coluna 5 - Ações -->
      <div class="flex flex-1 px-2 flex-col gap-2 justify-center items-center">
        <GdButton v-for="acao in acoes" :key="acao">{{ acao }}</GdButton>
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

<style scoped></style>

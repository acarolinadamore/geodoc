<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md w-full flex flex-col xl:flex-row card-container cursor-pointer',
      { 'card-selected': selected },
    ]"
    @click="handleCardClick"
  >
    <!-- Coluna Data/Vencimento - Mobile (topo) -->
    <div class="w-full xl:hidden overflow-visible">
      <GdCardColunaData
        :dataInicio="card.documento?.dataInicio"
        :dataVencimento="card.vencimento"
      />
    </div>

    <!-- Container principal com overflow controlado -->
    <div class="overflow-hidden w-full">
      <div
        class="flex flex-col xl:flex-row w-full p-3 gap-2 xl:gap-2 min-h-[120px]"
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
          @click.stop
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
  methods: {
    handleCardClick() {
      // Emite evento para o componente pai selecionar/desselecionar o card
      this.$emit('toggle-selection', this.card.id)
    },
  },
}
</script>

<style scoped>
/* Card padrão - branco com sombra sutil */
.card-container {
  border: 0.7px solid transparent !important;
  border-width: 0.7px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  background-color: white !important;
}

/* Card selecionado - GLOW AZUL MUITO SUTIL COM COR CORRETA */
.card-container.card-selected {
  border-color: #1988c8 !important; /* ✅ Removido verde, só azul */
  border-width: 0.7px !important;
  background-color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 173, 229, 0.1),
    /* ✅ Azul #00ADE5 */ 0 0 8px rgba(0, 173, 229, 0.08),
    0 0 16px rgba(0, 173, 229, 0.05) !important;
}

/* Hover no card não selecionado - glow quase invisível */
.card-container:hover:not(.card-selected) {
  border-color: rgba(0, 173, 229, 0.15) !important; /* ✅ Azul #00ADE5 */
  border-width: 0.7px !important;
  background-color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 173, 229, 0.05),
    0 0 6px rgba(0, 173, 229, 0.04) !important;
  transform: translateY(-0.5px) !important;
}

/* Hover no card selecionado - glow ligeiramente mais visível */
.card-container.card-selected:hover {
  background-color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 173, 229, 0.15),
    /* ✅ Azul #00ADE5 */ 0 0 10px rgba(0, 173, 229, 0.1),
    0 0 20px rgba(0, 173, 229, 0.08) !important;
  transform: translateY(-0.5px) !important;
}

/* Garante que o conteúdo interno permaneça branco */
.card-container * {
  box-sizing: border-box;
}

/* Força o fundo branco em todos os elementos internos */
.card-container > * {
  background-color: transparent !important;
}

/* Cursor pointer para indicar que é clicável */
.card-container {
  cursor: pointer !important;
}
</style>

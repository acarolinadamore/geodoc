<template>
  <div
    :class="['card-container', { 'card-selected': selected }]"
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
      this.$emit('toggle-selection', this.card.id)
    },
  },
}
</script>

<style scoped>
.card-container {
  --card-border-width: 1.6px;
}

.card-container {
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: var(--card-border-width) solid #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

@media (min-width: 1280px) {
  .card-container {
    flex-direction: row;
  }
}

.card-container.card-selected {
  border-color: #489be1;
  border-width: var(--card-border-width);
  background-color: white;
}

.card-container:hover:not(.card-selected) {
  border-color: #489be1;
  border-width: var(--card-border-width);
  background-color: white;
  transform: translateY(-1px);
}

.card-container.card-selected:hover {
  background-color: white;
  transform: translateY(-1px);
}

.card-container > * {
  background-color: transparent;
}
</style>

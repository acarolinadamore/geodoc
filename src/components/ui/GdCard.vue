<template>
  <div
    :class="['card-container', { 'card-selected': selected }]"
    @click="handleCardClick"
  >
    <!-- Data/Vencimento - Mobile (topo) -->
    <div class="w-full xl:hidden">
      <GdCardColunaData
        :data-inicio="card.documento.dataInicio"
        :data-vencimento="card.vencimento"
      />
    </div>

    <!-- Container principal -->
    <div class="card-content">
      <div class="card-grid">
        <!-- Data/Vencimento - Desktop -->
        <div class="hidden xl:flex card-column card-column-data">
          <GdCardColunaData
            :data-inicio="card.documento.dataInicio"
            :data-vencimento="card.vencimento"
          />
        </div>

        <!-- Remetente -->
        <div class="card-column card-column-remetente">
          <GdCardColunaRemetente
            :remetente="card.remetente"
            :type="card.documento.modelo"
          />
        </div>

        <!-- Documento -->
        <div class="card-column card-column-documento">
          <GdCardColunaDocumento :documento="card.documento" />
        </div>

        <!-- Âncoras -->
        <div class="card-column card-column-ancora">
          <GdCardColunaAncora :projeto="card.ancora" />
        </div>

        <!-- Ações -->
        <div class="card-column card-column-acoes" @click.stop>
          <GdButton v-for="acao in card.acoes" :key="acao" class="card-button">
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
      default: function () {
        return {}
      },
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
  --card-border-color: #e5e7eb;
  --card-border-color-hover: #489be1;
  --card-border-color-selected: #489be1;
}

.card-container {
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: var(--card-border-width) solid var(--card-border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

/* ========================================
   ESTADOS DO CARD
   ======================================== */
.card-container:hover:not(.card-selected) {
  border-color: var(--card-border-color-hover);
  transform: translateY(-1px);
}

.card-container.card-selected {
  border-color: var(--card-border-color-selected);
}

.card-container.card-selected:hover {
  transform: translateY(-1px);
}

/* ========================================
   LAYOUT INTERNO
   ======================================== */
.card-content {
  overflow: hidden;
  width: 100%;
}

.card-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  gap: 8px;
  min-height: 120px;
}

.card-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
}

.card-column-acoes {
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  align-items: stretch;
}

.card-button {
  width: 100%;
}

/* ========================================
   RESPONSIVE - DESKTOP
   ======================================== */
@media (min-width: 1280px) {
  .card-container {
    flex-direction: row;
  }

  .card-grid {
    flex-direction: row;
    gap: 8px;
    align-items: stretch;
    min-height: 160px;
  }

  .card-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .card-column-data {
    width: 12%;
    min-width: 120px;
  }

  .card-column-remetente {
    width: 10%;
    min-width: 120px;
  }

  .card-column-documento {
    width: 40%;
    min-width: 320px;
  }

  .card-column-ancora {
    width: 25%;
    min-width: 250px;
  }

  .card-column-acoes {
    width: 13%;
    min-width: 130px;
    gap: 8px;
    padding-top: 0;
    border-top: none;
    justify-content: center;
    align-items: center;
  }

  .card-button {
    width: auto;
    min-width: 120px;
  }
}

/* ========================================
   TABLET - OCULTAR TÍTULOS
   ======================================== */
@media (max-width: 1024px) and (min-width: 769px) {
  .title-cards-container {
    display: none;
  }
}
</style>

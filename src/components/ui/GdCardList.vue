<template>
  <div class="card-list-container">
    <div class="grupos-container">
      <!-- Agrupamento por Modelo -->
      <div
        v-for="(grupo, modelo) in cardsAgrupados"
        :key="modelo"
        class="grupo-modelo"
      >
        <!-- Cabeçalho do Modelo com Checkbox Dropdown -->
        <div class="cabecalho-modelo">
          <!-- Coluna 1: Dropdown alinhado com checkboxes dos cards -->
          <div class="coluna-dropdown">
            <GdCheckboxDropdown
              :checked-all="isModeloSelected(modelo)"
              :actions="getModeloActions(modelo)"
              @toggle-all="toggleModelo(modelo)"
              @action="handleModeloAction($event, modelo)"
            />
          </div>

          <!-- Coluna 2: Info do modelo -->
          <div class="coluna-info-modelo">
            <div
              class="icone-modelo"
              :style="{ backgroundColor: getModeloColor(modelo) }"
            >
              {{ getModeloInitials(modelo) }}
            </div>
            <h3 class="titulo-modelo">{{ modelo }}</h3>
            <span class="contador-modelo">
              ({{ grupo.length }} item{{ grupo.length !== 1 ? 's' : '' }})
            </span>
          </div>
        </div>

        <!-- Cards do Modelo -->
        <div class="cards-container">
          <div v-for="card in grupo" :key="card.id" class="card-row">
            <!-- Coluna 1: Checkbox alinhado com dropdown -->
            <div class="coluna-checkbox">
              <input
                type="checkbox"
                :checked="selectedCards.includes(card.id)"
                @change="toggleCardSelection(card.id)"
                class="checkbox-card"
              />
            </div>

            <!-- Coluna 2: Card -->
            <div class="coluna-card">
              <GdCard
                :card="card"
                :selected="selectedCards.includes(card.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script permanece igual -->
<script>
import GdCard from '@/components/ui/GdCard.vue'
import GdCheckboxDropdown from '@/components/ui/GdCheckboxDropdown.vue'

export default {
  name: 'GdCardList',
  components: {
    GdCard,
    GdCheckboxDropdown,
  },
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
    selectedCards: {
      type: Array,
      default: () => [],
    },
  },

  // ✅ COMPUTED corrigido para Vue 2
  computed: {
    cardsAgrupados() {
      // ✅ Verificação de segurança
      if (!this.cards || !Array.isArray(this.cards)) {
        return {}
      }

      return this.cards.reduce((grupos, card) => {
        // ✅ Verificação se documento existe
        const modelo = card?.documento?.modelo || 'Sem Modelo'

        if (!grupos[modelo]) {
          grupos[modelo] = []
        }
        grupos[modelo].push(card)
        return grupos
      }, {})
    },
  },

  methods: {
    toggleCardSelection(cardId) {
      this.$emit('toggle-card-selection', cardId)
    },

    toggleModelo(modelo) {
      if (!this.cardsAgrupados[modelo]) return

      const cardsDoModelo = this.cardsAgrupados[modelo].map(card => card.id)
      const allSelected = cardsDoModelo.every(id =>
        this.selectedCards.includes(id)
      )

      if (allSelected) {
        // Desmarcar todos do modelo
        cardsDoModelo.forEach(id => {
          if (this.selectedCards.includes(id)) {
            this.$emit('toggle-card-selection', id)
          }
        })
      } else {
        // Marcar todos do modelo
        cardsDoModelo.forEach(id => {
          if (!this.selectedCards.includes(id)) {
            this.$emit('toggle-card-selection', id)
          }
        })
      }
    },

    isModeloSelected(modelo) {
      if (!this.cardsAgrupados[modelo]) return false

      const cardsDoModelo = this.cardsAgrupados[modelo].map(card => card.id)
      return (
        cardsDoModelo.length > 0 &&
        cardsDoModelo.every(id => this.selectedCards.includes(id))
      )
    },

    getModeloActions(modelo) {
      const acoesPorModelo = {
        'Solicitação à Fábrica de Software': [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Aprovar todos', value: 'aprovar' },
          { label: 'Enviar para desenvolvimento', value: 'desenvolvimento' },
        ],
        'Solicitação de Orçamento': [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Aprovar todos', value: 'aprovar' },
          { label: 'Solicitar cotação', value: 'cotacao' },
        ],
        'Relatório de Progresso': [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Revisar todos', value: 'revisar' },
          { label: 'Publicar todos', value: 'publicar' },
        ],
        'Auditoria de Processo': [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Agendar auditoria', value: 'agendar' },
          { label: 'Gerar relatório', value: 'relatorio' },
        ],
        'Conciliação Bancária': [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Aprovar todos', value: 'aprovar' },
          { label: 'Processar conciliação', value: 'processar' },
        ],
      }

      return (
        acoesPorModelo[modelo] || [
          { label: 'Atribuir todos', value: 'atribuir' },
          { label: 'Aprovar todos', value: 'aprovar' },
        ]
      )
    },

    handleModeloAction(action, modelo) {
      if (!this.cardsAgrupados[modelo]) return

      const cardsDoModelo = this.cardsAgrupados[modelo].map(card => card.id)
      this.$emit('modelo-action', { action, modelo, cardIds: cardsDoModelo })
    },

    getModeloColor(modelo) {
      const cores = {
        'Solicitação à Fábrica de Software': '#3b82f6',
        'Solicitação de Orçamento': '#10b981',
        'Relatório de Progresso': '#f59e0b',
        'Auditoria de Processo': '#ef4444',
        'Conciliação Bancária': '#8b5cf6',
      }
      return cores[modelo] || '#6b7280'
    },

    getModeloInitials(modelo) {
      if (!modelo || typeof modelo !== 'string') return 'SM'

      return modelo
        .split(' ')
        .map(palavra => palavra.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    },
  },
}
</script>

<style scoped>
.card-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.grupos-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.grupo-modelo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* === CABEÇALHO DO MODELO === */
.cabecalho-modelo {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.coluna-dropdown {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.coluna-info-modelo {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.icone-modelo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.titulo-modelo {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  min-width: 0;
}

.contador-modelo {
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
}

/* === CONTAINER DOS CARDS === */
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
  align-items: center; /* ✅ Mudança principal: center em vez de flex-start */
}

/* === COLUNAS ALINHADAS === */
.coluna-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px; /* ✅ Altura fixa igual ao card */
}

.checkbox-card {
  width: 18px;
  height: 18px;
  accent-color: #1a82d9;
  cursor: pointer;
  margin: 0;
}

.coluna-card {
  min-width: 0;
}

/* === RESPONSIVIDADE === */
@media (max-width: 768px) {
  .cabecalho-modelo {
    grid-template-columns: 48px 1fr;
    gap: 12px;
  }

  .card-row {
    grid-template-columns: 48px 1fr;
    gap: 12px;
    align-items: flex-start; /* ✅ No mobile, volta para flex-start */
  }

  .coluna-checkbox {
    height: auto; /* ✅ No mobile, altura automática */
    min-height: 40px;
  }

  .checkbox-card {
    width: 16px;
    height: 16px;
  }

  .titulo-modelo {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .cabecalho-modelo,
  .card-row {
    grid-template-columns: 40px 1fr;
    gap: 8px;
  }

  .coluna-checkbox {
    min-height: 36px;
  }
}
</style>

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
        <div class="header-modelo">
          <!-- Coluna 1: Dropdown alinhado com checkboxes dos cards -->
          <div class="coluna-dropdown">
            <GdCheckboxDropdown
              :checked-all="temModeloSelecionado(modelo)"
              :actions="obterAcoesModelo(modelo)"
              @toggle-all="alternarModelo(modelo)"
              @action="manipularAcaoModelo($event, modelo)"
            />
          </div>

          <!-- Coluna 2: Info do modelo -->
          <div class="coluna-info-modelo">
            <div
              class="circle-modelo"
              :style="{ backgroundColor: obterCorModelo(modelo) }"
            >
              {{ obterIniciaisModelo(modelo) }}
            </div>
            <div class="info-texto">
              <h3 class="titulo-grupo">{{ modelo }}</h3>
              <span class="contador-modelo">
                ({{ grupo.length }} item{{ grupo.length !== 1 ? 's' : '' }})
              </span>
            </div>
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
                @change="alternarSelecaoCard(card.id)"
                class="form-checkbox h-4 w-4 rounded checkbox-custom"
              />
            </div>

            <!-- Coluna 2: Card -->
            <div class="coluna-card">
              <GdCard
                :card="card"
                :selected="selectedCards.includes(card.id)"
                @toggle-selection="alternarSelecaoCard"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Separador que toca o sidebar - fora dos grupos -->
      <div
        v-if="Object.keys(cardsAgrupados).length > 0"
        class="separador-modelo"
      ></div>
    </div>
  </div>
</template>

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
      default: function () {
        return []
      },
    },
    selectedCards: {
      type: Array,
      default: function () {
        return []
      },
    },
  },

  computed: {
    cardsAgrupados: function () {
      console.log('🔄 GdCardList - cardsAgrupados executando')
      console.log('📦 Cards recebidos:', this.cards)

      if (!this.cards || !Array.isArray(this.cards)) {
        console.log('❌ Cards não é array válido')
        return {}
      }

      var grupos = this.cards.reduce(function (grupos, card) {
        var modelo = card?.documento?.modelo || 'Sem Modelo'
        console.log('📋 Card modelo:', modelo, 'Card:', card)

        if (!grupos[modelo]) {
          grupos[modelo] = []
        }
        grupos[modelo].push(card)
        return grupos
      }, {})

      console.log('📊 Grupos finais:', grupos)
      return grupos
    },
  },

  methods: {
    alternarSelecaoCard: function (cardId) {
      this.$emit('toggle-card-selection', cardId)
    },

    alternarModelo: function (modelo) {
      if (!this.cardsAgrupados[modelo]) return

      var cardsDoModelo = this.cardsAgrupados[modelo].map(function (card) {
        return card.id
      })
      var self = this
      var todosSelecionados = cardsDoModelo.every(function (id) {
        return self.selectedCards.includes(id)
      })

      // ✅ CORRIGIDO - Usar o mesmo 'self' sem redeclarar
      cardsDoModelo.forEach(function (cardId) {
        var estaAtualmenteSelecionado = self.selectedCards.includes(cardId)
        if (todosSelecionados && estaAtualmenteSelecionado) {
          self.$emit('toggle-card-selection', cardId)
        } else if (!todosSelecionados && !estaAtualmenteSelecionado) {
          self.$emit('toggle-card-selection', cardId)
        }
      })
    },

    temModeloSelecionado: function (modelo) {
      if (!this.cardsAgrupados[modelo]) return false

      var cardsDoModelo = this.cardsAgrupados[modelo].map(function (card) {
        return card.id
      })
      var self = this
      return (
        cardsDoModelo.length > 0 &&
        cardsDoModelo.every(function (id) {
          return self.selectedCards.includes(id)
        })
      )
    },

    obterAcoesModelo: function (modelo) {
      var acoesPorModelo = {
        'Solicitação de Sistema de Gestão': [
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

    manipularAcaoModelo: function (acao, modelo) {
      if (!this.cardsAgrupados[modelo]) return

      var cardsDoModelo = this.cardsAgrupados[modelo].map(function (card) {
        return card.id
      })
      this.$emit('modelo-action', {
        action: acao,
        modelo: modelo,
        cardIds: cardsDoModelo,
      })
    },

    obterCorModelo: function (modelo) {
      var cores = {
        'Solicitação de Sistema de Gestão': '#3b82f6',
        'Solicitação de Orçamento': '#10b981',
        'Relatório de Progresso': '#f59e0b',
        'Auditoria de Processo': '#ef4444',
        'Conciliação Bancária': '#8b5cf6',
      }
      return cores[modelo] || '#6b7280'
    },

    obterIniciaisModelo: function (modelo) {
      if (!modelo || typeof modelo !== 'string') return 'SM'

      return modelo
        .split(' ')
        .map(function (palavra) {
          return palavra.charAt(0)
        })
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

.header-modelo {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.separador-modelo {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
}

.coluna-dropdown {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.coluna-info-modelo {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.info-texto {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: wrap;
}

.circle-modelo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.titulo-grupo {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  min-width: 0;
  white-space: nowrap;
}

.contador-modelo {
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
  white-space: nowrap;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
  align-items: center;
}

.coluna-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.coluna-card {
  min-width: 0;
}

.checkbox-custom {
  border-color: #9c9c9c !important;
}

.checkbox-custom:checked {
  background-color: #489be1 !important;
  border-color: #489be1 !important;
  color: white !important;
}

@media (max-width: 1023px) {
  .card-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .coluna-checkbox {
    display: none;
  }

  .header-modelo {
    grid-template-columns: 1fr;
    padding-left: 0;
  }

  .coluna-dropdown {
    display: none;
  }
}

@media (max-width: 480px) {
  .titulo-grupo {
    font-size: 14px;
  }

  .contador-modelo {
    font-size: 12px;
  }

  .circle-modelo {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }

  .info-texto {
    gap: 4px;
  }
}

@media (max-width: 770px) {
  .info-texto {
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: 6px;
  }

  .titulo-grupo {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100vw - 200px);
  }

  .contador-modelo {
    white-space: nowrap;
  }
}

@media (max-width: 320px) {
  .grupos-container {
    gap: 16px;
  }

  .cards-container {
    gap: 8px;
  }

  .titulo-grupo {
    font-size: 13px;
    max-width: calc(100vw - 150px);
  }

  .contador-modelo {
    font-size: 11px;
  }

  .info-texto {
    gap: 3px;
  }

  .circle-modelo {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }
}
</style>

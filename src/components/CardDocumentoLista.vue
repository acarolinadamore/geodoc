<template>
  <div class="card-list-container">
    <div class="grupos-container">
      <!-- Modo agrupado por Modelo -->
      <template v-if="ordenacao === 'modelos'">
        <div
          v-for="(grupo, modelo) in cardsAgrupados"
          :key="modelo"
          class="grupo-modelo"
        >
          <!-- Cabeçalho do Modelo com Checkbox Dropdown -->
          <div class="header-modelo">
            <!-- Coluna 1: Dropdown alinhado com checkboxes dos cards -->
            <div class="coluna-dropdown">
              <DropdownCheckbox
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
                <CardDocumento
                  :card="card"
                  :selected="selectedCards.includes(card.id)"
                  @toggle-selection="alternarSelecaoCard"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Modo ordenado por Vencimento -->
      <template v-else-if="ordenacao === 'vencimento'">
        <div class="lista-simples">
          <div
            v-for="card in cardsOrdenadosPorVencimento"
            :key="card.id"
            class="card-row"
          >
            <!-- Coluna 1: Checkbox -->
            <div class="coluna-checkbox">
              <input
                type="checkbox"
                :checked="selectedCards.includes(card.id)"
                @change="alternarSelecaoCard(card.id)"
                class="form-checkbox h-4 w-4 rounded checkbox-custom"
              />
            </div>

            <!-- Coluna 2: Card com indicador de urgência -->
            <div class="coluna-card">
              <div class="card-com-urgencia">
                <div
                  v-if="obterStatusVencimento(card) === 'vencido'"
                  class="indicador-vencimento vencido"
                >
                  <span class="icone-alerta">⚠️</span>
                  <span>Vencido há {{ obterDiasVencido(card) }} dias</span>
                </div>
                <div
                  v-else-if="obterStatusVencimento(card) === 'hoje'"
                  class="indicador-vencimento hoje"
                >
                  <span class="icone-alerta">⏰</span>
                  <span>Vence hoje</span>
                </div>
                <div
                  v-else-if="obterStatusVencimento(card) === 'proximo'"
                  class="indicador-vencimento proximo"
                >
                  <span class="icone-alerta">📅</span>
                  <span>Vence em {{ obterDiasParaVencer(card) }} dias</span>
                </div>
                <CardDocumento
                  :card="card"
                  :selected="selectedCards.includes(card.id)"
                  @toggle-selection="alternarSelecaoCard"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Separador que toca o sidebar - fora dos grupos -->
      <div v-if="cards.length > 0" class="separador-modelo"></div>
    </div>
  </div>
</template>

<script>
import CardDocumento from '@/components/CardDocumento.vue'
import DropdownCheckbox from '@/components/DropdownCheckbox.vue'

export default {
  name: 'CardDocumentoLista',
  components: {
    CardDocumento,
    DropdownCheckbox,
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
    ordenacao: {
      type: String,
      default: 'modelos',
    },
  },

  computed: {
    cardsAgrupados: function () {
      if (this.ordenacao !== 'modelos') return {}

      if (!this.cards || !Array.isArray(this.cards)) {
        return {}
      }

      var grupos = this.cards.reduce(function (grupos, card) {
        var modelo = card?.documento?.modelo || 'Sem Modelo'

        if (!grupos[modelo]) {
          grupos[modelo] = []
        }
        grupos[modelo].push(card)
        return grupos
      }, {})

      return grupos
    },

    cardsOrdenadosPorVencimento: function () {
      if (!this.cards || !Array.isArray(this.cards)) {
        return []
      }

      // Cria uma cópia do array para não mutar o original
      var cardsOrdenados = [...this.cards]

      // Ordena por vencimento (mais vencidos primeiro)
      cardsOrdenados.sort(function (a, b) {
        var dataA = a.vencimento
          ? new Date(a.vencimento)
          : new Date('9999-12-31')
        var dataB = b.vencimento
          ? new Date(b.vencimento)
          : new Date('9999-12-31')
        return dataA - dataB
      })

      return cardsOrdenados
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

    obterStatusVencimento: function (card) {
      if (!card.vencimento) return null

      var hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      var vencimento = new Date(card.vencimento)
      vencimento.setHours(0, 0, 0, 0)

      var diffTime = vencimento - hoje
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 0) return 'vencido'
      if (diffDays === 0) return 'hoje'
      if (diffDays <= 7) return 'proximo'
      return null
    },

    obterDiasVencido: function (card) {
      if (!card.vencimento) return 0

      var hoje = new Date()
      var vencimento = new Date(card.vencimento)
      var diffTime = hoje - vencimento
      return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    },

    obterDiasParaVencer: function (card) {
      if (!card.vencimento) return 0

      var hoje = new Date()
      var vencimento = new Date(card.vencimento)
      var diffTime = vencimento - hoje
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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

.cards-container,
.lista-simples {
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

/* Estilos para ordenação por vencimento */
.card-com-urgencia {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.indicador-vencimento {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
}

.indicador-vencimento.vencido {
  background-color: #fee2e2;
  color: #dc2626;
}

.indicador-vencimento.hoje {
  background-color: #fef3c7;
  color: #d97706;
}

.indicador-vencimento.proximo {
  background-color: #dbeafe;
  color: #2563eb;
}

.icone-alerta {
  font-size: 14px;
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

  .cards-container,
  .lista-simples {
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

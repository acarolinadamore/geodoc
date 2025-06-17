<template>
  <div class="p-4 min-h-screen">
    <div class="space-y-8">
      <!-- Agrupamento por Modelo -->
      <div
        v-for="(grupo, modelo) in cardsAgrupados"
        :key="modelo"
        class="space-y-4"
      >
        <!-- Cabeçalho do Modelo com Checkbox Dropdown -->
        <div class="flex items-center space-x-3 pb-2 border-b border-gray-200">
          <!-- Apenas o GdCheckboxDropdown (que já tem checkbox interno) -->
          <GdCheckboxDropdown
            :checked-all="isModeloSelected(modelo)"
            :actions="getModeloActions(modelo)"
            @toggle-all="toggleModelo(modelo)"
            @action="handleModeloAction($event, modelo)"
          />

          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            :style="{ backgroundColor: getModeloColor(modelo) }"
          >
            {{ getModeloInitials(modelo) }}
          </div>
          <h3 class="text-lg font-semibold text-gray-800">{{ modelo }}</h3>
          <span class="text-sm text-gray-500"
            >({{ grupo.length }} item{{ grupo.length !== 1 ? 's' : '' }})</span
          >
        </div>

        <!-- Cards do Modelo com Checkbox Externo Centralizado -->
        <div class="space-y-4">
          <div
            v-for="card in grupo"
            :key="card.id"
            class="flex items-center space-x-3"
          >
            <!-- Checkbox centralizado com o card -->
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="selectedCards.includes(card.id)"
                @change="toggleCardSelection(card.id)"
                class="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
            </div>

            <!-- Card -->
            <div class="flex-1">
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
  computed: {
    cardsAgrupados() {
      return this.cards.reduce((grupos, card) => {
        const modelo = card.documento.modelo
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

    // Este método é chamado quando o checkbox do GdCheckboxDropdown é clicado
    toggleModelo(modelo) {
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

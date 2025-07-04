<template>
  <div class="header-cards">
    <!-- Header com ordenação por modelos -->
    <div v-if="ordenacao === 'modelos'" class="header-modelos">
      <div class="controles-esquerda">
        <div class="checkbox-principal">
          <input
            type="checkbox"
            :checked="todosCardsSelecionados"
            @change="alternarTodos"
            :aria-label="
              todosCardsSelecionados
                ? 'Desmarcar todos os cards'
                : 'Marcar todos os cards'
            "
          />
        </div>

        <div v-if="quantidadeSelecionados > 0" class="dropdown-acoes">
          <span class="contador-selecionados">
            {{ quantidadeSelecionados }} selecionado{{
              quantidadeSelecionados > 1 ? 's' : ''
            }}
          </span>
          <select @change="executarAcao($event.target.value)">
            <option value="">Ações</option>
            <option
              v-for="acao in acoesCheckbox"
              :key="acao.value"
              :value="acao.value"
            >
              {{ acao.label }}
            </option>
          </select>
        </div>

        <div
          v-if="quantidadeSelecionados > 0 && opcoesEnviar.length > 0"
          class="dropdown-enviar"
        >
          <select @change="enviarPara($event.target.value)">
            <option value="">Enviar para</option>
            <option
              v-for="opcao in opcoesEnviar"
              :key="opcao.value"
              :value="opcao.value"
            >
              {{ opcao.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="cabecalhos-colunas">
        <div class="coluna-remetente">
          <span>Remetente</span>
        </div>
        <div class="coluna-documento">
          <span>Documento</span>
        </div>
        <div class="coluna-ancora">
          <span>Âncora</span>
        </div>
        <div class="coluna-acoes">
          <span>Ações</span>
        </div>
      </div>
    </div>

    <!-- Header simplificado para outras ordenações -->
    <div v-else class="header-simples">
      <div class="controles-esquerda">
        <div class="checkbox-principal">
          <input
            type="checkbox"
            :checked="todosCardsSelecionados"
            @change="alternarTodos"
            :aria-label="
              todosCardsSelecionados
                ? 'Desmarcar todos os cards'
                : 'Marcar todos os cards'
            "
          />
        </div>

        <div v-if="quantidadeSelecionados > 0" class="dropdown-acoes">
          <span class="contador-selecionados">
            {{ quantidadeSelecionados }} selecionado{{
              quantidadeSelecionados > 1 ? 's' : ''
            }}
          </span>
          <select @change="executarAcao($event.target.value)">
            <option value="">Ações</option>
            <option
              v-for="acao in acoesCheckbox"
              :key="acao.value"
              :value="acao.value"
            >
              {{ acao.label }}
            </option>
          </select>
        </div>

        <div
          v-if="quantidadeSelecionados > 0 && opcoesEnviar.length > 0"
          class="dropdown-enviar"
        >
          <select @change="enviarPara($event.target.value)">
            <option value="">Enviar para</option>
            <option
              v-for="opcao in opcoesEnviar"
              :key="opcao.value"
              :value="opcao.value"
            >
              {{ opcao.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="info-ordenacao">
        <span class="texto-ordenacao">
          Ordenado por: {{ textoOrdenacao }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderCards',
  props: {
    ordenacao: {
      type: String,
      default: 'modelos',
    },
    todosCardsSelecionados: {
      type: Boolean,
      default: false,
    },
    quantidadeSelecionados: {
      type: Number,
      default: 0,
    },
    acoesCheckbox: {
      type: Array,
      default: () => [],
    },
    opcoesEnviar: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['toggle-all', 'acao-checkbox', 'enviar-para'],
  computed: {
    textoOrdenacao() {
      const ordenacoes = {
        modelos: 'Modelo',
        vencimento: 'Vencimento',
        data: 'Data de Criação',
        remetente: 'Remetente',
      }
      return ordenacoes[this.ordenacao] || 'Personalizada'
    },
  },
  methods: {
    alternarTodos(event) {
      this.$emit('toggle-all', event.target.checked)
    },
    executarAcao(acao) {
      this.$emit('acao-checkbox', acao)
    },
    enviarPara(destino) {
      this.$emit('enviar-para', destino)
    },
  },
}
</script>

<style scoped>
.header-cards {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.header-modelos,
.header-simples {
  display: flex;
  align-items: center;
  gap: 16px;
}

.controles-esquerda {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox-principal {
  display: flex;
  align-items: center;
}

.checkbox-principal input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #2563eb;
}

.dropdown-acoes,
.dropdown-enviar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contador-selecionados {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.dropdown-acoes select,
.dropdown-enviar select {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  background-color: white;
  cursor: pointer;
}

.cabecalhos-colunas {
  display: flex;
  flex: 1;
  gap: 16px;
}

.cabecalhos-colunas > div {
  flex: 1;
}

.cabecalhos-colunas span {
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-ordenacao {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.texto-ordenacao {
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 1024px) {
  .header-modelos {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .cabecalhos-colunas {
    display: none;
  }

  .controles-esquerda {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .header-cards {
    padding: 8px 12px;
  }

  .controles-esquerda {
    flex-wrap: wrap;
    gap: 8px;
  }

  .info-ordenacao {
    margin-left: 0;
    margin-top: 8px;
  }
}
</style>

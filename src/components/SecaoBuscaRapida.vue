<template>
  <div
    class="container-busca bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-6 space-y-4"
  >
    <h2 class="text-xl font-semibold text-gray-800 text-left">
      Busca Rápida de Documento
    </h2>
    <p class="text-gray-600 text-sm text-left">
      Encontre rapidamente documentos pelo título, número, unidade ou etapa. Use
      os filtros para refinar sua busca.
    </p>

    <!-- Campo de Busca -->
    <div class="w-full">
      <div
        class="input-busca flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
      >
        <svg
          class="w-4 h-4 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <input
          v-model="buscaInterna"
          type="text"
          class="flex-1 border-none outline-none"
          placeholder="Buscar documentos..."
        />
        <button
          v-if="buscaInterna"
          @click="limparBusca"
          class="ml-2 text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Filtros de Data e Período -->
    <div class="flex flex-col sm:flex-row gap-4 pt-2">
      <!-- Filtro de Data -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data do Documento
        </label>
        <div class="flex gap-2">
          <input
            v-model="filtros.dataInicio"
            type="date"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Data início"
          />
          <input
            v-model="filtros.dataFim"
            type="date"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Data fim"
          />
        </div>
      </div>

      <!-- Filtro de Período -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Período Pré-definido
        </label>
        <select
          v-model="filtros.periodo"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @change="aplicarPeriodo"
        >
          <option value="">Selecione um período</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos7dias">Últimos 7 dias</option>
          <option value="ultimos30dias">Últimos 30 dias</option>
          <option value="mesAtual">Mês atual</option>
          <option value="mesPassado">Mês passado</option>
        </select>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="flex gap-3 pt-2">
      <button
        @click="buscar"
        class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Buscar
      </button>
      <button
        @click="limparFiltros"
        class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecaoBuscarapida',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      buscaInterna: this.value,
      filtros: {
        dataInicio: '',
        dataFim: '',
        periodo: '',
      },
    }
  },
  watch: {
    value(novoValor) {
      this.buscaInterna = novoValor
    },
    buscaInterna(novoValor) {
      this.$emit('input', novoValor)
    },
  },
  methods: {
    buscar() {
      const dadosBusca = {
        texto: this.buscaInterna,
        dataInicio: this.filtros.dataInicio,
        dataFim: this.filtros.dataFim,
        periodo: this.filtros.periodo,
      }
      this.$emit('buscar', dadosBusca)
    },
    limparBusca() {
      this.buscaInterna = ''
      this.$emit('input', '')
    },
    limparFiltros() {
      this.filtros = {
        dataInicio: '',
        dataFim: '',
        periodo: '',
      }
      this.limparBusca()
    },
    aplicarPeriodo() {
      const hoje = new Date()
      const periodo = this.filtros.periodo

      if (periodo === 'hoje') {
        this.filtros.dataInicio = this.formatarData(hoje)
        this.filtros.dataFim = this.formatarData(hoje)
      } else if (periodo === 'ontem') {
        const ontem = new Date(hoje)
        ontem.setDate(hoje.getDate() - 1)
        this.filtros.dataInicio = this.formatarData(ontem)
        this.filtros.dataFim = this.formatarData(ontem)
      } else if (periodo === 'ultimos7dias') {
        const seteDiasAtras = new Date(hoje)
        seteDiasAtras.setDate(hoje.getDate() - 7)
        this.filtros.dataInicio = this.formatarData(seteDiasAtras)
        this.filtros.dataFim = this.formatarData(hoje)
      } else if (periodo === 'ultimos30dias') {
        const trintaDiasAtras = new Date(hoje)
        trintaDiasAtras.setDate(hoje.getDate() - 30)
        this.filtros.dataInicio = this.formatarData(trintaDiasAtras)
        this.filtros.dataFim = this.formatarData(hoje)
      } else if (periodo === 'mesAtual') {
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
        this.filtros.dataInicio = this.formatarData(inicioMes)
        this.filtros.dataFim = this.formatarData(hoje)
      } else if (periodo === 'mesPassado') {
        const inicioMesPassado = new Date(
          hoje.getFullYear(),
          hoje.getMonth() - 1,
          1
        )
        const fimMesPassado = new Date(hoje.getFullYear(), hoje.getMonth(), 0)
        this.filtros.dataInicio = this.formatarData(inicioMesPassado)
        this.filtros.dataFim = this.formatarData(fimMesPassado)
      }
    },
    formatarData(data) {
      return data.toISOString().split('T')[0]
    },
  },
}
</script>

<style scoped>
.container-busca {
  background-color: rgb(255 255 255);
  border-width: 1px;
  border-color: rgb(229 231 235);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.input-busca {
  border-width: 1px;
  border-color: rgb(209 213 219);
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  transition: border-color 0.2s ease;
}

.input-busca:focus-within {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 2px rgb(59 130 246 / 0.2);
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.w-full {
  width: 100%;
}

.w-4 {
  width: 1rem;
}

.h-4 {
  height: 1rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.text-gray-800 {
  color: rgb(31 41 55);
}

.text-gray-600 {
  color: rgb(75 85 99);
}

.text-gray-700 {
  color: rgb(55 65 81);
}

.text-gray-400 {
  color: rgb(156 163 175);
}

.text-white {
  color: rgb(255 255 255);
}

.text-left {
  text-align: left;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.block {
  display: block;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  border-color: rgb(209 213 219);
}

.border-none {
  border-style: none;
}

.rounded-md {
  border-radius: 0.375rem;
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.bg-blue-600 {
  background-color: rgb(37 99 235);
}

.bg-gray-100 {
  background-color: rgb(243 244 246);
}

.hover\:bg-blue-700:hover {
  background-color: rgb(29 78 216);
}

.hover\:bg-gray-200:hover {
  background-color: rgb(229 231 235);
}

.hover\:text-gray-600:hover {
  color: rgb(75 85 99);
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px currentColor;
}

.focus\:ring-blue-500:focus {
  box-shadow: 0 0 0 2px rgb(59 130 246);
}

.focus\:ring-gray-500:focus {
  box-shadow: 0 0 0 2px rgb(107 114 128);
}

.focus\:ring-offset-2:focus {
  box-shadow: 0 0 0 2px rgb(255 255 255), 0 0 0 4px currentColor;
}

.focus\:border-blue-5e:focus {
  border-color: rgb(59 130 246);
}

.transition-colors {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

@media (min-width: 640px) {
  .sm\:flex-row {
    flex-direction: row;
  }
}
</style>

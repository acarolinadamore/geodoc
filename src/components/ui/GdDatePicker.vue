<template>
  <div class="gd-date-picker" :class="{ 'is-expanded': isInputVisible }">
    <div class="date-input-wrapper">
      <input
        v-show="isInputVisible"
        ref="entradaData"
        type="text"
        class="date-input"
        :value="valorExibicao"
        @input="aoDigitarData"
        @blur="aoPerderFoco"
        @keydown.enter.prevent="aoApertarEnter"
      />
      <svg
        class="calendar-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        @click="togglePicker"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <button
        v-if="isInputVisible && valorExibicao"
        @click="limpar"
        class="clear-button"
        type="button"
        title="Limpar data"
      >
        ×
      </button>
    </div>
    <div v-if="erroFormato" class="error-message">
      {{ erroFormato }}
    </div>
  </div>
</template>

<script>
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'

export default {
  name: 'GdDatePicker',
  props: {
    value: {
      type: [String, Array, Date],
      default: null,
    },
  },
  data() {
    return {
      seletorData: null,
      valorExibicao: '',
      erroFormato: '',
      isInputVisible: false,
      digitandoManualmente: false,
      debounceTimer: null,
    }
  },
  mounted() {
    this.inicializarSeletorData()
  },
  beforeDestroy() {
    if (this.seletorData) {
      this.seletorData.destroy()
    }
    clearTimeout(this.debounceTimer)
  },
  methods: {
    togglePicker() {
      if (!this.isInputVisible) {
        this.isInputVisible = true
        this.$nextTick(() => {
          this.$refs.entradaData.focus()
          this.seletorData.show()
        })
      } else {
        this.seletorData.show()
      }
    },
    inicializarSeletorData() {
      this.seletorData = new AirDatepicker(this.$refs.entradaData, {
        range: false, // Changed to false to allow single date selection
        multipleDates: false, // Ensure multiple dates are disabled
        multipleDatesSeparator: ' - ',
        dateFormat: 'dd/MM/yyyy',
        autoClose: true,
        position: 'bottom right',
        offset: 5,
        locale: {
          days: [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ],
          daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          daysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          today: 'Hoje',
          clear: 'Limpar',
          dateFormat: 'dd/MM/yyyy',
          firstDay: 0,
        },
        onSelect: ({ date }) => {
          this.digitandoManualmente = false
          // Handle both single date and array cases
          const selectedDate = Array.isArray(date) ? date[0] : date
          this.valorExibicao = this.formatarDataUnica(selectedDate)
          this.erroFormato = ''
          this.$emit('change', {
            date: selectedDate,
            formattedDate: this.valorExibicao,
          })
        },
        onHide: () => {
          if (!this.valorExibicao) {
            this.isInputVisible = false
          }
          this.$emit('close')
        },
      })

      if (this.value) {
        // Handle incoming value (could be single date or array)
        const dateToSelect = Array.isArray(this.value)
          ? this.value[0]
          : this.value
        this.seletorData.selectDate(dateToSelect)
        this.valorExibicao = this.formatarDataUnica(dateToSelect)
        this.isInputVisible = true
      }
    },
    aoDigitarData(event) {
      this.digitandoManualmente = true
      clearTimeout(this.debounceTimer)

      const input = event.target
      let valor = input.value.replace(/\D/g, '')
      let valorFormatado = ''

      if (valor.length > 0) valorFormatado = valor.substring(0, 2)
      if (valor.length >= 3) valorFormatado += '/' + valor.substring(2, 4)
      if (valor.length >= 5) valorFormatado += '/' + valor.substring(4, 8)

      this.valorExibicao = valorFormatado
      this.$nextTick(() => {
        input.value = valorFormatado
      })

      this.debounceTimer = setTimeout(() => {
        this.dispararFiltro()
      }, 400)
    },
    aoPerderFoco() {
      clearTimeout(this.debounceTimer)
      if (this.digitandoManualmente) {
        this.dispararFiltro()
      }
      setTimeout(() => {
        if (!this.seletorData.visible && !this.valorExibicao) {
          this.isInputVisible = false
        }
      }, 150)
    },
    aoApertarEnter() {
      clearTimeout(this.debounceTimer)
      this.dispararFiltro()
      this.seletorData.hide()
    },
    dispararFiltro() {
      this.digitandoManualmente = false
      if (!this.valorExibicao.trim()) {
        this.limpar(true)
        return
      }

      const dataProcessada = this.processarDataParcial(this.valorExibicao)
      if (dataProcessada.valida) {
        this.erroFormato = ''
        const date = dataProcessada.data
        this.seletorData.selectDate(date)
        this.valorExibicao = this.formatarDataUnica(date)
        this.$emit('change', {
          date: date,
          formattedDate: this.valorExibicao,
        })
      } else {
        this.erroFormato = 'Data inválida'
      }
    },
    processarDataParcial(valor) {
      const valorLimpo = valor.replace(/\D/g, '')
      const hoje = new Date()
      const anoAtual = hoje.getFullYear()
      const mesAtual = hoje.getMonth()

      let dia, mes, ano

      if (valorLimpo.length >= 1) {
        dia = parseInt(valorLimpo.substring(0, 2), 10)
        mes = parseInt(valorLimpo.substring(2, 4), 10) || mesAtual + 1
        ano = parseInt(valorLimpo.substring(4, 8), 10) || anoAtual

        if (
          dia >= 1 &&
          dia <= 31 &&
          mes >= 1 &&
          mes <= 12 &&
          ano >= 1900 &&
          ano <= 2100
        ) {
          const data = new Date(ano, mes - 1, dia)
          if (data.getDate() === dia && data.getMonth() === mes - 1) {
            return { valida: true, data: data }
          }
        }
      }
      return { valida: false }
    },
    limpar(naoFocar = false) {
      clearTimeout(this.debounceTimer)
      if (this.seletorData) this.seletorData.clear()
      this.valorExibicao = ''
      this.erroFormato = ''
      this.$emit('change', { date: null, formattedDate: '' })
      if (!naoFocar) {
        this.$refs.entradaData.focus()
      }
    },
    formatarDataUnica(data) {
      if (!(data instanceof Date)) return ''
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const ano = data.getFullYear()
      return `${dia}/${mes}/${ano}`
    },
    formatarValorExibicao(date) {
      if (!date) return ''
      if (Array.isArray(date)) {
        if (date.length === 0) return ''
        return this.formatarDataUnica(date[0])
      }
      return this.formatarDataUnica(date)
    },
  },
  watch: {
    value(novoValor) {
      if (this.digitandoManualmente) return
      if (novoValor) {
        const dateToSelect = Array.isArray(novoValor) ? novoValor[0] : novoValor
        this.seletorData.selectDate(dateToSelect)
        this.valorExibicao = this.formatarDataUnica(dateToSelect)
        this.isInputVisible = true
      } else {
        this.seletorData.clear()
        this.valorExibicao = ''
        this.isInputVisible = false
      }
    },
  },
}
</script>

<style scoped>
.gd-date-picker {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 45px;
  transition: width 0.3s ease;
}

.gd-date-picker.is-expanded {
  width: 160px;
}

.date-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
  padding: 0 8px;
  cursor: pointer;
  overflow: hidden;
}

.gd-date-picker.is-expanded .date-input-wrapper {
  justify-content: flex-start;
  cursor: default;
}

.date-input-wrapper:hover {
  border-color: #9ca3af;
}

.date-input-wrapper:focus-within {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.date-input {
  width: 100px;
  padding: 0 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  color: #374151;
  min-width: 0;
}

.calendar-icon {
  color: #1a82d9;
  cursor: pointer;
  transition: color 0.2s ease;
  margin: 0 4px;
  flex-shrink: 0;
}

.calendar-icon:hover {
  color: #1565c0;
}

.clear-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  margin-left: 4px;
  flex-shrink: 0;
}

.clear-button:hover {
  color: #ef4444;
}

.error-message {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: #ef4444;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
}

:global(.air-datepicker) {
  font-family: 'Inter', sans-serif !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
  margin-top: 15px;
  margin-left: 10px;
}

:global(.air-datepicker-cell.-selected-) {
  background: #1a82d9 !important;
  color: #ffffff !important;
}

:global(.air-datepicker-cell.-in-range-) {
  background: rgba(26, 130, 217, 0.1) !important;
  color: #1a82d9 !important;
}

:global(.air-datepicker-cell.-range-from-),
:global(.air-datepicker-cell.-range-to-) {
  background: #1a82d9 !important;
  color: #ffffff !important;
}

:global(.air-datepicker-cell:hover) {
  background: rgba(26, 130, 217, 0.1) !important;
  color: #1a82d9 !important;
}

:global(.air-datepicker-nav--title) {
  font-weight: 600 !important;
  color: #374151 !important;
}

:global(.air-datepicker-button) {
  color: #1a82d9 !important;
  font-weight: 500 !important;
  border-radius: 4px !important;
  transition: background-color 0.2s ease !important;
}

:global(.air-datepicker-button:hover) {
  background: rgba(26, 130, 217, 0.1) !important;
}

:global(.air-datepicker-nav--action) {
  color: #6b7280 !important;
  transition: color 0.2s ease !important;
}

:global(.air-datepicker-nav--action:hover) {
  color: #1a82d9 !important;
}
</style>

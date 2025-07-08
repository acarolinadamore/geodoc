<template>
  <div class="gd-date-picker" :class="{ 'is-expanded': isInputVisible }">
    <div class="date-input-wrapper" @click="aoClicarWrapper">
      <input
        v-show="isInputVisible"
        ref="entradaData"
        type="text"
        class="date-input"
        :value="valorExibicao"
        @input="aoDigitarData"
        @blur="aoPerderFoco"
        @keydown.enter.prevent="aoApertarEnter"
        @click.stop
      />
      <button
        v-if="isInputVisible && valorExibicao"
        @click.stop="limpar"
        class="clear-button"
        type="button"
        title="Limpar data"
      >
        ×
      </button>
      <svg
        class="calendar-icon"
        :class="{ 'icon-com-input': isInputVisible }"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
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
  name: 'DatePicker',
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      seletorData: null,
      valorExibicao: '',
      erroFormato: '',
      isInputVisible: false,
      datasRange: [],
    }
  },
  mounted() {
    this.inicializarSeletorData()
    document.addEventListener('click', this.aoClicarFora)
  },
  beforeDestroy() {
    if (this.seletorData) {
      this.seletorData.destroy()
    }
    document.removeEventListener('click', this.aoClicarFora)
  },
  methods: {
    aoClicarFora(event) {
      if (this.$el.contains(event.target)) {
        return
      }

      setTimeout(() => {
        if (this.seletorData && this.seletorData.visible) {
          const calendarioVisivel = document.querySelector(
            '.air-datepicker:not([style*="display: none"])'
          )
          if (!calendarioVisivel) {
            this.seletorData.hide()
          }
        }
      }, 100)
    },

    aoClicarWrapper(event) {
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'BUTTON'
      ) {
        return
      }
      this.togglePicker()
    },

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
        range: true,
        multipleDates: false,
        multipleDatesSeparator: ' - ',
        dateFormat: 'dd/MM/yyyy',
        autoClose: false,
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
          this.datasRange = date || []
          console.log('📅 Data(s) selecionada(s):', this.datasRange.length)

          if (this.datasRange.length === 1) {
            this.valorExibicao = this.formatarDataUnica(this.datasRange[0])
            console.log('📅 Primeira data selecionada:', this.valorExibicao)
            this.$emit('change', {
              filterType: 'dateFrom',
              start: this.datasRange[0],
            })
          } else if (this.datasRange.length === 2) {
            this.valorExibicao = `${this.formatarDataUnica(
              this.datasRange[0]
            )} - ${this.formatarDataUnica(this.datasRange[1])}`
            console.log('📅 Período selecionado:', this.valorExibicao)
            this.$emit('change', {
              filterType: 'dateRange',
              start: this.datasRange[0],
              end: this.datasRange[1],
            })
            this.seletorData.hide()
          }

          this.erroFormato = ''
        },
        onHide: isFinished => {
          if (isFinished && !this.valorExibicao) {
            this.isInputVisible = false
          }
        },
      })

      if (this.value) {
        if (this.value.start) {
          const dates = [this.value.start]
          if (this.value.end && this.value.end !== this.value.start) {
            dates.push(this.value.end)
          }
          this.seletorData.selectDate(dates)
          this.datasRange = dates
          if (dates.length === 1) {
            this.valorExibicao = this.formatarDataUnica(dates[0])
          } else {
            this.valorExibicao = `${this.formatarDataUnica(
              dates[0]
            )} - ${this.formatarDataUnica(dates[1])}`
          }
        }
        this.isInputVisible = true
      }
    },

    aoDigitarData(event) {
      const input = event.target
      let valor = input.value.replace(/\D/g, '')

      let valorFormatado = ''
      if (valor.length > 0) valorFormatado = valor.substring(0, 2)
      if (valor.length >= 3) valorFormatado += '/' + valor.substring(2, 4)
      if (valor.length >= 5) valorFormatado += '/' + valor.substring(4, 8)

      this.valorExibicao = valorFormatado
      input.value = valorFormatado

      console.log('⌨️ Digitando:', valorFormatado, '| Números:', valor)

      this.aplicarFiltroProgressivo(valor)
    },

    aplicarFiltroProgressivo(numeros) {
      if (!numeros) {
        console.log('🔄 Limpando filtro')
        this.$emit('change', null)
        return
      }

      console.log('🔍 Filtro progressivo para:', numeros)

      if (numeros.length === 1) {
        console.log('📅 Filtro por dígito inicial:', numeros)
        this.$emit('change', {
          filterType: 'progressive',
          pattern: numeros,
        })
      } else if (numeros.length === 2) {
        console.log('📅 Filtro por dia específico:', numeros)
        this.$emit('change', {
          filterType: 'progressive',
          pattern: numeros,
        })
      } else if (numeros.length <= 4) {
        const dia = numeros.substring(0, 2)
        const mes = numeros.substring(2)
        let pattern = dia
        if (mes) {
          pattern += '/' + mes.padStart(2, '0')
        }
        console.log('📅 Filtro por dia/mês:', pattern)
        this.$emit('change', {
          filterType: 'progressive',
          pattern: pattern,
        })
      } else {
        const dia = numeros.substring(0, 2)
        const mes = numeros.substring(2, 4)
        const ano = numeros.substring(4)
        const pattern = `${dia}/${mes}/${ano}`
        console.log('📅 Filtro por data completa:', pattern)
        this.$emit('change', {
          filterType: 'progressive',
          pattern: pattern,
        })
      }
    },

    aoPerderFoco() {
      setTimeout(() => {
        if (!this.seletorData.visible && !this.valorExibicao) {
          this.isInputVisible = false
        }
      }, 150)
    },

    aoApertarEnter() {
      console.log('⏎ Enter pressionado:', this.valorExibicao)

      if (
        this.valorExibicao &&
        /^\d{2}\/\d{2}\/\d{4}$/.test(this.valorExibicao)
      ) {
        const dataProcessada = this.processarDataCompleta(this.valorExibicao)
        if (dataProcessada.valida) {
          console.log('📅 Data específica válida:', dataProcessada.data)
          this.$emit('change', {
            filterType: 'dateSpecific',
            start: dataProcessada.data,
            end: dataProcessada.data,
          })
          this.seletorData.hide()
        }
      }
    },

    processarDataCompleta(valor) {
      const partes = valor.split('/')
      if (partes.length !== 3) return { valida: false }

      const dia = parseInt(partes[0], 10)
      const mes = parseInt(partes[1], 10)
      const ano = parseInt(partes[2], 10)

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
          return { valida: true, data }
        }
      }
      return { valida: false }
    },

    limpar(naoFocar = false) {
      console.log('🗑️ Limpando filtro')
      if (this.seletorData) this.seletorData.clear()
      this.valorExibicao = ''
      this.erroFormato = ''
      this.datasRange = []
      this.$emit('change', null)
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
  },

  watch: {
    value(novoValor) {
      if (novoValor && novoValor.start) {
        const dates = [novoValor.start]
        if (novoValor.end && novoValor.end !== novoValor.start) {
          dates.push(novoValor.end)
        }
        this.seletorData.selectDate(dates)
        this.datasRange = dates
        if (dates.length === 1) {
          this.valorExibicao = this.formatarDataUnica(dates[0])
        } else {
          this.valorExibicao = `${this.formatarDataUnica(
            dates[0]
          )} - ${this.formatarDataUnica(dates[1])}`
        }
        this.isInputVisible = true
      } else {
        this.seletorData.clear()
        this.valorExibicao = ''
        this.datasRange = []
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
  width: 120px;
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
  flex: 1;
  padding: 0 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  color: #374151;
  min-width: 0;
  cursor: text;
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
  margin-right: 4px;
  flex-shrink: 0;
}

.clear-button:hover {
  color: #ef4444;
}

.calendar-icon {
  color: #1a82d9;
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.calendar-icon.icon-com-input {
  margin-left: 4px;
}

.calendar-icon:not(.icon-com-input) {
  margin: 0;
}

.calendar-icon:hover {
  color: #1565c0;
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

:global(.air-datepicker-body--day-name) {
  color: #1a82d9 !important;
  font-weight: 500 !important;
}

:global(.air-datepicker-body--day-names) {
  border-bottom: 1px solid #e5e7eb !important;
}
</style>

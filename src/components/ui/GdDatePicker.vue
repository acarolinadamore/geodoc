<template>
  <div class="gd-date-picker">
    <div class="date-input-wrapper">
      <input
        ref="entradaData"
        type="text"
        :placeholder="placeholder"
        :value="valorExibicao"
        readonly
        class="date-input"
      />
      <svg
        class="calendar-icon"
        width="16"
        height="16"
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
    placeholder: {
      type: String,
      default: 'Selecionar período',
    },
  },
  data() {
    return {
      seletorData: null,
      valorExibicao: '',
    }
  },
  mounted() {
    this.inicializarSeletorData()
  },
  beforeDestroy() {
    if (this.seletorData) {
      this.seletorData.destroy()
    }
  },
  methods: {
    inicializarSeletorData() {
      this.seletorData = new AirDatepicker(this.$refs.entradaData, {
        range: true,
        multipleDatesSeparator: ' - ',
        dateFormat: 'dd/MM',
        autoClose: false,
        position: 'bottom left',

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
          dateFormat: 'dd/MM',
          firstDay: 0,
        },

        onSelect: ({ date, formattedDate }) => {
          this.valorExibicao = formattedDate
          this.$emit('input', date)
          this.$emit('change', { date, formattedDate })
        },

        onHide: () => {
          if (this.seletorData && this.seletorData.selectedDates.length === 1) {
            const dataUnica = this.seletorData.selectedDates[0]
            const dataFormatada = this.formatarDataUnica(dataUnica)
            this.valorExibicao = dataFormatada
            this.$emit('input', dataUnica)
            this.$emit('change', {
              date: dataUnica,
              formattedDate: dataFormatada,
            })
          }
          this.$emit('close')
        },

        onShow: () => {
          this.$emit('open')
        },
      })

      if (this.value) {
        this.seletorData.selectDate(this.value)
      }
    },

    formatarDataUnica(data) {
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      return `${dia}/${mes}`
    },

    limpar() {
      if (this.seletorData) {
        this.seletorData.clear()
        this.valorExibicao = ''
        this.$emit('input', null)
        this.$emit('change', { date: null, formattedDate: '' })
      }
    },

    definirDatas(datas) {
      if (this.seletorData && datas) {
        this.seletorData.selectDate(datas)
      }
    },
  },

  watch: {
    value(novoValor) {
      if (this.seletorData) {
        if (novoValor) {
          if (
            JSON.stringify(novoValor) !==
            JSON.stringify(this.seletorData.selectedDates)
          ) {
            this.seletorData.selectDate(novoValor)
          }
        } else {
          this.seletorData.clear()
          this.valorExibicao = ''
        }
      }
    },
  },
}
</script>

<style scoped>
.gd-date-picker {
  position: relative;
  display: inline-block;
  min-width: 200px;
}

.date-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input {
  width: 100%;
  padding: 8px 12px;
  padding-right: 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s ease;
  color: #374151;
}

.date-input:hover {
  border-color: #9ca3af;
}

.date-input:focus {
  outline: none;
  border-color: #1a82d9;
  box-shadow: 0 0 0 3px rgba(26, 130, 217, 0.1);
}

.date-input::placeholder {
  color: #9ca3af;
}

.calendar-icon {
  position: absolute;
  right: 12px;
  color: #1a82d9;
  pointer-events: none;
  transition: color 0.2s ease;
}

.date-input:hover + .calendar-icon {
  color: #1565c0;
}

:global(.air-datepicker) {
  font-family: 'Inter', sans-serif !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
  z-index: 1000 !important;
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

@media (max-width: 640px) {
  .gd-date-picker {
    min-width: 100%;
  }

  .date-input {
    font-size: 16px;
  }
}
</style>

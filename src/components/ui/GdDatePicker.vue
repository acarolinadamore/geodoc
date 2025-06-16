<template>
  <div class="gd-date-picker">
    <div class="date-input-wrapper">
      <input
        ref="dateInput"
        type="text"
        :placeholder="placeholder"
        :value="displayValue"
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
      default: 'Selecionar período', // ← Mudado para placeholder vazio
    },
  },
  data() {
    return {
      datepicker: null,
      displayValue: '',
    }
  },
  mounted() {
    this.initDatepicker()
  },
  beforeDestroy() {
    if (this.datepicker) {
      this.datepicker.destroy()
    }
  },
  methods: {
    initDatepicker() {
      this.datepicker = new AirDatepicker(this.$refs.dateInput, {
        // Configuração específica para intervalo
        range: true,
        multipleDatesSeparator: ' - ',
        dateFormat: 'dd MMM yyyy', // Formato igual ao protótipo
        autoClose: true,
        position: 'bottom left',

        // Localização PT-BR
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
          dateFormat: 'dd MMM yyyy',
          firstDay: 0,
        },

        // Callbacks
        onSelect: ({ date, formattedDate }) => {
          this.displayValue = formattedDate
          this.$emit('input', date)
          this.$emit('change', { date, formattedDate })
        },

        onHide: () => {
          this.$emit('close')
        },

        onShow: () => {
          this.$emit('open')
        },
      })

      // ✅ CORREÇÃO: Só define valor inicial se for passado via prop
      if (this.value) {
        this.datepicker.selectDate(this.value)
      }
      // ❌ REMOVIDO: Valor padrão automático
      // else {
      //   const startDate = new Date(2025, 3, 15) // 15 Abr 2025
      //   const endDate = new Date(2025, 3, 30) // 30 Abr 2025
      //   this.datepicker.selectDate([startDate, endDate])
      // }
    },

    // ✅ NOVO: Método para limpar o datepicker
    clear() {
      if (this.datepicker) {
        this.datepicker.clear()
        this.displayValue = ''
        this.$emit('input', null)
        this.$emit('change', { date: null, formattedDate: '' })
      }
    },

    // ✅ NOVO: Método para definir datas programaticamente
    setDates(dates) {
      if (this.datepicker && dates) {
        this.datepicker.selectDate(dates)
      }
    },
  },

  watch: {
    value(newValue) {
      if (this.datepicker) {
        if (newValue) {
          // Se há um novo valor, seleciona
          if (
            JSON.stringify(newValue) !==
            JSON.stringify(this.datepicker.selectedDates)
          ) {
            this.datepicker.selectDate(newValue)
          }
        } else {
          // Se o valor é null/undefined, limpa o datepicker
          this.datepicker.clear()
          this.displayValue = ''
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
  color: #6b7280;
  pointer-events: none;
  transition: color 0.2s ease;
}

.date-input:hover + .calendar-icon {
  color: #374151;
}

/* Customização do Air Datepicker para match com o protótipo */
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

/* Responsividade */
@media (max-width: 640px) {
  .gd-date-picker {
    min-width: 100%;
  }

  .date-input {
    font-size: 16px; /* Evita zoom no iOS */
  }
}
</style>

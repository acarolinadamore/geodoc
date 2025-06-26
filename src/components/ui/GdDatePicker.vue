<template>
  <div class="gd-date-picker">
    <div class="date-input-wrapper">
      <input
        ref="entradaData"
        type="text"
        :placeholder="placeholder"
        :value="valorExibicao"
        class="date-input"
        @input="aoDigitarData"
        @blur="aoPerderFoco"
        @keydown.enter="aoApertarEnter"
        @focus="aoFocarInput"
      />
      <svg
        class="calendar-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        @click="abrirCalendario"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>

      <!-- Botão de limpar quando há valor -->
      <button
        v-if="valorExibicao"
        @click="limpar"
        class="clear-button"
        type="button"
        title="Limpar data"
      >
        ×
      </button>
    </div>

    <!-- Mensagem de erro para formato inválido -->
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
    placeholder: {
      type: String,
      default: 'Digite dd, dd/mm ou dd/mm/aaaa',
    },
  },
  data() {
    return {
      seletorData: null,
      valorExibicao: '',
      erroFormato: '',
      digitandoManualmente: false,
      valorTemporario: '',
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
          if (!this.digitandoManualmente) {
            // Para data única, garantir formato correto
            if (Array.isArray(date) && date.length === 1) {
              this.valorExibicao = this.formatarDataUnica(date[0])
            } else if (!Array.isArray(date)) {
              this.valorExibicao = this.formatarDataUnica(date)
            } else {
              this.valorExibicao = formattedDate
            }

            this.erroFormato = ''
            this.$emit('input', date)
            this.$emit('change', { date, formattedDate: this.valorExibicao })
          }
        },

        onHide: () => {
          if (
            !this.digitandoManualmente &&
            this.seletorData &&
            this.seletorData.selectedDates.length === 1
          ) {
            const dataUnica = this.seletorData.selectedDates[0]
            const dataFormatada = this.formatarDataUnica(dataUnica)
            this.valorExibicao = dataFormatada
            this.erroFormato = ''
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

    aoDigitarData(event) {
      this.digitandoManualmente = true
      this.valorTemporario = event.target.value
      this.erroFormato = ''

      // Aplicar máscara de data automaticamente
      const valorLimpo = event.target.value.replace(/\D/g, '')
      let valorFormatado = valorLimpo

      if (valorLimpo.length >= 2) {
        valorFormatado =
          valorLimpo.substring(0, 2) + '/' + valorLimpo.substring(2)
      }
      if (valorLimpo.length >= 4) {
        valorFormatado =
          valorLimpo.substring(0, 2) +
          '/' +
          valorLimpo.substring(2, 4) +
          '/' +
          valorLimpo.substring(4, 8)
      }

      // Limitar a 10 caracteres (dd/mm/aaaa)
      if (valorFormatado.length > 10) {
        valorFormatado = valorFormatado.substring(0, 10)
      }

      this.valorExibicao = valorFormatado
      event.target.value = valorFormatado

      // NOVO: Filtrar progressivamente conforme digita
      this.filtrarProgressivamente(valorFormatado)
    },

    // NOVO: Método para filtrar progressivamente
    filtrarProgressivamente(valor) {
      if (!valor.trim()) {
        // Se vazio, limpar filtro
        this.$emit('input', null)
        this.$emit('change', { date: null, formattedDate: '' })
        return
      }

      // Tentar processar a data parcial
      const dataProcessada = this.processarDataParcial(valor)

      if (dataProcessada.valida) {
        this.erroFormato = ''

        // Atualizar o calendário se a data estiver completa
        if (dataProcessada.completa && this.seletorData) {
          this.seletorData.selectDate(dataProcessada.data)
        }

        this.$emit('input', dataProcessada.data)
        this.$emit('change', {
          date: dataProcessada.data,
          formattedDate: dataProcessada.formatada || valor,
        })
      }
    },

    // NOVO: Processar data parcial (06, 06/06, 06/06/2025)
    processarDataParcial(valor) {
      const valorLimpo = valor.replace(/\D/g, '')
      const anoAtual = new Date().getFullYear()
      const mesAtual = new Date().getMonth() + 1

      // Apenas dia (06)
      if (valorLimpo.length <= 2 && valorLimpo.length > 0) {
        const dia = parseInt(valorLimpo, 10)
        if (dia >= 1 && dia <= 31) {
          // Usar mês e ano atual
          const data = new Date(anoAtual, mesAtual - 1, dia)
          return {
            valida: true,
            completa: false,
            data: data,
            formatada: this.formatarDataUnica(data),
          }
        }
      }

      // Dia e mês (06/06)
      if (valorLimpo.length > 2 && valorLimpo.length <= 4) {
        const dia = parseInt(valorLimpo.substring(0, 2), 10)
        const mes = parseInt(valorLimpo.substring(2), 10)

        if (dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12) {
          // Usar ano atual
          const data = new Date(anoAtual, mes - 1, dia)

          // Verificar se a data é válida
          if (data.getDate() === dia && data.getMonth() === mes - 1) {
            return {
              valida: true,
              completa: false,
              data: data,
              formatada: this.formatarDataUnica(data),
            }
          }
        }
      }

      // Data completa (06/06/2025)
      if (valorLimpo.length > 4) {
        const dia = parseInt(valorLimpo.substring(0, 2), 10)
        const mes = parseInt(valorLimpo.substring(2, 4), 10)
        const ano = parseInt(valorLimpo.substring(4), 10)

        // Se ano tem menos de 4 dígitos, não processar ainda
        if (valorLimpo.substring(4).length < 4) {
          return { valida: false }
        }

        if (
          dia >= 1 &&
          dia <= 31 &&
          mes >= 1 &&
          mes <= 12 &&
          ano >= 1900 &&
          ano <= 2100
        ) {
          const data = new Date(ano, mes - 1, dia)

          // Verificar se a data é válida
          if (
            data.getDate() === dia &&
            data.getMonth() === mes - 1 &&
            data.getFullYear() === ano
          ) {
            return {
              valida: true,
              completa: true,
              data: data,
              formatada: this.formatarDataUnica(data),
            }
          }
        }
      }

      return { valida: false }
    },

    aoPerderFoco() {
      this.digitandoManualmente = false

      const valor = this.valorExibicao.trim()

      if (!valor) {
        this.limpar()
        return
      }

      // Verificar se é um período (contém " - ")
      if (valor.includes(' - ')) {
        this.processarPeriodoDigitado(valor)
        return
      }

      // Para data única, manter o valor atual se for válido
      const dataProcessada = this.processarDataParcial(valor)
      if (dataProcessada.valida && dataProcessada.formatada) {
        this.valorExibicao = dataProcessada.formatada
        this.erroFormato = ''
      }
    },

    aoApertarEnter(event) {
      event.preventDefault()
      this.digitandoManualmente = false
      event.target.blur()
    },

    aoFocarInput() {
      // Não abrir calendário automaticamente quando focando para digitar
    },

    abrirCalendario() {
      if (this.seletorData) {
        this.seletorData.show()
      }
    },

    processarPeriodoDigitado(valor) {
      const partes = valor.split(' - ')
      if (partes.length !== 2) {
        this.erroFormato = 'Formato de período inválido'
        return
      }

      const dataInicio = this.processarDataParcial(partes[0].trim())
      const dataFim = this.processarDataParcial(partes[1].trim())

      if (dataInicio.valida && dataFim.valida) {
        if (dataInicio.data > dataFim.data) {
          this.erroFormato = 'Data de início deve ser anterior à data de fim'
          return
        }

        const periodo = [dataInicio.data, dataFim.data]
        this.valorExibicao = `${dataInicio.formatada} - ${dataFim.formatada}`
        this.erroFormato = ''

        // Atualizar o calendário
        if (this.seletorData) {
          this.seletorData.selectDate(periodo)
        }

        this.$emit('input', periodo)
        this.$emit('change', {
          date: periodo,
          formattedDate: this.valorExibicao,
        })
      } else {
        this.erroFormato = 'Período com datas inválidas'
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
      }
      this.valorExibicao = ''
      this.erroFormato = ''
      this.valorTemporario = ''
      this.$emit('input', null)
      this.$emit('change', { date: null, formattedDate: '' })
    },

    definirDatas(datas) {
      if (this.seletorData && datas) {
        this.seletorData.selectDate(datas)
      }
    },
  },

  watch: {
    value(novoValor) {
      if (this.seletorData && !this.digitandoManualmente) {
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
  padding-right: 60px; /* Espaço para ícone e botão limpar */
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  cursor: text;
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

.date-input.error {
  border-color: #ef4444;
}

.date-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.calendar-icon {
  position: absolute;
  right: 32px;
  color: #1a82d9;
  cursor: pointer;
  transition: color 0.2s ease;
}

.calendar-icon:hover {
  color: #1565c0;
}

.clear-button {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.clear-button:hover {
  color: #ef4444;
}

.error-message {
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
  font-family: 'Inter', sans-serif;
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

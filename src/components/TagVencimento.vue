<template>
  <div :class="['card-vencimento', statusVencimento.classe]">
    <span>{{ statusVencimento.texto }}</span>
  </div>
</template>

<script>
export default {
  name: 'TagVencimento',
  props: {
    dataVencimento: {
      type: Object,
      required: false,
      default: () => null,
    },
  },

  computed: {
    statusVencimento: function () {
      if (!this.dataVencimento || !this.dataVencimento.data) {
        return {
          classe: 'sem-vencimento',
          texto: 'Sem vencimento',
        }
      }

      var dataVenc = this.parseDataBR(this.dataVencimento.data)
      if (!dataVenc) {
        return {
          classe: 'sem-vencimento',
          texto: 'Data inválida',
        }
      }

      var hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      dataVenc.setHours(0, 0, 0, 0)

      var diferencaDias = Math.ceil((dataVenc - hoje) / (1000 * 60 * 60 * 24))

      if (diferencaDias < 0) {
        // Vencido
        var diasVencido = Math.abs(diferencaDias)
        return {
          classe: 'vencido',
          texto: `Vencido há ${diasVencido} ${
            diasVencido === 1 ? 'dia' : 'dias'
          }`,
        }
      } else if (diferencaDias === 0) {
        // Vence hoje
        return {
          classe: 'vencendo',
          texto: 'Vence hoje',
        }
      } else if (diferencaDias <= 7) {
        // Vence em breve
        return {
          classe: 'vencendo',
          texto: `Vence em ${diferencaDias} ${
            diferencaDias === 1 ? 'dia' : 'dias'
          }`,
        }
      } else {
        // No prazo
        return {
          classe: 'no-prazo',
          texto: `Vence em ${diferencaDias} ${
            diferencaDias === 1 ? 'dia' : 'dias'
          }`,
        }
      }
    },
  },

  methods: {
    parseDataBR: function (dataString) {
      if (!dataString || typeof dataString !== 'string') {
        return null
      }

      try {
        // Formato esperado: DD/MM/YYYY
        var partes = dataString.split('/')
        if (partes.length !== 3) {
          return null
        }

        var dia = parseInt(partes[0], 10)
        var mes = parseInt(partes[1], 10)
        var ano = parseInt(partes[2], 10)

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
          return null
        }

        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
          return null
        }

        return new Date(ano, mes - 1, dia)
      } catch (error) {
        console.error('Erro ao fazer parse da data:', error)
        return null
      }
    },
  },
}
</script>

<style scoped>
.card-vencimento {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  min-height: 36px;
  width: 100%;
  text-align: center;
}

.card-vencimento.vencido {
  background-color: #f05050;
}

.card-vencimento.vencendo {
  background-color: #edbd1f;
  color: #ffffff;
}

.card-vencimento.no-prazo {
  background-color: #10b981;
  color: #ffffff;
}

.card-vencimento.sem-vencimento {
  background-color: #6b7280;
  color: #ffffff;
}
</style>

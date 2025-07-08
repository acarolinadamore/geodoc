// composables/useFiltroData.js
import { ref, computed } from 'vue'

export function useFiltroData() {
  const filtroData = ref(null)

  const aplicarFiltroData = (cards, filtro) => {
    if (!filtro || !cards || !Array.isArray(cards)) {
      return cards || []
    }

    console.log('Aplicando filtro:', filtro)
    console.log('Total de cards:', cards.length)

    // FILTRO PROGRESSIVO DINÂMICO - CORRIGIDO
    if (filtro.filterType === 'progressive') {
      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false

        // Converte ISO para formato brasileiro DD/MM/YYYY
        const dataISO = card.documento.dataInicio
        const data = new Date(dataISO)
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()
        const dataFormatada = `${dia}/${mes}/${ano}`

        // Verifica se a data formatada começa com o pattern
        const comeca = dataFormatada.startsWith(filtro.pattern)

        console.log(
          `Card "${dataFormatada}" começa com "${filtro.pattern}": ${comeca}`
        )

        return comeca
      })

      console.log(
        `Filtro progressivo "${filtro.pattern}": ${resultado.length} cards encontrados`
      )
      console.log(
        '🎯 Cards que passaram no filtro:',
        resultado.map(c => {
          const data = new Date(c.documento.dataInicio)
          const dia = String(data.getDate()).padStart(2, '0')
          const mes = String(data.getMonth() + 1).padStart(2, '0')
          return `${dia}/${mes} - ${c.remetente.nome}`
        })
      )
      return resultado
    }

    // Filtro por dia específico - CORRIGIDO
    if (filtro.filterType === 'day') {
      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false
        const dataISO = card.documento.dataInicio
        const data = new Date(dataISO)
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dataFormatada = `${dia}/${mes}`

        const iniciaCom = dataFormatada.startsWith(filtro.day + '/')
        return iniciaCom
      })
      return resultado
    }

    // Filtro por dia/mês - CORRIGIDO
    if (filtro.filterType === 'dayMonth') {
      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false
        const dataISO = card.documento.dataInicio
        const data = new Date(dataISO)
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dataFormatada = `${dia}/${mes}`

        const padrao = `${filtro.day}/${filtro.month}`
        const iniciaCom = dataFormatada.startsWith(padrao)
        return iniciaCom
      })
      return resultado
    }

    // Filtro "a partir de" - CORRIGIDO
    if (filtro.filterType === 'dateFrom' && filtro.start) {
      const dataInicio = new Date(filtro.start)
      dataInicio.setHours(0, 0, 0, 0)

      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false

        const dataCard = new Date(card.documento.dataInicio)
        dataCard.setHours(0, 0, 0, 0)
        return dataCard >= dataInicio
      })
      return resultado
    }

    // Filtro por intervalo fechado - CORRIGIDO
    if (filtro.filterType === 'dateRange' && filtro.start && filtro.end) {
      const dataInicio = new Date(filtro.start)
      const dataFim = new Date(filtro.end)

      dataInicio.setHours(0, 0, 0, 0)
      dataFim.setHours(23, 59, 59, 999)

      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false

        const dataCard = new Date(card.documento.dataInicio)
        dataCard.setHours(0, 0, 0, 0)
        return dataCard >= dataInicio && dataCard <= dataFim
      })
      return resultado
    }

    // Filtro por data específica única - NOVO
    if (filtro.filterType === 'dateSpecific' && filtro.start) {
      const dataEspecifica = new Date(filtro.start)
      dataEspecifica.setHours(0, 0, 0, 0)

      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false

        const dataCard = new Date(card.documento.dataInicio)
        dataCard.setHours(0, 0, 0, 0)

        const mesmaData = dataCard.getTime() === dataEspecifica.getTime()
        console.log(
          `Card ${
            card.documento.dataInicio
          } === ${filtro.start.toLocaleDateString()}: ${mesmaData}`
        )
        return mesmaData
      })
      console.log('Cards filtrados por data específica:', resultado.length)
      return resultado
    }

    // Filtro por data específica única - CORRIGIDO
    if (filtro.start && !filtro.filterType) {
      const dataInicio = new Date(filtro.start)
      const dataFim = filtro.end ? new Date(filtro.end) : new Date(filtro.start)

      dataInicio.setHours(0, 0, 0, 0)
      dataFim.setHours(23, 59, 59, 999)

      const resultado = cards.filter(card => {
        if (!card.documento?.dataInicio) return false

        const dataCard = new Date(card.documento.dataInicio)
        dataCard.setHours(0, 0, 0, 0)
        return dataCard >= dataInicio && dataCard <= dataFim
      })
      return resultado
    }

    return cards
  }

  const definirFiltroData = novoFiltro => {
    filtroData.value = novoFiltro
  }

  const limparFiltroData = () => {
    filtroData.value = null
  }

  return {
    filtroData: computed(() => filtroData.value),
    aplicarFiltroData,
    definirFiltroData,
    limparFiltroData,
  }
}

// composables/useFiltrosCaixa.js
import { ref, computed } from 'vue'

export const useFiltrosCaixa = () => {
  const filtros = ref({
    tipoCaixa: 'todos',
    modelos: ['todos'],
    busca: '',
    dataInicio: null,
    dataFim: null,
    filterType: null,
    day: null,
    month: null,
    page: 1,
  })

  const intervaloDataLocal = ref(null)

  const possuiFiltrosAtivos = computed(() => {
    return !!(
      filtros.value.busca ||
      filtros.value.dataInicio ||
      filtros.value.dataFim ||
      filtros.value.filterType ||
      (filtros.value.modelos?.length > 0 &&
        !filtros.value.modelos.includes('todos'))
    )
  })

  const filtroDataTexto = computed(() => {
    if (filtros.value.filterType === 'day') {
      return `Dia ${filtros.value.day}`
    } else if (filtros.value.filterType === 'dayMonth') {
      return `${filtros.value.day}/${filtros.value.month}`
    } else if (filtros.value.dataInicio && filtros.value.dataFim) {
      return formatarIntervaloData(
        filtros.value.dataInicio,
        filtros.value.dataFim
      )
    }
    return ''
  })

  const modelosSelecionadosTexto = computed(() => {
    const filtrosModelos = filtros.value.modelos || ['todos']

    if (
      filtrosModelos.length === 0 ||
      (filtrosModelos.length === 1 && filtrosModelos.includes('todos'))
    ) {
      return ''
    }

    // Esta lógica será melhorada quando integrar com backend
    const labels = filtrosModelos
      .filter(id => id !== 'todos')
      .map(id => id.replace(/-/g, ' '))
      .filter(Boolean)

    return labels.length > 0 ? labels.join(', ') : ''
  })

  const aplicarFiltros = novosFiltros => {
    Object.assign(filtros.value, novosFiltros)
  }

  const limparFiltro = tipoFiltro => {
    switch (tipoFiltro) {
      case 'busca':
        filtros.value.busca = ''
        break
      case 'data':
        filtros.value.dataInicio = null
        filtros.value.dataFim = null
        filtros.value.filterType = null
        filtros.value.day = null
        filtros.value.month = null
        intervaloDataLocal.value = null
        break
      case 'modelos':
        filtros.value.modelos = ['todos']
        break
    }
  }

  const limparTodosFiltros = () => {
    filtros.value = {
      tipoCaixa: filtros.value.tipoCaixa, // Manter tipo da caixa
      modelos: ['todos'],
      busca: '',
      dataInicio: null,
      dataFim: null,
      filterType: null,
      day: null,
      month: null,
      page: 1,
    }
    intervaloDataLocal.value = null
  }

  const formatarIntervaloData = (inicio, fim) => {
    if (!inicio || !fim) return ''

    const formatarData = data => {
      const d = new Date(data)
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${d.getFullYear()}`
    }

    return `${formatarData(inicio)} - ${formatarData(fim)}`
  }

  return {
    filtros,
    intervaloDataLocal,
    possuiFiltrosAtivos,
    filtroDataTexto,
    modelosSelecionadosTexto,
    aplicarFiltros,
    limparFiltro,
    limparTodosFiltros,
  }
}

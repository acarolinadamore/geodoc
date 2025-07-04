// composables/useFiltrosCaixa.js
import { ref, computed } from 'vue'

export const useFiltrosCaixa = () => {
  // Estado dos filtros
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
    limit: 20,
  })

  // Estado do intervalo de data local para o componente
  const intervaloDataLocal = ref(null)

  // Computed para verificar se há filtros ativos
  const possuiFiltrosAtivos = computed(() => {
    return !!(
      filtros.value.busca ||
      filtros.value.dataInicio ||
      filtros.value.dataFim ||
      filtros.value.filterType ||
      (filtros.value.modelos.length > 0 &&
        !filtros.value.modelos.includes('todos'))
    )
  })

  // Computed para texto do filtro de data
  const filtroDataTexto = computed(() => {
    if (filtros.value.filterType) {
      const tipos = {
        hoje: 'Hoje',
        ontem: 'Ontem',
        'esta-semana': 'Esta semana',
        'semana-passada': 'Semana passada',
        'este-mes': 'Este mês',
        'mes-passado': 'Mês passado',
      }
      return tipos[filtros.value.filterType] || ''
    }

    if (filtros.value.dataInicio && filtros.value.dataFim) {
      const inicio = new Date(filtros.value.dataInicio).toLocaleDateString(
        'pt-BR'
      )
      const fim = new Date(filtros.value.dataFim).toLocaleDateString('pt-BR')
      return `${inicio} - ${fim}`
    }

    return ''
  })

  // Computed para texto dos modelos selecionados
  const modelosSelecionadosTexto = computed(() => {
    if (filtros.value.modelos.includes('todos')) {
      return ''
    }

    // Aqui você pode mapear os IDs para nomes reais
    return filtros.value.modelos.join(', ')
  })

  // Método para processar seleção de modelo
  const processarSelecaoModelo = modeloId => {
    const selecaoAtual = [...filtros.value.modelos]

    if (modeloId === 'todos') {
      return ['todos']
    }

    // Remove 'todos' se existir
    let novaSelecao = selecaoAtual.filter(id => id !== 'todos')

    // Toggle do modelo selecionado
    if (novaSelecao.includes(modeloId)) {
      novaSelecao = novaSelecao.filter(id => id !== modeloId)
    } else {
      novaSelecao.push(modeloId)
    }

    // Se nenhum modelo selecionado, volta para 'todos'
    return novaSelecao.length === 0 ? ['todos'] : novaSelecao
  }

  // Método para aplicar filtros
  const aplicarFiltros = novosFiltros => {
    filtros.value = {
      ...filtros.value,
      ...novosFiltros,
    }
  }

  // Método para alterar tipo de caixa
  const alterarTipoCaixa = tipoCaixa => {
    aplicarFiltros({
      tipoCaixa,
      modelos: ['todos'], // Reset modelos quando muda tipo
      page: 1,
    })
  }

  // Método para alterar filtro de modelo
  const alterarFiltroModelo = modeloId => {
    const novaSelecao = processarSelecaoModelo(modeloId)
    aplicarFiltros({
      modelos: novaSelecao,
      page: 1,
    })
  }

  // Método para alterar busca
  const alterarFiltroBusca = busca => {
    aplicarFiltros({
      busca: busca || '',
      page: 1,
    })
  }

  // Método para alterar filtro de data
  const alterarFiltroData = dadosData => {
    if (!dadosData) {
      limparFiltro('data')
      return
    }

    const novosFiltros = dadosData.filterType
      ? {
          filterType: dadosData.filterType,
          day: dadosData.day,
          month: dadosData.month,
          dataInicio: null,
          dataFim: null,
          page: 1,
        }
      : {
          dataInicio: dadosData.start,
          dataFim: dadosData.end,
          filterType: null,
          day: null,
          month: null,
          page: 1,
        }

    // Atualiza o intervalo local também
    intervaloDataLocal.value = dadosData

    aplicarFiltros(novosFiltros)
  }

  // Método para limpar filtro específico
  const limparFiltro = tipoFiltro => {
    const limpezas = {
      busca: () => aplicarFiltros({ busca: '', page: 1 }),
      data: () => {
        intervaloDataLocal.value = null
        aplicarFiltros({
          dataInicio: null,
          dataFim: null,
          filterType: null,
          day: null,
          month: null,
          page: 1,
        })
      },
      modelos: () => aplicarFiltros({ modelos: ['todos'], page: 1 }),
    }

    if (limpezas[tipoFiltro]) {
      limpezas[tipoFiltro]()
    }
  }

  // Método para limpar todos os filtros
  const limparTodosFiltros = () => {
    intervaloDataLocal.value = null
    filtros.value = {
      ...filtros.value,
      modelos: ['todos'],
      busca: '',
      dataInicio: null,
      dataFim: null,
      filterType: null,
      day: null,
      month: null,
      page: 1,
    }
  }

  // Método para resetar página
  const resetarPagina = () => {
    aplicarFiltros({ page: 1 })
  }

  // Método para converter filtros para API
  const obterFiltrosParaApi = () => {
    const filtrosApi = {
      tipoCaixa: filtros.value.tipoCaixa,
      modelos: filtros.value.modelos.includes('todos')
        ? []
        : filtros.value.modelos,
      busca: filtros.value.busca || null,
      dataInicio: filtros.value.dataInicio,
      dataFim: filtros.value.dataFim,
      filterType: filtros.value.filterType,
      day: filtros.value.day,
      month: filtros.value.month,
      page: filtros.value.page,
      limit: filtros.value.limit,
    }

    // Remove valores vazios/null
    Object.keys(filtrosApi).forEach(key => {
      if (
        filtrosApi[key] === null ||
        filtrosApi[key] === '' ||
        (Array.isArray(filtrosApi[key]) && filtrosApi[key].length === 0)
      ) {
        delete filtrosApi[key]
      }
    })

    return filtrosApi
  }

  return {
    filtros,
    intervaloDataLocal,
    possuiFiltrosAtivos,
    filtroDataTexto,
    modelosSelecionadosTexto,
    aplicarFiltros,
    alterarTipoCaixa,
    alterarFiltroModelo,
    alterarFiltroBusca,
    alterarFiltroData,
    limparFiltro,
    limparTodosFiltros,
    resetarPagina,
    obterFiltrosParaApi,
    processarSelecaoModelo,
  }
}

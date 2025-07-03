// services/index.js - Versão corrigida com debug melhorado
import cardsData from '@/data/cards.json'

// Service melhorado que funciona com filtros
export const cardService = {
  // Função principal melhorada
  async getCards(filtros = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let dadosFiltrados = [...cardsData]

          console.log('🔍 SERVICE - Iniciando getCards com filtros:', filtros)
          console.log('🔍 SERVICE - Total de cards:', cardsData.length)

          // PRIMEIRO FILTRO: Tipo de Caixa (FiltroPaginaMarcador)
          if (filtros.tipoCaixa && filtros.tipoCaixa !== 'todos') {
            dadosFiltrados = dadosFiltrados.filter(card => {
              switch (filtros.tipoCaixa) {
                case 'a-configurar':
                  return (
                    card.documento?.status === 'rascunho' &&
                    card.documento?.criadoPorMim === true
                  )
                case 'recebidos':
                  return card.documento?.criadoPorMim === false
                case 'solicitados':
                  return (
                    card.documento?.criadoPorMim === true &&
                    card.documento?.status !== 'rascunho' &&
                    card.documento?.status !== 'lembrete'
                  )
                case 'agendamentos':
                  return (
                    card.documento?.status === 'lembrete' &&
                    card.documento?.criadoPorMim === true
                  )
                default:
                  return card.tipoCaixa === filtros.tipoCaixa
              }
            })
          }

          // SEGUNDO FILTRO: Modelos de Documento (FiltroModeloDocumento) - SELEÇÃO MÚLTIPLA
          if (
            filtros.modelos &&
            Array.isArray(filtros.modelos) &&
            filtros.modelos.length > 0
          ) {
            // Se não contém "todos", filtra pelos modelos selecionados
            if (!filtros.modelos.includes('todos')) {
              const modeloMap = {
                'solicitacao-fabrica-software':
                  'Solicitação à Fábrica de Software',
                'solicitacao-orcamento': 'Solicitação de Orçamento',
                'relatorio-progresso': 'Relatório de Progresso',
                'auditoria-processo': 'Auditoria de Processo',
                'conciliacao-bancaria': 'Conciliação Bancária',
                'folha-de-pagamento': 'Folha de Pagamento',
              }

              const modelosNomes = filtros.modelos
                .map(modelo => modeloMap[modelo])
                .filter(Boolean)

              if (modelosNomes.length > 0) {
                dadosFiltrados = dadosFiltrados.filter(card =>
                  modelosNomes.includes(card.documento?.modelo)
                )
              }
            }
          }

          // Filtro por busca
          if (filtros.busca && filtros.busca.trim()) {
            const busca = filtros.busca.toLowerCase().trim()
            dadosFiltrados = dadosFiltrados.filter(card => {
              const campos = [
                card.remetente?.nome || '',
                card.remetente?.funcao || '',
                card.documento?.modelo || '',
                card.documento?.id || '',
                card.documento?.fluxo || '',
                card.ancora?.projeto || '',
                card.ancora?.prestadorServico || '',
              ]
              return campos.some(campo => campo.toLowerCase().includes(busca))
            })
          }

          // Filtro por data
          if (filtros.dataInicio && filtros.dataFim) {
            dadosFiltrados = dadosFiltrados.filter(card => {
              const dataCard = this.parseDate(card.documento?.dataInicio)
              const vencimentoCard = this.parseDate(card.vencimento?.data)
              const inicio = new Date(filtros.dataInicio)
              const fim = new Date(filtros.dataFim)

              return (
                (dataCard && this.isDateInRange(dataCard, inicio, fim)) ||
                (vencimentoCard &&
                  this.isDateInRange(vencimentoCard, inicio, fim))
              )
            })
          }

          // Ordenação por vencimento
          dadosFiltrados.sort((a, b) => {
            const dataA = this.parseDate(a.vencimento?.data)
            const dataB = this.parseDate(b.vencimento?.data)
            if (!dataA && !dataB) return 0
            if (!dataA) return 1
            if (!dataB) return -1
            return dataA - dataB
          })

          // Calcular contadores baseados no tipo de caixa atual
          const contadores = this.calcularContadores(
            cardsData,
            filtros.tipoCaixa || 'todos'
          )

          console.log('🔢 SERVICE - Contadores calculados:', contadores)

          // Se não há paginação, retorna formato simples
          if (!filtros.page && !filtros.limit) {
            resolve({
              cards: dadosFiltrados,
              total: dadosFiltrados.length,
              totalPages: 1,
              page: 1,
              limit: dadosFiltrados.length,
              contadores: contadores,
            })
            return
          }

          // Paginação
          const page = filtros.page || 1
          const limit = filtros.limit || 20
          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit
          const cardsPaginados = dadosFiltrados.slice(startIndex, endIndex)

          resolve({
            cards: cardsPaginados,
            total: dadosFiltrados.length,
            totalPages: Math.ceil(dadosFiltrados.length / limit),
            page,
            limit,
            contadores: contadores,
          })
        } catch (error) {
          reject(new Error('Erro ao processar filtros: ' + error.message))
        }
      }, Math.random() * 800 + 200)
    })
  },

  async getCardById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const card = cardsData.find(card => card.id === Number.parseInt(id))
        resolve(card || null)
      }, 500)
    })
  },

  async updateCard(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Mock: Atualizando card ${id}`, data)
        resolve({ success: true, message: 'Card atualizado com sucesso!' })
      }, 500)
    })
  },

  async deleteCard(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Mock: Deletando card ${id}`)
        resolve({ success: true, message: 'Card deletado com sucesso!' })
      }, 500)
    })
  },

  async aprovarCards(cardIds) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Mock: Aprovando cards:', cardIds)
        resolve({
          success: true,
          message: `${cardIds.length} card${
            cardIds.length > 1 ? 's' : ''
          } aprovado${cardIds.length > 1 ? 's' : ''}!`,
          data: cardIds,
        })
      }, 1000)
    })
  },

  async atribuirCards(cardIds, responsavel) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Mock: Atribuindo cards:', cardIds, 'para:', responsavel)
        resolve({
          success: true,
          message: `${cardIds.length} card${
            cardIds.length > 1 ? 's' : ''
          } atribuído${cardIds.length > 1 ? 's' : ''}!`,
          data: { cardIds, responsavel },
        })
      }, 800)
    })
  },

  async agruparCards(cardIds, grupo) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Mock: Agrupando cards:', cardIds, 'no grupo:', grupo)
        resolve({
          success: true,
          message: `${cardIds.length} card${
            cardIds.length > 1 ? 's' : ''
          } agrupado${cardIds.length > 1 ? 's' : ''}!`,
          data: { cardIds, grupo },
        })
      }, 600)
    })
  },

  // Funções auxiliares
  parseDate(dateString) {
    if (!dateString) return null

    // Data ISO (2025-04-15T08:30:00)
    if (dateString.includes('T')) {
      return new Date(dateString)
    }

    // Data brasileira (28/04/2025)
    if (dateString.includes('/')) {
      const [dia, mes, ano] = dateString.split('/')
      return new Date(
        Number.parseInt(ano),
        Number.parseInt(mes) - 1,
        Number.parseInt(dia)
      )
    }

    return null
  },

  isDateInRange(date, startDate, endDate) {
    const normalizeDate = d =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate())

    const normalizedDate = normalizeDate(date)
    const normalizedStart = normalizeDate(startDate)
    const normalizedEnd = normalizeDate(endDate)

    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd
  },

  calcularContadores(todosCards, tipoCaixaAtual = 'todos') {
    console.log('🔢 CALC - Iniciando calcularContadores')
    console.log('🔢 CALC - Total cards recebidos:', todosCards.length)
    console.log('🔢 CALC - Tipo caixa atual:', tipoCaixaAtual)

    const contadores = {
      todos: todosCards.length,
    }

    // Contadores para tipos de caixa (FiltroPaginaMarcador)
    contadores['a-configurar'] = todosCards.filter(
      card =>
        card.documento?.status === 'rascunho' &&
        card.documento?.criadoPorMim === true
    ).length

    contadores['recebidos'] = todosCards.filter(
      card => card.documento?.criadoPorMim === false
    ).length

    contadores['solicitados'] = todosCards.filter(
      card =>
        card.documento?.criadoPorMim === true &&
        card.documento?.status !== 'rascunho' &&
        card.documento?.status !== 'lembrete'
    ).length

    contadores['agendamentos'] = todosCards.filter(
      card =>
        card.documento?.status === 'lembrete' &&
        card.documento?.criadoPorMim === true
    ).length

    console.log('🔢 CALC - Contadores de caixa:', {
      todos: contadores.todos,
      'a-configurar': contadores['a-configurar'],
      recebidos: contadores.recebidos,
      solicitados: contadores.solicitados,
      agendamentos: contadores.agendamentos,
    })

    // Contadores para modelos (FiltroModeloDocumento) - baseado na caixa atual
    let cardsDaCaixaAtual = todosCards

    // CORREÇÃO: Só filtra se não for "todos"
    if (tipoCaixaAtual !== 'todos') {
      cardsDaCaixaAtual = todosCards.filter(card => {
        switch (tipoCaixaAtual) {
          case 'a-configurar':
            return (
              card.documento?.status === 'rascunho' &&
              card.documento?.criadoPorMim === true
            )
          case 'recebidos':
            return card.documento?.criadoPorMim === false
          case 'solicitados':
            return (
              card.documento?.criadoPorMim === true &&
              card.documento?.status !== 'rascunho' &&
              card.documento?.status !== 'lembrete'
            )
          case 'agendamentos':
            return (
              card.documento?.status === 'lembrete' &&
              card.documento?.criadoPorMim === true
            )
          default:
            return true
        }
      })
    }

    console.log('🔢 CALC - Cards da caixa atual:', cardsDaCaixaAtual.length)

    // CORREÇÃO: Mapeamento direto dos modelos para as chaves corretas
    const modeloParaChave = {
      'Solicitação à Fábrica de Software': 'solicitacao-fabrica-software',
      'Solicitação de Orçamento': 'solicitacao-orcamento',
      'Relatório de Progresso': 'relatorio-progresso',
      'Auditoria de Processo': 'auditoria-processo',
      'Conciliação Bancária': 'conciliacao-bancaria',
      'Folha de Pagamento': 'folha-de-pagamento',
    }

    // Conta por modelo apenas nos cards da caixa atual
    cardsDaCaixaAtual.forEach(card => {
      const modelo = card.documento?.modelo
      if (modelo && modeloParaChave[modelo]) {
        const key = modeloParaChave[modelo]
        contadores[key] = (contadores[key] || 0) + 1
        console.log(
          `🔢 CALC - Modelo "${modelo}" -> chave "${key}" = ${contadores[key]}`
        )
      } else if (modelo) {
        console.log(`⚠️ CALC - Modelo não mapeado: "${modelo}"`)
      }
    })

    console.log('🔢 CALC - Contadores finais:', contadores)
    return contadores
  },
}

// Plugin para Vue
export default {
  install(Vue) {
    Vue.prototype.$cardService = cardService
  },
}

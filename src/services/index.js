// Dados mock temporários (substitua pelos seus arquivos reais quando existirem)
const cardsData = [
  {
    id: 1,
    remetente: {
      nome: 'Arthur Affonso de Barros Marinho',
      funcao: 'Presidente - CONSELHO',
    },
    documento: {
      id: '2354545/45222',
      dataInicio: '2025-06-15T08:30:00',
      modelo: 'Solicitação à Fábrica de Software',
      fluxo: 'Férias',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Solicitação', status: 'completed' },
        { nome: 'Triagem', status: 'completed' },
        { nome: 'Etapa', status: 'current' },
        { nome: 'Aprovação', status: 'pending' },
        { nome: 'Execução', status: 'pending' },
        { nome: 'Conclusão', status: 'pending' },
      ],
      pastaDigital:
        'GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE',
    },
    ancora: {
      modelo: 'Projeto',
      projeto: 'Comunica Cidadão',
      prestadorServico: 'Luciano Lopes',
      dataPagamento: '10/06/2025',
      unidade: 'Fábrica de Software',
    },
    vencimento: {
      data: '28/06/2025',
      status: 'vence_em',
      days: 5,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Editar'],
    tipoCaixa: 'recebidos',
  },
  {
    id: 2,
    remetente: {
      nome: 'Carlos Eduardo Silva',
      funcao: 'Gerente - DESENVOLVIMENTO',
    },
    documento: {
      id: '2354546/45223',
      dataInicio: '2025-06-16T14:15:00',
      modelo: 'Solicitação à Fábrica de Software',
      fluxo: 'Desenvolvimento de Sistema',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Solicitação', status: 'completed' },
        { nome: 'Triagem', status: 'current' },
        { nome: 'Desenvolvimento', status: 'pending' },
        { nome: 'Teste', status: 'pending' },
        { nome: 'Homologação', status: 'pending' },
        { nome: 'Deploy', status: 'pending' },
      ],
      pastaDigital:
        'GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE',
    },
    ancora: {
      modelo: 'Projeto',
      projeto: 'Portal de Atendimento',
      prestadorServico: 'Ana Maria Costa',
      dataPagamento: '15/06/2025',
      unidade: 'Fábrica de Software',
    },
    vencimento: {
      data: '05/07/2025',
      status: 'vence_em',
      days: 7,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Aprovar'],
    tipoCaixa: 'recebidos',
  },
  {
    id: 3,
    remetente: {
      nome: 'Marina Santos',
      funcao: 'Analista - DESENVOLVIMENTO',
    },
    documento: {
      id: '2354547/45224',
      dataInicio: '2025-06-17T10:00:00',
      modelo: 'Solicitação à Fábrica de Software',
      fluxo: 'Bug Fix',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Solicitação', status: 'completed' },
        { nome: 'Análise', status: 'current' },
        { nome: 'Correção', status: 'pending' },
        { nome: 'Teste', status: 'pending' },
      ],
      pastaDigital:
        'GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE',
    },
    ancora: {
      modelo: 'Projeto',
      projeto: 'Sistema ERP',
      prestadorServico: 'Equipe Dev',
      dataPagamento: '20/06/2025',
      unidade: 'Fábrica de Software',
    },
    vencimento: {
      data: '25/06/2025',
      status: 'vence_em',
      days: 3,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Editar'],
    tipoCaixa: 'recebidos',
  },
  {
    id: 4,
    remetente: {
      nome: 'Lucas Ferreira',
      funcao: 'Desenvolvedor - FÁBRICA',
    },
    documento: {
      id: '2354548/45225',
      dataInicio: '2025-06-24T16:30:00',
      modelo: 'Solicitação à Fábrica de Software',
      fluxo: 'Manutenção',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Solicitação', status: 'completed' },
        { nome: 'Análise', status: 'current' },
        { nome: 'Desenvolvimento', status: 'pending' },
      ],
      pastaDigital:
        'GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE',
    },
    ancora: {
      modelo: 'Manutenção',
      projeto: 'Portal Institucional',
      prestadorServico: 'Equipe Frontend',
      dataPagamento: '02/07/2025',
      unidade: 'Fábrica de Software',
    },
    vencimento: {
      data: '29/06/2025',
      status: 'vence_em',
      days: 3,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Desenvolver'],
    tipoCaixa: 'recebidos',
  },
  {
    id: 5,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '1122335/45567',
      dataInicio: '2025-06-18T07:45:00',
      modelo: 'Auditoria de Processo',
      fluxo: 'Auditoria Interna',
      status: 'rascunho',
      criadoPorMim: true,
      etapas: [
        { nome: 'Planejamento', status: 'current' },
        { nome: 'Notificação', status: 'pending' },
        { nome: 'Execução', status: 'pending' },
        { nome: 'Relatório', status: 'pending' },
        { nome: 'Acompanhamento', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > AUDITORIA INTERNA > PROCESSOS',
    },
    ancora: {
      modelo: 'Auditoria',
      projeto: 'Revisão de Controles Internos',
      prestadorServico: 'Equipe de Auditoria',
      dataPagamento: '12/06/2025',
      unidade: 'Auditoria',
    },
    vencimento: {
      data: '01/07/2025',
      status: 'vence_em',
      days: 3,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Configurar'],
    tipoCaixa: 'a-configurar',
  },
  {
    id: 6,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '1122336/45568',
      dataInicio: '2025-06-20T14:00:00',
      modelo: 'Auditoria de Processo',
      fluxo: 'Auditoria Preventiva',
      status: 'rascunho',
      criadoPorMim: true,
      etapas: [
        { nome: 'Planejamento', status: 'current' },
        { nome: 'Execução', status: 'pending' },
        { nome: 'Relatório', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > AUDITORIA INTERNA > PREVENTIVA',
    },
    ancora: {
      modelo: 'Auditoria',
      projeto: 'Auditoria Trimestral',
      prestadorServico: 'Equipe Interna',
      dataPagamento: '15/07/2025',
      unidade: 'Auditoria',
    },
    vencimento: {
      data: '10/07/2025',
      status: 'vence_em',
      days: 12,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Configurar'],
    tipoCaixa: 'a-configurar',
  },
  {
    id: 7,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '7891234/56789',
      dataInicio: '2025-06-25T16:00:00',
      modelo: 'Folha de Pagamento',
      fluxo: 'Processamento Mensal',
      status: 'lembrete',
      criadoPorMim: true,
      etapas: [
        { nome: 'Coleta', status: 'pending' },
        { nome: 'Processamento', status: 'pending' },
        { nome: 'Validação', status: 'pending' },
        { nome: 'Aprovação', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA DE RH > FOLHA',
    },
    ancora: {
      modelo: 'Folha',
      projeto: 'Folha Junho 2025',
      prestadorServico: 'Equipe RH',
      dataPagamento: '30/06/2025',
      unidade: 'Recursos Humanos',
    },
    vencimento: {
      data: '30/06/2025',
      status: 'vence_em',
      days: 2,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Lembrar'],
    tipoCaixa: 'agendamentos',
  },
  {
    id: 8,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '7891235/56790',
      dataInicio: '2025-06-26T08:00:00',
      modelo: 'Relatório de Progresso',
      fluxo: 'Revisão Mensal',
      status: 'em_andamento',
      criadoPorMim: true,
      etapas: [
        { nome: 'Coleta', status: 'completed' },
        { nome: 'Análise', status: 'current' },
        { nome: 'Relatório', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA DE PROJETOS > MONITORAMENTO',
    },
    ancora: {
      modelo: 'Projeto',
      projeto: 'Sistema Financeiro',
      prestadorServico: 'Equipe Interna',
      dataPagamento: '05/07/2025',
      unidade: 'Projetos',
    },
    vencimento: {
      data: '01/07/2025',
      status: 'vence_em',
      days: 3,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Processar'],
    tipoCaixa: 'solicitados',
  },
  {
    id: 9,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '7891236/56791',
      dataInicio: '2025-06-23T13:30:00',
      modelo: 'Relatório de Progresso',
      fluxo: 'Monitoramento Semanal',
      status: 'em_andamento',
      criadoPorMim: true,
      etapas: [
        { nome: 'Coleta de Dados', status: 'completed' },
        { nome: 'Análise', status: 'completed' },
        { nome: 'Elaboração', status: 'current' },
        { nome: 'Revisão', status: 'pending' },
        { nome: 'Aprovação', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA DE PROJETOS > MONITORAMENTO',
    },
    ancora: {
      modelo: 'Projeto',
      projeto: 'Sistema de Gestão Escolar',
      prestadorServico: 'Equipe de Desenvolvimento',
      dataPagamento: '05/07/2025',
      unidade: 'Projetos',
    },
    vencimento: {
      data: '03/07/2025',
      status: 'vence_em',
      days: 5,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Processar'],
    tipoCaixa: 'solicitados',
  },
  {
    id: 10,
    remetente: {
      nome: 'Eu Mesmo',
      funcao: 'Usuário Atual',
    },
    documento: {
      id: '7891237/56792',
      dataInicio: '2025-06-26T13:45:00',
      modelo: 'Relatório de Progresso',
      fluxo: 'Status Report',
      status: 'em_andamento',
      criadoPorMim: true,
      etapas: [
        { nome: 'Coleta', status: 'completed' },
        { nome: 'Análise', status: 'current' },
        { nome: 'Relatório', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA DE PROJETOS > STATUS',
    },
    ancora: {
      modelo: 'Status',
      projeto: 'Migração Cloud',
      prestadorServico: 'Equipe DevOps',
      dataPagamento: '03/07/2025',
      unidade: 'Projetos',
    },
    vencimento: {
      data: '02/07/2025',
      status: 'vence_em',
      days: 4,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Processar'],
    tipoCaixa: 'solicitados',
  },
  {
    id: 11,
    remetente: {
      nome: 'Roberto Lima Costa',
      funcao: 'Analista - FINANCEIRO',
    },
    documento: {
      id: '9988776/65544',
      dataInicio: '2025-06-05T12:00:00',
      modelo: 'Conciliação Bancária',
      fluxo: 'Financeiro',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Coleta', status: 'completed' },
        { nome: 'Análise', status: 'completed' },
        { nome: 'Conciliação', status: 'completed' },
        { nome: 'Aprovação', status: 'current' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA FINANCEIRA > CONTABILIDADE',
    },
    ancora: {
      modelo: 'Processo',
      projeto: 'Fechamento Mensal',
      prestadorServico: 'Equipe Contábil',
      dataPagamento: '25/06/2025',
      unidade: 'Contabilidade',
    },
    vencimento: {
      data: '22/06/2025',
      status: 'vencido',
      days: 8,
      unit: 'dias',
    },
    acoes: ['Visualizar', 'Aprovar'],
    tipoCaixa: 'recebidos',
  },
  {
    id: 12,
    remetente: {
      nome: 'Mariana Santos',
      funcao: 'Coordenadora - FINANCEIRO',
    },
    documento: {
      id: '9988779/65547',
      dataInicio: '2025-06-27T08:30:00',
      modelo: 'Conciliação Bancária',
      fluxo: 'Fechamento',
      status: 'em_andamento',
      criadoPorMim: false,
      etapas: [
        { nome: 'Preparação', status: 'completed' },
        { nome: 'Conciliação', status: 'current' },
        { nome: 'Validação', status: 'pending' },
      ],
      pastaDigital: 'GRUPO IMAGETECH > DIRETORIA FINANCEIRA > FECHAMENTO',
    },
    ancora: {
      modelo: 'Fechamento',
      projeto: 'Fechamento Junho',
      prestadorServico: 'Equipe Contábil',
      dataPagamento: '30/06/2025',
      unidade: 'Financeiro',
    },
    vencimento: {
      data: '29/06/2025',
      status: 'vence_em',
      days: 1,
      unit: 'dia',
    },
    acoes: ['Visualizar', 'Validar'],
    tipoCaixa: 'recebidos',
  },
]

// Mock temporário para marcadores
const marcadoresServiceMock = {
  async listar() {
    return Promise.resolve([
      { id: 'urgente', label: 'Urgente', cor: '#ef4444' },
      { id: 'importante', label: 'Importante', cor: '#f59e0b' },
      { id: 'revisao', label: 'Revisão', cor: '#8b5cf6' },
    ])
  },
  async adicionar(marcador) {
    console.log('Mock: Adicionando marcador', marcador)
    return Promise.resolve({ success: true })
  },
}

// Simula um storage de marcadores por card
let cardMarcadores = {}

// Service melhorado que funciona com filtros (mantendo sua lógica atual)
export const cardService = {
  // Função principal melhorada
  async getCards(filtros = {}) {
    // Primeiro, carrega os marcadores
    const marcadores = await marcadoresServiceMock.listar()

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let dadosFiltrados = [...cardsData]

          console.log('🔍 SERVICE - Iniciando getCards com filtros:', filtros)
          console.log('🔍 SERVICE - Total de cards:', cardsData.length)

          // PRIMEIRO FILTRO: Tipo de Caixa (FiltroPaginaMarcador)
          if (filtros.tipoCaixa && filtros.tipoCaixa !== 'todos') {
            // Verifica se é um marcador pessoal
            const tiposCaixaPadrao = [
              'a-configurar',
              'recebidos',
              'solicitados',
              'agendamentos',
            ]

            if (!tiposCaixaPadrao.includes(filtros.tipoCaixa)) {
              // É um marcador pessoal - filtra cards que têm esse marcador
              dadosFiltrados = dadosFiltrados.filter(card => {
                const marcadoresDoCard = cardMarcadores[card.id] || []
                return marcadoresDoCard.includes(filtros.tipoCaixa)
              })
            } else {
              // Filtros padrão
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
            dadosFiltrados,
            filtros.tipoCaixa || 'todos'
          )

          // Adiciona contadores de marcadores já carregados
          for (const marcador of marcadores) {
            contadores[marcador.id] = cardsData.filter(card => {
              const marcadoresDoCard = cardMarcadores[card.id] || []
              return marcadoresDoCard.includes(marcador.id)
            }).length
          }

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

  // NOVO: Mover cards para marcador
  async moverParaMarcador(cardIds, marcadorId) {
    return new Promise(resolve => {
      setTimeout(() => {
        // Adiciona o marcador aos cards
        cardIds.forEach(cardId => {
          if (!cardMarcadores[cardId]) {
            cardMarcadores[cardId] = []
          }
          if (!cardMarcadores[cardId].includes(marcadorId)) {
            cardMarcadores[cardId].push(marcadorId)
          }
        })

        console.log('Mock: Cards movidos para marcador:', {
          cardIds,
          marcadorId,
        })
        console.log('Estado dos marcadores:', cardMarcadores)

        resolve({
          success: true,
          message: `${cardIds.length} documento${
            cardIds.length > 1 ? 's' : ''
          } movido${cardIds.length > 1 ? 's' : ''} para o marcador!`,
          data: { cardIds, marcadorId },
        })
      }, 500)
    })
  },

  // NOVO: Remover cards de marcador
  async removerDeMarcador(cardIds, marcadorId) {
    return new Promise(resolve => {
      setTimeout(() => {
        cardIds.forEach(cardId => {
          if (cardMarcadores[cardId]) {
            cardMarcadores[cardId] = cardMarcadores[cardId].filter(
              m => m !== marcadorId
            )
          }
        })

        resolve({
          success: true,
          message: `${cardIds.length} documento${
            cardIds.length > 1 ? 's' : ''
          } removido${cardIds.length > 1 ? 's' : ''} do marcador!`,
          data: { cardIds, marcadorId },
        })
      }, 500)
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

  calcularContadores(todosCards, cardsFiltrados, tipoCaixaAtual = 'todos') {
    console.log('🔢 CALC - Iniciando calcularContadores')
    console.log('🔢 CALC - Total cards recebidos:', todosCards.length)
    console.log('🔢 CALC - Tipo caixa atual:', tipoCaixaAtual)

    const contadores = {
      todos: todosCards.length,
    }

    // Contagem "Todos" para modelos reflete o total de cards filtrados
    contadores['todos-modelos'] = cardsFiltrados.length

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

    // Adiciona contadores para marcadores pessoais
    contadores['urgente'] = todosCards.filter(card => {
      const marcadoresDoCard = cardMarcadores[card.id] || []
      return marcadoresDoCard.includes('urgente')
    }).length

    console.log('🔢 CALC - Contadores de caixa:', {
      todos: contadores.todos,
      'a-configurar': contadores['a-configurar'],
      recebidos: contadores.recebidos,
      solicitados: contadores.solicitados,
      agendamentos: contadores.agendamentos,
      urgente: contadores.urgente,
    })

    // CORREÇÃO: Mapeamento direto dos modelos para as chaves corretas
    const modeloParaChave = {
      'Solicitação à Fábrica de Software': 'solicitacao-fabrica-software',
      'Solicitação de Orçamento': 'solicitacao-orcamento',
      'Relatório de Progresso': 'relatorio-progresso',
      'Auditoria de Processo': 'auditoria-processo',
      'Conciliação Bancária': 'conciliacao-bancaria',
      'Folha de Pagamento': 'folha-de-pagamento',
    }

    // Conta por modelo apenas nos cards FILTRADOS
    cardsFiltrados.forEach(card => {
      const modelo = card.documento?.modelo
      if (modelo && modeloParaChave[modelo]) {
        const key = modeloParaChave[modelo]
        contadores[key] = (contadores[key] || 0) + 1
        console.log(
          `🔢 CALC - Modelo Filtrado "${modelo}" -> chave "${key}" = ${contadores[key]}`
        )
      } else if (modelo) {
        console.log(`⚠️ CALC - Modelo não mapeado: "${modelo}"`)
      }
    })

    console.log('🔢 CALC - Contadores finais:', contadores)
    return contadores
  },
}

// Plugin para Vue 2 (mantendo compatibilidade com código atual)
const ServicesPlugin = {
  install(Vue) {
    // Registrar services mock (atual)
    Vue.prototype.$cardService = cardService
    Vue.prototype.$marcadoresService = marcadoresServiceMock

    // Criar um objeto services para facilitar acesso
    Vue.prototype.$services = {
      card: cardService,
      marcador: marcadoresServiceMock,
    }
  },
}

// Exportar services individualmente
export { marcadoresServiceMock as marcadoresService }

// Exportar plugin
export default ServicesPlugin

// Exportar objeto com todos os services
export const services = {
  card: cardService,
  marcador: marcadoresServiceMock,
}

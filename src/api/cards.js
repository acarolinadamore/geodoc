// api/cards.js
// Endpoints relacionados aos cards/documentos
import api from './index'

export default {
  // === MÉTODOS PRINCIPAIS ===

  /**
   * Lista cards com filtros e paginação
   * @param {Object} filtros - Objeto com filtros, paginação, etc
   * @returns {Promise} Resposta da API
   */
  listar(filtros = {}) {
    const params = this.montarParametrosConsulta(filtros)
    return api.get('/cards', { params })
  },

  /**
   * Busca um card específico por ID
   * @param {Number|String} id - ID do card
   * @returns {Promise} Resposta da API
   */
  buscarPorId(id) {
    return api.get(`/cards/${id}`)
  },

  /**
   * Cria um novo card
   * @param {Object} dados - Dados do card
   * @returns {Promise} Resposta da API
   */
  criar(dados) {
    return api.post('/cards', dados)
  },

  /**
   * Atualiza um card existente
   * @param {Number|String} id - ID do card
   * @param {Object} dados - Dados para atualizar
   * @returns {Promise} Resposta da API
   */
  atualizar(id, dados) {
    return api.put(`/cards/${id}`, dados)
  },

  /**
   * Deleta um card
   * @param {Number|String} id - ID do card
   * @returns {Promise} Resposta da API
   */
  deletar(id) {
    return api.delete(`/cards/${id}`)
  },

  // === MÉTODOS PARA CONTAGENS ===

  /**
   * Busca contagens por tipo de caixa
   * @returns {Promise} Resposta da API
   */
  buscarContagemTipoCaixa() {
    return api.get('/cards/contagem/tipo-caixa')
  },

  /**
   * Busca contagens por modelo
   * @param {String} tipoCaixa - Tipo de caixa para filtrar
   * @returns {Promise} Resposta da API
   */
  buscarContagemModelos(tipoCaixa = null) {
    const params = {}
    if (tipoCaixa && tipoCaixa !== 'todos') {
      params.tipo_caixa = tipoCaixa
    }
    return api.get('/cards/contagem/modelos', { params })
  },

  // === AÇÕES EM LOTE ===

  /**
   * Aprova múltiplos cards
   * @param {Array} cardIds - Array de IDs dos cards
   * @param {String} observacoes - Observações da aprovação
   * @returns {Promise} Resposta da API
   */
  aprovar(cardIds, observacoes = '') {
    return api.post('/cards/aprovar', {
      card_ids: cardIds,
      observacoes,
    })
  },

  /**
   * Aprova múltiplos cards (método específico para lote)
   * @param {Object} dados - Dados da aprovação em lote
   * @returns {Promise} Resposta da API
   */
  aprovarEmLote(dados) {
    return api.post('/cards/acoes/aprovar-lote', {
      card_ids: dados.documentos,
      observacoes: dados.observacoes || '',
    })
  },

  /**
   * Atribui cards a um responsável
   * @param {Array} cardIds - Array de IDs dos cards
   * @param {String} responsavelId - ID do responsável
   * @returns {Promise} Resposta da API
   */
  atribuir(cardIds, responsavelId) {
    return api.post('/cards/atribuir', {
      card_ids: cardIds,
      responsavel_id: responsavelId,
    })
  },

  /**
   * Atribui cards em lotes
   * @param {Object} dados - Dados da atribuição
   * @returns {Promise} Resposta da API
   */
  atribuirEmLotes(dados) {
    return api.post('/cards/acoes/atribuir-lotes', {
      card_ids: dados.documentos,
      responsavel_id: dados.responsavel,
      observacoes: dados.observacoes || '',
    })
  },

  /**
   * Atribui cards ao usuário atual
   * @param {Object} dados - Dados da atribuição
   * @returns {Promise} Resposta da API
   */
  atribuirAMim(dados) {
    return api.post('/cards/acoes/atribuir-a-mim', {
      card_ids: dados.documentos,
      observacoes: dados.observacoes || '',
    })
  },

  /**
   * Agrupa cards
   * @param {Array} cardIds - Array de IDs dos cards
   * @param {String} grupoId - ID do grupo
   * @returns {Promise} Resposta da API
   */
  agrupar(cardIds, grupoId) {
    return api.post('/cards/agrupar', {
      card_ids: cardIds,
      grupo_id: grupoId,
    })
  },

  /**
   * Agrupa documentos (método específico para nova estrutura)
   * @param {Object} dados - Dados do agrupamento
   * @returns {Promise} Resposta da API
   */
  agruparDocumentos(dados) {
    return api.post('/cards/acoes/agrupar', {
      card_ids: dados.documentos,
      nome_grupo: dados.nomeGrupo || '',
      observacoes: dados.observacoes || '',
    })
  },

  // === AÇÕES INDIVIDUAIS ===

  /**
   * Aprova um card individual
   * @param {Number|String} id - ID do card
   * @param {Object} dados - Dados da aprovação
   * @returns {Promise} Resposta da API
   */
  aprovarIndividual(id, dados) {
    return api.post(`/cards/${id}/aprovar`, dados)
  },

  /**
   * Reprova um card
   * @param {Number|String} id - ID do card
   * @param {Object} dados - Dados da reprovação
   * @returns {Promise} Resposta da API
   */
  reprovar(id, dados) {
    return api.post(`/cards/${id}/reprovar`, dados)
  },

  /**
   * Solicita correção de um card
   * @param {Number|String} id - ID do card
   * @param {Object} dados - Dados da solicitação
   * @returns {Promise} Resposta da API
   */
  solicitarCorrecao(id, dados) {
    return api.post(`/cards/${id}/solicitar-correcao`, dados)
  },

  /**
   * Arquiva um card
   * @param {Number|String} id - ID do card
   * @returns {Promise} Resposta da API
   */
  arquivar(id) {
    return api.post(`/cards/${id}/arquivar`)
  },

  /**
   * Desarquiva um card
   * @param {Number|String} id - ID do card
   * @returns {Promise} Resposta da API
   */
  desarquivar(id) {
    return api.post(`/cards/${id}/desarquivar`)
  },

  /**
   * Executa ação específica do modelo
   * @param {Object} dados - Dados da ação
   * @returns {Promise} Resposta da API
   */
  executarAcaoModelo(dados) {
    return api.post('/cards/acoes/modelo', dados)
  },

  // === MARCADORES ===

  /**
   * Move cards para um marcador
   * @param {Array} cardIds - Array de IDs dos cards
   * @param {String} marcadorId - ID do marcador
   * @returns {Promise} Resposta da API
   */
  moverParaMarcador(cardIds, marcadorId) {
    return api.post('/cards/marcador', {
      card_ids: cardIds,
      marcador_id: marcadorId,
    })
  },

  /**
   * Remove cards de um marcador
   * @param {Array} cardIds - Array de IDs dos cards
   * @param {String} marcadorId - ID do marcador
   * @returns {Promise} Resposta da API
   */
  removerDeMarcador(cardIds, marcadorId) {
    return api.delete('/cards/marcador', {
      data: {
        card_ids: cardIds,
        marcador_id: marcadorId,
      },
    })
  },

  // === BUSCA E ESTATÍSTICAS ===

  /**
   * Busca cards por termo
   * @param {String} termo - Termo de busca
   * @returns {Promise} Resposta da API
   */
  buscar(termo) {
    return api.get('/cards/buscar', {
      params: { q: termo },
    })
  },

  /**
   * Busca estatísticas dos cards
   * @returns {Promise} Resposta da API
   */
  buscarEstatisticas() {
    return api.get('/cards/estatisticas')
  },

  /**
   * Exporta dados dos cards
   * @param {String} formato - Formato da exportação
   * @param {Object} filtros - Filtros para exportação
   * @returns {Promise} Resposta da API
   */
  exportar(formato = 'xlsx', filtros = {}) {
    const params = this.montarParametrosConsulta(filtros)
    params.formato = formato

    return api.get('/cards/exportar', {
      params,
      responseType: 'blob',
    })
  },

  // === MÉTODOS UTILITÁRIOS ===

  /**
   * Monta parâmetros de consulta da API
   * @param {Object} filtros - Filtros do frontend
   * @returns {Object} Parâmetros formatados para a API
   */
  montarParametrosConsulta(filtros) {
    const params = {}

    // Filtros da nova estrutura
    if (filtros.tipoCaixa && filtros.tipoCaixa !== 'todos') {
      params.tipo_caixa = filtros.tipoCaixa
    }

    if (
      filtros.modelos &&
      filtros.modelos.length > 0 &&
      !filtros.modelos.includes('todos')
    ) {
      params.modelos = filtros.modelos.join(',')
    }

    if (filtros.busca) {
      params.busca = filtros.busca
    }

    if (filtros.dataInicio) {
      params.data_inicio = filtros.dataInicio
    }

    if (filtros.dataFim) {
      params.data_fim = filtros.dataFim
    }

    // Filtros de data específicos
    if (filtros.filterType) {
      params.filter_type = filtros.filterType
    }

    if (filtros.day) {
      params.day = filtros.day
    }

    if (filtros.month) {
      params.month = filtros.month
    }

    // Paginação
    if (filtros.page) {
      params.page = filtros.page
    }

    if (filtros.limit) {
      params.limit = filtros.limit
    }

    // Ordenação
    if (filtros.sortField) {
      params.sort_field = filtros.sortField
    }

    if (filtros.sortDirection) {
      params.sort_direction = filtros.sortDirection
    }

    // Filtros legados (mantidos para compatibilidade)
    if (filtros.status) {
      params.status = filtros.status
    }

    if (filtros.marcador) {
      params.marcador = filtros.marcador
    }

    if (filtros.remetente) {
      params.remetente = filtros.remetente
    }

    if (filtros.vencimento) {
      params.vencimento = filtros.vencimento
    }

    if (filtros.prioridade) {
      params.prioridade = filtros.prioridade
    }

    return params
  },
}

// Para compatibilidade com a estrutura esperada pelo service
export const cardsAPI = {
  getAll: params => exports.default.listar(params),
  getById: id => exports.default.buscarPorId(id),
  create: data => exports.default.criar(data),
  update: (id, data) => exports.default.atualizar(id, data),
  delete: id => exports.default.deletar(id),

  // Novos métodos específicos
  getContagemTipoCaixa: () => exports.default.buscarContagemTipoCaixa(),
  getContagemModelos: params =>
    exports.default.buscarContagemModelos(params?.tipoCaixa),

  // Ações em lote
  atribuirEmLotes: data => exports.default.atribuirEmLotes(data),
  atribuirAMim: data => exports.default.atribuirAMim(data),
  aprovarEmLote: data => exports.default.aprovarEmLote(data),
  agruparDocumentos: data => exports.default.agruparDocumentos(data),

  // Ações individuais
  approve: (id, data) => exports.default.aprovarIndividual(id, data),
  reject: (id, data) => exports.default.reprovar(id, data),
  requestCorrection: (id, data) => exports.default.solicitarCorrecao(id, data),
  archive: id => exports.default.arquivar(id),
  unarchive: id => exports.default.desarquivar(id),
  executarAcaoModelo: data => exports.default.executarAcaoModelo(data),

  // Busca e estatísticas
  search: query => exports.default.buscar(query),
  getStatistics: () => exports.default.buscarEstatisticas(),
  export: (format, filters) => exports.default.exportar(format, filters),
}

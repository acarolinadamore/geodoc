//Endpoints relacionados aos cards/documentos
import api from './index'

export default {
  /**
   * Lista cards com filtros e paginação
   * @param {Object} filtros - Objeto com filtros, paginação, etc
   * @returns {Promise} Resposta da API
   */
  listar(filtros = {}) {
    // Limpar filtros vazios para não enviar ao backend
    const params = {}

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

    if (filtros.page) {
      params.page = filtros.page
    }

    if (filtros.limit) {
      params.limit = filtros.limit
    }

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

  /**
   * Aprova múltiplos cards
   * @param {Array} cardIds - Array de IDs dos cards
   * @returns {Promise} Resposta da API
   */
  aprovar(cardIds) {
    return api.post('/cards/aprovar', {
      card_ids: cardIds,
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
}

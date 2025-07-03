import { cardsAPI } from '@/api/cards'

class CardService {
  constructor() {
    this.cards = []
    this.loading = false
    this.error = null
    this.pagination = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
    }
    this.filters = {
      status: '',
      modelo: '',
      marcador: '',
      remetente: '',
      dataInicio: '',
      dataFim: '',
      vencimento: '',
      prioridade: '',
    }
    this.sort = {
      field: 'created_at',
      direction: 'desc',
    }
  }

  // Listar cards com filtros e paginação
  async getCards(params = {}) {
    this.loading = true
    this.error = null

    try {
      const queryParams = {
        page: this.pagination.currentPage,
        limit: this.pagination.itemsPerPage,
        ...this.filters,
        ...this.sort,
        ...params,
      }

      const response = await cardsAPI.getAll(queryParams)
      const { data, pagination } = response.data

      this.cards = data
      this.pagination = {
        ...this.pagination,
        ...pagination,
      }

      return {
        success: true,
        data: this.cards,
        pagination: this.pagination,
      }
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao buscar documentos'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar card por ID
  async getCardById(id) {
    try {
      const response = await cardsAPI.getById(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar documento',
      }
    }
  }

  // Criar novo card
  async createCard(cardData) {
    try {
      const response = await cardsAPI.create(cardData)
      return {
        success: true,
        data: response.data,
        message: 'Documento criado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar documento',
      }
    }
  }

  // Atualizar card
  async updateCard(id, cardData) {
    try {
      const response = await cardsAPI.update(id, cardData)

      // Atualizar na lista local se existir
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Documento atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar documento',
      }
    }
  }

  // Deletar card
  async deleteCard(id) {
    try {
      await cardsAPI.delete(id)

      // Remover da lista local
      this.cards = this.cards.filter(card => card.id !== id)

      return {
        success: true,
        message: 'Documento excluído com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir documento',
      }
    }
  }

  // Aprovar documento
  async approveCard(id, observacoes = '') {
    try {
      const response = await cardsAPI.approve(id, { observacoes })

      // Atualizar na lista local
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Documento aprovado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao aprovar documento',
      }
    }
  }

  // Reprovar documento
  async rejectCard(id, motivo) {
    try {
      const response = await cardsAPI.reject(id, { motivo })

      // Atualizar na lista local
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Documento reprovado',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao reprovar documento',
      }
    }
  }

  // Solicitar correção
  async requestCorrection(id, observacoes) {
    try {
      const response = await cardsAPI.requestCorrection(id, { observacoes })

      // Atualizar na lista local
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Correção solicitada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao solicitar correção',
      }
    }
  }

  // Arquivar documento
  async archiveCard(id) {
    try {
      const response = await cardsAPI.archive(id)

      // Atualizar na lista local
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Documento arquivado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao arquivar documento',
      }
    }
  }

  // Desarquivar documento
  async unarchiveCard(id) {
    try {
      const response = await cardsAPI.unarchive(id)

      // Atualizar na lista local
      const index = this.cards.findIndex(card => card.id === id)
      if (index !== -1) {
        this.cards[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Documento desarquivado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao desarquivar documento',
      }
    }
  }

  // Buscar documentos
  async searchCards(query) {
    try {
      const response = await cardsAPI.search(query)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar documentos',
      }
    }
  }

  // Definir filtros
  setFilters(filters) {
    this.filters = { ...this.filters, ...filters }
  }

  // Limpar filtros
  clearFilters() {
    this.filters = {
      status: '',
      modelo: '',
      marcador: '',
      remetente: '',
      dataInicio: '',
      dataFim: '',
      vencimento: '',
      prioridade: '',
    }
  }

  // Definir ordenação
  setSort(field, direction = 'asc') {
    this.sort = { field, direction }
  }

  // Definir página
  setPage(page) {
    this.pagination.currentPage = page
  }

  // Definir itens por página
  setItemsPerPage(itemsPerPage) {
    this.pagination.itemsPerPage = itemsPerPage
    this.pagination.currentPage = 1 // Reset para primeira página
  }

  // Obter estatísticas
  async getStatistics() {
    try {
      const response = await cardsAPI.getStatistics()
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao obter estatísticas',
      }
    }
  }

  // Exportar dados
  async exportData(format = 'xlsx', filters = {}) {
    try {
      const response = await cardsAPI.export(format, filters)
      return {
        success: true,
        data: response.data,
        message: 'Dados exportados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao exportar dados',
      }
    }
  }

  // Getters
  getCards() {
    return this.cards
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }

  getPagination() {
    return this.pagination
  }

  getFilters() {
    return this.filters
  }

  getSort() {
    return this.sort
  }
}

// Instância singleton
const cardService = new CardService()

export default cardService

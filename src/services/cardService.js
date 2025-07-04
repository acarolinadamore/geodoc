// services/cardService.js
import cardsAPI from '@/api/cards'

class CardService {
  constructor() {
    this.defaultFilters = {
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

  // === MÉTODOS PRINCIPAIS PARA CAIXA DE ENTRADA ===

  // Buscar cards com filtros (adaptado para nova estrutura)
  async getCards(filtros = {}) {
    try {
      const response = await cardsAPI.listar(filtros)
      return this.formatarRespostaCards(response.data)
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao buscar documentos')
    }
  }

  // Buscar contagens por tipo de caixa
  async getContagemTipoCaixa() {
    try {
      const response = await cardsAPI.buscarContagemTipoCaixa()
      return response.data
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao buscar contagens por tipo')
    }
  }

  // Buscar contagens por modelo
  async getContagemModelos(tipoCaixa) {
    try {
      const response = await cardsAPI.buscarContagemModelos(tipoCaixa)
      return response.data
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao buscar contagem de modelos')
    }
  }

  // === AÇÕES EM LOTE ===

  // Atribuir documentos em lotes
  async atribuirEmLotes(dados) {
    try {
      const response = await cardsAPI.atribuirEmLotes(dados)
      return {
        sucesso: true,
        mensagem: response.data.message || 'Documentos atribuídos com sucesso',
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao atribuir documentos em lotes')
    }
  }

  // Atribuir documentos a mim
  async atribuirAMim(dados) {
    try {
      const response = await cardsAPI.atribuirAMim(dados)
      return {
        sucesso: true,
        mensagem:
          response.data.message || 'Documentos atribuídos a você com sucesso',
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao atribuir documentos')
    }
  }

  // Aprovar documentos em lote
  async aprovarDocumentos(dados) {
    try {
      const response = await cardsAPI.aprovarEmLote(dados)
      return {
        sucesso: true,
        mensagem: response.data.message || 'Documentos aprovados com sucesso',
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao aprovar documentos')
    }
  }

  // Agrupar documentos
  async agruparDocumentos(dados) {
    try {
      const response = await cardsAPI.agruparDocumentos(dados)
      return {
        sucesso: true,
        mensagem: response.data.message || 'Documentos agrupados com sucesso',
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao agrupar documentos')
    }
  }

  // === AÇÕES INDIVIDUAIS ===

  // Buscar card por ID
  async getCardById(id) {
    try {
      const response = await cardsAPI.buscarPorId(id)
      return {
        sucesso: true,
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao buscar documento')
    }
  }

  // Criar novo card
  async createCard(cardData) {
    try {
      const response = await cardsAPI.criar(cardData)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento criado com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao criar documento')
    }
  }

  // Atualizar card
  async updateCard(id, cardData) {
    try {
      const response = await cardsAPI.atualizar(id, cardData)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento atualizado com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao atualizar documento')
    }
  }

  // Deletar card
  async deleteCard(id) {
    try {
      await cardsAPI.deletar(id)
      return {
        sucesso: true,
        mensagem: 'Documento excluído com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao excluir documento')
    }
  }

  // Aprovar documento individual
  async approveCard(id, observacoes = '') {
    try {
      const response = await cardsAPI.aprovarIndividual(id, { observacoes })
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento aprovado com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao aprovar documento')
    }
  }

  // Reprovar documento
  async rejectCard(id, motivo) {
    try {
      const response = await cardsAPI.reprovar(id, { motivo })
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento reprovado',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao reprovar documento')
    }
  }

  // Solicitar correção
  async requestCorrection(id, observacoes) {
    try {
      const response = await cardsAPI.solicitarCorrecao(id, { observacoes })
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Correção solicitada com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao solicitar correção')
    }
  }

  // Arquivar documento
  async archiveCard(id) {
    try {
      const response = await cardsAPI.arquivar(id)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento arquivado com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao arquivar documento')
    }
  }

  // Desarquivar documento
  async unarchiveCard(id) {
    try {
      const response = await cardsAPI.desarquivar(id)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Documento desarquivado com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao desarquivar documento')
    }
  }

  // Executar ação do modelo
  async executarAcaoModelo(acao) {
    try {
      const response = await cardsAPI.executarAcaoModelo(acao)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: response.data.message || 'Ação executada com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao executar ação do modelo')
    }
  }

  // === MÉTODOS DE BUSCA E ESTATÍSTICAS ===

  // Buscar documentos
  async searchCards(query) {
    try {
      const response = await cardsAPI.buscar(query)
      return {
        sucesso: true,
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao buscar documentos')
    }
  }

  // Obter estatísticas
  async getStatistics() {
    try {
      const response = await cardsAPI.buscarEstatisticas()
      return {
        sucesso: true,
        dados: response.data,
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao obter estatísticas')
    }
  }

  // Exportar dados
  async exportData(format = 'xlsx', filters = {}) {
    try {
      const response = await cardsAPI.exportar(format, filters)
      return {
        sucesso: true,
        dados: response.data,
        mensagem: 'Dados exportados com sucesso',
      }
    } catch (error) {
      throw this.tratarErro(error, 'Erro ao exportar dados')
    }
  }

  // === MÉTODOS UTILITÁRIOS ===

  // Montar parâmetros de consulta
  montarParametrosConsulta(filtros) {
    // Agora a API já tem um método para montar parâmetros
    // Removemos este método pois a API cards faz isso internamente
    return filtros
  }

  // Formatar resposta dos cards
  formatarRespostaCards(dadosResposta) {
    return {
      cards: dadosResposta.data || dadosResposta.cards || [],
      total: dadosResposta.total || 0,
      totalPages: dadosResposta.totalPages || 1,
      currentPage: dadosResposta.currentPage || 1,
      contadores: dadosResposta.contadores || {},
      contagemTipoCaixa: dadosResposta.contagemTipoCaixa || {},
      contagemModelosAtual: dadosResposta.contagemModelosAtual || {},
    }
  }

  // Tratar erros de forma consistente
  tratarErro(error, mensagemPadrao) {
    const mensagem =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      mensagemPadrao

    // Log para debug
    console.error('CardService Error:', {
      mensagem,
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    })

    // Retorna erro estruturado
    const erro = new Error(mensagem)
    erro.status = error.response?.status
    erro.data = error.response?.data
    return erro
  }

  // === MÉTODOS LEGACY (mantidos para compatibilidade) ===

  // Definir filtros (legacy)
  setFilters(filters) {
    console.warn('CardService.setFilters é legacy. Use os novos composables.')
    return filters
  }

  // Limpar filtros (legacy)
  clearFilters() {
    console.warn('CardService.clearFilters é legacy. Use os novos composables.')
    return { ...this.defaultFilters }
  }

  // Definir ordenação (legacy)
  setSort(field, direction = 'asc') {
    console.warn('CardService.setSort é legacy. Use os novos composables.')
    return { field, direction }
  }

  // Definir página (legacy)
  setPage(page) {
    console.warn('CardService.setPage é legacy. Use os novos composables.')
    return page
  }

  // Definir itens por página (legacy)
  setItemsPerPage(itemsPerPage) {
    console.warn(
      'CardService.setItemsPerPage é legacy. Use os novos composables.'
    )
    return itemsPerPage
  }
}

// Instância singleton
const cardService = new CardService()

export default cardService

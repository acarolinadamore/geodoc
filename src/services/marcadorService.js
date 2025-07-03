import { marcadoresAPI } from '@/api/marcadores'

class MarcadorService {
  constructor() {
    this.marcadores = []
    this.loading = false
    this.error = null
    this.categorias = []
  }

  // Listar todos os marcadores
  async getMarcadores(params = {}) {
    this.loading = true
    this.error = null

    try {
      const response = await marcadoresAPI.getAll(params)
      this.marcadores = response.data

      return {
        success: true,
        data: this.marcadores,
      }
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao buscar marcadores'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar marcador por ID
  async getMarcadorById(id) {
    try {
      const response = await marcadoresAPI.getById(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar marcador',
      }
    }
  }

  // Criar novo marcador
  async createMarcador(marcadorData) {
    try {
      const response = await marcadoresAPI.create(marcadorData)

      // Adicionar à lista local
      this.marcadores.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Marcador criado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar marcador',
      }
    }
  }

  // Atualizar marcador
  async updateMarcador(id, marcadorData) {
    try {
      const response = await marcadoresAPI.update(id, marcadorData)

      // Atualizar na lista local
      const index = this.marcadores.findIndex(marcador => marcador.id === id)
      if (index !== -1) {
        this.marcadores[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Marcador atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar marcador',
      }
    }
  }

  // Deletar marcador
  async deleteMarcador(id) {
    try {
      await marcadoresAPI.delete(id)

      // Remover da lista local
      this.marcadores = this.marcadores.filter(marcador => marcador.id !== id)

      return {
        success: true,
        message: 'Marcador excluído com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir marcador',
      }
    }
  }

  // Buscar marcadores
  async searchMarcadores(query) {
    try {
      const response = await marcadoresAPI.search(query)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar marcadores',
      }
    }
  }

  // Listar marcadores por categoria
  async getMarcadoresByCategory(categoria) {
    try {
      const response = await marcadoresAPI.getByCategory(categoria)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar marcadores por categoria',
      }
    }
  }

  // Listar marcadores do usuário
  async getMarcadoresByUser(userId) {
    try {
      const response = await marcadoresAPI.getByUser(userId)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar marcadores do usuário',
      }
    }
  }

  // Aplicar marcador a um documento
  async applyToDocument(marcadorId, documentoId) {
    try {
      await marcadoresAPI.applyToDocument(marcadorId, documentoId)
      return {
        success: true,
        message: 'Marcador aplicado ao documento com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao aplicar marcador ao documento',
      }
    }
  }

  // Remover marcador de um documento
  async removeFromDocument(marcadorId, documentoId) {
    try {
      await marcadoresAPI.removeFromDocument(marcadorId, documentoId)
      return {
        success: true,
        message: 'Marcador removido do documento com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao remover marcador do documento',
      }
    }
  }

  // Listar documentos com determinado marcador
  async getDocuments(marcadorId, params = {}) {
    try {
      const response = await marcadoresAPI.getDocuments(marcadorId, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar documentos do marcador',
      }
    }
  }

  // Atualizar ordem dos marcadores
  async updateOrder(marcadoresOrder) {
    try {
      await marcadoresAPI.updateOrder(marcadoresOrder)

      // Atualizar ordem local
      this.marcadores = marcadoresOrder

      return {
        success: true,
        message: 'Ordem dos marcadores atualizada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao atualizar ordem dos marcadores',
      }
    }
  }

  // Aplicar múltiplos marcadores a um documento
  async applyMultipleToDocument(marcadorIds, documentoId) {
    try {
      const promises = marcadorIds.map(marcadorId =>
        this.applyToDocument(marcadorId, documentoId)
      )

      await Promise.all(promises)

      return {
        success: true,
        message: 'Marcadores aplicados ao documento com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao aplicar marcadores ao documento',
      }
    }
  }

  // Remover múltiplos marcadores de um documento
  async removeMultipleFromDocument(marcadorIds, documentoId) {
    try {
      const promises = marcadorIds.map(marcadorId =>
        this.removeFromDocument(marcadorId, documentoId)
      )

      await Promise.all(promises)

      return {
        success: true,
        message: 'Marcadores removidos do documento com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover marcadores do documento',
      }
    }
  }

  // Obter categorias únicas
  getCategorias() {
    const categorias = [
      ...new Set(this.marcadores.map(m => m.categoria).filter(Boolean)),
    ]
    return categorias.sort()
  }

  // Filtrar marcadores por categoria
  filterByCategory(categoria) {
    if (!categoria) return this.marcadores
    return this.marcadores.filter(marcador => marcador.categoria === categoria)
  }

  // Filtrar marcadores por cor
  filterByColor(cor) {
    if (!cor) return this.marcadores
    return this.marcadores.filter(marcador => marcador.cor === cor)
  }

  // Obter marcadores mais usados
  getMostUsed(limit = 10) {
    return this.marcadores
      .sort((a, b) => (b.uso_count || 0) - (a.uso_count || 0))
      .slice(0, limit)
  }

  // Validar dados do marcador
  validateMarcador(marcadorData) {
    const errors = []

    if (!marcadorData.nome || marcadorData.nome.trim() === '') {
      errors.push('Nome do marcador é obrigatório')
    }

    if (!marcadorData.cor || marcadorData.cor.trim() === '') {
      errors.push('Cor do marcador é obrigatória')
    }

    if (marcadorData.nome && marcadorData.nome.length > 50) {
      errors.push('Nome do marcador deve ter no máximo 50 caracteres')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Getters
  getAllMarcadores() {
    return this.marcadores
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }

  // Buscar marcador por nome
  findByName(nome) {
    return this.marcadores.find(
      marcador => marcador.nome.toLowerCase() === nome.toLowerCase()
    )
  }

  // Verificar se marcador existe
  exists(nome) {
    return this.findByName(nome) !== undefined
  }
}

// Instância singleton
const marcadorService = new MarcadorService()

export default marcadorService

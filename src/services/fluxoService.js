import { fluxosAPI } from '@/api/fluxos'

class FluxoService {
  constructor() {
    this.fluxos = []
    this.loading = false
    this.error = null
    this.currentFluxo = null
    this.execucoes = []
  }

  // Listar todos os fluxos
  async getFluxos(params = {}) {
    this.loading = true
    this.error = null

    try {
      const response = await fluxosAPI.getAll(params)
      this.fluxos = response.data

      return {
        success: true,
        data: this.fluxos,
      }
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao buscar fluxos'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar fluxo por ID
  async getFluxoById(id) {
    try {
      const response = await fluxosAPI.getById(id)
      this.currentFluxo = response.data
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar fluxo',
      }
    }
  }

  // Criar novo fluxo
  async createFluxo(fluxoData) {
    try {
      const validation = this.validateFluxo(fluxoData)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await fluxosAPI.create(fluxoData)

      // Adicionar à lista local
      this.fluxos.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Fluxo criado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar fluxo',
      }
    }
  }

  // Atualizar fluxo
  async updateFluxo(id, fluxoData) {
    try {
      const validation = this.validateFluxo(fluxoData)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await fluxosAPI.update(id, fluxoData)

      // Atualizar na lista local
      const index = this.fluxos.findIndex(fluxo => fluxo.id === id)
      if (index !== -1) {
        this.fluxos[index] = response.data
      }

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Fluxo atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar fluxo',
      }
    }
  }

  // Deletar fluxo
  async deleteFluxo(id) {
    try {
      await fluxosAPI.delete(id)

      // Remover da lista local
      this.fluxos = this.fluxos.filter(fluxo => fluxo.id !== id)

      // Limpar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo = null
      }

      return {
        success: true,
        message: 'Fluxo excluído com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir fluxo',
      }
    }
  }

  // Buscar fluxos
  async searchFluxos(query) {
    try {
      const response = await fluxosAPI.search(query)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar fluxos',
      }
    }
  }

  // Duplicar fluxo
  async duplicateFluxo(id) {
    try {
      const response = await fluxosAPI.duplicate(id)

      // Adicionar à lista local
      this.fluxos.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Fluxo duplicado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao duplicar fluxo',
      }
    }
  }

  // Ativar/desativar fluxo
  async toggleFluxoStatus(id) {
    try {
      const response = await fluxosAPI.toggleStatus(id)

      // Atualizar na lista local
      const index = this.fluxos.findIndex(fluxo => fluxo.id === id)
      if (index !== -1) {
        this.fluxos[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: `Fluxo ${
          response.data.ativo ? 'ativado' : 'desativado'
        } com sucesso`,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao alterar status do fluxo',
      }
    }
  }

  // Obter etapas do fluxo
  async getFluxoSteps(id) {
    try {
      const response = await fluxosAPI.getSteps(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar etapas do fluxo',
      }
    }
  }

  // Atualizar etapas do fluxo
  async updateFluxoSteps(id, etapas) {
    try {
      const response = await fluxosAPI.updateSteps(id, etapas)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo.etapas = response.data.etapas
      }

      return {
        success: true,
        data: response.data,
        message: 'Etapas do fluxo atualizadas com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao atualizar etapas do fluxo',
      }
    }
  }

  // Adicionar etapa ao fluxo
  async addStep(id, etapaData) {
    try {
      const response = await fluxosAPI.addStep(id, etapaData)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo.etapas.push(response.data)
      }

      return {
        success: true,
        data: response.data,
        message: 'Etapa adicionada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao adicionar etapa',
      }
    }
  }

  // Atualizar etapa específica
  async updateStep(id, etapaId, etapaData) {
    try {
      const response = await fluxosAPI.updateStep(id, etapaId, etapaData)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        const index = this.currentFluxo.etapas.findIndex(e => e.id === etapaId)
        if (index !== -1) {
          this.currentFluxo.etapas[index] = response.data
        }
      }

      return {
        success: true,
        data: response.data,
        message: 'Etapa atualizada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar etapa',
      }
    }
  }

  // Remover etapa do fluxo
  async removeStep(id, etapaId) {
    try {
      await fluxosAPI.removeStep(id, etapaId)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo.etapas = this.currentFluxo.etapas.filter(
          e => e.id !== etapaId
        )
      }

      return {
        success: true,
        message: 'Etapa removida com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao remover etapa',
      }
    }
  }

  // Reordenar etapas do fluxo
  async reorderSteps(id, etapasOrder) {
    try {
      const response = await fluxosAPI.reorderSteps(id, etapasOrder)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo.etapas = response.data.etapas
      }

      return {
        success: true,
        data: response.data,
        message: 'Etapas reordenadas com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao reordenar etapas',
      }
    }
  }

  // Obter responsáveis do fluxo
  async getFluxoResponsibles(id) {
    try {
      const response = await fluxosAPI.getResponsibles(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar responsáveis do fluxo',
      }
    }
  }

  // Atualizar responsáveis do fluxo
  async updateFluxoResponsibles(id, responsaveis) {
    try {
      const response = await fluxosAPI.updateResponsibles(id, responsaveis)

      // Atualizar fluxo atual se for o mesmo
      if (this.currentFluxo && this.currentFluxo.id === id) {
        this.currentFluxo.responsaveis = response.data.responsaveis
      }

      return {
        success: true,
        data: response.data,
        message: 'Responsáveis do fluxo atualizados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao atualizar responsáveis do fluxo',
      }
    }
  }

  // Obter documentos em execução do fluxo
  async getRunningDocuments(id, params = {}) {
    try {
      const response = await fluxosAPI.getRunningDocuments(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar documentos em execução',
      }
    }
  }

  // Obter histórico de execuções do fluxo
  async getExecutionHistory(id, params = {}) {
    try {
      const response = await fluxosAPI.getExecutionHistory(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar histórico de execuções',
      }
    }
  }

  // Iniciar execução do fluxo para um documento
  async startExecution(id, documentoId) {
    try {
      const response = await fluxosAPI.startExecution(id, documentoId)
      return {
        success: true,
        data: response.data,
        message: 'Execução do fluxo iniciada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao iniciar execução do fluxo',
      }
    }
  }

  // Pausar execução do fluxo
  async pauseExecution(id, documentoId) {
    try {
      const response = await fluxosAPI.pauseExecution(id, documentoId)
      return {
        success: true,
        data: response.data,
        message: 'Execução do fluxo pausada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao pausar execução do fluxo',
      }
    }
  }

  // Retomar execução do fluxo
  async resumeExecution(id, documentoId) {
    try {
      const response = await fluxosAPI.resumeExecution(id, documentoId)
      return {
        success: true,
        data: response.data,
        message: 'Execução do fluxo retomada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao retomar execução do fluxo',
      }
    }
  }

  // Cancelar execução do fluxo
  async cancelExecution(id, documentoId, motivo) {
    try {
      const response = await fluxosAPI.cancelExecution(id, documentoId, motivo)
      return {
        success: true,
        data: response.data,
        message: 'Execução do fluxo cancelada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao cancelar execução do fluxo',
      }
    }
  }

  // Validar fluxo
  validateFluxo(fluxoData) {
    const errors = []

    if (!fluxoData.nome || fluxoData.nome.trim() === '') {
      errors.push('Nome do fluxo é obrigatório')
    }

    if (!fluxoData.descricao || fluxoData.descricao.trim() === '') {
      errors.push('Descrição do fluxo é obrigatória')
    }

    if (fluxoData.nome && fluxoData.nome.length > 100) {
      errors.push('Nome do fluxo deve ter no máximo 100 caracteres')
    }

    if (fluxoData.etapas && fluxoData.etapas.length === 0) {
      errors.push('Fluxo deve ter pelo menos uma etapa')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Criar etapa padrão
  createDefaultStep() {
    return {
      id: Date.now(),
      nome: '',
      descricao: '',
      tipo: 'aprovacao',
      obrigatoria: true,
      prazo: 0,
      responsaveis: [],
      condicoes: [],
      acoes: [],
      ordem: 0,
    }
  }

  // Validar etapa
  validateStep(etapa) {
    const errors = []

    if (!etapa.nome || etapa.nome.trim() === '') {
      errors.push('Nome da etapa é obrigatório')
    }

    if (!etapa.tipo || etapa.tipo.trim() === '') {
      errors.push('Tipo da etapa é obrigatório')
    }

    if (!etapa.responsaveis || etapa.responsaveis.length === 0) {
      errors.push('Etapa deve ter pelo menos um responsável')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Filtrar fluxos ativos
  getActiveFluxos() {
    return this.fluxos.filter(fluxo => fluxo.ativo)
  }

  // Filtrar fluxos inativos
  getInactiveFluxos() {
    return this.fluxos.filter(fluxo => !fluxo.ativo)
  }

  // Buscar fluxo por nome
  findByName(nome) {
    return this.fluxos.find(
      fluxo => fluxo.nome.toLowerCase() === nome.toLowerCase()
    )
  }

  // Verificar se fluxo existe
  exists(nome) {
    return this.findByName(nome) !== undefined
  }

  // Getters
  getAllFluxos() {
    return this.fluxos
  }

  getCurrentFluxo() {
    return this.currentFluxo
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }

  getExecucoes() {
    return this.execucoes
  }
}

// Instância singleton
const fluxoService = new FluxoService()

export default fluxoService

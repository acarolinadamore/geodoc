import { modelosAPI } from '@/api/modelos'

class ModeloService {
  constructor() {
    this.modelos = []
    this.loading = false
    this.error = null
    this.categorias = []
    this.currentModelo = null
  }

  // Listar todos os modelos
  async getModelos(params = {}) {
    this.loading = true
    this.error = null

    try {
      const response = await modelosAPI.getAll(params)
      this.modelos = response.data

      return {
        success: true,
        data: this.modelos,
      }
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao buscar modelos'
      return {
        success: false,
        error: this.error,
      }
    } finally {
      this.loading = false
    }
  }

  // Buscar modelo por ID
  async getModeloById(id) {
    try {
      const response = await modelosAPI.getById(id)
      this.currentModelo = response.data
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar modelo',
      }
    }
  }

  // Criar novo modelo
  async createModelo(modeloData) {
    try {
      const validation = this.validateModelo(modeloData)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await modelosAPI.create(modeloData)

      // Adicionar à lista local
      this.modelos.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Modelo criado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar modelo',
      }
    }
  }

  // Atualizar modelo
  async updateModelo(id, modeloData) {
    try {
      const validation = this.validateModelo(modeloData)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        }
      }

      const response = await modelosAPI.update(id, modeloData)

      // Atualizar na lista local
      const index = this.modelos.findIndex(modelo => modelo.id === id)
      if (index !== -1) {
        this.modelos[index] = response.data
      }

      // Atualizar modelo atual se for o mesmo
      if (this.currentModelo && this.currentModelo.id === id) {
        this.currentModelo = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Modelo atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao atualizar modelo',
      }
    }
  }

  // Deletar modelo
  async deleteModelo(id) {
    try {
      await modelosAPI.delete(id)

      // Remover da lista local
      this.modelos = this.modelos.filter(modelo => modelo.id !== id)

      // Limpar modelo atual se for o mesmo
      if (this.currentModelo && this.currentModelo.id === id) {
        this.currentModelo = null
      }

      return {
        success: true,
        message: 'Modelo excluído com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir modelo',
      }
    }
  }

  // Buscar modelos
  async searchModelos(query) {
    try {
      const response = await modelosAPI.search(query)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar modelos',
      }
    }
  }

  // Listar modelos por categoria
  async getModelosByCategory(categoria) {
    try {
      const response = await modelosAPI.getByCategory(categoria)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar modelos por categoria',
      }
    }
  }

  // Duplicar modelo
  async duplicateModelo(id) {
    try {
      const response = await modelosAPI.duplicate(id)

      // Adicionar à lista local
      this.modelos.push(response.data)

      return {
        success: true,
        data: response.data,
        message: 'Modelo duplicado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao duplicar modelo',
      }
    }
  }

  // Ativar/desativar modelo
  async toggleModeloStatus(id) {
    try {
      const response = await modelosAPI.toggleStatus(id)

      // Atualizar na lista local
      const index = this.modelos.findIndex(modelo => modelo.id === id)
      if (index !== -1) {
        this.modelos[index] = response.data
      }

      return {
        success: true,
        data: response.data,
        message: `Modelo ${
          response.data.ativo ? 'ativado' : 'desativado'
        } com sucesso`,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao alterar status do modelo',
      }
    }
  }

  // Obter campos do modelo
  async getModeloFields(id) {
    try {
      const response = await modelosAPI.getFields(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar campos do modelo',
      }
    }
  }

  // Atualizar campos do modelo
  async updateModeloFields(id, campos) {
    try {
      const response = await modelosAPI.updateFields(id, campos)

      // Atualizar modelo atual se for o mesmo
      if (this.currentModelo && this.currentModelo.id === id) {
        this.currentModelo.campos = response.data.campos
      }

      return {
        success: true,
        data: response.data,
        message: 'Campos do modelo atualizados com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao atualizar campos do modelo',
      }
    }
  }

  // Obter template do modelo
  async getModeloTemplate(id) {
    try {
      const response = await modelosAPI.getTemplate(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar template do modelo',
      }
    }
  }

  // Atualizar template do modelo
  async updateModeloTemplate(id, template) {
    try {
      const response = await modelosAPI.updateTemplate(id, template)

      // Atualizar modelo atual se for o mesmo
      if (this.currentModelo && this.currentModelo.id === id) {
        this.currentModelo.template = response.data.template
      }

      return {
        success: true,
        data: response.data,
        message: 'Template do modelo atualizado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao atualizar template do modelo',
      }
    }
  }

  // Obter versões do modelo
  async getModeloVersions(id) {
    try {
      const response = await modelosAPI.getVersions(id)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar versões do modelo',
      }
    }
  }

  // Criar nova versão do modelo
  async createModeloVersion(id, versionData) {
    try {
      const response = await modelosAPI.createVersion(id, versionData)
      return {
        success: true,
        data: response.data,
        message: 'Nova versão do modelo criada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao criar versão do modelo',
      }
    }
  }

  // Restaurar versão específica
  async restoreModeloVersion(id, versionId) {
    try {
      const response = await modelosAPI.restoreVersion(id, versionId)

      // Atualizar na lista local
      const index = this.modelos.findIndex(modelo => modelo.id === id)
      if (index !== -1) {
        this.modelos[index] = response.data
      }

      // Atualizar modelo atual se for o mesmo
      if (this.currentModelo && this.currentModelo.id === id) {
        this.currentModelo = response.data
      }

      return {
        success: true,
        data: response.data,
        message: 'Versão do modelo restaurada com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao restaurar versão do modelo',
      }
    }
  }

  // Listar documentos criados a partir do modelo
  async getModeloDocuments(id, params = {}) {
    try {
      const response = await modelosAPI.getDocuments(id, params)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar documentos do modelo',
      }
    }
  }

  // Validar modelo
  validateModelo(modeloData) {
    const errors = []

    if (!modeloData.nome || modeloData.nome.trim() === '') {
      errors.push('Nome do modelo é obrigatório')
    }

    if (!modeloData.descricao || modeloData.descricao.trim() === '') {
      errors.push('Descrição do modelo é obrigatória')
    }

    if (modeloData.nome && modeloData.nome.length > 100) {
      errors.push('Nome do modelo deve ter no máximo 100 caracteres')
    }

    if (modeloData.descricao && modeloData.descricao.length > 500) {
      errors.push('Descrição do modelo deve ter no máximo 500 caracteres')
    }

    if (modeloData.campos && !Array.isArray(modeloData.campos)) {
      errors.push('Campos do modelo devem ser um array')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Obter categorias únicas
  getCategorias() {
    const categorias = [
      ...new Set(this.modelos.map(m => m.categoria).filter(Boolean)),
    ]
    return categorias.sort()
  }

  // Filtrar modelos por categoria
  filterByCategory(categoria) {
    if (!categoria) return this.modelos
    return this.modelos.filter(modelo => modelo.categoria === categoria)
  }

  // Filtrar modelos ativos
  getActiveModelos() {
    return this.modelos.filter(modelo => modelo.ativo)
  }

  // Filtrar modelos inativos
  getInactiveModelos() {
    return this.modelos.filter(modelo => !modelo.ativo)
  }

  // Obter modelos mais usados
  getMostUsed(limit = 10) {
    return this.modelos
      .sort((a, b) => (b.uso_count || 0) - (a.uso_count || 0))
      .slice(0, limit)
  }

  // Buscar modelo por nome
  findByName(nome) {
    return this.modelos.find(
      modelo => modelo.nome.toLowerCase() === nome.toLowerCase()
    )
  }

  // Verificar se modelo existe
  exists(nome) {
    return this.findByName(nome) !== undefined
  }

  // Criar campo padrão
  createDefaultField(tipo = 'text') {
    return {
      id: Date.now(),
      nome: '',
      label: '',
      tipo: tipo,
      obrigatorio: false,
      placeholder: '',
      opcoes: [],
      validacao: {},
      ordem: 0,
    }
  }

  // Validar campo
  validateField(campo) {
    const errors = []

    if (!campo.nome || campo.nome.trim() === '') {
      errors.push('Nome do campo é obrigatório')
    }

    if (!campo.label || campo.label.trim() === '') {
      errors.push('Label do campo é obrigatório')
    }

    if (!campo.tipo || campo.tipo.trim() === '') {
      errors.push('Tipo do campo é obrigatório')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Getters
  getAllModelos() {
    return this.modelos
  }

  getCurrentModelo() {
    return this.currentModelo
  }

  getLoading() {
    return this.loading
  }

  getError() {
    return this.error
  }
}

// Instância singleton
const modeloService = new ModeloService()

export default modeloService

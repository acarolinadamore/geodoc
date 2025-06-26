// src/mocks/transformers/caixaEntradaTransformer.js

import {
  modelosDocumento,
  fluxosVersao,
  fluxoVersaoEtapas,
} from '../data/modelos.js'

// ========================================
// TRANSFORMER: DADOS LEGADO → UI
// Converte dados do formato do sistema legado para o formato da UI
// ========================================

class CaixaEntradaTransformer {
  /**
   * Transforma documento + andamento em card para UI
   */
  async transformarParaCard(documento, andamento, usuarios = []) {
    try {
      console.log('🔄 Transformando documento:', documento.id, documento.titulo)

      // Buscar dados relacionados
      const modelo = this.buscarModelo(documento.modelo_documento_id)
      const remetente = this.buscarUsuario(documento.usuario_id, usuarios)
      const responsavelAtual = andamento
        ? this.buscarUsuario(andamento.usuario_id, usuarios)
        : remetente

      console.log('📋 Modelo encontrado:', modelo)
      console.log('👤 Remetente encontrado:', remetente)

      // Determinar status baseado no andamento
      const status = this.determinarStatus(documento, andamento)

      // Calcular vencimento
      const vencimento = this.calcularVencimento(documento, andamento)

      // Determinar marcadores
      const marcadores = this.determinarMarcadores(
        documento,
        andamento,
        vencimento
      )

      // Montar card no formato da UI
      const card = {
        id: `card_${documento.id}`,

        // Remetente
        remetente: {
          id: remetente?.id || documento.usuario_id,
          nome: remetente?.nome || 'Usuário Desconhecido',
          funcao: remetente?.funcao || 'Função não informada',
          avatar: remetente?.avatar || null,
          setor: remetente?.setor || 'GERAL',
        },

        // Responsável atual
        responsavelAtual: {
          id: responsavelAtual?.id || andamento?.usuario_id,
          nome: responsavelAtual?.nome || 'Não atribuído',
          setor: responsavelAtual?.setor || 'GERAL',
        },

        // Documento
        documento: {
          id: documento.id,
          titulo: documento.titulo || `Documento ${documento.id}`,
          modelo: modelo?.nome || 'Modelo não encontrado',
          modeloId: documento.modelo_documento_id,
          status: status,
          dataInicio: this.formatarDataISO(documento.created_at),
          fluxo: this.obterNomeFluxo(documento.fluxo_versao_atual_id),
          fluxoIniciado: !!documento.fluxo_versao_atual_id,
          etapaAtual: this.obterNomeEtapa(
            documento.fluxo_versao_etapa_atual_id
          ),
          dirPath: documento.arquivo?.caminho || null,
          arquivo: documento.arquivo || null,
        },

        // Vencimento
        vencimento: vencimento,

        // Âncora (dados específicos do modelo)
        ancora: this.extrairAncora(documento, modelo),

        // ✅ ADICIONADO - Ações do card
        acoes: this.obterAcoesCard(documento, andamento, status),

        // Marcadores e classificações
        marcadores: marcadores,
        tipo: this.determinarTipo(documento, andamento),
        prioridade: this.determinarPrioridade(documento, vencimento),

        // Metadados
        dataUltimaAtualizacao: andamento?.updated_at || documento.updated_at,
        lido: andamento?.lido === 'S',

        // Dados originais (para debug/referência)
        _documento: documento,
        _andamento: andamento,
      }

      console.log('✅ Card transformado:', card)
      return card
    } catch (error) {
      console.error('❌ Erro ao transformar documento em card:', error)
      return this.criarCardErro(documento, error)
    }
  }

  // ========================================
  // MÉTODOS AUXILIARES
  // ========================================

  buscarModelo(modeloId) {
    return modelosDocumento.find(m => m.id === modeloId)
  }

  buscarUsuario(usuarioId, usuarios) {
    return usuarios.find(u => u.id === usuarioId)
  }

  determinarStatus(documento, andamento) {
    if (!andamento) return 'rascunho'

    switch (andamento.acao) {
      case 'A':
        return 'aprovado'
      case 'R':
        return 'rejeitado'
      case 'C':
        return 'cancelado'
      case null:
        return 'pendente'
      default:
        return 'em_andamento'
    }
  }

  calcularVencimento(documento) {
    // Lógica baseada nos dados do documento
    const dataInicio = new Date(documento.created_at)
    const diasParaVencer = 7 // Padrão: 7 dias

    const dataVencimento = new Date(dataInicio)
    dataVencimento.setDate(dataVencimento.getDate() + diasParaVencer)

    const agora = new Date()
    const diffTime = dataVencimento - agora
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let status = 'no_prazo'
    if (diffDays < 0) status = 'vencido'
    else if (diffDays <= 2) status = 'vencendo'

    return {
      data: this.formatarDataBR(dataVencimento),
      status: status,
      diasRestantes: diffDays,
      urgente: diffDays <= 1,
    }
  }

  determinarMarcadores(documento, andamento, vencimento) {
    const marcadores = []

    // Baseado no vencimento
    if (vencimento.status === 'vencido') marcadores.push('vencido')
    if (vencimento.urgente) marcadores.push('urgente')

    // Baseado no status
    if (andamento?.acao === null) marcadores.push('pendente')
    if (documento.situacao === 0) marcadores.push('a-configurar')

    // Baseado no modelo
    const modelo = this.buscarModelo(documento.modelo_documento_id)
    if (modelo?.nome.includes('Conciliação')) marcadores.push('financeiro')
    if (modelo?.nome.includes('Auditoria')) marcadores.push('qualidade')

    return marcadores
  }

  determinarTipo(documento, andamento) {
    // Usar andamento para determinar tipo do card
    if (!andamento) return 'rascunho'

    // Verificar ação do andamento
    if (andamento.acao === null) return 'pendente'
    if (andamento.acao === 'A') return 'aprovado'
    if (andamento.acao === 'R') return 'rejeitado'
    if (andamento.acao === 'C') return 'cancelado'

    // Verificar se é lembrete baseado no andamento
    if (
      andamento.observacao &&
      andamento.observacao.toLowerCase().includes('lembrete')
    ) {
      return 'lembrete'
    }

    // Verificar situação do documento
    if (documento.situacao === 0) return 'configurar'

    return 'documento'
  }

  determinarPrioridade(documento, vencimento) {
    if (vencimento.status === 'vencido') return 'alta'
    if (vencimento.urgente) return 'media'
    return 'normal'
  }

  // ✅ NOVO MÉTODO - Obter ações do card
  obterAcoesCard(documento, andamento, status) {
    const acoes = []

    // Ações baseadas no status
    if (status === 'pendente') {
      acoes.push('Aprovar', 'Rejeitar')
    } else if (status === 'rejeitado') {
      acoes.push('Revisar', 'Reenviar')
    } else if (status === 'rascunho') {
      acoes.push('Configurar', 'Excluir')
    } else {
      acoes.push('Visualizar', 'Editar')
    }

    // Ação sempre disponível
    acoes.push('Detalhes')

    return acoes
  }

  obterNomeFluxo(fluxoVersaoId) {
    if (!fluxoVersaoId) return null
    const fluxoVersao = fluxosVersao.find(fv => fv.id === fluxoVersaoId)
    return fluxoVersao?.fluxo?.nome || `Fluxo ${fluxoVersaoId}`
  }

  obterNomeEtapa(etapaId) {
    if (!etapaId) return null
    const etapa = fluxoVersaoEtapas.find(e => e.id === etapaId)
    return etapa?.nome || `Etapa ${etapaId}`
  }

  extrairAncora(documento, modelo) {
    // Extrai dados específicos baseados no modelo
    const ancora = {
      modelo: modelo?.nome || 'Modelo não encontrado', // ✅ ADICIONADO
      projeto: documento.projeto || 'Projeto não informado',
      prestadorServico: documento.prestador_servico || 'Não informado',
      unidade: documento.unidade || 'Não informado',
      valor: documento.valor || null,
      dataPagamento: documento.data_pagamento
        ? this.formatarDataBR(documento.data_pagamento)
        : 'Não informado',
    }

    // Dados específicos por modelo
    if (modelo?.nome.includes('Conciliação')) {
      ancora.banco = documento.banco || 'Não informado'
      ancora.conta = documento.conta || 'Não informado'
      ancora.periodo = documento.periodo || 'Não informado'
    }

    if (modelo?.nome.includes('Orçamento')) {
      ancora.fornecedor = documento.fornecedor || 'Não informado'
      ancora.categoria = documento.categoria || 'Não informado'
    }

    return ancora
  }

  formatarDataISO(dataString) {
    if (!dataString) return null
    return new Date(dataString).toISOString()
  }

  formatarDataBR(data) {
    if (!data) return null

    const dataObj = typeof data === 'string' ? new Date(data) : data
    const dia = String(dataObj.getDate()).padStart(2, '0')
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0')
    const ano = dataObj.getFullYear()

    return `${dia}/${mes}/${ano}`
  }

  criarCardErro(documento, error) {
    return {
      id: `card_error_${documento.id}`,
      remetente: {
        id: documento.usuario_id,
        nome: 'Erro ao carregar',
        funcao: 'Erro',
        avatar: null,
        setor: 'ERRO',
      },
      responsavelAtual: {
        id: null,
        nome: 'Erro',
        setor: 'ERRO',
      },
      documento: {
        id: documento.id,
        titulo: `Erro: ${documento.titulo || documento.id}`,
        modelo: 'Erro ao carregar modelo',
        modeloId: documento.modelo_documento_id,
        status: 'erro',
        dataInicio: documento.created_at,
        fluxo: null,
        fluxoIniciado: false,
        etapaAtual: null,
        dirPath: null,
        arquivo: null,
      },
      vencimento: {
        data: null,
        status: 'erro',
        diasRestantes: 0,
        urgente: false,
      },
      ancora: {
        modelo: 'Erro',
        projeto: 'Erro',
        prestadorServico: 'Erro',
        unidade: 'Erro',
        dataPagamento: 'Erro',
      },
      acoes: ['Erro'], // ✅ ADICIONADO
      marcadores: ['erro'],
      tipo: 'erro',
      prioridade: 'alta',
      dataUltimaAtualizacao: documento.updated_at,
      lido: false,
      _erro: error.message,
    }
  }
}

// ========================================
// EXPORT
// ========================================

export default new CaixaEntradaTransformer()

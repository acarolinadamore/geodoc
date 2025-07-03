// src/data/documentos.js

// ========================================
// SITUAÇÕES DO DOCUMENTO
// ========================================
export const SITUACOES = {
  AGUARDANDO: 0, // A configurar (falta definir fluxo)
  EM_FLUXO: 1, // Documento em tramitação
  FINALIZADO: 2, // Processo concluído
  CANCELADO: 3, // Processo cancelado
}

// ========================================
// DOCUMENTOS - DADOS ESSENCIAIS
// ========================================
export const documentos = [
  {
    id: 1,
    titulo: 'Solicitação de Sistema de Gestão',
    usuario_id: 'user001', // Arthur Affonso
    modelo_documento_id: 1,
    andamento_atual_id: 101,
    fluxo_versao_atual_id: 1,
    fluxo_versao_etapa_atual_id: 2,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-20T09:00:00Z',
    updated_at: '2025-06-25T14:30:00Z',
    arquivo: {
      nome: 'solicitacao-sistema-gestao.pdf',
      tamanho: '2.5MB',
      url: '/uploads/DOC-2025-001.pdf',
    },
  },

  {
    id: 2,
    titulo: 'Orçamento para Equipamentos de TI',
    usuario_id: 'user002', // Maria Silva Santos
    modelo_documento_id: 2,
    andamento_atual_id: 102,
    fluxo_versao_atual_id: null, // Documento ainda não configurado
    fluxo_versao_etapa_atual_id: null,
    situacao: SITUACOES.AGUARDANDO, // A configurar
    created_at: '2025-06-24T14:20:00Z',
    updated_at: '2025-06-24T14:20:00Z',
    arquivo: {
      nome: 'orcamento-equipamentos.xlsx',
      tamanho: '1.2MB',
      url: '/uploads/DOC-2025-002.xlsx',
    },
  },

  {
    id: 3,
    titulo: 'Relatório de Progresso Janeiro',
    usuario_id: 'user004', // Ana Paula Costa
    modelo_documento_id: 3,
    andamento_atual_id: 103,
    fluxo_versao_atual_id: 2,
    fluxo_versao_etapa_atual_id: 5,
    situacao: SITUACOES.FINALIZADO,
    created_at: '2025-06-22T10:15:00Z',
    updated_at: '2025-06-26T16:00:00Z',
    arquivo: {
      nome: 'relatorio-progresso-jan.pdf',
      tamanho: '3.1MB',
      url: '/uploads/DOC-2025-003.pdf',
    },
  },

  {
    id: 4,
    titulo: 'Auditoria de Processos Q4 2025',
    usuario_id: 'user009', // Lucas Ferreira
    modelo_documento_id: 4,
    andamento_atual_id: 104,
    fluxo_versao_atual_id: 3,
    fluxo_versao_etapa_atual_id: 3,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-18T08:30:00Z',
    updated_at: '2025-06-25T11:20:00Z',
    arquivo: {
      nome: 'auditoria-processos-q4.docx',
      tamanho: '1.8MB',
      url: '/uploads/DOC-2025-004.docx',
    },
  },

  {
    id: 5,
    titulo: 'Conciliação Bancária Janeiro',
    usuario_id: 'user005', // Fernando Santos
    modelo_documento_id: 5,
    andamento_atual_id: 105,
    fluxo_versao_atual_id: 4,
    fluxo_versao_etapa_atual_id: 4,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-25T16:45:00Z',
    updated_at: '2025-06-26T09:30:00Z',
    arquivo: {
      nome: 'conciliacao-bancaria-jan.xlsx',
      tamanho: '890KB',
      url: '/uploads/DOC-2025-005.xlsx',
    },
  },

  {
    id: 6,
    titulo: 'Solicitação de Equipamentos TI',
    usuario_id: 'user007', // João Silva
    modelo_documento_id: 2,
    andamento_atual_id: 106,
    fluxo_versao_atual_id: 5,
    fluxo_versao_etapa_atual_id: 2,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-01T11:20:00Z',
    updated_at: '2025-06-15T14:45:00Z',
    arquivo: {
      nome: 'solicitacao-equipamentos-ti.pdf',
      tamanho: '2.3MB',
      url: '/uploads/DOC-2025-006.pdf',
    },
  },

  // ✅ NOVOS DOCUMENTOS ADICIONADOS
  {
    id: 7,
    titulo: 'Solicitação de Licenças de Software',
    usuario_id: 'user003', // Carlos Roberto
    modelo_documento_id: 1, // Solicitação de Sistema de Gestão
    andamento_atual_id: 110,
    fluxo_versao_atual_id: 1,
    fluxo_versao_etapa_atual_id: 2,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-26T08:00:00Z',
    updated_at: '2025-06-26T08:30:00Z',
    arquivo: {
      nome: 'solicitacao-licencas.pdf',
      tamanho: '1.8MB',
      url: '/uploads/DOC-2025-007.pdf',
    },
  },

  {
    id: 8,
    titulo: 'Orçamento para Mobiliário',
    usuario_id: 'user004', // Ana Paula Costa
    modelo_documento_id: 2, // Solicitação de Orçamento
    andamento_atual_id: 111,
    fluxo_versao_atual_id: 5,
    fluxo_versao_etapa_atual_id: 2,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-26T09:00:00Z',
    updated_at: '2025-06-26T09:15:00Z',
    arquivo: {
      nome: 'orcamento-mobiliario.xlsx',
      tamanho: '2.2MB',
      url: '/uploads/DOC-2025-008.xlsx',
    },
  },

  {
    id: 9,
    titulo: 'Relatório de Vendas Q1',
    usuario_id: 'user005', // Fernando Santos
    modelo_documento_id: 3, // Relatório de Progresso
    andamento_atual_id: 112,
    fluxo_versao_atual_id: 2,
    fluxo_versao_etapa_atual_id: 5,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-26T10:00:00Z',
    updated_at: '2025-06-26T10:30:00Z',
    arquivo: {
      nome: 'relatorio-vendas-q1.pdf',
      tamanho: '4.1MB',
      url: '/uploads/DOC-2025-009.pdf',
    },
  },

  {
    id: 10,
    titulo: 'Auditoria de Segurança da Informação',
    usuario_id: 'user006', // Roberto Lima Costa
    modelo_documento_id: 4, // Auditoria de Processo
    andamento_atual_id: 113,
    fluxo_versao_atual_id: 3,
    fluxo_versao_etapa_atual_id: 3,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-26T11:00:00Z',
    updated_at: '2025-06-26T11:30:00Z',
    arquivo: {
      nome: 'auditoria-seguranca.docx',
      tamanho: '3.5MB',
      url: '/uploads/DOC-2025-010.docx',
    },
  },

  {
    id: 11,
    titulo: 'Conciliação Cartão de Crédito',
    usuario_id: 'user007', // João Silva
    modelo_documento_id: 5, // Conciliação Bancária
    andamento_atual_id: 114,
    fluxo_versao_atual_id: 4,
    fluxo_versao_etapa_atual_id: 4,
    situacao: SITUACOES.EM_FLUXO,
    created_at: '2025-06-26T12:00:00Z',
    updated_at: '2025-06-26T12:15:00Z',
    arquivo: {
      nome: 'conciliacao-cartao.xlsx',
      tamanho: '1.1MB',
      url: '/uploads/DOC-2025-011.xlsx',
    },
  },
]

// ========================================
// ANDAMENTOS DOS DOCUMENTOS
// ========================================
export const documentoAndamentos = [
  {
    id: 101,
    documento_id: 1,
    usuario_id: 'user008', // Patricia Mendes (responsável atual)
    fluxo_versao_etapa_id: 2,
    acao: null, // null=pendente, 'A'=aprovado, 'R'=rejeitado, 'C'=cancelado
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T14:30:00Z',
    updated_at: '2025-06-25T14:30:00Z',
  },

  {
    id: 102,
    documento_id: 2,
    usuario_id: 'user002', // Maria Silva Santos (criadora)
    fluxo_versao_etapa_id: null,
    acao: null,
    lido: 'S',
    data_hora_acao: null,
    observacao: 'Documento criado, aguardando configuração',
    created_at: '2025-06-24T14:20:00Z',
    updated_at: '2025-06-24T14:20:00Z',
  },

  {
    id: 103,
    documento_id: 3,
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 5,
    acao: 'A', // Aprovado
    lido: 'S',
    data_hora_acao: '2025-01-26T16:00:00Z',
    observacao: 'Relatório aprovado e finalizado',
    created_at: '2025-06-26T16:00:00Z',
    updated_at: '2025-06-26T16:00:00Z',
  },

  {
    id: 104,
    documento_id: 4,
    usuario_id: 'user010', // Sandra Costa
    fluxo_versao_etapa_id: 3,
    acao: 'R', // Rejeitado
    lido: 'S',
    data_hora_acao: '2025-07-25T11:20:00Z',
    observacao: 'Documentação incompleta - faltam evidências',
    created_at: '2025-06-25T11:20:00Z',
    updated_at: '2025-06-25T11:20:00Z',
  },

  {
    id: 105,
    documento_id: 5,
    usuario_id: 'user006', // Roberto Lima Costa (responsável atual)
    fluxo_versao_etapa_id: 4,
    acao: null, // Pendente
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T09:30:00Z',
    updated_at: '2025-06-26T09:30:00Z',
  },

  {
    id: 106,
    documento_id: 6,
    usuario_id: 'user005', // Fernando Santos (responsável atual)
    fluxo_versao_etapa_id: 2,
    acao: null, // Pendente há muito tempo (vencido)
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-15T14:45:00Z',
    updated_at: '2025-06-15T14:45:00Z',
  },

  // ✅ OPÇÃO 1: Mais andamentos para user008 (Patricia Mendes)
  {
    id: 107,
    documento_id: 2, // Orçamento para Equipamentos de TI
    usuario_id: 'user008', // Patricia Mendes (mesmo usuário)
    fluxo_versao_etapa_id: 1,
    acao: null, // Pendente
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T10:00:00Z',
    updated_at: '2025-06-25T10:00:00Z',
  },

  {
    id: 108,
    documento_id: 4, // Auditoria de Processos Q4 2025
    usuario_id: 'user008', // Patricia Mendes (mesmo usuário)
    fluxo_versao_etapa_id: 3,
    acao: null, // Pendente
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T11:00:00Z',
    updated_at: '2025-06-25T11:00:00Z',
  },

  {
    id: 109,
    documento_id: 5, // Conciliação Bancária Janeiro
    usuario_id: 'user008', // Patricia Mendes (mesmo usuário)
    fluxo_versao_etapa_id: 4,
    acao: null, // Pendente
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T12:00:00Z',
    updated_at: '2025-06-25T12:00:00Z',
  },

  // ✅ OPÇÃO 2: Andamentos para os novos documentos
  {
    id: 110,
    documento_id: 7, // Solicitação de Licenças de Software
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 2,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T08:30:00Z',
    updated_at: '2025-06-26T08:30:00Z',
  },

  {
    id: 111,
    documento_id: 8, // Orçamento para Mobiliário
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 2,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T09:15:00Z',
    updated_at: '2025-06-26T09:15:00Z',
  },

  {
    id: 112,
    documento_id: 9, // Relatório de Vendas Q1
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 5,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T10:30:00Z',
    updated_at: '2025-06-26T10:30:00Z',
  },

  {
    id: 113,
    documento_id: 10, // Auditoria de Segurança da Informação
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 3,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T11:30:00Z',
    updated_at: '2025-06-26T11:30:00Z',
  },

  {
    id: 114,
    documento_id: 11, // Conciliação Cartão de Crédito
    usuario_id: 'user008', // Patricia Mendes
    fluxo_versao_etapa_id: 4,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T12:15:00Z',
    updated_at: '2025-06-26T12:15:00Z',
  },
  // ✅ ADICIONE ESTES ANDAMENTOS NO FINAL DO ARRAY documentoAndamentos:

  {
    id: 115,
    documento_id: 2, // Orçamento para Equipamentos de TI
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 1,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T10:00:00Z',
    updated_at: '2025-06-25T10:00:00Z',
  },

  {
    id: 116,
    documento_id: 3, // Relatório de Progresso Janeiro
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 5,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T11:00:00Z',
    updated_at: '2025-06-25T11:00:00Z',
  },

  {
    id: 117,
    documento_id: 4, // Auditoria de Processos Q4 2025
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 3,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T12:00:00Z',
    updated_at: '2025-06-25T12:00:00Z',
  },

  {
    id: 118,
    documento_id: 5, // Conciliação Bancária Janeiro
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 4,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-25T13:00:00Z',
    updated_at: '2025-06-25T13:00:00Z',
  },

  {
    id: 119,
    documento_id: 7, // Solicitação de Licenças de Software
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 2,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T08:30:00Z',
    updated_at: '2025-06-26T08:30:00Z',
  },

  {
    id: 120,
    documento_id: 8, // Orçamento para Mobiliário
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 2,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T09:15:00Z',
    updated_at: '2025-06-26T09:15:00Z',
  },

  {
    id: 121,
    documento_id: 9, // Relatório de Vendas Q1
    usuario_id: 'user001', // Maria Silva Santos (usuário atual)
    fluxo_versao_etapa_id: 5,
    acao: null,
    lido: 'N',
    data_hora_acao: null,
    observacao: null,
    created_at: '2025-06-26T10:30:00Z',
    updated_at: '2025-06-26T10:30:00Z',
  },
]

// ========================================
// EXPORT DEFAULT
// ========================================
export default {
  documentos,
  documentoAndamentos,
  SITUACOES,
}

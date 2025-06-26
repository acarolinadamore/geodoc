// src/mocks/data/modelos.js

// ========================================
// MODELOS DE DOCUMENTO (baseado no ModeloDocumento.php)
// ========================================

export const modelosDocumento = [
  {
    id: 1,
    nome: 'Solicitação de Sistema de Gestão', // ✅ CORRIGIDO - era "Solicitação à Fábrica de Software"
    apelido: 'SOL_SISTEMA',
    paginas: 0, // Calculado dinamicamente
    tamanho: 'A4',
    orientacao: 'R', // R=Retrato, P=Paisagem
    ativo: 'S',
    regiao_flutuante: 'N',
    tem_ocr_inteligente: 'S',
    cor: '#3b82f6', // Para UI
  },

  {
    id: 2,
    nome: 'Solicitação de Orçamento',
    apelido: 'SOL_ORCAMENTO',
    paginas: 0,
    tamanho: 'A4',
    orientacao: 'R',
    ativo: 'S',
    regiao_flutuante: 'N',
    tem_ocr_inteligente: 'S',
    cor: '#10b981',
  },

  {
    id: 3,
    nome: 'Relatório de Progresso',
    apelido: 'REL_PROGRESSO',
    paginas: 0,
    tamanho: 'A4',
    orientacao: 'R',
    ativo: 'S',
    regiao_flutuante: 'N',
    tem_ocr_inteligente: 'N',
    cor: '#f59e0b',
  },

  {
    id: 4,
    nome: 'Auditoria de Processo',
    apelido: 'AUD_PROCESSO',
    paginas: 0,
    tamanho: 'A4',
    orientacao: 'R',
    ativo: 'S',
    regiao_flutuante: 'S',
    tem_ocr_inteligente: 'S',
    cor: '#ef4444',
  },

  {
    id: 5,
    nome: 'Conciliação Bancária',
    apelido: 'CONC_BANCARIA',
    paginas: 0,
    tamanho: 'A4',
    orientacao: 'P', // Paisagem para planilhas
    ativo: 'S',
    regiao_flutuante: 'N',
    tem_ocr_inteligente: 'N',
    cor: '#8b5cf6',
  },
]

// ========================================
// FLUXOS E ETAPAS (baseado no FluxoVersao.php)
// ========================================

export const fluxosVersao = [
  {
    id: 1,
    fluxo_id: 1,
    versao: '1.0',
    ativo: 'S',
    fluxo: {
      id: 1,
      nome: 'Desenvolvimento de Sistema', // ✅ CORRIGIDO - era "Desenvolvimento Interno"
      modelo_documento_id: 1,
    },
  },

  {
    id: 2,
    fluxo_id: 2,
    versao: '1.0',
    ativo: 'S',
    fluxo: {
      id: 2,
      nome: 'Acompanhamento Mensal',
      modelo_documento_id: 3,
    },
  },

  {
    id: 3,
    fluxo_id: 3,
    versao: '1.0',
    ativo: 'S',
    fluxo: {
      id: 3,
      nome: 'Auditoria Interna',
      modelo_documento_id: 4,
    },
  },

  {
    id: 4,
    fluxo_id: 4,
    versao: '1.0',
    ativo: 'S',
    fluxo: {
      id: 4,
      nome: 'Conciliação Mensal',
      modelo_documento_id: 5,
    },
  },

  {
    id: 5,
    fluxo_id: 5,
    versao: '1.0',
    ativo: 'S',
    fluxo: {
      id: 5,
      nome: 'Compras Complexas',
      modelo_documento_id: 2,
    },
  },
]

export const fluxoVersaoEtapas = [
  // Fluxo 1 - Desenvolvimento de Sistema
  { id: 1, fluxo_versao_id: 1, sequencial: 0, nome: 'Criação', prazo_dias: 1 },
  {
    id: 2,
    fluxo_versao_id: 1,
    sequencial: 1,
    nome: 'Análise Técnica',
    prazo_dias: 5,
  },
  {
    id: 3,
    fluxo_versao_id: 1,
    sequencial: 2,
    nome: 'Aprovação Gerencial',
    prazo_dias: 3,
  },
  {
    id: 4,
    fluxo_versao_id: 1,
    sequencial: 3,
    nome: 'Desenvolvimento',
    prazo_dias: 15,
  },
  {
    id: 5,
    fluxo_versao_id: 1,
    sequencial: 4,
    nome: 'Finalização',
    prazo_dias: 2,
  },

  // Fluxo 2 - Acompanhamento Mensal
  {
    id: 6,
    fluxo_versao_id: 2,
    sequencial: 0,
    nome: 'Coleta de Dados',
    prazo_dias: 3,
  },
  {
    id: 7,
    fluxo_versao_id: 2,
    sequencial: 1,
    nome: 'Análise de Indicadores',
    prazo_dias: 5,
  },
  {
    id: 8,
    fluxo_versao_id: 2,
    sequencial: 2,
    nome: 'Revisão Gerencial',
    prazo_dias: 2,
  },
  {
    id: 9,
    fluxo_versao_id: 2,
    sequencial: 3,
    nome: 'Publicação',
    prazo_dias: 1,
  },

  // Fluxo 3 - Auditoria Interna
  {
    id: 10,
    fluxo_versao_id: 3,
    sequencial: 0,
    nome: 'Planejamento',
    prazo_dias: 5,
  },
  {
    id: 11,
    fluxo_versao_id: 3,
    sequencial: 1,
    nome: 'Execução',
    prazo_dias: 10,
  },
  {
    id: 12,
    fluxo_versao_id: 3,
    sequencial: 2,
    nome: 'Relatório',
    prazo_dias: 7,
  },
  {
    id: 13,
    fluxo_versao_id: 3,
    sequencial: 3,
    nome: 'Aprovação',
    prazo_dias: 3,
  },

  // Fluxo 4 - Conciliação Mensal
  {
    id: 14,
    fluxo_versao_id: 4,
    sequencial: 0,
    nome: 'Importação de Dados',
    prazo_dias: 1,
  },
  {
    id: 15,
    fluxo_versao_id: 4,
    sequencial: 1,
    nome: 'Conciliação Automática',
    prazo_dias: 2,
  },
  {
    id: 16,
    fluxo_versao_id: 4,
    sequencial: 2,
    nome: 'Análise de Divergências',
    prazo_dias: 3,
  },
  {
    id: 17,
    fluxo_versao_id: 4,
    sequencial: 3,
    nome: 'Aprovação Final',
    prazo_dias: 2,
  },

  // Fluxo 5 - Compras Complexas
  {
    id: 18,
    fluxo_versao_id: 5,
    sequencial: 0,
    nome: 'Especificação Técnica',
    prazo_dias: 7,
  },
  {
    id: 19,
    fluxo_versao_id: 5,
    sequencial: 1,
    nome: 'Análise de Fornecedores',
    prazo_dias: 10,
  },
  {
    id: 20,
    fluxo_versao_id: 5,
    sequencial: 2,
    nome: 'Aprovação Orçamentária',
    prazo_dias: 5,
  },
  {
    id: 21,
    fluxo_versao_id: 5,
    sequencial: 3,
    nome: 'Contratação',
    prazo_dias: 3,
  },
]

export default {
  modelosDocumento,
  fluxosVersao,
  fluxoVersaoEtapas,
}

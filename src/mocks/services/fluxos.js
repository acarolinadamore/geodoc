// src/mocks/services/fluxos.js

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms))

// ========================================
// DADOS DE FLUXOS
// ========================================
const fluxos = [
  {
    id: 'fluxo001',
    nome: 'Compras Complexas',
    descricao: 'Fluxo para aprovação de compras de alto valor',
    tipo: 'financeiro',
    ativo: true,
    etapas: [
      {
        id: 'etapa001',
        nome: 'Solicitação',
        responsavel: 'SOLICITANTE',
        prazo: 1,
        ordem: 1,
      },
      {
        id: 'etapa002',
        nome: 'Análise Financeira',
        responsavel: 'FINANCEIRO',
        prazo: 3,
        ordem: 2,
      },
      {
        id: 'etapa003',
        nome: 'Aprovação Gerencial',
        responsavel: 'GERENCIA',
        prazo: 2,
        ordem: 3,
      },
    ],
  },
  {
    id: 'fluxo002',
    nome: 'Aprovação Jurídica',
    descricao: 'Fluxo para análise e aprovação de documentos jurídicos',
    tipo: 'juridico',
    ativo: true,
    etapas: [
      {
        id: 'etapa004',
        nome: 'Recebimento',
        responsavel: 'JURIDICO',
        prazo: 1,
        ordem: 1,
      },
      {
        id: 'etapa005',
        nome: 'Análise Jurídica',
        responsavel: 'JURIDICO',
        prazo: 5,
        ordem: 2,
      },
      {
        id: 'etapa006',
        nome: 'Aprovação Final',
        responsavel: 'DIRETORIA',
        prazo: 2,
        ordem: 3,
      },
    ],
  },
  {
    id: 'fluxo003',
    nome: 'Gestão de Projetos',
    descricao: 'Fluxo para acompanhamento de projetos',
    tipo: 'projetos',
    ativo: true,
    etapas: [
      {
        id: 'etapa007',
        nome: 'Planejamento',
        responsavel: 'PROJETOS',
        prazo: 3,
        ordem: 1,
      },
      {
        id: 'etapa008',
        nome: 'Execução',
        responsavel: 'PROJETOS',
        prazo: 15,
        ordem: 2,
      },
      {
        id: 'etapa009',
        nome: 'Entrega',
        responsavel: 'PROJETOS',
        prazo: 2,
        ordem: 3,
      },
    ],
  },
]

// ========================================
// FUNÇÕES DE SERVIÇO
// ========================================

export const getFluxos = async () => {
  await delay(200)
  console.log('🔄 Mock Fluxos: Carregando fluxos...', fluxos.length)
  return [...fluxos]
}

export const getFluxoById = async id => {
  await delay(100)
  const fluxo = fluxos.find(f => f.id === id)
  console.log('🔍 Mock Fluxos: Buscando fluxo', id, fluxo ? '✅' : '❌')
  return fluxo
}

export const getFluxosPorTipo = async tipo => {
  await delay(150)
  const fluxosFiltrados = fluxos.filter(f => f.tipo === tipo && f.ativo)
  console.log(
    '🔄 Mock Fluxos: Fluxos do tipo',
    tipo,
    '-',
    fluxosFiltrados.length
  )
  return fluxosFiltrados
}

export const associarFluxoAoDocumento = async (documentoId, fluxoId) => {
  await delay(300)
  console.log(
    '🔗 Mock Fluxos: Associando fluxo',
    fluxoId,
    'ao documento',
    documentoId
  )

  // Aqui você atualizaria o documento no mock de caixa-entrada
  // Por agora, apenas simula sucesso
  return {
    success: true,
    message: 'Fluxo associado com sucesso!',
    fluxoId,
    documentoId,
  }
}

export default {
  getFluxos,
  getFluxoById,
  getFluxosPorTipo,
  associarFluxoAoDocumento,
}

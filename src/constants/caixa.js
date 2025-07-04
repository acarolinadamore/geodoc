// constants/caixa.js
export const TIPOS_CAIXA = [
  {
    id: 'todos',
    label: 'Todos',
    titulo: 'Caixa de Entrada',
  },
  {
    id: 'a-configurar',
    label: 'A Configurar',
    titulo: 'A Configurar',
  },
  {
    id: 'recebidos',
    label: 'Recebidos',
    titulo: 'Recebidos',
  },
  {
    id: 'solicitados',
    label: 'Solicitados',
    titulo: 'Solicitados',
  },
  {
    id: 'agendamentos',
    label: 'Pré-agendamento',
    titulo: 'Pré-agendamento',
  },
]

export const TIPOS_ORDENACAO = [
  { value: 'modelos', label: 'Por Modelo' },
  { value: 'data-asc', label: 'Data Crescente' },
  { value: 'data-desc', label: 'Data Decrescente' },
  { value: 'nome-asc', label: 'Nome A-Z' },
  { value: 'nome-desc', label: 'Nome Z-A' },
]

export const ACOES_LOTE = {
  ATRIBUIR: 'atribuir',
  ATRIBUIR_A_MIM: 'atribuir-a-mim',
  APROVAR: 'aprovar',
  REPROVAR: 'reprovar',
  AGRUPAR: 'agrupar',
  ARQUIVAR: 'arquivar',
}

export const ESTADOS_DOCUMENTO = {
  PENDENTE: 'pendente',
  EM_ANDAMENTO: 'em-andamento',
  APROVADO: 'aprovado',
  REPROVADO: 'reprovado',
  ARQUIVADO: 'arquivado',
}

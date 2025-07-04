// composables/useCoresModelo.js
import { computed } from 'vue'

export function useCoresModelo() {
  // Mapeamento central das cores por modelo
  // Quando houver backend, isso virá da API
  const coresModelos = {
    // Mapeamento por ID (usado nos filtros)
    'solicitacao-fabrica-software': '#10b981', // Verde
    'solicitacao-orcamento': '#f59e0b', // Laranja
    'relatorio-progresso': '#8b5cf6', // Roxo
    'auditoria-processo': '#ef4444', // Vermelho
    'conciliacao-bancaria': '#06b6d4', // Turquesa
    'folha-de-pagamento': '#f97316', // Laranja escuro

    // Mapeamento por nome completo (usado nos cards)
    'Solicitação à Fábrica de Software': '#10b981', // Verde
    'Solicitação de Orçamento': '#f59e0b', // Laranja
    'Relatório de Progresso': '#8b5cf6', // Roxo
    'Auditoria de Processo': '#ef4444', // Vermelho
    'Conciliação Bancária': '#06b6d4', // Turquesa
    'Folha de Pagamento': '#f97316', // Laranja escuro

    // Mapeamento adicional para possíveis variações
    'Solicitação de Sistema de Gestão': '#10b981', // Verde (mesmo que Fábrica de Software)
  }

  // Cor padrão para modelos não mapeados
  const corPadrao = '#6b7280' // Cinza

  // Função para obter cor por ID ou nome
  const obterCorModelo = identificador => {
    if (!identificador) return corPadrao

    // Tenta buscar por ID primeiro, depois por nome
    return coresModelos[identificador] || corPadrao
  }

  // Função para obter iniciais do modelo
  const obterIniciaisModelo = modelo => {
    if (!modelo || typeof modelo !== 'string') return 'SM'

    return modelo
      .split(' ')
      .map(palavra => palavra.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Função para mapear ID para nome completo
  const mapearIdParaNome = id => {
    const mapeamento = {
      'solicitacao-fabrica-software': 'Solicitação à Fábrica de Software',
      'solicitacao-orcamento': 'Solicitação de Orçamento',
      'relatorio-progresso': 'Relatório de Progresso',
      'auditoria-processo': 'Auditoria de Processo',
      'conciliacao-bancaria': 'Conciliação Bancária',
      'folha-de-pagamento': 'Folha de Pagamento',
    }

    return mapeamento[id] || id
  }

  // Função para mapear nome para ID
  const mapearNomeParaId = nome => {
    const mapeamento = {
      'Solicitação à Fábrica de Software': 'solicitacao-fabrica-software',
      'Solicitação de Orçamento': 'solicitacao-orcamento',
      'Relatório de Progresso': 'relatorio-progresso',
      'Auditoria de Processo': 'auditoria-processo',
      'Conciliação Bancária': 'conciliacao-bancaria',
      'Folha de Pagamento': 'folha-de-pagamento',
      'Solicitação de Sistema de Gestão': 'solicitacao-fabrica-software', // Alias
    }

    return mapeamento[nome] || nome
  }

  // Lista de todos os modelos com suas informações
  const modelosDisponiveis = computed(() => [
    {
      id: 'solicitacao-fabrica-software',
      nome: 'Solicitação à Fábrica de Software',
      cor: '#10b981',
      iniciais: 'SF',
    },
    {
      id: 'solicitacao-orcamento',
      nome: 'Solicitação de Orçamento',
      cor: '#f59e0b',
      iniciais: 'SO',
    },
    {
      id: 'relatorio-progresso',
      nome: 'Relatório de Progresso',
      cor: '#8b5cf6',
      iniciais: 'RP',
    },
    {
      id: 'auditoria-processo',
      nome: 'Auditoria de Processo',
      cor: '#ef4444',
      iniciais: 'AP',
    },
    {
      id: 'conciliacao-bancaria',
      nome: 'Conciliação Bancária',
      cor: '#06b6d4',
      iniciais: 'CB',
    },
    {
      id: 'folha-de-pagamento',
      nome: 'Folha de Pagamento',
      cor: '#f97316',
      iniciais: 'FP',
    },
  ])

  return {
    obterCorModelo,
    obterIniciaisModelo,
    mapearIdParaNome,
    mapearNomeParaId,
    modelosDisponiveis,
    corPadrao,
  }
}

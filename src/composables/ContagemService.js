// composables/ContagemService.js

// Dados mock organizados por tipo de caixa e modelo
// CORRIGIDO para ser consistente com os dados do cardService
var DADOS_MOCK = {
  tipoCaixa: {
    todos: 12,
    'a-configurar': 2,
    recebidos: 6,
    solicitados: 3,
    agendamentos: 1,
    urgente: 0,
    importante: 0,
    revisao: 0,
  },
  modelosPorTipo: {
    todos: {
      todos: 12,
      'solicitacao-fabrica-software': 4,
      'solicitacao-orcamento': 2,
      'relatorio-progresso': 3,
      'auditoria-processo': 2,
      'conciliacao-bancaria': 2,
      'folha-de-pagamento': 1,
    },
    'a-configurar': {
      todos: 2,
      'auditoria-processo': 2,
      'solicitacao-fabrica-software': 0,
      'solicitacao-orcamento': 0,
      'relatorio-progresso': 0,
      'conciliacao-bancaria': 0,
      'folha-de-pagamento': 0,
    },
    recebidos: {
      todos: 6,
      'solicitacao-fabrica-software': 4,
      'conciliacao-bancaria': 2,
      'auditoria-processo': 0,
      'solicitacao-orcamento': 0,
      'relatorio-progresso': 0,
      'folha-de-pagamento': 0,
    },
    solicitados: {
      todos: 3,
      'relatorio-progresso': 3,
      'solicitacao-orcamento': 0,
      'conciliacao-bancaria': 0,
      'solicitacao-fabrica-software': 0,
      'auditoria-processo': 0,
      'folha-de-pagamento': 0,
    },
    agendamentos: {
      todos: 1,
      'folha-de-pagamento': 1,
      'solicitacao-fabrica-software': 0,
      'solicitacao-orcamento': 0,
      'auditoria-processo': 0,
      'conciliacao-bancaria': 0,
      'relatorio-progresso': 0,
    },
    urgente: {
      todos: 0,
    },
    importante: {
      todos: 0,
    },
    revisao: {
      todos: 0,
    },
  },
}

/**
 * Obtém contagem de documentos por tipo de caixa
 * @returns {Promise<Object>} Objeto com contagens por tipo
 */
function obterContagemPorTipo() {
  console.log('📊 ContagemService: Obtendo contagem por tipo de caixa...')

  return new Promise(function (resolve) {
    setTimeout(function () {
      var resultado = Object.assign({}, DADOS_MOCK.tipoCaixa)
      console.log('✅ ContagemService: Contagem por tipo obtida:', resultado)
      resolve(resultado)
    }, 150)
  })
}

/**
 * Obtém contagem de documentos por modelo para um tipo específico
 * @param {string} tipoCaixa - Tipo da caixa (todos, a-configurar, etc.)
 * @returns {Promise<Object>} Objeto com contagens por modelo
 */
function obterContagemModelosPorTipo(tipoCaixa) {
  console.log(
    '📊 ContagemService: Obtendo contagem de modelos para tipo "' +
      tipoCaixa +
      '"...'
  )

  return new Promise(function (resolve) {
    setTimeout(function () {
      var dadosModelos = DADOS_MOCK.modelosPorTipo[tipoCaixa]
      var resultado = dadosModelos
        ? Object.assign({}, dadosModelos)
        : { todos: 0 }
      console.log(
        '✅ ContagemService: Contagem de modelos para "' + tipoCaixa + '":',
        resultado
      )
      resolve(resultado)
    }, 100)
  })
}

/**
 * Atualiza contagem após ação (enviar, aprovar, etc.)
 * @param {string} acao - Tipo da ação realizada
 * @param {Array} documentosIds - IDs dos documentos afetados
 * @param {Object} parametros - Parâmetros adicionais da ação
 * @returns {Promise<boolean>} Sucesso da operação
 */
function atualizarContagemAposAcao(acao, documentosIds, parametros) {
  if (!parametros) parametros = {}

  console.log(
    '🔄 ContagemService: Atualizando contagem após ação "' + acao + '"',
    {
      documentos: documentosIds.length,
      parametros: parametros,
    }
  )

  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('✅ ContagemService: Contagem atualizada com sucesso')
      resolve(true)
    }, 200)
  })
}

/**
 * Método para futuro uso com backend real
 * Sincroniza contagens com o servidor
 * @returns {Promise<Object>} Contagens atualizadas
 */
function sincronizarComServidor() {
  console.log('🔄 ContagemService: Sincronizando contagens com servidor...')

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        obterContagemPorTipo()
          .then(function (tipoCaixa) {
            var resultado = {
              tipoCaixa: tipoCaixa,
              timestamp: new Date().toISOString(),
            }
            console.log('✅ ContagemService: Sincronização concluída')
            resolve(resultado)
          })
          .catch(reject)
      } catch (error) {
        console.error('❌ ContagemService: Erro na sincronização:', error)
        reject(error)
      }
    }, 300)
  })
}

/**
 * Adiciona marcador personalizado e atualiza contagens
 * @param {Object} marcador - Dados do marcador
 * @returns {Promise<boolean>} Sucesso da operação
 */
function adicionarMarcadorPersonalizado(marcador) {
  console.log(
    '📁 ContagemService: Adicionando marcador personalizado:',
    marcador.label
  )

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        DADOS_MOCK.tipoCaixa[marcador.id] = 0
        DADOS_MOCK.modelosPorTipo[marcador.id] = { todos: 0 }
        console.log('✅ ContagemService: Marcador personalizado adicionado')
        resolve(true)
      } catch (error) {
        console.error('❌ ContagemService: Erro ao adicionar marcador:', error)
        reject(error)
      }
    }, 200)
  })
}

/**
 * Remove marcador personalizado e limpa contagens
 * @param {string} marcadorId - ID do marcador a remover
 * @returns {Promise<boolean>} Sucesso da operação
 */
function removerMarcadorPersonalizado(marcadorId) {
  console.log(
    '🗑️ ContagemService: Removendo marcador personalizado: ' + marcadorId
  )

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        delete DADOS_MOCK.tipoCaixa[marcadorId]
        delete DADOS_MOCK.modelosPorTipo[marcadorId]
        console.log('✅ ContagemService: Marcador personalizado removido')
        resolve(true)
      } catch (error) {
        console.error('❌ ContagemService: Erro ao remover marcador:', error)
        reject(error)
      }
    }, 200)
  })
}

/**
 * Método de debug para verificar estado atual
 * @returns {Object} Estado atual dos dados mock
 */
function debugDadosAtual() {
  console.log('🐛 ContagemService: Estado atual dos dados mock:', DADOS_MOCK)
  return {
    tipoCaixa: Object.assign({}, DADOS_MOCK.tipoCaixa),
    modelosPorTipo: Object.assign({}, DADOS_MOCK.modelosPorTipo),
  }
}

// Objeto de service que agrupa as funções
var ContagemService = {
  obterContagemPorTipo: obterContagemPorTipo,
  obterContagemModelosPorTipo: obterContagemModelosPorTipo,
  atualizarContagemAposAcao: atualizarContagemAposAcao,
  sincronizarComServidor: sincronizarComServidor,
  adicionarMarcadorPersonalizado: adicionarMarcadorPersonalizado,
  removerMarcadorPersonalizado: removerMarcadorPersonalizado,
  debugDadosAtual: debugDadosAtual,
}

// Exports
export { ContagemService }
export default ContagemService

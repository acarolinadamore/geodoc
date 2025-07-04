// composables/useAcoesLote.js
import { useNotificacoes } from './useNotificacoes'

export const useAcoesLote = cardService => {
  const { mostrarSucesso, mostrarErro } = useNotificacoes()

  const executarAcaoLote = async (acao, cardsSelecionados, parametros = {}) => {
    if (!cardsSelecionados || cardsSelecionados.length === 0) {
      mostrarErro('Selecione pelo menos um documento')
      return false
    }

    try {
      let resultado

      switch (acao) {
        case 'aprovar':
          resultado = await cardService.aprovarCards(cardsSelecionados)
          break
        case 'atribuir-a-mim':
          resultado = await cardService.atribuirCards(cardsSelecionados, 'eu')
          break
        case 'agrupar':
          resultado = await cardService.agruparCards(
            cardsSelecionados,
            parametros.grupo || 'grupo-padrao'
          )
          break
        case 'enviar-para-marcador':
          resultado = await cardService.moverParaMarcador(
            cardsSelecionados,
            parametros.marcadorId
          )
          break
        case 'atualizar-fluxo':
          resultado = await cardService.atualizarFluxo(
            cardsSelecionados,
            parametros.fluxo
          )
          break
        case 'cancelar-documento':
          resultado = await cardService.cancelarDocumentos(cardsSelecionados)
          break
        case 'identificar':
          resultado = await cardService.identificarDocumentos(cardsSelecionados)
          break
        case 'somar-ancoras':
          resultado = await cardService.somarAncoras(cardsSelecionados)
          break
        case 'vincular-modelo':
          resultado = await cardService.vincularModelo(
            cardsSelecionados,
            parametros.modeloId
          )
          break
        case 'vincular-pasta':
          resultado = await cardService.vincularPasta(
            cardsSelecionados,
            parametros.pastaId
          )
          break
        default:
          mostrarErro(`Ação "${acao}" não implementada`)
          return false
      }

      if (resultado?.message) {
        mostrarSucesso(resultado.message)
      } else {
        mostrarSucesso(`Ação "${acao}" executada com sucesso`)
      }

      return true
    } catch (error) {
      console.error(`Erro ao executar ação ${acao}:`, error)
      mostrarErro(
        `Erro ao executar ação: ${error.message || 'Erro desconhecido'}`
      )
      return false
    }
  }

  const aprovarSelecionados = async cardsSelecionados => {
    return await executarAcaoLote('aprovar', cardsSelecionados)
  }

  const atribuirAMim = async cardsSelecionados => {
    return await executarAcaoLote('atribuir-a-mim', cardsSelecionados)
  }

  const agruparSelecionados = async (
    cardsSelecionados,
    grupo = 'grupo-padrao'
  ) => {
    return await executarAcaoLote('agrupar', cardsSelecionados, { grupo })
  }

  const enviarParaMarcador = async (cardsSelecionados, marcadorId) => {
    return await executarAcaoLote('enviar-para-marcador', cardsSelecionados, {
      marcadorId,
    })
  }

  const executarAcaoCheckbox = async (
    acao,
    cardsSelecionados,
    parametros = {}
  ) => {
    return await executarAcaoLote(acao, cardsSelecionados, parametros)
  }

  return {
    executarAcaoLote,
    aprovarSelecionados,
    atribuirAMim,
    agruparSelecionados,
    enviarParaMarcador,
    executarAcaoCheckbox,
  }
}

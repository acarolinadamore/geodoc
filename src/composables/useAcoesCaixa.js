import { ref, getCurrentInstance } from 'vue'

export const useAcoesCaixa = (selecaoCards, notificacoes) => {
  // Acessar o service mock do prototype Vue
  const instance = getCurrentInstance()
  const cardService = instance?.proxy.$cardService

  const loading = ref({
    atribuicao: false,
    aprovacao: false,
    agrupamento: false,
  })

  // Validar se há cards selecionados
  const validarSelecao = () => {
    if (!selecaoCards.cardsSelecionados.value.length) {
      notificacoes.mostrarAviso('Selecione pelo menos um documento')
      return false
    }
    return true
  }

  // Atribuir documentos em lotes
  const atribuirEmLotes = async () => {
    if (!validarSelecao()) return

    try {
      loading.value.atribuicao = true

      await cardService.atribuirCards(
        selecaoCards.cardsSelecionados.value,
        'responsavel'
      )

      notificacoes.mostrarSucesso('Documentos atribuídos com sucesso')
      selecaoCards.resetarSelecoes()

      return true
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao atribuir documentos'
      notificacoes.mostrarErro(mensagem)
      return false
    } finally {
      loading.value.atribuicao = false
    }
  }

  // Atribuir documentos a mim
  const atribuirAMim = async () => {
    if (!validarSelecao()) return

    try {
      loading.value.atribuicao = true

      await cardService.atribuirCards(
        selecaoCards.cardsSelecionados.value,
        'eu'
      )

      notificacoes.mostrarSucesso('Documentos atribuídos a você com sucesso')
      selecaoCards.resetarSelecoes()

      return true
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao atribuir documentos'
      notificacoes.mostrarErro(mensagem)
      return false
    } finally {
      loading.value.atribuicao = false
    }
  }

  // Aprovar documentos selecionados
  const aprovarSelecionados = async () => {
    if (!validarSelecao()) return

    try {
      loading.value.aprovacao = true

      await cardService.aprovarCards(selecaoCards.cardsSelecionados.value)

      notificacoes.mostrarSucesso('Documentos aprovados com sucesso')
      selecaoCards.resetarSelecoes()

      return true
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao aprovar documentos'
      notificacoes.mostrarErro(mensagem)
      return false
    } finally {
      loading.value.aprovacao = false
    }
  }

  // Agrupar documentos selecionados
  const agruparSelecionados = async () => {
    if (!validarSelecao()) return

    try {
      loading.value.agrupamento = true

      await cardService.agruparCards(
        selecaoCards.cardsSelecionados.value,
        'grupo'
      )

      notificacoes.mostrarSucesso('Documentos agrupados com sucesso')
      selecaoCards.resetarSelecoes()

      return true
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao agrupar documentos'
      notificacoes.mostrarErro(mensagem)
      return false
    } finally {
      loading.value.agrupamento = false
    }
  }

  // Executar ação do modelo
  const executarAcaoModelo = async () => {
    try {
      const resultado = {
        sucesso: true,
        mensagem: 'Ação executada com sucesso',
      }

      if (resultado.sucesso) {
        notificacoes.mostrarSucesso(
          resultado.mensagem || 'Ação executada com sucesso'
        )
      } else {
        notificacoes.mostrarErro(resultado.mensagem || 'Erro ao executar ação')
      }

      return resultado
    } catch (error) {
      const mensagem =
        error.response?.data?.message || 'Erro ao executar ação do modelo'
      notificacoes.mostrarErro(mensagem)
      return { sucesso: false, mensagem }
    }
  }

  return {
    loading,
    validarSelecao,
    atribuirEmLotes,
    atribuirAMim,
    aprovarSelecionados,
    agruparSelecionados,
    executarAcaoModelo,
  }
}

// composables/useNotificacoes.js
import { ref } from 'vue'

export const useNotificacoes = () => {
  const notificacoes = ref([])

  const mostrarNotificacao = (mensagem, tipo = 'info', duracao = 3000) => {
    const id = Date.now() + Math.random()
    const notificacao = {
      id,
      mensagem,
      tipo,
      visivel: true,
    }

    notificacoes.value.push(notificacao)

    // Auto remove após duração especificada
    setTimeout(() => {
      removerNotificacao(id)
    }, duracao)

    return id
  }

  const removerNotificacao = id => {
    const index = notificacoes.value.findIndex(n => n.id === id)
    if (index > -1) {
      notificacoes.value.splice(index, 1)
    }
  }

  const limparNotificacoes = () => {
    notificacoes.value.splice(0)
  }

  // Métodos de conveniência
  const mostrarSucesso = mensagem => mostrarNotificacao(mensagem, 'success')
  const mostrarErro = mensagem => mostrarNotificacao(mensagem, 'error')
  const mostrarAviso = mensagem => mostrarNotificacao(mensagem, 'warning')
  const mostrarInfo = mensagem => mostrarNotificacao(mensagem, 'info')

  return {
    notificacoes,
    mostrarNotificacao,
    removerNotificacao,
    limparNotificacoes,
    mostrarSucesso,
    mostrarErro,
    mostrarAviso,
    mostrarInfo,
  }
}

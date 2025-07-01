// mocks/services/marcadoresService.js
let marcadores = [
  { id: 'urgente', label: 'Urgente' },
  // Outros marcadores padrão podem ser adicionados aqui
]

export default {
  listar() {
    return Promise.resolve([...marcadores])
  },

  adicionar(marcador) {
    // Garante que o marcador tem id e label
    if (!marcador.id || !marcador.label) {
      return Promise.reject(new Error('Marcador deve ter id e label'))
    }

    // Verifica se já existe
    if (!marcadores.some(m => m.id === marcador.id)) {
      marcadores.push({ ...marcador })
    }

    return Promise.resolve([...marcadores])
  },

  remover(id) {
    marcadores = marcadores.filter(m => m.id !== id)
    return Promise.resolve([...marcadores])
  },

  // Método adicional para obter um marcador específico
  obterPorId(id) {
    const marcador = marcadores.find(m => m.id === id)
    return Promise.resolve(marcador || null)
  },

  // Método para atualizar um marcador
  atualizar(id, novosDados) {
    const index = marcadores.findIndex(m => m.id === id)
    if (index !== -1) {
      marcadores[index] = { ...marcadores[index], ...novosDados }
      return Promise.resolve(marcadores[index])
    }
    return Promise.reject(new Error('Marcador não encontrado'))
  },
}

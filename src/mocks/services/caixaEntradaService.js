// src/services/caixaEntradaService.js

import { documentos } from '@/mocks/data/documentos.js'
import { getUsuarios } from '@/mocks/services/usuarios.js'
import caixaEntradaTransformer from '@/mocks/transformers/caixaEntradaTransformer.js'

class CaixaEntradaService {
  async getDocumentos(tipo = 'todos', filtros = {}) {
    try {
      console.log('📥 Buscando documentos tipo:', tipo, filtros)

      // ✅ CARREGAR USUÁRIOS
      const usuarios = await getUsuarios()
      console.log('👥 Usuários carregados:', usuarios.length)

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500))

      const usuarioAtual = {
        id: 'user001',
        nome: 'Maria Silva Santos',
        email: 'maria.santos@geodoc.com',
        funcao: 'Analista Financeiro',
        setor: 'FINANCEIRO',
      }

      console.log('👤 Usuário atual:', usuarioAtual)
      console.log('📄 Total de documentos disponíveis:', documentos.length)

      // ✅ SEM FILTRO DE ANDAMENTO - MOSTRAR TODOS OS DOCUMENTOS
      // Ou filtrar por algum critério que existe nos documentos
      const documentosFiltrados = documentos.filter(doc => {
        // Exemplo: filtrar por setor do usuário ou mostrar todos
        console.log(`📄 Doc ${doc.id}:`, {
          titulo: doc.titulo,
          tipo: doc.tipo,
          status: doc.status,
        })

        // ✅ RETORNAR TODOS POR ENQUANTO (ou adicionar lógica específica)
        return true
      })

      console.log('📦 Documentos filtrados:', documentosFiltrados.length)

      if (documentosFiltrados.length === 0) {
        console.log('⚠️ Nenhum documento encontrado')
        return []
      }

      // ✅ TRANSFORMAR DOCUMENTOS SEM ANDAMENTO
      const cardsPromises = documentosFiltrados.map(async documento => {
        console.log(
          `🔄 Transformando doc ${documento.id} (${documento.titulo})`
        )
        // Passar null como andamento já que não temos
        return await caixaEntradaTransformer.transformarParaCard(
          documento,
          null,
          usuarios
        )
      })

      const cards = await Promise.all(cardsPromises)

      console.log('✅ Cards processados:', cards.length)
      return cards
    } catch (error) {
      console.error('❌ Erro geral ao buscar documentos:', error)
      console.error('❌ Stack completo:', error.stack)
      throw error
    }
  }

  async getEstatisticas() {
    try {
      const total = documentos.length
      const pendentes = Math.floor(total * 0.7) // 70% pendentes (mock)
      const vencidos = Math.floor(pendentes * 0.3) // 30% dos pendentes vencidos

      return { total, pendentes, vencidos }
    } catch (error) {
      console.error('❌ Erro ao buscar estatísticas:', error)
      return { total: 0, pendentes: 0, vencidos: 0 }
    }
  }

  async getContadoresPorModelo() {
    try {
      const usuarios = await getUsuarios()

      // Transformar todos os documentos
      const cardsPromises = documentos.map(async documento => {
        return await caixaEntradaTransformer.transformarParaCard(
          documento,
          null,
          usuarios
        )
      })

      const cards = await Promise.all(cardsPromises)

      // Contar por modelo
      const contadores = cards.reduce((acc, card) => {
        const modelo = card.documento.modelo
        acc[modelo] = (acc[modelo] || 0) + 1
        return acc
      }, {})

      console.log('📊 Contadores por modelo:', contadores)
      return contadores
    } catch (error) {
      console.error('❌ Erro ao buscar contadores:', error)
      return {}
    }
  }
}

export default new CaixaEntradaService()

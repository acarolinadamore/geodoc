// services/index.js - Versão corrigida
export { default as cardService } from './cardService'

// Importar mocks diretamente para desenvolvimento
import { cardServiceMock, marcadoresServiceMock } from './mocks/cardsMock'

const ServicesPlugin = {
  install(Vue) {
    const useMocks = process.env.VUE_APP_USE_MOCKS === 'true'

    console.log(
      '🔧 Variável de ambiente VUE_APP_USE_MOCKS:',
      process.env.VUE_APP_USE_MOCKS
    )
    console.log('🔧 UseMocks:', useMocks)

    if (useMocks) {
      console.log('🔧 Carregando services com dados MOCK')
      Vue.prototype.$cardService = cardServiceMock
      Vue.prototype.$marcadoresService = marcadoresServiceMock

      Vue.prototype.$services = {
        card: cardServiceMock,
        marcador: marcadoresServiceMock,
      }
    } else {
      console.log('🚀 Carregando services com API REAL')
      const cardService = require('./cardService').default
      Vue.prototype.$cardService = cardService

      Vue.prototype.$services = {
        card: cardService,
      }
    }
  },
}

export default ServicesPlugin

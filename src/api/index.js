// Configuração base do axios
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  config => {
    // Buscar token do localStorage ou de onde estiver armazenado
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log para debug (remover em produção)
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`)

    return config
  },
  error => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de respostas
apiClient.interceptors.response.use(
  response => {
    // Log de sucesso (remover em produção)
    console.log('✅ API Response:', response.config.url, response.status)
    return response
  },
  error => {
    // Tratamento centralizado de erros
    if (error.response) {
      // Erro retornado pelo servidor
      console.error('❌ API Error Response:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      })

      // Tratamento específico por código de status
      switch (error.response.status) {
        case 401:
          // Token expirado ou inválido
          localStorage.removeItem('authToken')
          // Redirecionar para login se necessário
          // window.location.href = '/login'
          break
        case 403:
          console.error('Acesso negado')
          break
        case 404:
          console.error('Recurso não encontrado')
          break
        case 500:
          console.error('Erro interno do servidor')
          break
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('❌ Sem resposta do servidor:', error.request)
    } else {
      // Erro ao configurar a requisição
      console.error('❌ Erro na configuração:', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient

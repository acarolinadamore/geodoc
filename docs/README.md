# GeoDoc - Documentação para Backend

## 🎯 Visão Geral

Este projeto é um sistema de gestão de processos internos baseado em documentos digitais. O frontend em Vue.js está pronto para integração com o backend.

## 📋 Arquitetura

### Frontend (Vue.js)

- **Framework:** Vue 2 + Tailwind CSS
- **Estrutura:** Arquitetura em camadas (API + Services)
- **Estado:** Gerenciamento reativo com composables
- **Componentes:** Reutilizáveis e modulares

### Backend (A implementar)

- **API REST:** Endpoints já definidos
- **Autenticação:** JWT tokens
- **Banco de dados:** Estrutura de dados documentada
- **Upload de arquivos:** Suporte a anexos

---

## 🚀 Como Integrar

### 1. Configuração Inicial

**Frontend já configurado:**

```javascript
// src/api/index.js
const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'
```

**Backend deve usar:**

- URL base: `http://localhost:3000/api`
- Headers: `Content-Type: application/json`
- Autenticação: `Authorization: Bearer {token}`

### 2. Transição dos Mocks

**Atualmente (Mock):**

```javascript
// src/services/index.js
const cardService = {
  async getCards(filtros) {
    // Retorna dados fake
    return mockData
  },
}
```

**Para integração (Real):**

```javascript
// src/services/index.js
const cardService = {
  async getCards(filtros) {
    // Chama API real
    return await cardsAPI.getAll(filtros)
  },
}
```

### 3. Variáveis de Ambiente

**Crie `.env.local`:**

```env
VUE_APP_API_URL=http://localhost:3000/api
VUE_APP_UPLOAD_URL=http://localhost:3000/uploads
```

---

## 📁 Estrutura de Arquivos

```
src/
├── api/              ← Endpoints HTTP
│   ├── index.js      ← Configuração Axios
│   ├── auth.js       ← Autenticação
│   ├── cards.js      ← Documentos
│   ├── marcadores.js ← Marcadores
│   └── ...
├── services/         ← Lógica de negócio
│   ├── index.js      ← Plugin principal
│   ├── authService.js
│   ├── cardService.js
│   └── ...
├── components/       ← Componentes Vue
├── views/           ← Páginas
└── composables/     ← Lógica reutilizável
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Gestão de Documentos

- [x] Listagem com filtros avançados
- [x] Busca por texto livre
- [x] Paginação automática
- [x] Seleção múltipla
- [x] Ações em lote (aprovar, atribuir, etc.)

### ✅ Sistema de Marcadores

- [x] Criação e edição
- [x] Aplicação a documentos
- [x] Filtros por marcador
- [x] Cores personalizáveis

### ✅ Fluxos de Trabalho

- [x] Visualização de etapas
- [x] Progresso visual
- [x] Aprovação/reprovação
- [x] Histórico de ações

### ✅ Interface Responsiva

- [x] Layout adaptativo
- [x] Componentes modulares
- [x] Acessibilidade
- [x] Performance otimizada

---

## 📋 Endpoints Prioritários

### 1. Autenticação (Crítico)

```
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

### 2. Documentos (Essencial)

```
GET /cards
POST /cards
PUT /cards/:id
DELETE /cards/:id
```

### 3. Marcadores (Importante)

```
GET /marcadores
POST /marcadores
PUT /marcadores/:id
DELETE /marcadores/:id
```

### 4. Filtros e Busca (Importante)

```
GET /cards?tipoCaixa=recebidos&busca=texto
GET /cards?modelos[]=modelo1&modelos[]=modelo2
```

---

## 🔧 Configurações Necessárias

### CORS

```javascript
// Backend deve permitir
app.use(
  cors({
    origin: ['http://localhost:8080', 'https://seu-dominio.com'],
    credentials: true,
  })
)
```

### JWT

```javascript
// Token deve incluir
{
  id: user.id,
  nome: user.nome,
  email: user.email,
  permissions: user.permissions
}
```

### Upload de Arquivos

```javascript
// Suporte a multipart/form-data
// Tipos: PDF, DOC, DOCX, JPG, PNG
// Tamanho máximo: 10MB
```

---

## 🧪 Testes e Validação

### Dados de Teste

O frontend já possui 12 documentos de teste com:

- Diferentes tipos de remetentes
- Vários modelos de documento
- Etapas e fluxos variados
- Status diversos

### Validação

- Campos obrigatórios marcados
- Validação de formatos
- Tratamento de erros
- Feedback visual

---

## 🚨 Pontos de Atenção

### 1. Estrutura de Dados

- Seguir exatamente a estrutura documentada
- Campos obrigatórios não podem ser null
- Datas no formato ISO 8601

### 2. Filtros

- `tipoCaixa` determina quais documentos mostrar
- `criadoPorMim` boolean é crucial para filtros
- Contadores devem ser calculados corretamente

### 3. Paginação

- Sempre retornar `total`, `totalPages`, `page`, `limit`
- Contadores por categoria são esperados

### 4. Autenticação

- JWT deve ser validado em todas as rotas
- Refresh token para renovação automática
- Logout deve invalidar tokens

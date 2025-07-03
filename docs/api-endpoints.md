# API Endpoints - GeoDoc

## 🎯 Visão Geral

Este documento lista todos os endpoints necessários para integração entre frontend e backend.

## 🔐 Autenticação

Todos os endpoints (exceto login) requerem token JWT no header:

```
Authorization: Bearer {token}
```

---

## 📋 Cards/Documentos

### GET /cards

Lista documentos com filtros e paginação.

**Parâmetros:**

- `page` (number): Página atual (default: 1)
- `limit` (number): Itens por página (default: 20)
- `tipoCaixa` (string): "todos", "recebidos", "a-configurar", "solicitados", "lembretes"
- `modelos` (array): Lista de modelos selecionados
- `busca` (string): Texto para busca
- `dataInicio` (string): Data inicial (ISO format)
- `dataFim` (string): Data final (ISO format)

**Resposta:**

```json
{
  "cards": [...],
  "total": 50,
  "totalPages": 5,
  "page": 1,
  "limit": 20,
  "contadores": {
    "todos": 50,
    "recebidos": 30,
    "a-configurar": 5,
    "solicitados": 10,
    "lembretes": 5
  }
}
```

### GET /cards/:id

Busca documento específico.

### POST /cards

Cria novo documento.

### PUT /cards/:id

Atualiza documento.

### DELETE /cards/:id

Remove documento.

### POST /cards/:id/approve

Aprova documento.

### POST /cards/:id/reject

Reprova documento.

### POST /cards/:id/archive

Arquiva documento.

---

## 🏷️ Marcadores

### GET /marcadores

Lista todos os marcadores.

### POST /marcadores

Cria novo marcador.

### PUT /marcadores/:id

Atualiza marcador.

### DELETE /marcadores/:id

Remove marcador.

### POST /marcadores/:id/apply

Aplica marcador a documentos.

**Body:**

```json
{
  "documentoIds": [1, 2, 3]
}
```

---

## 📝 Modelos

### GET /modelos

Lista modelos de documento.

### POST /modelos

Cria novo modelo.

### PUT /modelos/:id

Atualiza modelo.

### DELETE /modelos/:id

Remove modelo.

---

## 🔄 Fluxos

### GET /fluxos

Lista fluxos de trabalho.

### POST /fluxos

Cria novo fluxo.

### PUT /fluxos/:id

Atualiza fluxo.

### DELETE /fluxos/:id

Remove fluxo.

---

## 🔐 Autenticação

### POST /auth/login

Login do usuário.

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "token": "jwt_token_aqui",
  "refreshToken": "refresh_token_aqui",
  "user": {
    "id": 1,
    "nome": "Nome do Usuário",
    "email": "usuario@email.com"
  }
}
```

### POST /auth/logout

Logout do usuário.

### POST /auth/refresh

Renova token JWT.

---

## 👥 Usuários

### GET /usuarios

Lista usuários.

### POST /usuarios

Cria novo usuário.

### PUT /usuarios/:id

Atualiza usuário.

### DELETE /usuarios/:id

Remove usuário.

---

## 🔔 Notificações

### GET /notificacoes

Lista notificações do usuário.

### POST /notificacoes

Cria nova notificação.

### PUT /notificacoes/:id/read

Marca notificação como lida.

---

## 📊 Códigos de Status

- `200` - Sucesso
- `201` - Criado
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## 🔧 Configuração do Axios

O frontend já está configurado para usar estas URLs:

```javascript
const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'
```

Configure a variável `VUE_APP_API_URL` no arquivo `.env.local`.

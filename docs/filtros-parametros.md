# Filtros e Parâmetros - GeoDoc

## 🎯 Visão Geral

Este documento detalha todos os filtros e parâmetros suportados pelo sistema de busca e listagem.

---

## 📋 Filtros Principais

### 1. **tipoCaixa** (string)

Determina qual "caixa" de documentos filtrar.

**Valores aceitos:**

- `"todos"` - Todos os documentos
- `"recebidos"` - Documentos recebidos (criadoPorMim: false)
- `"a-configurar"` - Documentos em rascunho criados pelo usuário
- `"solicitados"` - Documentos solicitados pelo usuário (em andamento)
- `"lembretes"` - Documentos marcados como lembrete

**Lógica de filtro:**

```javascript
// Recebidos
documento.criadoPorMim === false

// A Configurar
documento.status === 'rascunho' && documento.criadoPorMim === true

// Solicitados
documento.criadoPorMim === true &&
  documento.status !== 'rascunho' &&
  documento.status !== 'lembrete'

// Lembretes
documento.status === 'lembrete' && documento.criadoPorMim === true
```

### 2. **modelos** (array)

Lista de modelos de documento para filtrar.

**Valores aceitos:**

- `["todos"]` - Todos os modelos
- `["solicitacao-fabrica-software"]` - Solicitação à Fábrica de Software
- `["solicitacao-orcamento"]` - Solicitação de Orçamento
- `["relatorio-progresso"]` - Relatório de Progresso
- `["auditoria-processo"]` - Auditoria de Processo
- `["conciliacao-bancaria"]` - Conciliação Bancária
- `["folha-de-pagamento"]` - Folha de Pagamento

**Múltipla seleção:**

```javascript
// Exemplo: Buscar apenas 2 modelos
modelos: ['solicitacao-fabrica-software', 'auditoria-processo']
```

### 3. **busca** (string)

Busca textual em múltiplos campos.

**Campos pesquisados:**

- `remetente.nome`
- `remetente.funcao`
- `documento.modelo`
- `documento.id`
- `documento.fluxo`
- `ancora.projeto`
- `ancora.prestadorServico`

**Características:**

- Case-insensitive
- Busca parcial (contém)
- Busca em todos os campos simultaneamente

### 4. **dataInicio** e **dataFim** (string)

Filtro por intervalo de datas.

**Formato:** ISO 8601 - `"2025-01-01"`

**Campos verificados:**

- `documento.dataInicio`
- `vencimento.data`

**Lógica:**

```javascript
// Documento deve estar dentro do intervalo
;(dataCard >= dataInicio && dataCard <= dataFim) ||
  (vencimentoCard >= dataInicio && vencimentoCard <= dataFim)
```

---

## 📄 Paginação

### **page** (number)

Página atual da listagem.

- **Padrão:** 1
- **Mínimo:** 1
- **Máximo:** totalPages

### **limit** (number)

Quantidade de itens por página.

- **Padrão:** 20
- **Opções:** 10, 20, 50, 100

---

## 🔢 Contadores

### Tipos de Contadores

O backend deve retornar contadores para:

**Por Tipo de Caixa:**

- `todos` - Total de documentos
- `recebidos` - Documentos recebidos
- `a-configurar` - Documentos a configurar
- `solicitados` - Documentos solicitados
- `lembretes` - Documentos lembrete

**Por Modelo:**

- `solicitacao-fabrica-software`
- `solicitacao-orcamento`
- `relatorio-progresso`
- `auditoria-processo`
- `conciliacao-bancaria`
- `folha-de-pagamento`

**Por Marcador:**

- `urgente`
- `importante`
- `revisao`
- (outros marcadores personalizados)

---

## 🎯 Exemplos de Uso

### Exemplo 1: Filtro Básico

```javascript
GET /cards?tipoCaixa=recebidos&page=1&limit=20
```

### Exemplo 2: Filtro por Modelos

```javascript
GET /cards?modelos[]=solicitacao-fabrica-software&modelos[]=auditoria-processo
```

### Exemplo 3: Busca Textual

```javascript
GET /cards?busca=Arthur&tipoCaixa=todos
```

### Exemplo 4: Filtro por Data

```javascript
GET /cards?dataInicio=2025-06-01&dataFim=2025-06-30
```

### Exemplo 5: Filtro Combinado

```javascript
GET /cards?tipoCaixa=recebidos&modelos[]=solicitacao-fabrica-software&busca=Sistema&page=1&limit=10
```

---

## 🔄 Ordenação

### **orderBy** (string)

Campo para ordenação.

**Valores aceitos:**

- `"created_at"` - Data de criação (padrão)
- `"updated_at"` - Data de atualização
- `"vencimento"` - Data de vencimento
- `"remetente"` - Nome do remetente
- `"modelo"` - Modelo do documento

### **orderDirection** (string)

Direção da ordenação.

**Valores aceitos:**

- `"asc"` - Crescente
- `"desc"` - Decrescente (padrão)

### Exemplo:

```javascript
GET /cards?orderBy=vencimento&orderDirection=asc
```

---

## 🏷️ Filtros de Marcadores

### **marcadores** (array)

Lista de marcadores para filtrar.

**Exemplo:**

```javascript
GET /cards?marcadores[]=urgente&marcadores[]=importante
```

### **temMarcador** (boolean)

Filtrar apenas documentos que têm marcadores.

**Exemplo:**

```javascript
GET /cards?temMarcador=true
```

---

## 📊 Resposta Esperada

### Estrutura da Resposta

```javascript
{
  "cards": [...], // Array de documentos
  "total": 50,
  "totalPages": 5,
  "page": 1,
  "limit": 20,
  "contadores": {
    // Contadores por tipo de caixa
    "todos": 50,
    "recebidos": 30,
    "a-configurar": 5,
    "solicitados": 10,
    "lembretes": 5,

    // Contadores por modelo
    "solicitacao-fabrica-software": 20,
    "solicitacao-orcamento": 8,
    "relatorio-progresso": 15,
    "auditoria-processo": 4,
    "conciliacao-bancaria": 2,
    "folha-de-pagamento": 1,

    // Contadores por marcador
    "urgente": 12,
    "importante": 8,
    "revisao": 5
  }
}
```

---

## 🔧 Implementação Backend

### Query SQL Exemplo

```sql
SELECT * FROM documentos d
WHERE
  -- Filtro por tipo de caixa
  (CASE
    WHEN :tipoCaixa = 'recebidos' THEN d.criado_por_mim = false
    WHEN :tipoCaixa = 'a-configurar' THEN d.status = 'rascunho' AND d.criado_por_mim = true
    WHEN :tipoCaixa = 'solicitados' THEN d.criado_por_mim = true AND d.status NOT IN ('rascunho', 'lembrete')
    WHEN :tipoCaixa = 'lembretes' THEN d.status = 'lembrete' AND d.criado_por_mim = true
    ELSE true
  END)

  -- Filtro por busca
  AND (
    :busca IS NULL OR
    d.remetente_nome ILIKE '%' || :busca || '%' OR
    d.documento_id ILIKE '%' || :busca || '%' OR
    d.modelo ILIKE '%' || :busca || '%'
  )

  -- Filtro por data
  AND (
    :dataInicio IS NULL OR d.data_inicio >= :dataInicio
  )
  AND (
    :dataFim IS NULL OR d.data_inicio <= :dataFim
  )

ORDER BY d.created_at DESC
LIMIT :limit OFFSET :offset
```

---

## ⚠️ Validações

### Validações Obrigatórias

- `page` deve ser >= 1
- `limit` deve estar entre 1 e 100
- `dataInicio` deve ser menor que `dataFim`
- `tipoCaixa` deve ser um dos valores aceitos
- `modelos` deve ser um array válido

### Tratamento de Erros

```javascript
// Exemplo de resposta de erro
{
  "error": "Parâmetros inválidos",
  "details": {
    "page": "Deve ser maior que 0",
    "limit": "Deve estar entre 1 e 100"
  }
}
```

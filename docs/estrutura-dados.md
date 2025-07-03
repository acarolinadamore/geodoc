# Estrutura de Dados - GeoDoc

## 📋 Card/Documento

### Estrutura Completa

```javascript
{
  id: 1,
  remetente: {
    nome: "Arthur Affonso de Barros Marinho",
    funcao: "Presidente - CONSELHO"
  },
  documento: {
    id: "2354545/45222",
    dataInicio: "2025-06-15T08:30:00",
    modelo: "Solicitação à Fábrica de Software",
    fluxo: "Férias",
    status: "em_andamento", // rascunho, em_andamento, finalizado, cancelado, lembrete
    criadoPorMim: false,
    etapas: [
      { nome: "Solicitação", status: "completed" },
      { nome: "Triagem", status: "completed" },
      { nome: "Etapa", status: "current" },
      { nome: "Aprovação", status: "pending" },
      { nome: "Execução", status: "pending" },
      { nome: "Conclusão", status: "pending" }
    ],
    pastaDigital: "GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE"
  },
  ancora: {
    modelo: "Projeto",
    projeto: "Comunica Cidadão",
    prestadorServico: "Luciano Lopes",
    dataPagamento: "10/06/2025",
    unidade: "Fábrica de Software"
  },
  vencimento: {
    data: "28/06/2025",
    status: "vence_em", // vence_em, vencido, dentro_prazo
    days: 5,
    unit: "dias"
  },
  acoes: ["Visualizar", "Editar"],
  tipoCaixa: "recebidos" // todos, recebidos, a-configurar, solicitados, lembretes
}
```

### Campos Obrigatórios

- `id` (number): Identificador único
- `remetente.nome` (string): Nome do remetente
- `remetente.funcao` (string): Função do remetente
- `documento.id` (string): ID do documento
- `documento.modelo` (string): Modelo do documento
- `documento.status` (string): Status atual
- `documento.criadoPorMim` (boolean): Se foi criado pelo usuário logado

### Status Possíveis

- `rascunho`: Documento em criação
- `em_andamento`: Documento em tramitação
- `finalizado`: Processo concluído
- `cancelado`: Processo cancelado
- `lembrete`: Documento como lembrete

---

## 🏷️ Marcador

```javascript
{
  id: "urgente",
  nome: "Urgente",
  label: "Urgente",
  cor: "#ef4444",
  categoria: "prioridade",
  ativo: true,
  uso_count: 15,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z"
}
```

---

## 📝 Modelo de Documento

```javascript
{
  id: 1,
  nome: "Solicitação à Fábrica de Software",
  apelido: "SOL_FABRICA",
  descricao: "Modelo para solicitações de desenvolvimento",
  categoria: "desenvolvimento",
  ativo: true,
  campos: [
    {
      id: 1,
      nome: "titulo",
      label: "Título da Solicitação",
      tipo: "text",
      obrigatorio: true,
      placeholder: "Digite o título...",
      ordem: 1
    },
    {
      id: 2,
      nome: "descricao",
      label: "Descrição",
      tipo: "textarea",
      obrigatorio: true,
      placeholder: "Descreva a solicitação...",
      ordem: 2
    }
  ]
}
```

---

## 🔄 Fluxo

```javascript
{
  id: 1,
  nome: "Desenvolvimento de Sistema",
  descricao: "Fluxo para desenvolvimento de sistemas",
  modelo_documento_id: 1,
  ativo: true,
  etapas: [
    {
      id: 1,
      nome: "Análise Técnica",
      descricao: "Análise dos requisitos técnicos",
      sequencial: 1,
      prazo_dias: 5,
      obrigatoria: true,
      responsaveis: ["user1", "user2"]
    },
    {
      id: 2,
      nome: "Desenvolvimento",
      descricao: "Implementação do sistema",
      sequencial: 2,
      prazo_dias: 15,
      obrigatoria: true,
      responsaveis: ["user3", "user4"]
    }
  ]
}
```

---

## 👤 Usuário

```javascript
{
  id: 1,
  nome: "Arthur Affonso de Barros Marinho",
  email: "arthur@empresa.com",
  username: "arthur.marinho",
  funcao: "Presidente - CONSELHO",
  departamento: "Conselho",
  cargo: "Presidente",
  ativo: true,
  avatar: "/uploads/avatars/user1.jpg",
  permissions: ["read", "write", "admin"],
  roles: ["admin"],
  ultimo_acesso: "2025-01-01T10:00:00Z",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z"
}
```

---

## 🔔 Notificação

```javascript
{
  id: 1,
  titulo: "Documento Aprovado",
  mensagem: "Seu documento foi aprovado com sucesso",
  tipo: "sucesso", // sucesso, erro, aviso, info
  prioridade: "alta", // alta, media, baixa
  lida: false,
  importante: false,
  arquivada: false,
  usuario_id: 1,
  documento_id: 1,
  data_leitura: null,
  created_at: "2025-01-01T10:00:00Z",
  updated_at: "2025-01-01T10:00:00Z"
}
```

---

## 📊 Resposta de Listagem

```javascript
{
  data: [...], // Array com os dados
  total: 50,
  totalPages: 5,
  page: 1,
  limit: 20,
  contadores: {
    todos: 50,
    recebidos: 30,
    a_configurar: 5,
    solicitados: 10,
    lembretes: 5,
    // Contadores por modelo
    "solicitacao-fabrica-software": 20,
    "auditoria-processo": 10,
    "relatorio-progresso": 15,
    "conciliacao-bancaria": 3,
    "folha-de-pagamento": 2
  }
}
```

---

## 🔧 Configurações

### Datas

- Todas as datas devem estar no formato ISO 8601: `"2025-01-01T10:00:00Z"`
- Datas de vencimento podem estar no formato brasileiro: `"28/06/2025"`

### Paginação

- `page`: Página atual (inicia em 1)
- `limit`: Itens por página (padrão: 20)
- `total`: Total de itens
- `totalPages`: Total de páginas

### Filtros

- `tipoCaixa`: Determina qual "caixa" filtrar
- `modelos`: Array de modelos selecionados
- `busca`: Busca em todos os campos de texto
- `dataInicio/dataFim`: Filtro por intervalo de datas

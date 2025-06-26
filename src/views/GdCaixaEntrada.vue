<template>
  <layout-sidebar-header
    :show-header-date="false"
    :show-header-notification="true"
    ref="caixaEntradaRef"
  >
    <div class="caixa-entrada-container">
      <!-- Header Fixo -->
      <div class="header-fixo">
        <div class="header-content">
          <!-- Título da Página -->
          <div class="page-title text-left">
            <h1>{{ tituloPagina }}</h1>
          </div>

          <!-- Filtros de Abas -->
          <div class="filtros-container">
            <GdFilterBar
              :initial-tabs="abasIniciais"
              :initial-active-tab-id="filtroAbaAtiva"
              @atualizar-aba="alterarFiltroAba"
              @adicionar-marcador="adicionarMarcador"
            />
            <GdFilterBarBadge
              :initial-tabs="abasFiltro"
              :active-model="filtroModeloAtivo"
              @filter-change="alterarFiltroModelo"
            />
          </div>

          <!-- Controles de Busca e Ações -->
          <div class="controles-container">
            <div class="busca-container">
              <GdSearchBar
                v-model="termoBusca"
                class="busca-input"
                placeholder="Buscar..."
              />

              <GdDatePicker
                v-model="intervaloData"
                placeholder="Selecionar período"
                @change="alterarData"
                class="data-picker"
              />
            </div>

            <!-- ✅ BOTÕES DEPOIS (fica embaixo no mobile) -->
            <div class="botoes-container">
              <GdButton
                label="Atribuir em Lotes"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                @click="atribuirEmLotes"
                class="acao-button"
              />
              <GdButton
                label="Atribuir a mim"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                @click="atribuirAMim"
                class="acao-button"
              />
              <GdButton
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                @click="aprovar"
                class="acao-button"
              />
              <GdButton
                label="Agrupar"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#ffffff"
                @click="agrupar"
                class="acao-button"
              />
            </div>
          </div>

          <!-- Indicador de Filtros Ativos -->
          <div v-if="possuiFiltrosAtivos" class="filtros-ativos">
            <div class="filtros-badges">
              <span v-if="termoBusca" class="filtro-badge">
                🔍 "{{ termoBusca }}"
                <button @click="limparBusca" class="filtro-remove">×</button>
              </span>
              <span v-if="intervaloDataFormatado" class="filtro-badge">
                📅 {{ intervaloDataFormatado }}
                <button @click="limparFiltroData" class="filtro-remove">
                  ×
                </button>
              </span>
            </div>
            <button @click="limparTodosFiltros" class="limpar-filtros">
              Limpar todos os filtros
            </button>
          </div>
        </div>

        <!-- Separador -->
        <div class="separador-linha"></div>

        <!-- Cabeçalho dos Cards -->
        <div class="header-cards">
          <div class="cards-controls">
            <GdCheckboxDropdown
              :checked-all="todosCardsSelecionados"
              :actions="acoesCheckbox"
              @toggle-all="alternarTodos"
              @action="executarAcaoCheckbox"
            />
            <GdEnviarParaDropdown
              :markers="opcoesEnviarPara"
              @select-marker="enviarPara"
            />
          </div>
          <div class="cards-headers">
            <span>Remetente</span>
            <span>Documento</span>
            <span>Âncora</span>
            <span>Ações</span>
          </div>
        </div>
      </div>

      <!-- Área de Conteúdo -->
      <div class="area-scroll">
        <div class="scroll-content">
          <!-- Loading -->
          <div v-if="carregando" class="estado-loading">
            <div class="loading-spinner"></div>
            <p>Carregando documentos...</p>
            <div v-if="contadorTentativas > 0" class="loading-tentativas">
              Tentativa {{ contadorTentativas }} de {{ maximoTentativas }}
            </div>
          </div>

          <!-- Estado de Erro -->
          <div v-else-if="erro" class="estado-erro">
            <div class="erro-icon">⚠️</div>
            <h3>Ops! Algo deu errado</h3>
            <p>{{ erro }}</p>
            <div class="erro-acoes">
              <button @click="carregarCards" class="btn-tentar-novamente">
                Tentar novamente
              </button>
              <button @click="limparErro" class="btn-limpar-erro">
                Limpar erro
              </button>
            </div>
          </div>

          <!-- Estado Vazio -->
          <div v-else-if="!temCards" class="estado-vazio">
            <div class="vazio-icon">📄</div>
            <h3>Nenhum documento encontrado</h3>
            <p>Sua caixa de entrada está vazia no momento.</p>
          </div>

          <!-- Sem Resultados -->
          <div v-else-if="!temResultados" class="estado-sem-resultados">
            <div class="vazio-icon">🔍</div>
            <h3>Nenhum resultado encontrado</h3>
            <p>Nenhum documento encontrado com os filtros aplicados.</p>
            <button @click="limparTodosFiltros" class="btn-limpar-filtros">
              Limpar filtros
            </button>
          </div>

          <!-- Lista de Cards -->
          <GdCardList
            v-else
            :cards="cardsFiltrados"
            :selected-cards="cardsSelecionados"
            @toggle-card-selection="alternarSelecaoCard"
            @modelo-action="executarAcaoModelo"
          />
        </div>
      </div>
    </div>
  </layout-sidebar-header>
</template>

<script>
import LayoutSidebarHeader from '@/layouts/LayoutSidebarHeader.vue'
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdFilterBarBadge from '@/components/ui/GdFilterBarBadge.vue'
import GdCardList from '@/components/ui/GdCardList.vue'
import GdCheckboxDropdown from '@/components/ui/GdCheckboxDropdown.vue'
import GdEnviarParaDropdown from '@/components/ui/GdEnviarParaDropdown.vue'
import GdButton from '@/components/ui/GdButton.vue'
import GdSearchBar from '@/components/ui/GdSearchBar.vue'
import GdDatePicker from '@/components/ui/GdDatePicker.vue'
import { caixaEntradaService } from '@/services/index.js'

export default {
  name: 'GdCaixaEntrada',
  components: {
    LayoutSidebarHeader,
    GdFilterBar,
    GdFilterBarBadge,
    GdCardList,
    GdCheckboxDropdown,
    GdEnviarParaDropdown,
    GdButton,
    GdSearchBar,
    GdDatePicker,
  },
  data: function () {
    return {
      // ========================================
      // CONFIGURAÇÃO DE ABAS E FILTROS
      // ========================================
      abasIniciais: [
        { id: 'todos', label: 'Todos' },
        { id: 'a-configurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'lembretes', label: 'Lembretes' },
      ],

      abasFiltro: [
        { id: 'todos', label: 'Todos', count: 10, color: '#1a82d9' },
        {
          id: 'solicitacao-sistema-gestao',
          label: 'Solicitação de Sistema de Gestão',
          count: 2,
          color: '#3b82f6',
          modelo: 'Solicitação de Sistema de Gestão',
        },
        {
          id: 'solicitacao-orcamento',
          label: 'Solicitação de Orçamento',
          count: 2,
          color: '#10b981',
          modelo: 'Solicitação de Orçamento',
        },
        {
          id: 'relatorio-progresso',
          label: 'Relatório de Progresso',
          count: 2,
          color: '#f59e0b',
          modelo: 'Relatório de Progresso',
        },
        {
          id: 'auditoria-processo',
          label: 'Auditoria de Processo',
          count: 2,
          color: '#ef4444',
          modelo: 'Auditoria de Processo',
        },
        {
          id: 'conciliacao-bancaria',
          label: 'Conciliação Bancária',
          count: 2,
          color: '#8b5cf6',
          modelo: 'Conciliação Bancária',
        },
      ],

      acoesCheckbox: [
        { label: 'Marcar como não lido', value: 'marcar-nao-lido' },
        { label: 'Aprovar', value: 'aprovar' },
        { label: 'Atualizar Fluxo', value: 'atualizar-fluxo' },
        { label: 'Atribuir a Mim', value: 'atribuir-mim' },
        { label: 'Identificar', value: 'identificar' },
        { label: 'Somar Âncoras', value: 'somar-ancoras' },
        { label: 'Agrupar', value: 'agrupar' },
        { label: 'Cancelar', value: 'cancelar' },
        { label: 'Vincular ModeloDocumento', value: 'vincular-modelo' },
        { label: 'Vincular Pasta Digital', value: 'vincular-pasta' },
      ],

      opcoesEnviarPara: [
        { label: 'Diretoria', value: 'diretoria', color: '#2563eb' },
        { label: 'Negócios', value: 'negocios', color: '#16a34a' },
        { label: 'Financeiro', value: 'financeiro', color: '#f59e0b' },
        { label: 'RH', value: 'rh', color: '#ef4444' },
        { label: 'Jurídico', value: 'juridico', color: '#8b5cf6' },
        { label: 'Operações', value: 'operacoes', color: '#06b6d4' },
      ],

      // ========================================
      // ESTADO DA APLICAÇÃO
      // ========================================
      filtroAbaAtiva: 'todos',
      filtroModeloAtivo: null,
      marcadoresCustomizados: [],

      usuarioAtual: {
        id: 'user001',
        setor: 'FINANCEIRO',
        nome: 'Arthur Affonso',
      },

      todosCards: [],
      cardsSelecionados: [],
      carregando: false,
      erro: null,
      contadorTentativas: 0,
      maximoTentativas: 3,
      termoBusca: '',
      intervaloData: null,
      todosCardsSelecionados: false,
    }
  },

  computed: {
    // ========================================
    // COMPUTED PROPERTIES
    // ========================================
    possuiFiltrosAtivos: function () {
      return (
        !!(this.termoBusca && this.termoBusca.trim()) || !!this.intervaloData
      )
    },

    intervaloDataFormatado: function () {
      return this.formatarIntervaloData(this.intervaloData)
    },

    cardsFiltrados: function () {
      console.log('🔍 Aplicando filtros...')
      console.log('📦 Total de cards:', this.todosCards.length)
      console.log('🔤 Termo de busca:', this.termoBusca)
      console.log('🎨 Modelo ativo:', this.filtroModeloAtivo)
      console.log('📅 Intervalo de data:', this.intervaloData)

      var filtrados = this.todosCards.slice()

      // Filtrar por modelo se selecionado
      if (this.filtroModeloAtivo && this.filtroModeloAtivo !== 'todos') {
        console.log('🎨 Aplicando filtro de modelo...')
        filtrados = this.aplicarFiltroModelo(filtrados)
        console.log('📦 Após filtro modelo:', filtrados.length)
      }

      // ✅ FILTRAR POR BUSCA
      if (this.termoBusca && this.termoBusca.trim()) {
        console.log('🔍 Aplicando filtro de busca...')
        filtrados = this.filtrarPorBusca(filtrados)
        console.log('📦 Após filtro busca:', filtrados.length)
      }

      // Filtrar por data
      if (this.intervaloData) {
        console.log('📅 Aplicando filtro de data...')
        filtrados = this.filtrarPorData(filtrados)
        console.log('📦 Após filtro data:', filtrados.length)
      }

      var resultado = this.ordenarCardsPorVencimento(filtrados)
      console.log('✅ Cards filtrados final:', resultado.length)

      return resultado
    },

    tituloPagina: function () {
      var titulos = {
        todos: 'Caixa de Entrada',
        'a-configurar': 'A Configurar',
        recebidos: 'Recebidos',
        solicitados: 'Solicitados',
        lembretes: 'Lembretes',
      }
      return (
        titulos[this.filtroAbaAtiva] ||
        this.formatarTituloMarcador(this.filtroAbaAtiva)
      )
    },

    temCards: function () {
      return this.todosCards.length > 0
    },

    temResultados: function () {
      return this.cardsFiltrados.length > 0
    },
  },

  watch: {
    termoBusca: {
      handler: function (novoTermo, termoAnterior) {
        console.log('👀 Watch termoBusca ativado:', {
          anterior: termoAnterior,
          novo: novoTermo,
          totalCards: this.todosCards.length,
        })

        // ✅ LIMPAR SELEÇÕES QUANDO BUSCA MUDA
        this.limparSelecoes()
      },
      immediate: false,
    },

    // ✅ WATCH CORRIGIDO PARA CARDS FILTRADOS
    cardsFiltrados: {
      handler: function (novosCards) {
        // ✅ VERIFICAR SE novosCards É VÁLIDO ANTES DE ACESSAR .length
        if (novosCards && Array.isArray(novosCards)) {
          console.log('👀 Cards filtrados mudaram:', novosCards.length)
          // Atualizar estado de seleção quando filtros mudam
          this.atualizarEstadoTodosSelecionados()
        } else {
          console.log('👀 Cards filtrados mudaram: dados inválidos')
        }
      },
      immediate: false,
    },
  },
  async mounted() {
    console.log('🚀 GdCaixaEntrada montado')
    this.detectarFiltroInicialPorURL()
    await this.carregarCards()
  },

  methods: {
    // ========================================
    // GERENCIAMENTO DE FILTROS
    // ========================================
    alterarFiltroAba: function (novaAba) {
      if (!novaAba) return

      console.log('🔄 Alterando filtro de aba para:', novaAba)
      this.filtroAbaAtiva = novaAba
      this.atualizarURL(novaAba)
      this.limparSelecoes()
      this.carregarCards()
    },

    alterarFiltroModelo: function (modeloId) {
      console.log('🎨 Alterando filtro de modelo para:', modeloId)
      this.filtroModeloAtivo = modeloId
      this.limparSelecoes()
    },

    adicionarMarcador: function (novoMarcador) {
      console.log('🏷️ Adicionando novo marcador:', novoMarcador)

      if (
        !this.abasIniciais.find(function (aba) {
          return aba.id === novoMarcador.id
        })
      ) {
        this.abasIniciais.push(novoMarcador)
      }

      if (this.marcadoresCustomizados.indexOf(novoMarcador.id) === -1) {
        this.marcadoresCustomizados.push(novoMarcador.id)
      }

      this.alterarFiltroAba(novoMarcador.id)
    },

    // ========================================
    // CARREGAMENTO DE DADOS
    // ========================================
    carregarCards: async function () {
      try {
        this.carregando = true
        this.erro = null

        console.log('📥 Iniciando carregamento de cards...')
        console.log('👤 Usuário atual:', this.usuarioAtual.id)
        console.log('🔍 Filtro ativo:', this.filtroAbaAtiva)

        var filtros = this.prepararFiltros()
        console.log('🔧 Filtros preparados:', filtros)

        var tipoFiltro = this.mapearTipoFiltro(this.filtroAbaAtiva)
        console.log('📋 Tipo de filtro:', tipoFiltro)

        this.todosCards = await caixaEntradaService.getDocumentos(
          tipoFiltro,
          filtros
        )

        console.log('📦 Cards carregados:', this.todosCards.length)
        console.log('📄 Dados dos cards:', this.todosCards)

        this.atualizarContadoresModelo()
        this.limparSelecoes()
        this.contadorTentativas = 0
      } catch (error) {
        console.error('❌ Erro ao carregar cards:', error)
        this.erro = this.obterMensagemErro(error)
        this.todosCards = []

        if (this.contadorTentativas < this.maximoTentativas) {
          this.contadorTentativas++
          setTimeout(() => {
            this.carregarCards()
          }, 2000 * this.contadorTentativas)
        }
      } finally {
        this.carregando = false
      }
    },

    prepararFiltros: function () {
      return {
        usuarioId: this.usuarioAtual.id,
        // ✅ NÃO INCLUIR BUSCA NOS FILTROS DA API
        data_inicial:
          this.intervaloData && this.intervaloData[0]
            ? this.formatarDataParaAPI(this.intervaloData[0])
            : null,
        data_final:
          this.intervaloData && this.intervaloData[1]
            ? this.formatarDataParaAPI(this.intervaloData[1])
            : null,
        modelo_documento_id: this.obterModeloIdSelecionado(),
      }
    },

    mapearTipoFiltro: function (aba) {
      var mapa = {
        todos: 'todos',
        'a-configurar': 'configurar',
        recebidos: 'recebidos',
        solicitados: 'solicitados',
        lembretes: 'lembretes',
      }
      return mapa[aba] || 'todos'
    },

    // ========================================
    // FILTROS LOCAIS
    // ========================================
    aplicarFiltroModelo: function (cards) {
      var modeloSelecionado = this.abasFiltro.find(aba => {
        return aba.id === this.filtroModeloAtivo
      })

      if (!modeloSelecionado || !modeloSelecionado.modelo) {
        return cards
      }

      return cards.filter(function (card) {
        return (
          card.documento && card.documento.modelo === modeloSelecionado.modelo
        )
      })
    },

    // ✅ FILTRO DE BUSCA CORRIGIDO COM VALIDAÇÃO DE TIPOS
    filtrarPorBusca: function (cards) {
      var buscaMinuscula = this.termoBusca.toLowerCase().trim()
      console.log('🔍 Buscando por:', buscaMinuscula)

      if (!buscaMinuscula) {
        return cards
      }

      var resultado = cards.filter(function (card) {
        // ✅ FUNÇÃO AUXILIAR PARA CONVERTER VALORES EM STRING SEGURA
        var converterParaString = function (valor) {
          if (valor === null || valor === undefined) {
            return ''
          }
          if (typeof valor === 'string') {
            return valor
          }
          if (typeof valor === 'number') {
            return valor.toString()
          }
          if (typeof valor === 'boolean') {
            return valor.toString()
          }
          if (Array.isArray(valor)) {
            return valor.join(' ')
          }
          if (typeof valor === 'object') {
            return JSON.stringify(valor)
          }
          return String(valor)
        }

        // ✅ CAMPOS PESQUISÁVEIS COM CONVERSÃO SEGURA
        var camposPesquisaveis = [
          // Remetente
          converterParaString(card.remetente && card.remetente.nome),
          converterParaString(card.remetente && card.remetente.funcao),
          converterParaString(card.remetente && card.remetente.setor),

          // Documento
          converterParaString(card.documento && card.documento.modelo),
          converterParaString(card.documento && card.documento.titulo),
          converterParaString(card.documento && card.documento.id),
          converterParaString(card.documento && card.documento.fluxo),
          converterParaString(card.documento && card.documento.tipo),
          converterParaString(card.documento && card.documento.status),

          // Âncora
          converterParaString(card.ancora && card.ancora.projeto),
          converterParaString(card.ancora && card.ancora.prestadorServico),
          converterParaString(card.ancora && card.ancora.unidade),
          converterParaString(card.ancora && card.ancora.pastaDigital),

          // Vencimento
          converterParaString(card.vencimento && card.vencimento.data),
          converterParaString(card.vencimento && card.vencimento.status),

          // Outros campos que podem existir
          converterParaString(card.observacoes),
          converterParaString(card.descricao),
          converterParaString(card.id),
        ]

        // ✅ BUSCA MAIS INTELIGENTE - SUPORTA MÚLTIPLAS PALAVRAS
        var palavrasBusca = buscaMinuscula
          .split(' ')
          .filter(function (palavra) {
            return palavra.length > 0
          })

        return palavrasBusca.every(function (palavra) {
          return camposPesquisaveis.some(function (campo) {
            // ✅ AGORA TODOS OS CAMPOS SÃO STRINGS GARANTIDAS
            return campo.toLowerCase().includes(palavra)
          })
        })
      })

      console.log('🔍 Resultados da busca:', resultado.length)
      return resultado
    },

    filtrarPorData: function (cards) {
      var dataInicio, dataFim

      if (this.intervaloData instanceof Date) {
        dataInicio = dataFim = this.intervaloData
      } else if (Array.isArray(this.intervaloData)) {
        if (this.intervaloData.length === 1) {
          dataInicio = dataFim = this.intervaloData[0]
        } else if (this.intervaloData.length === 2) {
          dataInicio = this.intervaloData[0]
          dataFim = this.intervaloData[1]
        }
      }

      if (!dataInicio || !dataFim) return cards

      return cards.filter(card => {
        var dataInicioCard = this.analisarDataCard(
          card.documento && card.documento.dataInicio
        )
        var vencimentoCard = this.analisarVencimentoCard(card)
        var dataPagamentoCard = this.analisarDataBR(
          card.ancora && card.ancora.dataPagamento
        )

        return (
          this.dataEstaNoIntervalo(dataInicioCard, dataInicio, dataFim) ||
          this.dataEstaNoIntervalo(vencimentoCard, dataInicio, dataFim) ||
          this.dataEstaNoIntervalo(dataPagamentoCard, dataInicio, dataFim)
        )
      })
    },

    ordenarCardsPorVencimento: function (cards) {
      return cards.sort((a, b) => {
        var dataA = this.analisarVencimentoCard(a)
        var dataB = this.analisarVencimentoCard(b)

        if (!dataA && !dataB) return 0
        if (!dataA) return 1
        if (!dataB) return -1

        return dataA - dataB
      })
    },

    // ========================================
    // SELEÇÃO DE CARDS
    // ========================================
    alternarSelecaoCard: function (cardId) {
      var indice = this.cardsSelecionados.indexOf(cardId)

      if (indice > -1) {
        this.cardsSelecionados.splice(indice, 1)
      } else {
        this.cardsSelecionados.push(cardId)
      }

      this.atualizarEstadoTodosSelecionados()
    },

    alternarTodos: function () {
      if (this.todosCardsSelecionados) {
        // Desselecionar todos os visíveis
        this.cardsFiltrados.forEach(card => {
          var indice = this.cardsSelecionados.indexOf(card.id)
          if (indice > -1) {
            this.cardsSelecionados.splice(indice, 1)
          }
        })
      } else {
        // Selecionar todos os visíveis
        this.cardsFiltrados.forEach(card => {
          if (this.cardsSelecionados.indexOf(card.id) === -1) {
            this.cardsSelecionados.push(card.id)
          }
        })
      }

      this.atualizarEstadoTodosSelecionados()
    },

    atualizarEstadoTodosSelecionados: function () {
      var totalCardsVisiveis = this.cardsFiltrados.length
      var cardsVisiveisSelecionados = this.cardsFiltrados.filter(card => {
        return this.cardsSelecionados.indexOf(card.id) !== -1
      }).length

      this.todosCardsSelecionados =
        totalCardsVisiveis > 0 &&
        cardsVisiveisSelecionados === totalCardsVisiveis
    },

    limparSelecoes: function () {
      this.cardsSelecionados = []
      this.todosCardsSelecionados = false
    },

    // ========================================
    // EVENTOS DE BUSCA
    // ========================================
    buscar: function (termo) {
      console.log('📥 GdCaixaEntrada - Buscar chamado:', termo)
      console.log('📥 GdCaixaEntrada - termoBusca antes:', this.termoBusca)
      console.log('📥 GdCaixaEntrada - termoBusca depois:', this.termoBusca)
      this.limparSelecoes()
    },

    limparBusca: function () {
      console.log('🗑️ Limpando busca')
      this.termoBusca = ''
      this.limparSelecoes()
    },

    alterarData: function (event) {
      console.log('📅 Alterando data:', event.date)
      this.intervaloData = event.date
      this.limparSelecoes()
    },

    limparFiltroData: function () {
      console.log('🗑️ Limpando filtro de data')
      this.intervaloData = null
      this.limparSelecoes()
    },

    limparTodosFiltros: function () {
      console.log('🗑️ Limpando todos os filtros')
      this.termoBusca = ''
      this.intervaloData = null
      this.limparSelecoes()
    },

    // ========================================
    // AÇÕES DOS CARDS
    // ========================================
    executarAcaoCheckbox: function (acao) {
      console.log(
        'Ação do checkbox:',
        acao,
        'Cards selecionados:',
        this.cardsSelecionados
      )
    },

    executarAcaoModelo: function (params) {
      console.log('Ação do modelo:', params)
    },

    enviarPara: function (marcador) {
      console.log(
        'Enviar para:',
        marcador,
        'Cards selecionados:',
        this.cardsSelecionados
      )
    },

    atribuirEmLotes: function () {
      console.log('Atribuir em lotes')
    },

    atribuirAMim: function () {
      console.log('Atribuir a mim')
    },

    aprovar: function () {
      console.log('Aprovar')
    },

    agrupar: function () {
      console.log('Agrupar')
    },

    // ========================================
    // UTILITÁRIOS
    // ========================================
    detectarFiltroInicialPorURL: function () {
      var path = window.location.pathname

      if (path.includes('/configurar')) {
        this.filtroAbaAtiva = 'a-configurar'
      } else if (path.includes('/recebidos')) {
        this.filtroAbaAtiva = 'recebidos'
      } else if (path.includes('/solicitados')) {
        this.filtroAbaAtiva = 'solicitados'
      } else if (path.includes('/lembretes')) {
        this.filtroAbaAtiva = 'lembretes'
      } else {
        this.filtroAbaAtiva = 'todos'
      }
    },

    atualizarURL: function (aba) {
      var novaURL = '/caixa-entrada'
      var urls = {
        'a-configurar': '/configurar',
        recebidos: '/recebidos',
        solicitados: '/solicitados',
        lembretes: '/lembretes',
        todos: '/caixa-entrada',
      }

      novaURL = urls[aba] || '/' + aba

      if (window.history && window.history.pushState) {
        window.history.pushState({}, '', novaURL)
      }
    },

    formatarTituloMarcador: function (marcador) {
      if (!marcador) return 'Caixa de Entrada'
      return marcador.charAt(0).toUpperCase() + marcador.slice(1)
    },

    atualizarContadoresModelo: function () {
      var cardsParaContar = this.todosCards

      // Atualizar contador total
      var abaTotal = this.abasFiltro.find(function (tab) {
        return tab.id === 'todos'
      })
      if (abaTotal) {
        abaTotal.count = cardsParaContar.length
      }

      // Atualizar contadores por modelo
      this.abasFiltro.forEach(function (tab) {
        if (tab.modelo) {
          var contador = cardsParaContar.filter(function (card) {
            return card.documento && card.documento.modelo === tab.modelo
          }).length
          tab.count = contador
        }
      })
    },

    obterModeloIdSelecionado: function () {
      if (!this.filtroModeloAtivo || this.filtroModeloAtivo === 'todos') {
        return null
      }

      var modeloSelecionado = this.abasFiltro.find(aba => {
        return aba.id === this.filtroModeloAtivo
      })

      var mapeamentoModelos = {
        'Solicitação de Sistema de Gestão': 1,
        'Solicitação de Orçamento': 2,
        'Relatório de Progresso': 3,
        'Auditoria de Processo': 4,
        'Conciliação Bancária': 5,
      }

      return (
        mapeamentoModelos[modeloSelecionado && modeloSelecionado.modelo] || null
      )
    },

    formatarDataParaAPI: function (data) {
      if (!data) return null
      var ano = data.getFullYear()
      var mes = String(data.getMonth() + 1).padStart(2, '0')
      var dia = String(data.getDate()).padStart(2, '0')
      return ano + '-' + mes + '-' + dia
    },

    obterMensagemErro: function (error) {
      if (error.response && error.response.status === 404) {
        return 'Serviço não encontrado. Tente novamente mais tarde.'
      }
      if (error.response && error.response.status >= 500) {
        return 'Erro interno do servidor. Tente novamente mais tarde.'
      }
      if (error.code === 'NETWORK_ERROR') {
        return 'Erro de conexão. Verifique sua internet.'
      }
      return error.message || 'Erro desconhecido ao carregar documentos'
    },

    limparErro: function () {
      this.erro = null
      this.contadorTentativas = 0
    },

    // ========================================
    // UTILITÁRIOS DE DATA
    // ========================================
    analisarDataCard: function (stringData) {
      if (!stringData) return null

      try {
        if (stringData.includes('T')) {
          return new Date(stringData)
        }

        var partes = stringData.split('/')
        if (partes.length !== 3) return null

        var dia = parseInt(partes[0], 10)
        var mes = parseInt(partes[1], 10)
        var ano = parseInt(partes[2], 10)

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return null

        return new Date(ano, mes - 1, dia)
      } catch (error) {
        return null
      }
    },

    analisarDataBR: function (stringData) {
      if (!stringData || typeof stringData !== 'string') return null

      try {
        var partes = stringData.split('/')
        if (partes.length !== 3) return null

        var dia = parseInt(partes[0], 10)
        var mes = parseInt(partes[1], 10)
        var ano = parseInt(partes[2], 10)

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return null

        return new Date(ano, mes - 1, dia)
      } catch (error) {
        return null
      }
    },

    analisarVencimentoCard: function (card) {
      return this.analisarDataBR(
        card && card.vencimento && card.vencimento.data
      )
    },

    dataEstaNoIntervalo: function (data, dataInicio, dataFim) {
      if (!data || !dataInicio || !dataFim) return false

      var normalizarData = function (d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
      }

      var dataNormalizada = normalizarData(data)
      var inicioNormalizado = normalizarData(dataInicio)
      var fimNormalizado = normalizarData(dataFim)

      return (
        dataNormalizada >= inicioNormalizado &&
        dataNormalizada <= fimNormalizado
      )
    },

    formatarIntervaloData: function (intervaloData) {
      if (
        !intervaloData ||
        (!Array.isArray(intervaloData) && !(intervaloData instanceof Date))
      ) {
        return ''
      }

      var formatarData = function (data) {
        try {
          var dia = String(data.getDate()).padStart(2, '0')
          var mes = String(data.getMonth() + 1).padStart(2, '0')
          return dia + '/' + mes
        } catch (error) {
          return 'Data inválida'
        }
      }

      if (intervaloData instanceof Date) {
        return formatarData(intervaloData)
      }

      if (Array.isArray(intervaloData)) {
        if (intervaloData.length === 1) {
          return formatarData(intervaloData[0])
        }
        if (intervaloData.length === 2) {
          return (
            formatarData(intervaloData[0]) +
            ' - ' +
            formatarData(intervaloData[1])
          )
        }
      }

      return ''
    },
  },
}
</script>

<style scoped>
/* ========================================
   LAYOUT PRINCIPAL
   ======================================== */
.caixa-entrada-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
}

.header-fixo {
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

.header-content {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.separador-linha {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
  margin: 0;
}

.header-cards {
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.area-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.scroll-content {
  padding: 0 16px;
}

/* ========================================
   HEADER COMPONENTS
   ======================================== */
.page-title {
  padding-top: 12px;
  padding-bottom: 4px;
}

.page-title h1 {
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.filtros-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ========================================
   RESPONSIVE - MOBILE FIRST
   ======================================== */
.controles-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.busca-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  order: 1; /* ✅ BUSCA PRIMEIRO NO MOBILE */
}

.botoes-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  order: 2; /* ✅ BOTÕES DEPOIS NO MOBILE */
}

.busca-input,
.data-picker {
  width: 100%;
}

.acao-button {
  flex: 1;
}

.cards-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.cards-headers {
  display: flex;
  flex: 1;
  gap: 16px;
}

.cards-headers span {
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 400;
  flex: 1;
}

/* ========================================
   FILTROS ATIVOS
   ======================================== */
.filtros-ativos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  gap: 12px;
}

.filtros-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filtro-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #2563eb;
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.filtro-remove {
  background: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 2px;
  border-radius: 2px;
}

.filtro-remove:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.limpar-filtros {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.limpar-filtros:hover {
  background-color: #ef4444;
  color: white;
}

/* ========================================
   ESTADOS DA APLICAÇÃO
   ======================================== */
.estado-loading,
.estado-erro,
.estado-vazio,
.estado-sem-resultados {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-tentativas {
  margin-top: 12px;
  font-size: 12px;
  color: #9ca3af;
}

.erro-icon,
.vazio-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.estado-erro h3,
.estado-vazio h3,
.estado-sem-resultados h3 {
  color: #374151;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}

.estado-erro p,
.estado-vazio p,
.estado-sem-resultados p {
  margin-bottom: 20px;
  color: #6b7280;
}

.erro-acoes {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-tentar-novamente {
  padding: 8px 16px;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 14px;
  background-color: #ef4444;
  color: white;
}

.btn-tentar-novamente:hover {
  background-color: #dc2626;
}

.btn-limpar-erro,
.btn-limpar-filtros {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 14px;
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-limpar-erro:hover,
.btn-limpar-filtros:hover {
  background-color: #ef4444;
  color: white;
}

/* ========================================
   RESPONSIVE - DESKTOP (1024px+)
   ======================================== */
@media (min-width: 1024px) {
  .controles-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .busca-container {
    flex-direction: row;
    align-items: center;
    width: auto;
    order: 2; /* ✅ BUSCA À DIREITA NO DESKTOP */
  }

  .botoes-container {
    width: auto;
    order: 1; /* ✅ BOTÕES À ESQUERDA NO DESKTOP */
  }

  .busca-input,
  .data-picker {
    width: auto;
  }

  .acao-button {
    flex: none;
  }
}

/* ========================================
   RESPONSIVE - TABLET
   ======================================== */
@media (max-width: 1024px) and (min-width: 769px) {
  .cards-headers {
    display: none;
  }
}
</style>

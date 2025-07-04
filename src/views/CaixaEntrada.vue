<template>
  <layout-menu-lateral v-slot="{ sidebarExpanded }">
    <div class="caixa-entrada-container">
      <div class="header-fixo">
        <div class="header-content">
          <div
            class="flex pt-3 pb-1"
            :class="{ 'adicionar-espaco': !sidebarExpanded }"
          >
            <h1 class="text-xl font-semibold text-gray-700 m-0">
              {{ tituloAtual }}
            </h1>
          </div>

          <div class="flex flex-col gap-1">
            <FiltroPaginaMarcador
              :initial-tabs="abasTipoCaixaComContadores"
              :initial-active-tab-id="filtrosCaixa.filtros.tipoCaixa"
              @atualizar-aba="alterarTipoCaixa"
              @adicionar-marcador="adicionarMarcador"
            />
            <FiltroModeloDocumento
              :initial-tabs="modelosDaCaixaAtual"
              :selected-tabs="filtrosCaixa.filtros.modelos"
              :multiple-selection="true"
              @filter-change="alterarFiltroModelo"
            />
          </div>

          <div
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-2"
          >
            <div
              class="flex gap-2 flex-wrap w-full lg:w-auto order-2 lg:order-1"
            >
              <Button
                label="Atribuir Documentos em Lotes"
                icon="fa-list"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#fff"
                :disabled="!temCardsSelecionados"
                @click="atribuirEmLotes"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Atribuir a mim"
                :iconSrc="handIcon"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                :disabled="!temCardsSelecionados"
                @click="atribuirAMim"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                :disabled="!temCardsSelecionados"
                @click="aprovarSelecionados"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Agrupar"
                icon="fa-users"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#ffffff"
                :disabled="!temCardsSelecionados"
                @click="agruparSelecionados"
                class="flex-1 lg:flex-none"
              />
            </div>

            <div
              class="flex flex-col lg:flex-row gap-3 lg:items-center w-full lg:w-auto order-1 lg:order-2"
            >
              <Searchbar
                :initial-value="filtrosCaixa.filtros.busca"
                @search-changed="alterarFiltroBusca"
                @clear="limparFiltroBusca"
                class="w-full lg:w-auto flex-1 lg:flex-none"
              />
              <div class="flex gap-2">
                <DatePicker
                  :value="filtrosCaixa.intervaloDataLocal"
                  @change="alterarFiltroData"
                  class="w-full lg:w-auto"
                />
                <DropdownOrdenarPor
                  v-model="ordenacaoAtual"
                  @change="alterarOrdenacao"
                />
              </div>
            </div>
          </div>

          <IndicadoresFiltros
            v-if="filtrosCaixa.possuiFiltrosAtivos"
            :filtros="filtrosAtivos"
            @limpar-filtro="limparFiltroEspecifico"
            @limpar-todos="limparTodosFiltros"
          />
        </div>

        <div class="separador-linha"></div>
      </div>

      <div class="area-scroll">
        <div class="scroll-content">
          <CardDocumentoLista
            v-if="
              temCards &&
              !cardsComposable.state.loading &&
              !cardsComposable.state.error
            "
            :cards="cardsComposable.state.cards"
            :selected-cards="selecaoCards.cardsSelecionados.value"
            :ordenacao="ordenacaoAtual"
            @toggle-card-selection="alternarSelecaoCard"
            @modelo-action="executarAcaoModelo"
          />
        </div>
      </div>
    </div>
  </layout-menu-lateral>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue'
import { useCards } from '@/composables/useCards'
import { useSelecaoCards } from '@/composables/useSelecaoCards'
import { useNotificacoes } from '@/composables/useNotificacoes'
import { useFiltrosCaixa } from '@/composables/useFiltrosCaixa'
import { useCoresModelo } from '@/composables/useCoresModelo'
import { cardService } from '@/services/index.js'

import LayoutMenuLateral from '@/layouts/LayoutMenuLateral.vue'
import FiltroPaginaMarcador from '@/components/FiltroPaginaMarcador.vue'
import FiltroModeloDocumento from '@/components/FiltroModeloDocumento.vue'
import CardDocumentoLista from '@/components/CardDocumentoLista.vue'
import Button from '@/components/Button.vue'
import IndicadoresFiltros from '@/components/IndicadoresFiltros.vue'
import HandIcon from '@/assets/icons/hand.svg'

export default {
  name: 'CaixaEntrada',
  components: {
    LayoutMenuLateral,
    FiltroPaginaMarcador,
    FiltroModeloDocumento,
    CardDocumentoLista,
    Button,
    IndicadoresFiltros,
  },

  setup() {
    const cardsComposable = useCards()
    const selecaoCards = useSelecaoCards()
    const notificacoes = useNotificacoes()
    const filtrosCaixa = useFiltrosCaixa()
    const coresModelo = useCoresModelo()

    const ordenacaoAtual = ref('modelos')
    const marcadoresPessoais = ref([])
    const handIcon = ref(HandIcon)

    const configuracoesEstaticas = {
      abasTipoCaixa: [
        { id: 'todos', label: 'Todos' },
        { id: 'a-configurar', label: 'A Configurar' },
        { id: 'recebidos', label: 'Recebidos' },
        { id: 'solicitados', label: 'Solicitados' },
        { id: 'agendamentos', label: 'Pré-agendamento' },
      ],
      titulosEspecificos: {
        todos: 'Caixa de Entrada',
        'a-configurar': 'A Configurar',
        recebidos: 'Recebidos',
        solicitados: 'Solicitados',
        agendamentos: 'Pré-agendamento',
      },
    }

    const temCards = computed(() => cardsComposable.state.cards.length > 0)
    const temCardsSelecionados = computed(
      () => selecaoCards.cardsSelecionados.value.length > 0
    )

    const tituloAtual = computed(() => {
      const tipo = filtrosCaixa.filtros.value.tipoCaixa
      if (configuracoesEstaticas.titulosEspecificos[tipo]) {
        return configuracoesEstaticas.titulosEspecificos[tipo]
      }
      const aba = configuracoesEstaticas.abasTipoCaixa.find(a => a.id === tipo)
      return aba ? `Marcador: ${aba.label}` : 'Caixa de Entrada'
    })

    const abasTipoCaixaComContadores = computed(() => {
      const contagens = cardsComposable.state.contagemTipoCaixa || {}
      return configuracoesEstaticas.abasTipoCaixa.map(aba => ({
        ...aba,
        count: contagens[aba.id] || 0,
      }))
    })

    const modelosDaCaixaAtual = computed(() => {
      const contagens = cardsComposable.state.contagemModelosAtual || {}

      // Sempre inclui "Todos" primeiro
      const todos = {
        id: 'todos',
        label: 'Todos',
        color: '#1a82d9',
        count: contagens['todos'] || 0,
      }

      // Adiciona outros modelos que têm contagem > 0
      const outrosModelos = coresModelo.modelosDisponiveis.value
        .filter(modelo => modelo.id !== 'todos')
        .map(modelo => ({
          id: modelo.id,
          label: modelo.nome,
          color: modelo.cor,
          count: contagens[modelo.id] || 0,
        }))
        .filter(modelo => modelo.count > 0)

      return [todos, ...outrosModelos]
    })

    const filtrosAtivos = computed(() => {
      const ativos = []
      const f = filtrosCaixa.filtros.value

      if (f.busca) {
        ativos.push({ tipo: 'busca', valor: f.busca, label: `🔍 "${f.busca}"` })
      }

      if (filtrosCaixa.filtroDataTexto.value) {
        ativos.push({
          tipo: 'data',
          valor: null,
          label: `📅 ${filtrosCaixa.filtroDataTexto.value}`,
        })
      }

      if (filtrosCaixa.modelosSelecionadosTexto.value) {
        const modelosTexto = filtrosCaixa.modelosSelecionadosTexto.value
          .split(', ')
          .map(modelo => modelo.charAt(0).toUpperCase() + modelo.slice(1))
          .join(', ')

        ativos.push({
          tipo: 'modelos',
          valor: null,
          label: `📋 ${modelosTexto}`,
        })
      }

      return ativos
    })

    watch(
      () => cardsComposable.state.cards,
      novosCards => selecaoCards.atualizarCardsVisiveis(novosCards || []),
      { immediate: true }
    )

    watch(
      filtrosCaixa.filtros,
      async novosFiltros => {
        await cardsComposable.alterarFiltros(novosFiltros)
        await carregarCards()
      },
      { deep: true }
    )

    const alterarTipoCaixa = async tipoCaixa => {
      selecaoCards.resetarSelecoes()
      filtrosCaixa.aplicarFiltros({
        tipoCaixa,
        modelos: ['todos'],
        page: 1,
      })
      await cardsComposable.carregarContagemModelosAtual(tipoCaixa)
    }

    const alterarFiltroModelo = async modeloId => {
      const selecaoAtual = filtrosCaixa.filtros.value.modelos || ['todos']
      let novaSelecao = [...selecaoAtual]

      if (modeloId === 'todos') {
        novaSelecao = ['todos']
      } else {
        novaSelecao = novaSelecao.filter(id => id !== 'todos')
        const index = novaSelecao.indexOf(modeloId)

        if (index > -1) {
          novaSelecao.splice(index, 1)
        } else {
          novaSelecao.push(modeloId)
        }

        if (novaSelecao.length === 0) {
          novaSelecao = ['todos']
        }
      }

      selecaoCards.resetarSelecoes()
      filtrosCaixa.aplicarFiltros({ modelos: novaSelecao, page: 1 })
    }

    const alterarFiltroBusca = async busca => {
      selecaoCards.resetarSelecoes()
      filtrosCaixa.aplicarFiltros({ busca, page: 1 })
    }

    const alterarFiltroData = async dadosData => {
      if (!dadosData) {
        filtrosCaixa.limparFiltro('data')
        return
      }

      const novosFiltros = dadosData.filterType
        ? {
            filterType: dadosData.filterType,
            day: dadosData.day,
            month: dadosData.month,
            dataInicio: null,
            dataFim: null,
            page: 1,
          }
        : {
            dataInicio: dadosData.start,
            dataFim: dadosData.end,
            filterType: null,
            day: null,
            month: null,
            page: 1,
          }

      selecaoCards.resetarSelecoes()
      filtrosCaixa.aplicarFiltros(novosFiltros)
    }

    const limparFiltroBusca = () => {
      selecaoCards.resetarSelecoes()
      filtrosCaixa.limparFiltro('busca')
    }

    const alterarOrdenacao = ordenacao => {
      ordenacaoAtual.value = ordenacao
    }

    const limparFiltroEspecifico = tipoFiltro => {
      selecaoCards.resetarSelecoes()
      filtrosCaixa.limparFiltro(tipoFiltro)
    }

    const limparTodosFiltros = () => {
      selecaoCards.resetarSelecoes()
      filtrosCaixa.limparTodosFiltros()
    }

    const alternarSelecaoCard = cardId => {
      selecaoCards.alternarSelecaoCard(cardId)
    }

    const adicionarMarcador = novoMarcador => {
      marcadoresPessoais.value.push(novoMarcador)
      notificacoes.mostrarSucesso('Marcador adicionado com sucesso')
    }

    const carregarCards = async () => {
      try {
        cardsComposable.state.loading = true
        cardsComposable.state.error = null

        const response = await cardService.getCards(filtrosCaixa.filtros.value)

        if (response.cards) {
          cardsComposable.state.cards = response.cards
          cardsComposable.state.total = response.total || 0
          cardsComposable.state.totalPages = response.totalPages || 1

          if (response.contadores) {
            cardsComposable.state.contadores = response.contadores
          }
        }
      } catch (error) {
        cardsComposable.state.error =
          error.message || 'Erro ao carregar documentos'
      } finally {
        cardsComposable.state.loading = false
      }
    }

    const atribuirEmLotes = async () => {
      // TODO: Implementar atribuição em lotes
    }

    const atribuirAMim = async () => {
      // TODO: Implementar atribuição individual
    }

    const aprovarSelecionados = async () => {
      // TODO: Implementar aprovação em lote
    }

    const agruparSelecionados = async () => {
      // TODO: Implementar agrupamento
    }

    const executarAcaoModelo = async acao => {
      // TODO: Implementar ações do modelo
      console.log('Ação do modelo:', acao)
    }

    onMounted(async () => {
      await cardsComposable.inicializarContagens()
      await carregarCards()
    })

    return {
      cardsComposable,
      selecaoCards,
      filtrosCaixa,
      ordenacaoAtual,
      marcadoresPessoais,
      handIcon,
      temCards,
      temCardsSelecionados,
      tituloAtual,
      abasTipoCaixaComContadores,
      modelosDaCaixaAtual,
      filtrosAtivos,
      configuracoesEstaticas,
      alterarTipoCaixa,
      alterarFiltroModelo,
      alterarFiltroBusca,
      alterarFiltroData,
      limparFiltroBusca,
      alterarOrdenacao,
      limparFiltroEspecifico,
      limparTodosFiltros,
      alternarSelecaoCard,
      adicionarMarcador,
      carregarCards,
      atribuirEmLotes,
      atribuirAMim,
      aprovarSelecionados,
      agruparSelecionados,
      executarAcaoModelo,
    }
  },
}
</script>

<style scoped>
.adicionar-espaco {
  padding-left: 50px;
}

.caixa-entrada-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  max-width: 100%;
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
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.separador-linha {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
  margin: 0;
}

.area-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.scroll-content {
  padding: 0 16px;
}
</style>

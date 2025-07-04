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
              :initial-active-tab-id="filtrosCaixa.filtros.value.tipoCaixa"
              @atualizar-aba="alterarTipoCaixa"
              @adicionar-marcador="adicionarMarcador"
            />
            <FiltroModeloDocumento
              :initial-tabs="modelosDaCaixaAtual"
              :selected-tabs="filtrosCaixa.filtros.value.modelos"
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
                :disabled="!temCardsSelecionados || loading.atribuicao"
                :loading="loading.atribuicao"
                @click="atribuirEmLotes"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Atribuir a mim"
                :iconSrc="handIcon"
                variant="outlined"
                border-color="#37c989"
                text-color="#37c989"
                :disabled="!temCardsSelecionados || loading.atribuicao"
                :loading="loading.atribuicao"
                @click="atribuirAMim"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Aprovar"
                icon="fa-check"
                variant="filled"
                bg-color="#37c989"
                text-color="#ffffff"
                :disabled="!temCardsSelecionados || loading.aprovacao"
                :loading="loading.aprovacao"
                @click="aprovarSelecionados"
                class="flex-1 lg:flex-none"
              />
              <Button
                label="Agrupar"
                icon="fa-users"
                variant="filled"
                bg-color="#1a82d9"
                text-color="#ffffff"
                :disabled="!temCardsSelecionados || loading.agrupamento"
                :loading="loading.agrupamento"
                @click="agruparSelecionados"
                class="flex-1 lg:flex-none"
              />
            </div>

            <div
              class="flex flex-col lg:flex-row gap-3 lg:items-center w-full lg:w-auto order-1 lg:order-2"
            >
              <Searchbar
                :initial-value="filtrosCaixa.filtros.value.busca"
                @search-changed="alterarFiltroBusca"
                @clear="limparFiltroBusca"
                class="w-full lg:w-auto flex-1 lg:flex-none"
              />
              <div class="flex gap-2">
                <DatePicker
                  :value="filtrosCaixa.intervaloDataLocal.value"
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
            v-if="filtrosCaixa.possuiFiltrosAtivos.value"
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

          <div
            v-else-if="cardsComposable.state.loading"
            class="loading-container"
          >
            <p>Carregando documentos...</p>
          </div>

          <div v-else-if="cardsComposable.state.error" class="error-container">
            <p>{{ cardsComposable.state.error }}</p>
          </div>

          <div v-else class="empty-container">
            <p>Nenhum documento encontrado</p>
          </div>
        </div>
      </div>
    </div>
  </layout-menu-lateral>
</template>

<script>
import { ref } from 'vue'
import { useCaixaEntrada } from '@/composables/useCaixaEntrada'

import LayoutMenuLateral from '@/layouts/LayoutMenuLateral.vue'
import FiltroPaginaMarcador from '@/components/FiltroPaginaMarcador.vue'
import FiltroModeloDocumento from '@/components/FiltroModeloDocumento.vue'
import CardDocumentoLista from '@/components/CardDocumentoLista.vue'
import Button from '@/components/Button.vue'
import IndicadoresFiltros from '@/components/IndicadoresFiltros.vue'
import Searchbar from '@/components/Searchbar.vue'
import DatePicker from '@/components/DatePicker.vue'
import DropdownOrdenarPor from '@/components/DropdownOrdenarPor.vue'
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
    Searchbar,
    DatePicker,
    DropdownOrdenarPor,
  },

  setup() {
    const handIcon = ref(HandIcon)

    const {
      // Estados
      cardsComposable,
      selecaoCards,
      filtrosCaixa,
      ordenacaoAtual,

      // Computeds
      temCards,
      temCardsSelecionados,
      tituloAtual,
      abasTipoCaixaComContadores,
      modelosDaCaixaAtual,
      filtrosAtivos,

      // Métodos de filtro
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

      // Ações
      loading,
      atribuirEmLotes,
      atribuirAMim,
      aprovarSelecionados,
      agruparSelecionados,
      executarAcaoModelo,
    } = useCaixaEntrada()

    return {
      handIcon,
      cardsComposable,
      selecaoCards,
      filtrosCaixa,
      ordenacaoAtual,
      temCards,
      temCardsSelecionados,
      tituloAtual,
      abasTipoCaixaComContadores,
      modelosDaCaixaAtual,
      filtrosAtivos,
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
      loading,
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

.loading-container,
.error-container,
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.error-container {
  color: #dc2626;
}

.empty-container {
  color: #6b7280;
}
</style>

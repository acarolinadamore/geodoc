<template>
  <layout-menu-lateral v-slot="{ sidebarExpanded }">
    <div class="min-h-screen bg-cinza space-y-6 pb-12">
      <!-- Header -->
      <div
        class="bg-transparent sombra px-6 py-4 flex items-center justify-between"
      >
        <div :class="{ 'adicionar-espaco': !sidebarExpanded }">
          <h1 class="text-xl font-semibold text-gray-700 text-left m-0">
            Novo Documento
          </h1>
        </div>
        <div class="flex gap-3">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            Salvar
          </button>
        </div>
      </div>

      <!-- Formulário -->
      <div class="px-6 space-y-6 text-left">
        <!-- Upload de Arquivo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Escolha os arquivos</label
          >
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            multiple
            class="block w-full text-sm border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <!-- Select: Modelo de Documento -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Modelo de Documento</label
          >
          <select
            class="block w-full border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Selecione</option>
            <option>Contrato</option>
            <option>Relatório</option>
            <option>Requisição</option>
          </select>
        </div>

        <!-- Select: Fluxo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Fluxo</label
          >
          <select
            class="block w-full border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Selecione</option>
            <option>Jurídico</option>
            <option>Financeiro</option>
            <option>RH</option>
          </select>
        </div>
      </div>
    </div>
  </layout-menu-lateral>
</template>

<script>
import LayoutMenuLateral from '@/layouts/LayoutMenuLateral.vue'

export default {
  name: 'NovoDocumento',
  components: {
    LayoutMenuLateral,
  },
}
</script>

<style scoped>
.sombra {
  box-shadow: 0 1.5px 5px 0.5px rgba(65, 65, 65, 0.09);
}

.adicionar-espaco {
  padding-left: 50px;
}
</style>

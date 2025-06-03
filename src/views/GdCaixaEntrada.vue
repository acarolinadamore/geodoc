<template>
  <div class="min-h-screen bg-gray-100 p-6 font-sans antialiased">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Caixa de Entrada</h1>

    <GdFilterBar class="mb-6" />

    <div
      class="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4"
    >
      <div
        class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto"
      >
        <button
          class="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          Atribuir a mim
        </button>
        <button
          class="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          Aprovar
        </button>
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Agrupar
        </button>
      </div>

      <div
        class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto"
      >
        <GdDropdown>
          <template #button-content>
            <input
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
            />
            <span class="text-gray-700">Checkbox Dropdown</span>
            <svg
              class="w-4 h-4 ml-1 transform transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </template>
          <template #dropdown-content>
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Opção 1</a
            >
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Opção 2</a
            >
          </template>
        </GdDropdown>

        <GdDropdown>
          <template #button-content>
            <svg
              class="w-5 h-5 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h6l2 3h8a2 2 0 012 2v11z"
              ></path>
              <path
                fill="yellow"
                d="M12 15l2.5 1.5L17 15l-1.5 2.5L17 20l-2.5-1.5L12 20l1.5-2.5L12 15z"
              ></path>
            </svg>
            <span class="text-gray-700">Grupo Imagetech</span>
            <svg
              class="w-4 h-4 ml-1 transform transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </template>
          <template #dropdown-content>
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Item Pasta 1</a
            >
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >Item Pasta 2</a
            >
          </template>
        </GdDropdown>
      </div>
    </div>

    <GdTaskList :tasks="sampleTasks" />
  </div>
</template>

<script>
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdTaskList from '@/components/ui/GdTaskList.vue'
import GdDropdown from '@/components/ui/GdDropdown.vue'

export default {
  name: 'GdCaixaEntrada',
  components: {
    GdFilterBar,
    GdTaskList,
    GdDropdown,
  },
  data() {
    return {
      sampleTasks: [
        {
          id: '2354545/45222',
          title: 'Solicitação à Fábrica de Software',
          badgeText: 'FA',
          badgeColor: 'blue',
          sender: {
            name: 'Arthur Affonso de Barros Marinho',
            role: 'Presidente - CONSELHO',
          },
          type: 'Solicitação à Fábrica de Software',
          flow: {
            name: 'Férias',
            steps: [
              { name: 'Iniciado', completed: true },
              { name: 'Em Análise', completed: true },
              { name: 'Aguardando Aprovação', completed: false },
              { name: 'Concluído', completed: false },
            ],
          },
          digitalFolder:
            'Grupo Imagetech > Diretoria de Negócios > Fábrica de Software',
          project: 'Comunica Cidadão',
          serviceProvidedBy: 'Luciano S Lopez',
          paymentDate: '10/02/2025',
          unit: 'Fábrica de Software',
          dueDate: { text: 'Vencido faz 5 dias', status: 'overdue' },
        },
        {
          id: '2354545/45223',
          title: 'Aprovação de Documento Financeiro',
          badgeText: 'FN',
          badgeColor: 'green',
          sender: { name: 'Maria Silva', role: 'Gerente Financeiro' },
          type: 'Aprovação de Despesa',
          flow: {
            name: 'Aprovação de Gasto',
            steps: [
              { name: 'Envio', completed: true },
              { name: 'Revisão', completed: true },
              { name: 'Assinatura', completed: false },
            ],
          },
          digitalFolder: 'Finanças > Contas a Pagar > 2025',
          project: 'Orçamento Anual',
          serviceProvidedBy: 'João Nogueira',
          paymentDate: '20/06/2025',
          unit: 'Contabilidade',
          dueDate: { text: 'Vence em 2 dias', status: 'due_soon' },
        },
        {
          id: '1234567/89012',
          title: 'Indicadores Diretoria de Negócios',
          badgeText: 'ID',
          badgeColor: 'purple',
          sender: { name: 'Carlos Santos', role: 'Diretor de Negócios' },
          type: 'Relatório Mensal',
          flow: {
            name: 'Geração de Relatório',
            steps: [
              { name: 'Coleta de Dados', completed: true },
              { name: 'Análise', completed: false },
              { name: 'Publicação', completed: false },
            ],
          },
          digitalFolder: 'Relatórios > Diretoria Negócios > Mensal',
          dueDate: { text: 'Sem prazo', status: 'none' },
        },
      ],
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>

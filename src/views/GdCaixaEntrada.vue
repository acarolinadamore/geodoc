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

    <GdCardList :tasks="sampleTasks" />
  </div>
</template>

<script>
import GdFilterBar from '@/components/ui/GdFilterBar.vue'
import GdCardList from '@/components/ui/GdCardList.vue'
import GdDropdown from '@/components/ui/GdDropdown.vue'

export default {
  name: 'GdCaixaEntrada',
  components: {
    GdFilterBar,
    GdCardList,
    GdDropdown,
  },
  data() {
    return {}
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>

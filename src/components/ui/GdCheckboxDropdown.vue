<template>
  <div class="relative">
    <button
      class="flex items-center px-3 py-2 bg-white border rounded cursor-pointer text-gray-700 hover:bg-gray-50"
      @click="aberto = !aberto"
    >
      <input
        type="checkbox"
        :checked="checkedAll"
        @change="manipularMudancaCheckbox"
        @click.stop
        class="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <svg
        class="w-4 h-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M19 9l-7 7-7-7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
    <div
      v-if="aberto"
      class="absolute z-10 left-0 mt-2 w-56 bg-white border rounded shadow"
    >
      <ul>
        <li v-for="action in actions" :key="action.value">
          <button
            @click="manipularAcao(action.value)"
            class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
          >
            {{ action.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkedAll: Boolean,
    actions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      aberto: false,
    }
  },
  methods: {
    manipularMudancaCheckbox() {
      this.$emit('toggle-all')
    },

    manipularAcao(valor) {
      this.$emit('action', valor)
      this.aberto = false
    },
  },
}
</script>

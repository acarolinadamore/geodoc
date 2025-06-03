<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button
      @click="toggleDropdown"
      class="flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
    >
      <slot name="button-content">
        <span v-if="text" class="mr-2">{{ text }}</span>
        <svg
          class="w-4 h-4 ml-1 transform transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
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
      </slot>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-56"
    >
      <slot name="dropdown-content">
        <a
          v-for="(item, index) in items"
          :key="index"
          href="#"
          class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >{{ item.label }}</a
        >
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdDropdown',
  props: {
    text: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [], // e.g., [{ label: 'Option 1' }]
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeDropdown() {
      this.isOpen = false
    },
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
}
</script>

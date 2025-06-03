<!-- GdBadge.vue -->
<template>
  <div :class="computedClasses" :style="computedStyles">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  name: 'GdBadge',
  props: {
    type: {
      type: String,
      default: 'rectangular', // 'circular', 'rectangular', 'status'
    },
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'gray', // 'blue', 'green', 'red', 'yellow', 'gray'
    },
    size: {
      type: String,
      default: 'medium', // 'small', 'medium', 'large'
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      let classes = [
        'flex items-center justify-center font-semibold whitespace-nowrap',
        'transition-colors duration-200',
      ]

      if (this.type === 'circular') {
        classes.push('rounded-full')
        if (this.size === 'small') classes.push('w-6 h-6 text-xs')
        else if (this.size === 'medium') classes.push('w-8 h-8 text-sm')
        else classes.push('w-10 h-10 text-base') // large
      } else if (this.type === 'rectangular' || this.type === 'status') {
        classes.push('rounded-md px-2 py-1 text-sm')
        if (this.size === 'small') classes.push('text-xs')
        else if (this.size === 'large') classes.push('text-base')
      }

      switch (this.color) {
        case 'blue':
          classes.push('bg-blue-100 text-blue-800')
          if (this.isClickable) classes.push('hover:bg-blue-200')
          break
        case 'green':
          classes.push('bg-green-100 text-green-800')
          if (this.isClickable) classes.push('hover:bg-green-200')
          break
        case 'red':
          classes.push('bg-red-100 text-red-800')
          if (this.isClickable) classes.push('hover:bg-red-200')
          break
        case 'yellow':
          classes.push('bg-yellow-100 text-yellow-800')
          if (this.isClickable) classes.push('hover:bg-yellow-200')
          break
        case 'dark-blue':
          classes.push('bg-blue-600 text-white')
          if (this.isClickable) classes.push('hover:bg-blue-700')
          break
        case 'dark-red':
          classes.push('bg-red-600 text-white')
          break
        default:
          classes.push('bg-gray-200 text-gray-800')
          if (this.isClickable) classes.push('hover:bg-gray-300')
          break
      }

      if (this.isClickable) {
        classes.push('cursor-pointer')
      }

      return classes.join(' ')
    },
    computedStyles() {
      if (this.color === 'dark-red') {
        return { backgroundColor: '#CC0000' }
      }
      return {}
    },
  },
}
</script>

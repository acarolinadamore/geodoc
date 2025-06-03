<template>
  <div class="flex items-center space-x-1">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'w-2 h-2 rounded-full',
        { 'bg-green-500': step.completed, 'bg-red-500': !step.completed },
      ]"
      :title="step.name"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'GdEtapasResumo',
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
}
</script>

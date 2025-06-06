<template>
  <span class="gd-tag" :title="text">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'GdTag',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.gd-tag {
  display: inline-block;
  background-color: #1a82d9;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
</style>

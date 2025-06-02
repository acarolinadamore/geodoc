<template>
  <div :class="['flex flex-col', alignContainer, className]">
    <h1 :class="[size, 'font-bold', textAlign, textColor]">
      <slot />
    </h1>

    <div
      v-if="showUnderline"
      :class="[
        'h-1 mt-3',
        underlineAlign,
        linhaClassName || 'bg-gdgreen-500 w-28',
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'GdHeading',
  props: {
    size: {
      type: String,
      default: 'text-3xl',
    },
    align: {
      type: String,
      default: 'center',
    },
    color: {
      type: String,
      default: 'default',
    },
    underline: {
      type: [Boolean, String],
      default: true,
    },
    className: {
      type: String,
      default: '',
    },
    linhaClassName: {
      type: String,
      default: '',
    },
  },
  computed: {
    textAlign() {
      return (
        {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right',
        }[this.align] || 'text-center'
      )
    },
    alignContainer() {
      return (
        {
          left: 'items-start',
          center: 'items-center',
          right: 'items-end',
        }[this.align] || 'items-center'
      )
    },
    underlineAlign() {
      return (
        {
          left: 'self-start',
          center: 'self-center',
          right: 'self-end',
        }[this.align] || 'self-center'
      )
    },
    textColor() {
      return (
        {
          primary: 'text-primary',
          secondary: 'text-secondary',
          default: 'text-gray-700',
          'text-black': 'text-black',
        }[this.color] || 'text-gray-700'
      )
    },
    showUnderline() {
      return this.underline !== false && this.underline !== 'false'
    },
  },
}
</script>

<style scoped></style>

<!-- Exemplo de uso -->

<!--
<GdHeading>Com underline azul</GdHeading>

Alinhamento e underline
<GdHeading align="right">Alinhado à direita</GdHeading>

Remover underline 
<GdHeading :underline="false">Sem underline</GdHeading>

Como mudar cor da linha 
<GdHeading linhaClassName="bg-red-500 w-16">Com underline vermelho</GdHeading>
-->

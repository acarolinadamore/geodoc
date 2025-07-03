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
  name: 'Heading',
  props: {
    // Tamanho do titulo
    size: {
      type: String,
      default: 'text-3xl',
    },
    // Alinhamento do titulo
    align: {
      type: String,
      default: 'center',
    },
    // Cor do titulo
    color: {
      type: String,
      default: 'default',
    },
    // Com underline ou sem
    underline: {
      type: [Boolean, String],
      default: true,
    },
    // Classes para o container externo
    className: {
      type: String,
      default: '',
    },
    // Classes para personalizar a underline
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

<!-- 
Exemplo de uso do componente Heading

1. Com underline padrão (verde)
<Heading>Com underline padrão</Heading>

2. Alinhado à direita
<Heading align="right">Alinhado à direita</Heading>

3. Sem underline (explicitamente removido)
<Heading :underline="false">Sem underline</Heading>

4. Com underline customizado (vermelho e menor)
<Heading underlineClass="bg-red-500 w-16">Underline customizado</Heading>

 Props disponíveis:
- size (string): classe do tamanho da fonte (ex: text-2xl)
- align (string): left | center | right (default: center)
- color (string): primary | secondary | default | text-black
- underline (boolean ou string): true | false (default: true)
- containerClass (string): classes para o container externo
- underlineClass (string): classes para a personalizar underline
-->

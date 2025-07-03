<template>
  <button
    class="botao"
    :class="[classesComputadas, customClass]"
    @click="$emit('click')"
    :style="estiloBotao"
  >
    <span class="conteudo-botao">
      <i v-if="icon" :class="['fa', icon, 'icone-botao']"></i>
      <img v-else-if="iconSrc" :src="iconSrc" class="icone-img" alt="icon" />
      <slot v-if="$slots.default" />
      <span v-else-if="label" class="label">{{ label }}</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    iconSrc: { type: String, default: '' },
    bgColor: { type: String, default: '' },
    textColor: { type: String, default: '' },
    borderColor: { type: String, default: '' },
    height: { type: String, default: '42px' },
    width: { type: String, default: '' },
    variant: {
      type: String,
      default: 'filled',
      validator: val => ['filled', 'outlined'].includes(val),
    },
    customClass: { type: String, default: '' },
  },
  computed: {
    classesComputadas() {
      return {
        'bg-primary text-white': this.variant === 'filled' && !this.bgColor,
        'border border-primary text-primary':
          this.variant === 'outlined' && !this.borderColor,
      }
    },
    estiloBotao() {
      const estilo = {
        height: this.height,
        backgroundColor:
          this.variant === 'filled' ? this.bgColor : 'transparent',
        color: this.textColor,
        border:
          this.variant === 'outlined'
            ? `1px solid ${this.borderColor || this.textColor}`
            : 'none',
      }

      if (this.width) {
        estilo.width = this.width
      }

      return estilo
    },
  },
}
</script>

<style scoped>
.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0 12px;
  min-width: 160px;
  transition: transform 0.1s ease, background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.botao.w-full {
  width: 100% !important;
}

.botao.w-auto {
  width: auto !important;
}

.conteudo-botao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.icone-botao {
  font-size: 14px;
}

.icone-img {
  width: 18px;
  height: 18px;
}

.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.botao:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.botao:active {
  transform: scale(0.97);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1280px) {
  .botao.xl\:w-auto {
    width: 180px !important;
  }
}
</style>

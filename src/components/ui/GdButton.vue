<template>
  <button
    class="gd-button"
    :class="[computedClasses, customClass]"
    @click="$emit('click')"
    :style="buttonStyle"
  >
    <span class="button-content">
      <i v-if="icon" :class="['fa', icon, 'btn-icon']"></i>
      <img v-else-if="iconSrc" :src="iconSrc" class="btn-icon-img" alt="icon" />
      <slot v-if="$slots.default" />
      <span v-else-if="label" class="label">{{ label }}</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'GdButton',
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
    computedClasses() {
      return {
        'bg-primary text-white': this.variant === 'filled' && !this.bgColor,
        'border border-primary text-primary':
          this.variant === 'outlined' && !this.borderColor,
      }
    },
    buttonStyle() {
      const style = {
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
        style.width = this.width
      }

      return style
    },
  },
}
</script>

<style scoped>
.gd-button {
  @apply inline-flex items-center justify-center rounded-lg font-medium text-sm cursor-pointer;
  padding: 0 12px;
  width: 180px; /* Largura padrão via CSS */
  transition: transform 0.1s ease, background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Permitir que classes do Tailwind sobrescrevam a largura */
.gd-button.w-full {
  width: 100% !important;
}

.gd-button.w-auto {
  width: auto !important;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.btn-icon {
  font-size: 14px;
}

.btn-icon-img {
  width: 18px;
  height: 18px;
}

.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gd-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.gd-button:active {
  transform: scale(0.97);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1280px) {
  .gd-button.xl\:w-auto {
    width: 180px !important;
  }
}
</style>

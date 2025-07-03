<template>
  <div class="gd-notificacao-wrapper" ref="wrapper">
    <button class="gd-notificacao" ref="botao" @click="toggle">
      <div class="icon-wrapper">
        <img
          :class="{ 'sino-animado': unread > 0 && !visivel }"
          src="@/assets/icons/notification.svg"
          alt="Notificações"
        />

        <span v-if="unread > 0" class="badge">{{ unread }}</span>
      </div>
      <span class="text">Notificações</span>
    </button>

    <div
      v-if="visivel"
      class="painel-notificacoes"
      :style="posicaoPainel"
      @click.stop
    >
      <p>Você tem novas notificações!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notificacao',
  props: {
    unread: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visivel: false,
      posicaoPainel: {
        top: '0px',
        left: '0px',
      },
    }
  },
  methods: {
    toggle() {
      this.visivel = !this.visivel

      if (this.visivel) {
        this.$nextTick(() => {
          const rect = this.$refs.botao.getBoundingClientRect()
          this.posicaoPainel = {
            top: `${rect.top + window.scrollY}px`,
            left: `${rect.right + 10}px`,
          }
        })
      }
    },
    fechar() {
      this.visivel = false
    },
    handleClickOutside(event) {
      if (!this.$refs.wrapper.contains(event.target)) {
        this.fechar()
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style scoped>
.gd-notificacao-wrapper {
  position: relative;
}

.gd-notificacao {
  width: 100%;
  background-color: rgba(223, 237, 251, 0.2);
  border-radius: 10px;
  height: 45px;
  padding: 0 10px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.gd-notificacao:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.gd-notificacao img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.icon-wrapper {
  position: relative;
  width: 18px;
  height: 18px;
  margin-left: 5px;
  flex-shrink: 0;
}

.badge {
  position: absolute;
  top: -5px;
  right: -6px;
  background-color: #ff3b30;
  color: white;
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 999px;
  z-index: 2;
}

.text {
  font-size: 13px;
  font-weight: normal;
  color: white;
  line-height: 1;
  margin-left: 6px;
}

.painel-notificacoes {
  position: fixed;
  background-color: #1e2a38;
  color: white;
  width: 280px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  padding: 16px;
  z-index: 9999;
}
@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-15deg);
  }
  40% {
    transform: rotate(15deg);
  }
  60% {
    transform: rotate(-12deg);
  }
  80% {
    transform: rotate(12deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.sino-animado {
  animation: shake 2s ease-in-out infinite;
}
</style>

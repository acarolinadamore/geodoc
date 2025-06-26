<template>
  <div class="gd-card-container">
    <!-- Tag de Vencimento - Primeira no mobile/tablet -->
    <div class="gd-tag-container">
      <GdTagVencimento :dataVencimento="dataVencimento" />
    </div>

    <!-- Data e Hora do Documento - Segunda no mobile/tablet -->
    <div class="gd-data-hora-container">
      <p class="gd-data-documento">{{ formatDataHora(dataInicio) }}</p>
      <p class="gd-hora-documento">
        {{ formatHora(dataInicio) }}
      </p>
    </div>
  </div>
</template>

<script>
import GdTagVencimento from '@/components/ui/GdTagVencimento.vue'

export default {
  name: 'GdCardColunaData',
  components: {
    GdTagVencimento,
  },
  props: {
    dataInicio: {
      type: String,
      default: null,
    },
    dataVencimento: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    formatDataHora(dataISO) {
      if (!dataISO) return 'Data não informada'
      const data = new Date(dataISO)
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
    },

    formatHora(dataISO) {
      if (!dataISO) return ''
      const data = new Date(dataISO)
      return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
  },
}
</script>

<style scoped>
/* DESKTOP - Layout padrão (1280px+) */
.gd-card-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  width: 100%;
}

/* Desktop - Data/hora em cima */
.gd-data-hora-container {
  order: 1;
  text-align: start;
  padding: 0 16px;
  width: 100%;
}

/* Desktop - Tag embaixo */
.gd-tag-container {
  order: 2;
  width: 100%;
  display: flex;
  justify-content: start;
  padding: 0 16px;
}

.gd-data-documento {
  font-size: 22px;
  font-weight: 400;
  color: #2f2f2f;
  letter-spacing: -0.025em;
  margin: 0;
}

.gd-hora-documento {
  font-size: 14px;
  font-weight: 400;
  color: #bbbbbb;
  letter-spacing: 0.025em;
  margin: 0;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 4px;
}

/* MOBILE, TABLET E DESKTOP PEQUENO - 0px até 1279px */
@media screen and (max-width: 1279px) {
  .gd-card-container {
    padding: 0 !important;
    gap: 0 !important;
    align-items: stretch !important;
  }

  /* Tag em cima (sem padding, grudada na borda) */
  .gd-tag-container {
    order: 1 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Data/hora embaixo (com padding) */
  .gd-data-hora-container {
    order: 2 !important;
    padding: 16px !important;
    text-align: center !important;
    width: 100% !important;
  }
}

/* MOBILE específico - ajustes menores */
@media screen and (max-width: 640px) {
  .gd-data-hora-container {
    padding: 12px 16px !important;
  }

  .gd-tag-container {
    min-height: 52px !important;
  }
}

/* TABLET específico - 641px até 1023px */
@media screen and (min-width: 641px) and (max-width: 1023px) {
  .gd-data-hora-container {
    padding: 14px 16px !important;
  }
  .gd-tag-container {
    min-height: 52px !important;
  }
}

/* DESKTOP PEQUENO específico - 1024px até 1279px */
@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .gd-data-hora-container {
    padding: 16px !important;
  }

  .gd-tag-container {
    min-height: 52px !important;
  }
}

/* DESKTOP GRANDE - 1280px+ */
@media screen and (min-width: 1280px) {
  .gd-card-container {
    gap: 12px;
  }
}

@media screen and (max-width: 1279px) {
  .gd-card-container * {
    box-sizing: border-box;
  }

  .gd-card-container .gd-tag-container {
    flex-shrink: 0 !important;
  }

  .gd-card-container .gd-data-hora-container {
    flex-shrink: 0 !important;
  }
}
</style>

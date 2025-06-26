<template>
  <div class="caminho-container text-left">
    <!-- Se não há caminho -->
    <div v-if="!caminhoDigital || segmentos.length === 0" class="sem-caminho">
      <span class="texto-vazio">Sem pasta digital</span>
    </div>

    <!-- Caminho com flexbox -->
    <div v-else class="caminho-flexbox">
      <img
        src="@/assets/icons/yellow-folder.svg"
        alt="Pasta"
        class="folder-icon"
      />

      <div class="segmentos-wrapper">
        <span
          v-for="(segmento, idx) in segmentos"
          :key="`segmento-${idx}`"
          class="segmento-item"
        >
          <!-- ✅ SETA MAIOR COM MENOS ESPAÇO -->
          <img
            v-if="idx > 0"
            src="@/assets/icons/right-arrow.svg"
            alt=">"
            class="arrow-icon-maior"
          />

          <span class="segmento-texto">{{ formatarTitulo(segmento) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdCaminhoDiretorio',
  props: {
    caminhoDigital: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    segmentos() {
      if (!this.caminhoDigital) return []

      return this.caminhoDigital
        .split('/')
        .map(s => s.trim())
        .filter(Boolean)
    },
  },
  methods: {
    formatarTitulo(texto) {
      if (!texto) return ''

      const preposicoes = [
        'de',
        'da',
        'das',
        'do',
        'dos',
        'e',
        'em',
        'para',
        'por',
        'com',
      ]

      return texto
        .toLowerCase()
        .split(' ')
        .map((palavra, indice) => {
          if (indice === 0) {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1)
          }
          if (preposicoes.includes(palavra)) {
            return palavra
          }
          return palavra.charAt(0).toUpperCase() + palavra.slice(1)
        })
        .join(' ')
    },
  },
  mounted() {
    console.log('📁 GdCaminhoDiretorio mounted:')
    console.log('  - caminhoDigital:', this.caminhoDigital)
    console.log('  - segmentos:', this.segmentos)
  },
}
</script>

<style scoped>
.caminho-container {
  display: flex;
  flex-direction: column;
  min-height: 20px;
  width: 100%;
}

.sem-caminho {
  display: flex;
  align-items: center;
}

.texto-vazio {
  font-size: 11px;
  color: #9ca3af;
  font-style: italic;
}

.caminho-flexbox {
  display: flex;
  align-items: flex-start;
  gap: 4px; /* ✅ REDUZIDO de 6px para 4px */
  flex-wrap: nowrap;
  overflow: hidden;
}

.folder-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.segmentos-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1px; /* ✅ REDUZIDO de 2px para 1px */
  min-width: 0;
}

.segmento-item {
  display: flex;
  align-items: center;
  gap: 2px; /* ✅ REDUZIDO de 4px para 2px */
}

/* ✅ SETA MAIOR COM MENOS MARGEM */
.arrow-icon-maior {
  width: 16px; /* ✅ AUMENTADO de 12px para 16px */
  height: 16px; /* ✅ AUMENTADO de 12px para 16px */
  flex-shrink: 0;
  margin: 0 4px; /* ✅ REDUZIDO de 8px para 4px */
  filter: brightness(0) saturate(100%) invert(75%) sepia(6%) saturate(126%)
    hue-rotate(175deg) brightness(93%) contrast(92%);
}

.segmento-texto {
  color: #3f98d4;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  word-break: break-word;
  hyphens: auto;
}

/* Responsivo */
@media (max-width: 768px) {
  .caminho-flexbox {
    flex-wrap: wrap;
  }

  .segmentos-wrapper {
    flex-wrap: wrap;
  }

  .arrow-icon-maior {
    margin: 0 3px;
    width: 14px;
    height: 14px;
  }
}
</style>

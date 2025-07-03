<template>
  <div class="documento-container">
    <div class="space-y-1">
      <!-- Modelo -->
      <div class="flex items-center">
        <span class="card-span w-24 text-right flex-shrink-0">Modelo</span>
        <span class="ml-3 text-left gd-text-black">{{ documento.modelo }}</span>
      </div>

      <!-- Fluxo -->
      <div class="flex items-center">
        <span class="card-span w-24 text-right flex-shrink-0">Fluxo</span>
        <span class="ml-3 text-left gd-text-black">{{ documento.fluxo }}</span>
      </div>

      <!-- Etapas -->
      <div class="flex items-start">
        <span class="card-span w-24 text-right flex-shrink-0">Etapa</span>
        <div class="ml-3">
          <CardResumoEtapas :etapas="documento.etapas" />
        </div>
      </div>

      <!-- Pasta Digital -->
      <div class="flex items-start">
        <span class="card-span w-24 text-right flex-shrink-0"
          >Pasta Digital</span
        >
        <div class="ml-3">
          <CaminhoDiretorio :caminho-digital="documento.pastaDigital" />
        </div>
      </div>

      <!-- ID do Documento -->
      <div class="flex items-center">
        <span class="card-span w-24 text-right flex-shrink-0"
          >ID Documento</span
        >
        <span class="ml-3 text-left text-base font-normal gd-text-black">{{
          documento.id
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CardResumoEtapas from '@/components/CardResumoEtapas.vue'
import CaminhoDiretorio from '@/components/CaminhoDiretorio.vue'

export default {
  name: 'CardColunaDocumento',
  components: {
    CardResumoEtapas,
    CaminhoDiretorio,
  },
  props: {
    documento: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.documento-container {
  font-size: 14px;
  background-color: white;
  border-radius: 8px;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
  .documento-container .flex {
    flex-direction: column;
    align-items: flex-start;
  }

  .documento-container .card-span {
    width: auto;
    text-align: left;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .documento-container .ml-3 {
    margin-left: 0;
  }
}
</style>

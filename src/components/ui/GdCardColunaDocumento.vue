<template>
  <div class="p-2 rounded-lg text-sm flex flex-col space-y-2 bg-white">
    <div class="space-y-1">
      <div class="flex">
        <span class="gd-text-gray w-24 text-right flex-shrink-0"
          >ID Documento:</span
        >
        <span class="gd-text-black ml-3">{{ documento.id }}</span>
      </div>
      <div class="flex">
        <span class="gd-text-gray w-24 text-right flex-shrink-0"
          >Data Inicial:</span
        >
        <span class="gd-text-black ml-3">{{ documento.data }}</span>
      </div>
      <div class="flex">
        <span class="gd-text-gray w-24 text-right flex-shrink-0">Modelo:</span>
        <span class="gd-text-black ml-3">{{ documento.modelo }}</span>
      </div>
      <div class="flex">
        <span class="gd-text-gray w-24 text-right flex-shrink-0">Fluxo:</span>
        <span class="gd-text-black ml-3">{{ documento.fluxo }}</span>
      </div>
    </div>
    <div class="flex mt-2">
      <span class="gd-text-gray w-24 text-right flex-shrink-0">Etapa:</span>
      <div class="ml-3">
        <GdCardEtapasResumo :etapas="documento.etapas" />
      </div>
    </div>
    <div class="flex mt-2">
      <span class="gd-text-gray w-24 text-right flex-shrink-0"
        >Pasta Digital:</span
      >
      <div class="ml-3">
        <GdCaminhoDiretorio :dir-path="documento.dirPath" />
      </div>
    </div>
  </div>
</template>

<script>
import GdCardEtapasResumo from '@/components/ui/GdCardEtapasResumo.vue'
import GdCaminhoDiretorio from '@/components/ui/GdCaminhoDiretorio.vue'

export default {
  name: 'GdCardColunaDocumento',
  components: {
    GdCardEtapasResumo,
    GdCaminhoDiretorio,
  },
  props: {
    documento: {
      type: Object,
      required: true,
    },
  },
}
</script>

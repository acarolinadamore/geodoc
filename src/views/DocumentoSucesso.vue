<template>
  <div class="min-h-screen bg-gray-50">
    <GdHeader />

    <main class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="max-w-2xl w-full text-center">
        <!-- Usa underline por padrão -->
        <GdHeading>Com underline azul</GdHeading>

        <!-- Personaliza cor da linha -->
        <GdHeading linhaClassName="bg-gdgreen-500 w-16"
          >Com underline vermelho</GdHeading
        >

        <!-- Remove underline -->
        <GdHeading :underline="false">Sem underline</GdHeading>

        <!-- Alinhamento e underline -->
        <GdHeading align="right">Alinhado à direita</GdHeading>

        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Documento criado com sucesso!
        </h1>

        <div class="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>

        <div class="flex justify-center mb-8">
          <img
            :src="require('@/assets/images/documento-sucesso.png')"
            alt="Documento criado com sucesso"
            class="max-w-md w-full h-auto"
            style="width: 350px; height: auto"
          />
        </div>

        <p class="text-gdgreen-300">Texto verde</p>

        <p class="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Deseja configurar este documento para que ele se torne um processo?
        </p>

        <div class="space-y-4">
          <GdBtn
            variant="primary"
            size="large"
            @click="configureDocument"
            class="w-full max-w-xs"
          >
            Configurar Documento
          </GdBtn>

          <div>
            <GdBtn variant="link" @click="goToInbox">
              Ir para Caixa de Entrada
            </GdBtn>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import GdHeader from '../components/GdHeader.vue'
import GdBtn from '../components/GdBtn.vue'
import GdHeading from '../components/GdHeading.vue'

export default {
  name: 'DocumentoSuccesso',
  components: {
    GdHeader,
    GdBtn,
    GdHeading,
  },
  methods: {
    configureDocument() {
      console.log('Configurar documento')
    },
    goToInbox() {
      console.log('Ir para caixa de entrada')
      this.$navigateTo('home')
    },
  },
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.text-gray-800 {
  color: #1f2937;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.w-16 {
  width: 4rem;
}

.h-1 {
  height: 0.25rem;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.max-w-2xl {
  max-width: 42rem;
}

.w-full {
  width: 100%;
}

.text-center {
  text-align: center;
}

.text-gray-600 {
  color: #4b5563;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.max-w-md {
  max-width: 28rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.max-w-xs {
  max-width: 20rem;
}
</style>

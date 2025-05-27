<template>
  <div class="welcome-container">
    <div class="card">
      <h1>👋 Bem-vindo ao Front-End do Projeto GeoDoc</h1>
      <p>
        Este é Front-End do <strong>GeoDoc</strong>, uma aplicação moderna
        focada em gestao de processos internos, documentos e processos.
      </p>
      <p>
        <strong>Tecnologias utilizadas:</strong><br />
        Vue 2 · Vue Router · Vuex · Axios · SCSS · Componentes reutilizáveis
      </p>
      <p>
        Sinta-se à vontade para explorar os componentes, criar novas páginas e
        contribuir.
      </p>
      <p class="signature">— Equipe GeoDoc — Ana e Danilo</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoasVindas',
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
}

.card {
  background: #ffffff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  text-align: center;
}

.card h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.card p {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.signature {
  margin-top: 2rem;
  font-style: italic;
  color: #6b7280;
}
</style>

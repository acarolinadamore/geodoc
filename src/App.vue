<template>
  <div id="app">
    <nav>
      <router-link to="/">Boas Vindas</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/inicio">Inicio</router-link> |
      <router-link to="/novo-documento">Novo Documento</router-link> |
      <router-link to="/documento-sucesso">Documento Sucesso</router-link> |
      <router-link to="/exemplo">Biblioteca de Componentes</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  @apply font-sans text-center text-gray-800;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

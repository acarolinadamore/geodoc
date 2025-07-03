<template>
  <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <input type="text" placeholder="Usuário" v-model="username" />
      <input type="password" placeholder="Senha" v-model="password" />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitLogin() {
      // lógica de login aqui
      alert(`Tentando logar: ${this.username}`)
    },
  },
}
</script>

<style scoped>
.login-view {
  max-width: 300px;
  margin: 50px auto;
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>

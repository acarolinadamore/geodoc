import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

// Registro automático global de componentes Vue
const requireComponent = require.context('./components', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

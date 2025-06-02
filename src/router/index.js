import Vue from 'vue'
import VueRouter from 'vue-router'

import NovoDocumento from '../views/NovoDocumento.vue'
import CaixaEntrada from '../views/CaixaEntrada.vue'
import DocumentoSucesso from '../views/DocumentoSucesso.vue'
import InicioDashboard from '../views/InicioDashboard.vue'
import LoginView from '../views/LoginView.vue'
import BoasVindas from '@/views/BoasVindas.vue'
import ComponentesExemplo from '@/views/ComponentesExemplo.vue'
import UsuarioSimulado from '@/views/exemplos/UsuarioSimulado.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'boasVindas',
    component: BoasVindas,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/novo-documento',
    name: 'NovoDocumento',
    component: NovoDocumento,
  },
  {
    path: '/caixa-entrada',
    name: 'CaixaEntrada',
    component: CaixaEntrada,
  },
  {
    path: '/documento-sucesso',
    name: 'DocumentoSucesso',
    component: DocumentoSucesso,
  },
  {
    path: '/inicio',
    name: 'InicioDashboard',
    component: InicioDashboard,
  },
  {
    path: '/exemplo',
    name: 'ComponentesExemplo',
    component: ComponentesExemplo,
  },
  {
    path: '/exemplo-usuario',
    name: 'ExemploUsuario',
    component: UsuarioSimulado,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

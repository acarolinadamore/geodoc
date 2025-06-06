import Vue from 'vue'
import VueRouter from 'vue-router'

import NovoDocumento from '../views/NovoDocumento.vue'
import DocumentoSucesso from '../views/DocumentoSucesso.vue'
import GdInicio from '../views/GdInicio.vue'
import LoginView from '../views/LoginView.vue'
import BoasVindas from '@/views/BoasVindas.vue'
import ComponentesExemplo from '@/views/ComponentesExemplo.vue'
import UsuarioSimulado from '@/views/exemplos/UsuarioSimulado.vue'
import GdCaixaEntrada from '@/views/GdCaixaEntrada.vue'
import GdEnviados from '@/views/GdEnviados.vue'

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
    name: 'GdCaixaEntrada',
    component: GdCaixaEntrada,
  },
  {
    path: '/documento-sucesso',
    name: 'DocumentoSucesso',
    component: DocumentoSucesso,
  },
  {
    path: '/inicio',
    name: 'GdInicio',
    component: GdInicio,
  },
  {
    path: '/enviados',
    name: 'GdEnviados',
    component: GdEnviados,
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

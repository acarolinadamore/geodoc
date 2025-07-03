import Vue from 'vue'
import VueRouter from 'vue-router'

import NovoDocumento from '../views/NovoDocumento.vue'
import DocumentoSucesso from '../views/DocumentoSucesso.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import CaixaEntrada from '@/views/CaixaEntrada.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/novo-documento',
    name: 'NovoDocumento',
    component: NovoDocumento,
  },

  // ========================================
  // ROTAS DA CAIXA DE ENTRADA - ESPECÍFICAS
  // ========================================
  {
    path: '/caixa-entrada',
    name: 'CaixaEntrada',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'todos',
      titulo: 'Caixa de Entrada',
      isFixa: true,
    },
  },
  {
    path: '/recebidos',
    name: 'Recebidos',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'recebidos',
      titulo: 'Recebidos',
      isFixa: true,
    },
  },
  {
    path: '/configurar',
    name: 'Configurar',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'configurar',
      titulo: 'Configurar',
      isFixa: true,
    },
  },
  {
    path: '/solicitados',
    name: 'Solicitados',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'solicitados',
      titulo: 'Solicitados',
      isFixa: true,
    },
  },
  {
    path: '/agendamentos',
    name: 'Pré-agendamento',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'agendamentos',
      titulo: 'Pré-agendamento',
      isFixa: true,
    },
  },

  // ========================================
  // ROTA DINÂMICA PARA MARCADORES PERSONALIZADOS
  // ========================================
  {
    path: '/marcador/:marcadorId',
    name: 'MarcadorPersonalizado',
    component: CaixaEntrada,
    meta: {
      tipoAba: 'marcador',
      titulo: null, // Será definido dinamicamente
      isFixa: false,
    },
    props: route => ({
      marcadorId: route.params.marcadorId,
    }),
  },

  // ========================================
  // OUTRAS ROTAS EXISTENTES
  // ========================================
  {
    path: '/documento-sucesso',
    name: 'DocumentoSucesso',
    component: DocumentoSucesso,
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
  },

  // ========================================
  // ROTA 404 - FALLBACK
  // ========================================
  {
    path: '*',
    redirect: '/caixa-entrada',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

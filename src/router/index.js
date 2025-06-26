import Vue from 'vue'
import VueRouter from 'vue-router'

import NovoDocumento from '../views/NovoDocumento.vue'
import DocumentoSucesso from '../views/DocumentoSucesso.vue'
import GdInicio from '../views/GdInicio.vue'
import LoginView from '../views/LoginView.vue'
import BoasVindas from '@/views/BoasVindas.vue'
import ComponentesExemplo from '@/views/ComponentesExemplo.vue'
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

  // ========================================
  // ROTAS DA CAIXA DE ENTRADA - ESPECÍFICAS
  // ========================================
  {
    path: '/caixa-entrada',
    name: 'CaixaEntrada',
    component: GdCaixaEntrada,
    meta: {
      tipoAba: 'todos',
      titulo: 'Caixa de Entrada',
      isFixa: true,
    },
  },
  {
    path: '/recebidos',
    name: 'Recebidos',
    component: GdCaixaEntrada,
    meta: {
      tipoAba: 'recebidos',
      titulo: 'Recebidos',
      isFixa: true,
    },
  },
  {
    path: '/configurar',
    name: 'Configurar',
    component: GdCaixaEntrada,
    meta: {
      tipoAba: 'configurar',
      titulo: 'Configurar',
      isFixa: true,
    },
  },
  {
    path: '/solicitados',
    name: 'Solicitados',
    component: GdCaixaEntrada,
    meta: {
      tipoAba: 'solicitados',
      titulo: 'Solicitados',
      isFixa: true,
    },
  },
  {
    path: '/lembretes',
    name: 'Lembretes',
    component: GdCaixaEntrada,
    meta: {
      tipoAba: 'lembretes',
      titulo: 'Lembretes',
      isFixa: true,
    },
  },

  // ========================================
  // ROTA DINÂMICA PARA MARCADORES PERSONALIZADOS
  // ========================================
  {
    path: '/marcador/:marcadorId',
    name: 'MarcadorPersonalizado',
    component: GdCaixaEntrada,
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

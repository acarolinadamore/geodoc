<template>
  <div class="painel-cards">
    <!-- Card Pendentes (destaque) -->
    <div class="card-item card-destaque">
      <div class="card-conteudo">
        <h3 class="card-titulo">Pendentes</h3>
        <p class="card-valor" v-if="!carregando">
          {{ contadores.pendentes || 0 }}
        </p>
        <div class="card-loading" v-else>Carregando...</div>
        <router-link to="/painel/pendentes" class="card-link"
          >Ver todos</router-link
        >
      </div>
    </div>

    <!-- Outros Cards -->
    <div
      v-for="card in outrosCards"
      :key="card.chave"
      class="card-item card-normal"
    >
      <div class="card-conteudo">
        <h3 class="card-titulo">{{ card.titulo }}</h3>
        <p class="card-valor" v-if="!carregando">
          {{ contadores[card.chave] || 0 }}
        </p>
        <div class="card-loading" v-else>Carregando...</div>
        <router-link :to="card.link" class="card-link">Ver todos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPainel',
  props: {
    contadores: {
      type: Object,
      default: () => ({}),
    },
    carregando: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    outrosCards() {
      return [
        {
          chave: 'aConfigurar',
          titulo: 'A Configurar',
          link: '/painel/configurar',
        },
        {
          chave: 'recebidos',
          titulo: 'Recebidos',
          link: '/painel/recebidos',
        },
        {
          chave: 'solicitados',
          titulo: 'Solicitados',
          link: '/painel/solicitados',
        },
      ]
    },
  },
}
</script>

<style scoped>
.painel-cards {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.card-item {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.card-destaque {
  background-color: #fefce8;
  border-color: #fde047;
}

.card-normal {
  background-color: white;
  border-color: #e5e7eb;
}

.card-conteudo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-titulo {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.card-valor {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.card-destaque .card-valor {
  color: #ca8a04;
}

.card-loading {
  font-size: 0.875rem;
  color: #9ca3af;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.card-link {
  font-size: 0.75rem;
  color: #2563eb;
  text-decoration: underline;
  transition: color 0.15s ease-in-out;
}

.card-link:hover {
  color: #1e40af;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (min-width: 640px) {
  .painel-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .painel-cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .painel-cards {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .painel-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1025px) {
  .painel-cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>

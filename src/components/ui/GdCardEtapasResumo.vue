<template>
  <div>
    <ul class="passos-lista">
      <li v-for="(etapa, index) in etapas" :key="etapa.nome" class="passo-item">
        <div class="passo-conteudo">
          <div :class="circleClass(etapa.status)">
            <img
              v-if="etapa.status === 'completed'"
              src="@/assets/icons/green-check.svg"
              alt="Concluído"
              class="icone-concluido"
            />
            <span v-else :class="['numero', numeroCorClass(etapa.status)]">
              {{ index + 1 }}
            </span>
          </div>
          <span :class="['nome', nomeStatusClass(etapa.status)]">
            {{ etapa.nome }}
          </span>
        </div>
        <img
          v-if="index < etapas.length - 1"
          src="@/assets/icons/right-arrow.svg"
          alt="Próxima etapa"
          class="icone-seta"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GdCardEtapasResumo',
  props: {
    etapas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    circleClass(status) {
      switch (status) {
        case 'completed':
          return 'circle circle--outlined passo-concluido status-completed'
        case 'current':
          return 'circle circle--filled passo-atual status-current'
        case 'pending':
        default:
          return 'circle circle--filled passo-pendente status-pending'
      }
    },

    numeroCorClass(status) {
      switch (status) {
        case 'completed':
          return 'numero--concluido'
        case 'current':
          return 'numero--atual'
        case 'pending':
        default:
          return 'numero--pendente'
      }
    },

    nomeStatusClass(status) {
      switch (status) {
        case 'completed':
          return 'nome--concluido'
        case 'current':
          return 'nome--atual'
        case 'pending':
        default:
          return 'nome--pendente'
      }
    },
  },
}
</script>

<style scoped>
.passos-lista {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  list-style: none;
  margin: 0;
}

.passo-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.passo-conteudo {
  display: flex;
  align-items: center;
}

.circle {
  min-width: 16px;
  min-height: 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle--outlined {
  border: 1px solid #37c989;
  background-color: #fff;
}

.passo-atual.status-current.circle--filled {
  background-color: #1a82d9;
}
.passo-pendente.status-pending.circle--filled {
  background-color: #f3f3f3;
}

.icone-concluido {
  width: 14px;
  height: 14px;
}

.numero {
  font-size: 10px;
  font-weight: 500;
}

.numero--concluido {
  color: #37c989;
}
.numero--atual {
  color: #fff;
}
.numero--pendente {
  color: #b7b7b7;
}

.nome {
  margin-left: 4px;
  font-size: 12px;
}
.nome--concluido {
  color: #37c989;
  font-weight: 400;
}
.nome--atual {
  color: #1a82d9;
  font-weight: bold;
}
.nome--pendente {
  color: #b7b7b7;
  font-weight: 400;
}

.icone-seta {
  width: 16px;
  height: 16px;
}
</style>

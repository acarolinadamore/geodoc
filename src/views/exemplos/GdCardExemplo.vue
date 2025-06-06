<template>
  <div id="gd-card-exemplo-page" class="flex flex-col h-screen bg-gray-100">
    <main class="flex-grow overflow-auto p-6">
      <GdCardList :cards="cardsData" />
    </main>
  </div>
</template>

<script>
import GdCardList from '@/components/ui/GdCardList.vue'

export default {
  name: 'GdCardExemplo',
  components: {
    GdCardList,
  },
  data() {
    return {
      cardsData: [
        {
          id: '1',
          remetente: {
            name: 'Arthur Affonso de Barros Marinho',
            role: 'Presidente - CONSELHO',
          },
          type: 'Solicitação à Fábrica de Software',
          etapas: {
            currentStage: 'Etapa',
            stages: [
              { name: 'Solicitação', status: 'completed' },
              { name: 'Triagem', status: 'completed' },
              { name: 'Etapa', status: 'current' },
              { name: 'Aprovação', status: 'pending' },
              { name: 'Execução', status: 'pending' },
              { name: 'Conclusão', status: 'pending' },
            ],
          },
          projeto: {
            name: 'Comunica Cidadão',
            prestadorServico: 'Luciano S Lopez',
            pastaDigitalId: '2354545/45222',
            dirPath:
              'GRUPO IMAGETECH > DIRETORIA DE NEGÓCIOS > FÁBRICA DE SOFTWARE',
          },
          dataVencimento: {
            status: 'vencido',
            days: 5,
            unit: 'dias',
          },
        },
        {
          id: '2',
          remetente: {
            name: 'Maria Clara Silva',
            role: 'Analista de Projetos',
          },
          type: 'Requisição de Acesso',
          etapas: {
            currentStage: 'Atendimento',
            stages: [
              { name: 'Abertura', status: 'completed' },
              { name: 'Atendimento', status: 'current' },
              { name: 'Homologação', status: 'pending' },
            ],
          },
          projeto: {
            name: 'Sistema Interno de RH',
            prestadorServico: 'Equipe de TI',
            pastaDigitalId: '9876543/21098',
            dirPath: 'TI > INFRAESTRUTURA > ACESSOS',
          },
          dataVencimento: {
            status: 'vencendo',
            days: 2,
            unit: 'dias',
          },
        },
        {
          id: '3',
          remetente: {
            name: 'João Pedro Santos',
            role: 'Gerente de Contratos',
          },
          type: 'Aprovação de Contrato',
          etapas: {
            currentStage: 'Revisão Jurídica',
            stages: [
              { name: 'Criação', status: 'completed' },
              { name: 'Revisão Jurídica', status: 'current' },
              { name: 'Assinatura', status: 'pending' },
              { name: 'Arquivamento', status: 'pending' },
            ],
          },
          projeto: {
            name: 'Renovação de Licenças',
            prestadorServico: 'Departamento Jurídico',
            pastaDigitalId: '1122334/55667',
            dirPath: 'ADMINISTRAÇÃO > CONTRATOS > LICENÇAS',
          },
          dataVencimento: {
            status: 'vencendo',
            days: 7,
            unit: 'dias',
          },
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Estilos específicos para a página de exemplo, se necessário */
</style>

export default {
  async obterDadosPainel() {
    // Futuramente será uma chamada real para API
    return {
      usuario: { nome: 'Melanie' },
      contadores: {
        pendentes: 2,
        aConfigurar: 2,
        recebidos: 8,
        solicitados: 4,
      },
      ultimosDocumentos: [
        {
          id: 1,
          titulo: 'Folha de Pagamento / Abril 2025',
          link: '/documento/1',
        },
        {
          id: 2,
          titulo: 'Contrato Prestador / Jurídico',
          link: '/documento/2',
        },
      ],
      preAgendamentos: [
        {
          id: 1,
          titulo: 'Documento pendente assinatura',
          link: '/documento/3',
        },
      ],
    }
  },
}

export default [
  {
    group: 'PRINCIPAL',
    items: [
      { name: 'Caixa de Entrada', route: '/caixa-entrada', icon: 'inbox.svg' },
      { name: 'Processos', route: '/inicio', icon: 'circle.svg' },
      { name: 'Pasta Digital', route: '/inicio', icon: 'folder.svg' },
      {
        name: 'Documentos',
        route: '/inicio',
        icon: 'document.svg',
      },
    ],
  },
  {
    group: 'ANÁLISE',
    items: [
      {
        name: 'Relatórios',
        route: '/inicio',
        icon: 'bar-chart.svg',
      },
      {
        name: 'Painéis BI',
        route: '/inicio',
        icon: 'bar-chart.svg',
      },
    ],
  },
]

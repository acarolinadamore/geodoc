export default [
  {
    group: 'PRINCIPAL',
    items: [
      { name: 'Caixa de Entrada', route: '/caixa-entrada', icon: 'inbox.svg' },
      { name: 'Processos', route: '/inicio', icon: 'circle.svg' },
      { name: 'Pasta Digital', route: '/inicio', icon: 'folder.svg' },
      {
        name: 'Documentos',
        route: '/novo-documento',
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
  {
    group: 'CONFIGURAÇÕES',
    items: [
      { name: 'Cadastrar', route: '/inicio', icon: 'plus.svg' },
      { name: 'Impressora', route: '/', icon: 'printer.svg' },
    ],
  },
  {
    group: 'EXEMPLOS',
    items: [
      { name: 'Pagina nova', route: '/inicio', icon: 'plus.svg' },
      { name: 'Pagina nova', route: '/exemplo-usuario', icon: 'plus.svg' },
    ],
  },
]

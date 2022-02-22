module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando Elasticsearch Plugin Documentation',
  base: '/elasticsearch/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/elasticsearch/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/elasticsearch/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/elasticsearch',
    sidebarHeader: {
      enabled: true,
      title: 'Elasticsearch Plugin',
      icon: '/images/elasticsearchicon.png',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.md',
      },
      '/config.md',
      '/caveats.md',
      '/extensions.md',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Accessing Elasticsearch Logs',
            link: '/accessing-logs.md',
          },
          {
            text: 'Installing extensions',
            link: '/installing-extensions.md',
          },
          {
            text: 'Installing node',
            link: '/installing-node.md',
          },
        ],
      },
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/elasticsearch/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/elasticsearch/releases'},
      '/development.md',
    ],
  },
};

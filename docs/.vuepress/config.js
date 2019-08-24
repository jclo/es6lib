// Title:
module.exports = {
  title: 'ES6lib',
  description: 'A template for writing ES6 Javascript libraries',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/es6lib' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}

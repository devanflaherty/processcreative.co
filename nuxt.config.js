module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ProcessCreative',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jesse Lusko is a speaker and evangelist.' },
      // { name: 'theme-color', content: '#005236' },
      // { name: 'robots', content: 'all' },
      // { property: 'og:url', content: 'http://jesselusko.com' },
      // { property: 'og:image', content: 'http://jesselusko.com/unfurl.png' },
      // { property: 'og:title', content: 'JesseLusko.com' },
      // { property: 'og:description', content: 'Jesse Lusko is a speaker and evangelist.' },
      // { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:domain', value: 'http://jesselusko.com' },
      // { name: 'twitter:title', value: 'JesseLusko.com' },
      // { name: 'twitter:description', value: 'Jesse Lusko is a speaker and evangelist.' },
      // { name: 'twitter:image', content: 'http://jesselusko.com/unfurl.png' },
      // { name: 'twitter:url', value: 'http://jesselusko.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      // { rel: 'image_src', href: 'http://jesselusko.com/unfurl.png' },
      // { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' }
    ],
    script: [
      // { src: '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/styles/main.scss', lang: 'scss' }
  ],
  loading: { color: '#000' },
  /*
  ** Add modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/font-awesome'
  ],
  plugins: [
    { src: `~plugins/vue-lazyload`, ssr: false },
    { src: `~plugins/storyblok`, ssr: false },
    { src: `~plugins/root`, ssr: false },
    { src: `~plugins/teaser`, ssr: false },
    { src: `~plugins/vue-smooth-scroll`, ssr: false },
    { src: `~plugins/vue-scroll-reveal`, ssr: false }
  ],
  router: {
    middleware: ['toggleMobileNav']
  },
  build: {
    // Load plugins in build
    vendor: ['axios', 'storyblok-vue', 'vue-lazyload', 'vue-smooth-scroll', 'vue-scroll-reveal'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}

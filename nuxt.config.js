const env = require('./.env')
const http = require('./config/http')
const loader = require('./config/loader')
const webpack = require('webpack')

module.exports = {
  cache: true,
  plugins: [
    { src: '~/plugins/analytics.js', ssr: false },
    { src: '~/plugins/helpers.js' },
    { src: '~/plugins/share.js' },
    { src: '~/plugins/modal.js' },
    { src: '~/plugins/imagelazy.js' },
    { src: '~/plugins/geetest.js', ssr: false },
    { src: '~/plugins/validate.js', ssr: false }
  ],
  modules: [
    ['@nuxtjs/google-analytics', { ua: 'UA-80338273-2' }],
    ['@nuxtjs/axios', http.config],
  ],
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | riuir 天下漫友是一家',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: 'riuir，兴趣使然的二次元综合网站' },
      { hid: 'keywords', name: 'keywords', content: 'riuir，动漫，ACG，二次元，视频，番剧，动画，新番，神作' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '//cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' },
      { innerHTML: env.script.baiduStat, type: 'text/javascript' },
      { innerHTML: env.script.baiduPush, type: 'text/javascript' }
    ],
    __dangerouslyDisableSanitizers: 'script'
  },
  css: [
    '~/assets/css/global.scss'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00a1d6' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'js-cookie'
    ],
    extractCSS: true,
    postcss: [
      require('autoprefixer')({
        browsers: [
          'last 3 versions',
          'ie >= 9'
        ]
      })
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      config.module.rules.forEach((rule) => {
        if (loader.isVueRule(rule)) {
          rule.options.loaders.sass.push(loader.sassResourcesLoader)
          rule.options.loaders.scss.push(loader.sassResourcesLoader)
        }
        if (loader.isSASSRule(rule)) {
          rule.use.push(loader.sassResourcesLoader)
        }
      })
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

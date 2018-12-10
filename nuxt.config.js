const qiniu = require('./qiniu')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const injectScript = require('./.script')

module.exports = {
  mode: 'universal',
  env: {
    API_URL: isDev ? 'http://localhost:3099/' : 'http://localhost/',
    API_URL_BROWSER: isDev
      ? 'http://localhost:3099/'
      : 'https://api.calibur.tv/',
    SENTRY_URL: 'https://c89b4ce2cfbf44e3bab148e0b7fa31df@sentry.io/1243412',
    RELEASE: new Date().toLocaleString()
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '天下漫友是一家',
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - calibur` : '天下漫友是一家 - calibur'
    },
    htmlAttrs: {
      lang: 'zh-CN'
    },
    bodyAttrs: {
      id: 'calibur-tv'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,maximum-scale=1'
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'force-rendering', content: 'webkit' },
      {
        hid: 'description',
        name: 'description',
        content: '一个兴趣使然的二次元综合网站'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'calibur，咖喱棒, 动漫，ACG，二次元，视频，番剧，动画，新番，神作, 排行榜, 贴吧, 盖楼, 应援, 帖子, 在线'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: `https://image.calibur.tv/favicon.ico`
      }
    ],
    script: [
      {
        innerHTML: injectScript.baiduStat,
        type: 'text/javascript',
        async: true
      },
      {
        innerHTML: injectScript.baiduPush,
        type: 'text/javascript',
        async: true
      }
    ],
    __dangerouslyDisableSanitizers: 'script'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00a1d6' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/global.scss', 'normalize.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/element-ui',
    '~/plugins/global-prototype',
    '~/plugins/global-component',
    { src: '~/plugins/client-prototype', ssr: false },
    { src: '~/plugins/client-namespace', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    sass: ['./assets/css/variables.scss', './assets/css/mixins.scss']
  },

  /**
   * Global middleware
   */
  router: {
    middleware: ['route-change'],
    extendRoutes(routes) {
      for (const route of routes) {
        const props = /:/.test(route.path)
        route.props = props
        if (route.children) {
          for (const item of route.children) {
            item.props = props
          }
        }
      }
      routes.push({
        name: 'error-fallback',
        path: '*',
        component: resolve('pages/error/404.vue')
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true,
    plugins: (() => {
      const result = [new LodashModuleReplacementPlugin({ shorthands: true })]
      return isDev
        ? result.concat([])
        : result.concat([
            new CompressionPlugin({
              test: /\.(js|css|html)$/
            }),
            new BrotliPlugin({
              test: /\.(js|css|html)$/
            })
          ])
    })(),
    loaders: {
      cssModules: {
        localIdentName: '[local]-[hash:base64:2]',
        camelCase: true
      }
    },
    publicPath: isDev ? '/_nuxt/' : `${qiniu.host}${qiniu.key_prefix}`,
    babel: {
      plugins: [
        'babel-plugin-lodash',
        [
          'component',
          {
            libraryName: 'mint-ui',
            style: true
          },
          'mint-ui'
        ],
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          },
          'element-ui'
        ]
      ]
    }
  }
}

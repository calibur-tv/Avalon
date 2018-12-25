const qiniu = require('./qiniu')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const injectScript = require('./.script')
const SentryPlugin = require('./assets/js/webpack.sentry.plugin.js')
const releaseTag = new Date().toLocaleString()

module.exports = {
  mode: 'universal',
  env: {
    API_URL: isDev ? 'http://118.24.118.98:8081/' : 'http://localhost/',
    API_URL_BROWSER: isDev
      ? 'http://118.24.118.98:8081/'
      : 'https://api.calibur.tv/',
    SENTRY_URL: 'https://5c1d2b169b09423abb6a74227a64c3c4@sentry.io/1352871',
    RELEASE: releaseTag
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

  axios: {
    debug: false,
    proxyHeaders: true,
    progress: false
  },

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
      if (!isDev && isClient) {
        config.devtool = 'hidden-source-map'
      }
    },
    extractCSS: true,
    plugins: (() => {
      const result = [new LodashModuleReplacementPlugin({ shorthands: true })]
      return isDev
        ? result.concat([])
        : result.concat([
            new SentryPlugin({
              project: 'www-xt',
              include: /\.js(\.map)?$/,
              organisation: 'calibur',
              token:
                '5b02ddc4b7894347952d08e1f5563b9c2a845347bb234acf9fedd73210cbbd8b',
              release: releaseTag,
              suppressErrors: !isDev,
              deleteAfterCompile: false,
              filenameTransform: filename => {
                return `~/www/${filename}`
              }
            }),
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

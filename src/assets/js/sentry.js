import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default class {
  constructor({ url, version, env }) {
    this.url = url
    this.version = version
    this.env = env
  }

  init() {
    try {
      Raven.config(this.url, {
        release: this.version,
        environment: this.env,
        ignoreUrls: [/^file:\/\//],
        shouldSendCallback(data) {
          let shouldSend = true
          try {
            const exception = data.exception.values[0]
            shouldSend = exception.stacktrace.frames.length > 1
          } catch (e) {
            shouldSend = false
          }
          return shouldSend
        },
        ignoreErrors: [
          'Unexpected token', // https://stackoverflow.com/questions/29763557/syntaxerror-unexpected-token-o-at-object-parse-native-angularjs
          'TuiaMedia is not defined',
          /MyAppGet.*AtPoint/,
          /UCArticleFinderJS/,
          '网络错误',
          '网络请求超时',
          '您找的资源不存在',
          'Cannot read property',
          'is not defined',
          'is not a function',
          'is not an object (evaluating', // https://github.com/facebook/react-native/issues/17348
          "canvasList.forEach is not a function. (In 'canvasList.forEach', 'canvasList.forEach' is undefined)",
          /<anonymous>/,
          'Maximum call stack size exceeded', // QQ Browser 9.0.2524
          /('indexOf' of undefined|this.position.indexOf)/, // element-ui notification bug
          'native code',
          /Cannot read property '(\w|\W)+' of (undefined|null)/, // https://github.com/vuejs/vue/issues/8399
          "Can't find variable:",
          'Not implemented', // windows7 音频播放的问题
          'Geetest',
          'too much recursion',
          'Failed to execute',
          'must be a dictionary',
          'Cannot redefine property',
          "Object doesn't support this action", // https://zenorocha.github.io/clipboard.js
          'undefined or null reference',
          'Unexpected end of input',
          'HTMLMediaElement',
          'nvalid regular expression: missing /',
          'this.position is undefined' // firefox element-UI notification horizontalClass
        ]
      })
        .addPlugin(RavenVue, Vue)
        .install()
    } catch (e) {
      Raven.captureException(e)
    }
  }

  report() {
    try {
      const dom = undefined
      const rect = dom.getBoundingClientRect()
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        (rect.left < window.innerWidth && rect.right > 0)
      )
    } catch (e) {
      e.message = '---------- test sentry report ----------'
      Raven.captureException(e)
    }
  }
}

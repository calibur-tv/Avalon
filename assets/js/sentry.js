import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default new class {
  constructor() {
    this.version = process.env.RELEASE
    this.env = process.env.NODE_ENV
    this.url = process.env.SENTRY_URL
    this.Raven = this.init()
    this.setExtrasData()
    return this
  }

  init() {
    try {
      Raven.config(this.url, {
        release: this.version,
        environment: this.env,
        whitelistUrls: [/calibur\.tv/],
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
          'Uncaught TypeError: value.hasOwnProperty is not a function',
          /网络/
        ]
      })
        .addPlugin(RavenVue, Vue)
        .install()
      return Raven
    } catch (e) {
      return null
    }
  }

  setPageInfo(pageName, abTest = 0) {
    try {
      Raven.setTagsContext({
        pageName,
        abTest
      })
    } catch (e) {}
  }

  setExtrasData({ requestId, viaId } = {}) {
    try {
      Raven.setTagsContext({
        'Request-Id': requestId || 'none',
        'Via-Id': viaId || 'none',
        'First-Referrer-Host': document.referrer.split('?')[0] || 'none'
      })
    } catch (e) {}
  }

  setUserInfo(user) {
    if (!user) {
      return
    }
    try {
      Raven.setUserContext(user)
    } catch (e) {}
  }

  setResponseStack(obj) {
    try {
      const context = Raven.getContext()
      const extra = { ...context.extra }
      extra['Response-Stack']
        ? extra['Response-Stack'].unshift(obj)
        : (extra['Response-Stack'] = [obj])
      if (extra['Response-Stack'].length > 5) {
        extra['Response-Stack'].pop()
      }
      Raven.setExtraContext()
      Raven.setExtraContext(extra)
    } catch (e) {}
  }

  setPageViewStack(url) {
    try {
      const context = Raven.getContext()
      const extra = { ...context.extra }
      extra['PageView-Stack']
        ? extra['PageView-Stack'].unshift(url)
        : (extra['PageView-Stack'] = [url])
      if (extra['PageView-Stack'].length > 5) {
        extra['PageView-Stack'].pop()
      }
      Raven.setExtraContext()
      Raven.setExtraContext(extra)
    } catch (e) {}
  }

  setRequestStack(obj) {
    try {
      const context = Raven.getContext()
      const extra = { ...context.extra }
      extra['Request-Stack']
        ? extra['Request-Stack'].unshift(obj)
        : (extra['Request-Stack'] = [obj])
      if (extra['Request-Stack'].length > 5) {
        extra['Request-Stack'].pop()
      }
      Raven.setExtraContext()
      Raven.setExtraContext(extra)
    } catch (e) {}
  }

  test() {
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
      console.log(e)
      Raven.captureException(e)
    }
  }
}()

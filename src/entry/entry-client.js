import 'es6-promise/auto'
import Vue from 'vue'
import { sentry, env } from 'env'
import { createApp } from '~/app.js'
import ProgressBar from '~/components/layouts/ProgressBar'
import Sentry from '~/assets/js/sentry'
import '~/assets/js/polyfill/blob'
import '~/utils/client'

const bar = new Vue(ProgressBar).$mount()

const dev = env === 'development'
const release = process.env.RELEASE || 'development'

document.body.appendChild(bar.$el)

const { app, router, store } = createApp()

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        ctx: store.state.login ? store.state.user.token : ''
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

window.M = window.M || Object.create(null)

const recorder = new Sentry({
  url: sentry.url,
  version: release,
  env
})
recorder.init()
M.sentry = recorder

if (!dev && typeof console !== 'undefined') {
  console.log(`Release: ${release}`) // eslint-disable-line
  console.log(`Environment: ${env}`) // eslint-disable-line
}

router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    const fullPath = to.fullPath

    if (store.state.login) {
      // 管理后台
      if (
        to.matched.some(record => record.meta.isAdmin) &&
        !store.state.user.is_admin
      ) {
        Vue.prototype.$toast.warning('您没有足够的权限访问该页面！')
        return next({
          path: '/errors/403',
          query: { redirect: fullPath }
        })
      }
    } else {
      // 用户个人页
      if (
        to.matched.some(record => record.meta.mustAuth || record.meta.isAdmin)
      ) {
        Vue.prototype.$toast.warning('继续操作前请先登录！')
        return next({
          path: '/errors/401',
          query: { redirect: fullPath }
        })
      }
    }

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter(
      (c, i) => diffed || (diffed = prevMatched[i] !== c)
    )
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)

    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()

    try {
      await Promise.all(
        asyncDataHooks.map(hook =>
          hook({
            ctx: store.state.login ? store.state.user.token : '',
            store,
            route: to
          })
        )
      )
      next()
    } catch (e) {
      Vue.prototype.$toast.error('网络请求失败，请稍后再试！')
      next(false)
    } finally {
      bar.finish()
    }
  })

  app.$mount('#app')
})

router.afterEach((to, from) => {
  if (!dev && !(from.name === null && from.fullPath === '/')) {
    _hmt.push(['_trackPageview', to.fullPath]) // eslint-disable-line no-undef
  }
  if (M && M.vueHub) {
    M.vueHub.$emit('page-switch')
  }
})

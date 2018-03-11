import 'es6-promise/auto'
import Vue from 'vue'
import { createApp } from '~/app.js'
import ProgressBar from '~/components/layouts/ProgressBar'
import '~/utils/client'

const dev = process.env.NODE_ENV === 'development'
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

window.M = Object.create(null)

router.afterEach((to) => {
  if (!dev) {
    _hmt.push(['_trackPageview', to.fullPath]) // eslint-disable-line no-undef
  }
})

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const asyncDataHooks = matched.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({
      ctx: store.state.login ? store.state.user.token : '',
      store,
      route: to
    }))).then(() => {
      bar.finish()
      next()
    }).catch(next)
  })

  app.$mount('#app')
})

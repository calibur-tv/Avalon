import { createApp } from '../app'

export default ssrContext => {
  const { app, router, store } = createApp()
  const meta = app.$meta()

  return new Promise((resolve, reject) => {
    router.push(ssrContext.url)
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ code: 404 })
      }
      if (store._actions.init) {
        try {
          await store.dispatch('init', { app, ctx: ssrContext.ctx })
        } catch (e) {
          reject(e)
        }
      }
      try {
        await Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
          ctx: ssrContext.ctx,
          store,
          route: router.currentRoute
        })))
      } catch (e) {
        reject(e)
      }
      ssrContext.state = store.state
      ssrContext.meta = meta
      resolve(app)
    }, reject)
  })
}

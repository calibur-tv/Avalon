import { createApp } from '~/app.js';

export default (ssrContext) => {
  const { app, router, store } = createApp();
  const meta = app.$meta();

  return new Promise((resolve, reject) => {
    const url = ssrContext.url;
    router.push(url);
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ code: 404 });
      }
      const ctx = ssrContext.ctx;
      const routeMatched = router.currentRoute.matched;
      const useAuth = routeMatched.some(record => record.meta.useAuth);
      const mustAuth = routeMatched.some(record => record.meta.mustAuth);
      const mustAdmin = routeMatched.some(record => record.meta.isAdmin);
      try {
        if (mustAuth || mustAdmin) {
          await store.dispatch('initAuth', {
            ctx,
            must: true,
            admin: mustAdmin
          });
        }
        const matched = matchedComponents.map(({ asyncData }) => asyncData && asyncData({
          ctx,
          store,
          route: router.currentRoute,
        }));
        if (useAuth) {
          matched.unshift(store.dispatch('initAuth', {
            ctx,
            must: false,
            admin: false
          }));
        }
        await Promise.all(matched);
        ssrContext.state = store.state;
        ssrContext.meta = meta;
        resolve(app);
      } catch (e) {
        reject(e);
      }
    }, reject);
  });
};

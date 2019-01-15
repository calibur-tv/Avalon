export default ({ store, route, isClient }) => {
  store.dispatch('getNotification')
  if (isClient) {
    _hmt && _hmt.push(['_trackPageview', route.fullPath])
    M.sentry.setPageInfo(route.name)
    M.sentry.setPageViewStack(route.fullPath)
  }
}

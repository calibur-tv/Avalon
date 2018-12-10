export default ({ store, route, isClient }) => {
  const isSigned = store.state.login
  if (isSigned) {
    store.dispatch('getNotification')
  }
  if (isClient) {
    _hmt && _hmt.push(['_trackPageview', route.fullPath])
    M.sentry.setPageInfo(route.name)
    M.sentry.setPageViewStack(route.fullPath)
  }
}

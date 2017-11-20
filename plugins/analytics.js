export default ({ app }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  (function () {
    const s = document.getElementsByTagName('script')[0]
    /* 360统计 */
    const qh = document.createElement('script')
    qh.async = true
    qh.defer = true
    qh.src = '//s.union.360.cn/203477.js'
    s.parentNode.insertBefore(qh, s)
  })()
  /*
   ** 每次路由变更时进行pv统计
   */
  app.router.afterEach((to) => {
    // eslint-disable-next-line
    _hmt.push(['_trackPageview', to.fullPath])
  })
}

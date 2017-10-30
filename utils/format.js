export default {
  /**
   * [ timeLong 格式化 time 为 YYYY-MM-DD HH:mm 格式 ]
   * @param time [ 时间戳或标准时间格式，如：Fri, 11 Aug 2017 18:06:04 CST +08:00 | 1502445964000 | 1502445964 ]
   * @returns {string}
   */
  timeLong (time) {
    const formatTime = typeof time === 'number'
      ? time.toString().length === 13 ? time : time * 1000
      : time
    const date = new Date(formatTime)
    return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).substr(-2)}-${(`0${date.getDate()}`).substr(-2)} ${(`0${date.getHours()}`).substr(-2)}:${(`0${date.getMinutes()}`).substr(-2)}`
  },

  /**
   * [ timeAgo 格式化文章发布时间 ]
   * @param time
   * @returns {string}
   */
  timeAgo (time) {
    const ctxTime = new Date(time)
    const curTime = new Date()
    const ctxTimestamp = ctxTime.getTime()
    const curTimestamp = curTime.getTime()
    const today = new Date().setHours(0, 0, 0, 0)
    const delta = (curTimestamp - ctxTimestamp) / 1000
    const deltaDay = (today - ctxTimestamp) / 86400000
    if (deltaDay < 0) {
      if (delta < 60) {
        return '几秒前'
      } else if (delta < 3600) {
        return `${parseInt(delta / 60, 10)}分钟前`
      }
      return `${parseInt(delta / 3600, 10)}小时前`
    }
    const compute = this.timeLong(ctxTimestamp).replace(/-/g, '.')
    if (ctxTime.getFullYear() !== curTime.getFullYear()) {
      return compute // YYYY.MM.DD HH:mm (今年以前)
    } else if (deltaDay > 2) {
      return compute.substr(5) // MM.DD HH:mm (前天之前)
    } else if (deltaDay > 1) {
      return `前天 ${compute.substr(11)}` // 前天 HH:mm
    }
    return `昨天 ${compute.substr(11)}` // 昨天 HH:mm
  }
}

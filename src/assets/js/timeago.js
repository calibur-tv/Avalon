import timeago from 'timeago.js'

const instance = timeago()
const timeLong = time => {
  const formatTime = /^\d+$/.test(time) && time.toString().length === 13
    ? parseInt((time - 0) / 1000, 10)
    : time
  const date = new Date(formatTime)
  return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).substr(-2)}-${(`0${date.getDate()}`).substr(-2)} ${(`0${date.getHours()}`).substr(-2)}:${(`0${date.getMinutes()}`).substr(-2)}`
}

export default {
  name: 'v-time',
  props: {
    value: {
      default: parseInt(Date.now() / 1000, 10).toString()
    }
  },
  render: function (createElement) {
    return createElement('time', {
      attrs: {
        datetime: timeLong(this.value)
      }
    })
  },
  mounted () {
    instance.render(this.$el, 'zh_CN')
  },
  beforeDestroy () {
    timeago.cancel(this.$el)
  }
}

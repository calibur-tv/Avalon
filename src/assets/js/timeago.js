import timeago from 'timeago.js'

const instance = timeago()

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
        datetime: this.$utils.timeLong(this.value)
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

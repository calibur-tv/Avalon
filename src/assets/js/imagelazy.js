const throttle = require('lodash/throttle')

export default {
  name: 'v-img',
  props: {
    tag: {
      type: String,
      default: 'img'
    },
    src: {
      required: true,
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    },
    scale: {
      type: [Number, String],
      default: 2
    },
    mode: {
      type: [Number, String],
      default: 1
    },
    events: {
      type: Array,
      default: function () {
        return ['scroll', 'resize']
      }
    }
  },
  render: function (createElement) {
    return createElement(this.tag, {
      attrs: {
        src: this.tag.toLowerCase() === 'img'
          ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA'
          : null
      }
    })
  },
  data () {
    return {
      listeners: {},
      resource: this.src,
      id: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      const image = this.$el
      if (this.$checkInView(image, (this.scale - 0))) {
        this.loadResource(image)
      }
      const id = this.$eventManager.add(document, this.events, throttle(() => {
        if (this.$checkInView(image, (this.scale - 0))) {
          this.loadResource(image)
          this.$eventManager.del(id)
        }
      }, 500))
    })
  },
  methods: {
    loadResource (image) {
      let src
      if (this.width && this.height) {
        src = this.$resize(this.resource, {
          width: (this.width - 0) * 2,
          height: (this.height - 0) * 2,
          mode: (this.mode - 0)
        })
      } else if (this.width) {
        src = this.$resize(this.resource, {
          width: (this.width - 0) * 2,
          mode: (this.mode - 0)
        })
      } else if (this.height) {
        src = this.$resize(this.resource, {
          height: (this.height - 0) * 2,
          mode: (this.mode - 0)
        })
      } else {
        src = this.resource
      }
      this.tag.toLowerCase() === 'img'
        ? image.setAttribute('src', src)
        : image.style.backgroundImage = `url(${src})`
    }
  }
}

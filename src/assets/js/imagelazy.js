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
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 2
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
    const image = this.$el
    if (this.$checkInView(image, this.scale)) {
      this.loadResource(image)
    }
    const id = this.$eventManager.add(document, this.events, throttle(() => {
      if (this.$checkInView(image, this.scale)) {
        this.loadResource(image)
        this.$eventManager.del(id)
      }
    }, 500))
  },
  methods: {
    loadResource (image) {
      let src
      if (this.width && this.height) {
        src = this.$resize(this.resource, {
          width: this.width,
          height: this.height
        })
      } else if (this.width) {
        src = this.$resize(this.resource, {
          width: this.width
        })
      } else if (this.height) {
        src = this.$resize(this.resource, {
          height: this.height
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

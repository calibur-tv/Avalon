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
    const id = this.$eventManager.add(document, this.events, this.$throttle(() => {
      if (this.$checkInView(image, this.scale)) {
        this.loadResource(image)
        this.$eventManager.del(id)
      }
    }, 500))
  },
  methods: {
    loadResource (image) {
      this.tag.toLowerCase() === 'img'
        ? image.setAttribute('src', this.resource)
        : image.style.backgroundImage = `url(${this.resource})`
    }
  }
}

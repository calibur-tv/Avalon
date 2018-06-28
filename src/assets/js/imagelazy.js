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
      default: 1.3
    },
    mode: {
      type: [Number, String],
      default: 1
    },
    events: {
      type: Array,
      default: function () {
        return ['scroll']
      }
    },
    id: {},
    aspect: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default: null
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  render: function (h) {
    if (!this.canRender) {
      return h(this.tag, {
        style: this.aspect ? {
          paddingBottom: `${this.aspect * 100}%`
        } : {}
      })
    }
    const containSize = this.full && this.source && this.source.width < window.innerWidth
    if (containSize) {
      return h('div',
        [
          h(this.tag, {
            'class': [
              'image-shim',
              {
                'image-lazy-init': this.aspect,
                'image-loading': this.loading
              }
            ],
            style: {
              width: `${this.source.width}px`,
              height: `${this.source.height}px`
            }
          })
        ]
      )
    }
    return h(this.tag, {
      'class': {
        'image-lazy-init': this.aspect,
        'image-loading': this.loading
      },
      style: this.aspect ? {
        paddingBottom: `${this.aspect * 100}%`
      } : {}
    })
  },
  data () {
    return {
      listeners: {},
      resource: this.src,
      canRender: false
    }
  },
  mounted () {
    this.canRender = true
    this.$nextTick(() => {
      if (this.$checkInView(this.$el, (this.scale - 0))) {
        this.loadResource(this.$el)
      } else {
        const id = this.$eventManager.add(document, this.events, this.$utils.throttle(() => {
          if (this.$checkInView(this.$el, (this.scale - 0))) {
            this.loadResource(this.$el)
            this.$eventManager.del(id)
          }
        }, 200))
        if (this.id) {
          this.$channel.$on(`image-load-${this.id}`, () => {
            this.loadResource(this.$el)
            this.$eventManager.del(id)
            this.$channel.$off(`image-load-${this.id}`)
          })
        }
      }
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
        src = this.$resize(this.resource)
      }

      const isImage = this.tag.toLowerCase() === 'img'
      const containSize = this.full && this.source && this.source.width < window.innerWidth
      const imageTag = containSize ? image.querySelector('.image-shim') : image
      const useFade = this.aspect

      if (isImage) {
        imageTag.setAttribute('src', src)
        if (useFade || this.loading) {
          imageTag.addEventListener('load', () => {
            imageTag.removeAttribute('style')
            imageTag.classList.remove('image-loading')
            if (useFade) {
              imageTag.classList.add('image-lazy-active')
              setTimeout(() => {
                imageTag.classList.remove('image-lazy-active', 'image-lazy-init')
              }, 300)
            }
          })
        }
      } else {
        this.$utils.setStyle(imageTag, 'background-image', `url(${src})`)
      }
    }
  }
}

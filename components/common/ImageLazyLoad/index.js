import comp from './ImageLazyLoad.vue'

const emptyImage =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

comp.install = function(Vue, opts = {}) {
  Vue.component(comp.name, {
    extends: comp,
    data() {
      return {
        heightLimit: opts.heightLimit || 0,
        placeholderImage: opts.placeholderImage || emptyImage,
        errorPlaceholder: opts.errorPlaceholder || emptyImage,
        errorMessage: opts.errorMessage || '图片加载失败，请点击重试',
        retryMessage: opts.retryMessage || '加载中...'
      }
    }
  })
}

export default comp

import Vue from 'vue'
import Alias from '~/assets/js/alias'
import Utils from '~/assets/js/utils'
import resizeImage from '~/assets/js/resizeImage'

Vue.use({
  install(Vue) {
    Vue.prototype.$utils = Utils

    Vue.prototype.$alias = Alias

    Vue.prototype.$resize = resizeImage
  }
})

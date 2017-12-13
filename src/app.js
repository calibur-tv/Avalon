import Vue from 'vue'
import App from './app.vue'
import '~/assets/css/global'
import { sync } from 'vuex-router-sync'
import { createStore } from '~/store'
import { createRouter } from '~/router'
import '~/utils'
import ImageLazy from '~/assets/js/imagelazy'
import Share from '~/assets/js/Share'
import NoSSR from '~/assets/js/nossr'
import Modal from '~/components/Modal'

Vue.component(ImageLazy.name, ImageLazy)
Vue.component(Share.name, Share)
Vue.component(Modal.name, Modal)
Vue.component(NoSSR.name, NoSSR)

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}

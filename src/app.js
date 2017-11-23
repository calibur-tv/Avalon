import Vue from 'vue'
import App from './app.vue'
import 'assets/css/global.scss'
import { sync } from 'vuex-router-sync'
import { createStore } from './store'
import { createRouter } from './router'
import './utils/elementUI'
import utils from './utils'
import ImageLazy from 'assets/js/imagelazy'
import Share from 'assets/js/Share'
import Modal from 'component/Modal.vue'

Vue.use(utils)
Vue.component(ImageLazy.name, ImageLazy)
Vue.component(Share.name, Share)
Vue.component(Modal.name, Modal)

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

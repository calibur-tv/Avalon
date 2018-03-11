import Vue from 'vue'
import App from './app.vue'
import '~/assets/css/global'
import { sync } from 'vuex-router-sync'
import { createStore } from '~/store'
import { createRouter } from '~/router'
import '~/utils'
import ImageLazy from '~/assets/js/imagelazy'
import NoSSR from '~/assets/js/nossr'
import Modal from '~/components/Modal'
import Banner from '~/components/layouts/Banner'
import Time from '~/assets/js/timeago'
import BangumiPanel from '~/components/panels/bangumi'
import NoContent from '~/components/NoContent'
import Hr from '~/components/base/Hr'
import Share from '~/components/base/Share'

Vue.component(ImageLazy.name, ImageLazy)
Vue.component(Share.name, Share)
Vue.component(Modal.name, Modal)
Vue.component(NoSSR.name, NoSSR)
Vue.component(Banner.name, Banner)
Vue.component(Time.name, Time)
Vue.component(BangumiPanel.name, BangumiPanel)
Vue.component(NoContent.name, NoContent)
Vue.component(Hr.name, Hr)
Vue.component(Share.name, Share)

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

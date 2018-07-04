import Vue from 'vue'
import VCharts from 'v-charts'
import SvgIcon from '@/components/SvgIcon'
import VPage from '@/components/Page'
import BangumiSearch from '@/components/Search/BangumiSearch'
import UserSearch from '@/components/Search/UserSearch'

Vue.component(SvgIcon.name, SvgIcon)
Vue.component(VPage.name, VPage)
Vue.component(BangumiSearch.name, BangumiSearch)
Vue.component(UserSearch.name, UserSearch)
Vue.use(VCharts)

if (typeof window !== 'undefined') {
  Vue.use(require('vue-moment'))
}

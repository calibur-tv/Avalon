import Vue from 'vue'
import VCharts from 'v-charts'
import SvgIcon from '@/components/SvgIcon'

Vue.component(SvgIcon.name, SvgIcon)
Vue.use(VCharts)

if (typeof window !== 'undefined') {
  Vue.use(require('vue-moment'))
}

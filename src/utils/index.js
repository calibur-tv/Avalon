import Vue from 'vue'
import lodash from './lodash'
import Alias from '~/assets/js/alias'
import env from 'env'
import {
  InfiniteScroll
} from 'mint-ui'

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Tag,
  Form,
  FormItem,
  Input,
  Button,
  DatePicker,
  Switch,
  Alert,
  Row,
  Col,
  Radio,
  RadioGroup,
  Tooltip,
  Select,
  Option,
  Upload
} from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Alert)
Vue.use(Col)
Vue.use(Row)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(InfiniteScroll)
Vue.use(Upload)

Vue.use({
  install (Vue, options) {
    Vue.prototype.$throttle = lodash.throttle

    Vue.prototype.$orderBy = lodash.orderBy

    Vue.prototype.$groupBy = lodash.groupBy

    Vue.prototype.$cdn = env.cdn

    Vue.prototype.$channel = new Vue()

    Vue.prototype.$alias = Alias

    Vue.prototype.$resize = (url, options = {}) => {
      if (url === '') {
        return ''
      }
      const link = url.match(/^http/) === null ? `${env.cdn.image}${url}` : url
      const canUseWebP = () => {
        if (Vue.prototype.$isServer) {
          return false
        }
        if (window.supportWebP !== undefined) {
          return window.supportWebP
        }

        const elem = document.createElement('canvas')

        if (elem.getContext && elem.getContext('2d')) {
          const support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
          window.supportWebP = support
          return support
        }

        return false
      }

      const format = canUseWebP() ? '/format/webp' : ''

      if (options.width && options.width > 0) {
        const width = `/w/${options.width}`
        const mode = options.mode === undefined ? 1 : options.mode
        const height = options.height ? `/h/${options.height}` : mode === 1 ? `/h/${options.width}` : ''

        return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
      }
      return `${link}?imageMogr2/auto-orient/strip${format}`
    }
  }
})

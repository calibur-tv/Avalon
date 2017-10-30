// env
import { host } from '~/.env'
// vendor
import Vue from 'vue'
import Cookies from 'js-cookie'
// utils
import { groupBy, orderBy, throttle } from '~/utils/lodash'
// services
import Backdrop from '~/services/backdrop'
import Toast from '~/services/toast'
// init
const Helpers = {}

Helpers.install = function (Vue, options) {
  Vue.prototype.$orderBy = orderBy

  Vue.prototype.$groupBy = groupBy

  Vue.prototype.$throttle = throttle

  Vue.prototype.$cdn = host.cdn

  Vue.prototype.$channel = new Vue()

  Vue.prototype.$backdrop = new Backdrop()

  Vue.prototype.$toast = new Toast()

  Vue.prototype.$cookie = Cookies

  Vue.prototype.$resize = (url, options = {}) => {
    if (url === '') {
      return ''
    }
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

      return `${url}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
    }
    return `${url}?imageMogr2/auto-orient/strip${format}`
  }

  Vue.prototype.$imageGrayLevel = (ele, hgt = 0) => {
    if (typeof window === 'undefined' || !ele) {
      return 0
    }

    let [data, width, height, length, i = -4, count = 0] = []

    const getRGB = (reallyImage) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext && canvas.getContext('2d')
      const rgb = { r: 0, g: 0, b: 0 }
      const blockSize = 5 // only visit every 5 pixels

      height = canvas.height = hgt || reallyImage.naturalHeight || reallyImage.offsetHeight || reallyImage.height
      width = canvas.width = reallyImage.naturalWidth || reallyImage.offsetWidth || reallyImage.width

      try {
        context.drawImage(reallyImage, 0, 0, width, height)
      } catch (e) {
        return rgb
      }
      try {
        data = context.getImageData(0, 0, width, height)
      } catch (e) {
        return rgb
      }

      length = data.data.length

      while ((i += blockSize * 4) < length) {
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
      }

      rgb.r = ~~(rgb.r / count)
      rgb.g = ~~(rgb.g / count)
      rgb.b = ~~(rgb.b / count)
      return rgb
    }

    const getGray = (rgb) => {
      return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114
    }

    return parseInt(getGray(getRGB(ele)), 10)
  }

  Vue.prototype.$scrollToY = (targetY, timer, dom, ease) => {
    let currentTime = 0
    const element = dom || window
    const scrollY = dom ? dom.scrollTop : window.scrollY
    const scrollTargetY = targetY || 0
    const speed = timer || 2000
    const easing = ease || 'easeOutSine'
    const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8))
    const easingEquations = {
      easeOutSine (pos) {
        return Math.sin(pos * (Math.PI / 2))
      },
      easeInOutSine (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1))
      },
      easeInOutQuint (pos) {
        // eslint-disable-next-line
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5)
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2)
      }
    }
    if (!element.requestAnimFrame) {
      element.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60)
          }
      }()).bind(window)
    }
    function tick () {
      currentTime += 1 / 60
      const p = currentTime / time
      const t = easingEquations[easing](p)
      if (p < 1) {
        element.requestAnimFrame(tick)
        element.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
      } else {
        element.scrollTo(0, scrollTargetY)
      }
    }
    tick()
  }

  Vue.prototype.$eventManager = (function () {
    class Manager {
      constructor () {
        this.id = 0
        this.listeners = {}
      }

      add (ele, evt, handler, capture = false) {
        const events = typeof evt === 'string' ? [evt] : evt
        const result = []
        events.forEach(e => {
          const id = this.id++
          ele.addEventListener(e, handler, capture)
          this.listeners[id] = {
            element: ele,
            event: e,
            handler,
            capture
          }
          result.push(id)
        })
        return result
      }

      del (id) {
        id.forEach(item => {
          if (this.listeners[item]) {
            const h = this.listeners[item]
            h.element.removeEventListener(h.event, h.handler, h.capture)
            Reflect.deleteProperty(this.listeners, item)
          }
        })
      }
    }
    return new Manager()
  }())

  Vue.prototype.$checkInView = (dom, scale = 1) => {
    const rect = dom.getBoundingClientRect()
    return (rect.top < window.innerHeight * scale && rect.bottom > 0) && (rect.left < window.innerWidth * scale && rect.right > 0)
  }
}
// bind
Vue.use(Helpers)

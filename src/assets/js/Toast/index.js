import Vue from 'vue'
import VueToast from './toast'

export default class {
  constructor () {
    this._vm = undefined
  }

  show (opt = {}) {
    if (typeof opt === 'string') {
      opt = {
        text: opt
      }
    }
    if (!document.getElementById('toast-container')) {
      this._selector = 'v-app-message-' + Math.random().toString(36).substring(3, 6)
      this._el = document.createElement('div')
      this._el.id = this._selector

      this._parent = (opt && opt.dom) ? opt.dom : document.body
      this._parent.appendChild(this._el)

      this._vm = new Vue(VueToast).$mount('#' + this._selector)
    }

    return this._vm.show(opt)
  }

  success (opt = {}) {
    if (typeof opt === 'string') {
      opt = {
        text: opt,
        type: 'success'
      }
    } else {
      opt = Object.assign(opt, {
        type: 'success'
      })
    }
    this.show(opt)
  }

  error (opt = {}) {
    if (typeof opt === 'string') {
      opt = {
        text: opt,
        type: 'error'
      }
    } else {
      opt = Object.assign(opt, {
        type: 'error'
      })
    }
    this.show(opt)
  }

  warning (opt = {}) {
    if (typeof opt === 'string') {
      opt = {
        text: opt,
        type: 'warning'
      }
    } else {
      opt = Object.assign(opt, {
        type: 'warning'
      })
    }
    this.show(opt)
  }

  clear () {
    this._vm.clear()
  }
}

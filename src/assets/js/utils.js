export default {
  shortenNumber(num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  camelize(string, uppercaseFirstLetter = true) {
    const camelizeString = string.replace(
      /(?:^|[-])(\w)/g,
      (_, c) => (c ? c.toUpperCase() : '')
    )
    if (uppercaseFirstLetter) {
      return camelizeString
    }
    return camelizeString[0].toLowerCase() + camelizeString.substring(1)
  },

  setStyle(element, styleName, value) {
    if (!element || !styleName) return

    if (typeof styleName === 'object') {
      for (const prop in styleName) {
        if (styleName.hasOwnProperty(prop)) {
          this.setStyle(element, prop, styleName[prop])
        }
      }
    } else {
      styleName = this.camelize(styleName, false) // eslint-disable-line no-param-reassign
      if (styleName === 'opacity' && Number(document.documentMode) < 9) {
        element.style.filter = isNaN(value)
          ? ''
          : `alpha(opacity=${value * 100})`
      } else {
        element.style[styleName] = value
      }
    }
  },

  throttle(func, wait, options) {
    let context, args, result
    let timeout = null
    let previous = 0
    if (!options) options = {}
    let later = function() {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      let now = Date.now()
      if (!previous && options.leading === false) previous = now
      let remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  },

  truncate(str = '', len = 200, startIndex = 0) {
    return str.substring(startIndex, len)
  },

  createFileName({ userId, type, file }) {
    return `user/${userId}/${type}/${new Date().getTime()}-${Math.random()
      .toString(36)
      .substring(3, 6)}.${file.type.split('/').pop()}`
  },

  getOffsetTop(elem) {
    let offsetTop = 0
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop
      }
    } while ((elem = elem.offsetParent)) // eslint-disable-line no-cond-assign
    return offsetTop
  }
}

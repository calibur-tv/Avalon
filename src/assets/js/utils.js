export default {
  shortenNumber (num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  camelize (string, uppercaseFirstLetter = true) {
    const camelizeString = string.replace(/(?:^|[-])(\w)/g, (_, c) => c ? c.toUpperCase() : '')
    if (uppercaseFirstLetter) {
      return camelizeString
    }
    return camelizeString[0].toLowerCase() + camelizeString.substring(1)
  },

  setStyle (element, styleName, value) {
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
        element.style.filter = isNaN(value) ? '' : `alpha(opacity=${value * 100})`
      } else {
        element.style[styleName] = value
      }
    }
  }
}

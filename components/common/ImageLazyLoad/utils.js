class Utils {
  constructor() {
    this.id = 0
    this.listeners = {}
  }

  checkInView(ele, scale = 1.3) {
    if (typeof window === 'undefined' || !(ele instanceof Element)) {
      return false
    }
    const rect = ele.getBoundingClientRect()
    return (
      rect.top < window.innerHeight * scale &&
      rect.bottom > 0 &&
      (rect.left < window.innerWidth * scale && rect.right > 0)
    )
  }

  on(element, evt, handler, capture = false) {
    const events = typeof evt === 'string' ? [evt] : evt
    const result = []
    events.forEach(event => {
      const id = this.id++
      element.addEventListener(event, handler, capture)
      this.listeners[id] = {
        element,
        event,
        handler,
        capture
      }
      result.push(id)
    })
    return result
  }

  off(ids) {
    ids.forEach(id => {
      if (this.listeners[id]) {
        const h = this.listeners[id]
        h.element.removeEventListener(h.event, h.handler, h.capture)
        delete this.listeners[id]
      }
    })
  }
}

export default new Utils()

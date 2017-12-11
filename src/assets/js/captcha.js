import Api from 'api/imageApi'

export default (params) => {
  const { type, elem, success, error } = typeof params === 'object' ? params : {}
  const api = new Api()
  const product = type || 'bind'
  api.getCaptcha().then((data) => {
    window.initGeetest({
      gt: data.id,
      challenge: data.secret,
      product: product,
      width: '100%',
      offline: true,
      new_captcha: 1
    }, (captcha) => {
      if (product === 'float') {
        captcha.appendTo(elem)
      } else if (product === 'bind') {
        captcha.onReady(() => captcha.verify())
      }
      captcha.onSuccess(() => typeof params === 'object'
        ? success && success({ data, captcha })
        : params({ data, captcha }))
    })
  }).catch(() => {
    error && error()
  })
}

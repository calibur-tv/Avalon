import Api from 'api/imageApi'

export default ({ type, elem, success, ready, error }) => {
  const api = new Api()
  api.getCaptcha().then((data) => {
    window.initGeetest({
      gt: data.id,
      challenge: data.secret,
      product: type || 'bind',
      width: '100%',
      offline: true,
      new_captcha: 1
    }, (captcha) => {
      if (type === 'float') {
        captcha.appendTo(elem)
      }
      captcha.onSuccess(() => {
        success && success({ data, captcha })
      })
      captcha.onReady(() => {
        ready && ready(captcha)
      })
    })
  }).catch(() => {
    error && error()
  })
}

import Api from '~/api/imageApi'
import './geetest'

export default (params) => {
  const { type, elem, success, error, ready, async, close } = typeof params === 'object' ? params : {}
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
      captcha.onReady(() => {
        ready && ready()
      })
      if (product === 'float') {
        captcha.appendTo(elem)
      } else if (product === 'bind') {
        if (!async) {
          captcha.onReady(() => captcha.verify())
        } else {
          elem.onclick = () => {
            captcha.verify()
          }
        }
      }
      captcha.onSuccess(() => typeof params === 'object'
        ? success && success({ data, captcha })
        : params({ data, captcha }))
      captcha.onError((err) => {
        error && error(err)
      })
      captcha.onClose(() => {
        close && close()
      })
    })
  }).catch((err) => {
    error && error(err)
  })
}

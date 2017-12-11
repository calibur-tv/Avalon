import Api from 'api/imageApi'
import { Notification as toast } from 'element-ui'

export default ({ type, success, ready, ele }) => {
  const api = new Api()
  api.getCaptcha().then((data) => {
    this.geetest = data
    window.initGeetest({
      gt: data.id,
      challenge: data.secret,
      product: type,
      width: '100%',
      offline: true,
      new_captcha: 1
    }, (captchaObj) => {
      resolve(captchaObj)
    })
  }).catch((err) => {
    err.message.forEach(tip => {
      toast.error(tip)
    })
  })
}

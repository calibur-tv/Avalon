import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('image/banner')
  }

  getCaptcha () {
    return this.http.post('image/captcha')
  }

  getUpToken () {
    return this.http.post('image/token')
  }

  uploadToQiniu (formData) {
    return this.http.post('https://up.qbox.me', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }
}

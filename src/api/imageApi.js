import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('cartoon/banner')
  }

  getCaptcha () {
    return this.http.post('door/captcha')
  }

  getUpToken ({ modal, type, id }) {
    return this.http.post('image/token', { modal, type, id })
  }

  uploadToQiniu (formData) {
    return this.http.post('https://up.qbox.me', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }
}

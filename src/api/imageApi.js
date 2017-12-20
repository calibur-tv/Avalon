import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('cartoon/banner')
  }

  getCaptcha () {
    return this.http.post('door/captcha')
  }

  getUpToken ({ model, type, id, setKey }) {
    return this.http.post('image/token', { model, type, id, setKey: setKey === undefined ? true : setKey })
  }

  uploadToQiniu (formData) {
    return this.http.post('https://up.qbox.me', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }
}

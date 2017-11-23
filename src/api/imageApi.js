import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('cartoon/banner')
  }

  getCaptcha () {
    return this.http.post('door/captcha')
  }
}

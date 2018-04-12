import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('image/banner')
  }

  getCaptcha () {
    return this.http.post('image/captcha')
  }

  getUpToken () {
    return this.http.post('image/uptoken')
  }

  uploadToQiniu (formData) {
    return this.http.post('https://up.qbox.me', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  getUploadType () {
    return this.http.get('image/uploadType')
  }

  uploadImage ({ url, width, height, bangumiId, roleId, tags, size, creator }) {
    return this.http.post('image/upload', { url, width, height, bangumiId, roleId, tags, size, creator })
  }

  deleteImage ({ id }) {
    return this.http.post('image/delete', { id })
  }

  trialReport ({ id }) {
    return this.http.post('image/report', { id })
  }
}

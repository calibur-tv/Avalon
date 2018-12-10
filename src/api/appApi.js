import BaseApi from './_baseApi'

export default class extends BaseApi {
  downloadUrl({ type }) {
    return this.http.get('app/version/check', {
      params: { type, version: '0.0.0' }
    })
  }
}

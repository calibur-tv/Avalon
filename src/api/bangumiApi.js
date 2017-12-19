import BaseApi from './_baseApi'

export default class extends BaseApi {
  getShow (id) {
    return this.http.get(`bangumi/${id}/show`)
  }

  follow (id) {
    return this.http.post(`bangumi/${id}/follow`)
  }

  released () {
    return this.http.get('bangumi/released')
  }

  timeline ({ time }) {
    return this.http.get('bangumi/timeline', { time })
  }

  tags () {
    return this.http.get('bangumi/tags')
  }

  category ({ id, page }) {
    return this.http.get('bangumi/category', {
      params: { id, page }
    })
  }
}

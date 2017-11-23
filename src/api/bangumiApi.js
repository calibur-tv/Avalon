import BaseApi from './_baseApi'

export default class extends BaseApi {
  getNews () {
    return this.http.get('bangumi/news')
  }

  getTags (id) {
    return this.http.get('bangumi/tags', {
      params: { id }
    })
  }

  getShow (id) {
    return this.http.get(`bangumi/${id}/show`)
  }
}

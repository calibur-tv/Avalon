import BaseApi from './_baseApi'

export default class extends BaseApi {
  getShow (id) {
    return this.http.get(`bangumi/${id}/show`)
  }

  follow (id) {
    return this.http.post(`bangumi/${id}/follow`)
  }

  posts ({ id, lastId, take, type }) {
    return this.http.get(`bangumi/${id}/posts`, {
      params: { lastId, take, type }
    })
  }

  released () {
    return this.http.get('bangumi/released')
  }

  timeline ({ year, take }) {
    return this.http.get('bangumi/timeline', {
      params: { year, take }
    })
  }

  tags () {
    return this.http.get('bangumi/tags')
  }

  category ({ id, page, take }) {
    return this.http.get('bangumi/category', {
      params: { id, page, take }
    })
  }
}

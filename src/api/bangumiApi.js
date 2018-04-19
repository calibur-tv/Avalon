import BaseApi from './_baseApi'

export default class extends BaseApi {
  show (id) {
    return this.http.get(`bangumi/${id}/show`)
  }

  follow (id) {
    return this.http.post(`bangumi/${id}/follow`)
  }

  roles ({ bangumiId, seenIds, all }) {
    return this.http.get(`bangumi/${bangumiId}/roles`, {
      params: { seenIds, all }
    })
  }

  followers ({ bangumiId, seenIds, take }) {
    return this.http.post(`bangumi/${bangumiId}/followers`, {
      seenIds, take
    })
  }

  videos (id) {
    return this.http.get(`bangumi/${id}/videos`)
  }

  posts ({ id, seenIds, take, type }) {
    return this.http.post(`bangumi/${id}/posts`, { seenIds, take, type })
  }

  images ({ id, seenIds, take, size, tags, roleId }) {
    return this.http.post(`bangumi/${id}/images`, { seenIds, take, size, tags, roleId })
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

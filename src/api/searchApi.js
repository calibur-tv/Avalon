import BaseApi from './_baseApi'

export default class extends BaseApi {
  index (q) {
    return this.http.get('search/index', {
      params: q
    })
  }

  v2 ({ q, type, page }) {
    return this.http.get('search/new', {
      params: { q, type, page }
    })
  }
}

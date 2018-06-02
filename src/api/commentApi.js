import BaseApi from './_baseApi'

export default class extends BaseApi {
  list ({ type, id, page }) {
    return this.http.get(`${type}/comment/${id}/list`, {
      params: { page }
    })
  }

  reply ({ type, id, content, targetUserId }) {
    return this.http.post(`${type}/comment/${id}/reply`, { content, targetUserId })
  }

  delete ({ type, id }) {
    return this.http.post(`${type}/comment/delete/${id}`)
  }

  toggleLike ({ type, id }) {
    return this.http.post(`${type}/comment/toggleLike/${id}`)
  }
}

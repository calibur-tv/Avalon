import BaseApi from './_baseApi'

export default class extends BaseApi {
  getMainCommentList ({ type, id, fetchId }) {
    return this.http.get(`${type}/comment/${id}/list`, {
      params: { fetchId }
    })
  }

  getSubCommentList ({ type, parentId, maxId }) {
    return this.http.get(`${type}/comment/${parentId}/comments`, {
      params: { maxId }
    })
  }

  createSubComment ({ type, id, content, targetUserId }) {
    return this.http.post(`${type}/comment/${id}/reply`, { content, targetUserId })
  }

  delete ({ type, id }) {
    return this.http.post(`${type}/comment/delete/${id}`)
  }

  toggleLike ({ type, id }) {
    return this.http.post(`${type}/comment/toggleLike/${id}`)
  }
}

import BaseApi from './_baseApi'

export default class extends BaseApi {
  create ({ title, bangumiId, content, images, desc, geetest }) {
    return this.http.post('post/create', {
      title, bangumiId, content, images, desc, geetest
    })
  }

  show ({ id, page, take }) {
    return this.http.get(`post/${id}/show`, {
      params: { page, take }
    })
  }

  reply ({ targetUserId, bangumiId, postId, images, content, geetest }) {
    return this.http.post(`post/${postId}/reply`, {
      targetUserId, bangumiId, images, content, geetest
    })
  }

  comment ({ postId, content, targetUserId }) {
    return this.http.post(`post/${postId}/commit`, {
      content, targetUserId
    })
  }

  comments ({ postId, seenIds, take }) {
    return this.http.get(`post/${postId}/comments`, {
      params: { seenIds, take }
    })
  }
}

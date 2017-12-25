import BaseApi from './_baseApi'

export default class extends BaseApi {
  create ({ title, bangumiId, content, images, geetest }) {
    return this.http.post('post/create', {
      title, bangumiId, content, images, geetest
    })
  }

  show ({ id, page, take }) {
    return this.http.get(`post/${id}/show`, {
      params: { page, take }
    })
  }

  reply ({ targetUserId, postId, images, content, geetest }) {
    return this.http.post(`post/${postId}/reply`, {
      targetUserId, images, content, geetest
    })
  }

  comment ({ postId, content, targetUserId }) {
    return this.http.post(`post/${postId}/commit`, {
      content, targetUserId
    })
  }

  comments ({ postId, page, take }) {
    return this.http.get(`post/${postId}/comments`, {
      params: { page, take }
    })
  }
}

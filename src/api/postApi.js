import BaseApi from './_baseApi'

export default class extends BaseApi {
  create ({ title, bangumiId, content, images, desc, geetest }) {
    return this.http.post('post/create', {
      title, bangumiId, content, images, desc, geetest
    })
  }

  show ({ id, page, take, only, replyId }) {
    return this.http.get(`post/${id}/show`, {
      params: { page, take, only, replyId }
    })
  }

  reply ({ postId, images, content, geetest }) {
    return this.http.post(`post/${postId}/reply`, {
      images, content, geetest
    })
  }

  comment ({ postId, content, targetUserId }) {
    return this.http.post(`post/${postId}/comment`, {
      content, targetUserId
    })
  }

  comments ({ postId, page }) {
    return this.http.get(`post/${postId}/comments`, {
      params: { page }
    })
  }

  deletePost (id) {
    return this.http.post(`post/${id}/deletePost`)
  }

  deleteComment ({ postId, commentId }) {
    return this.http.post(`post/${postId}/deleteComment`, {
      id: commentId
    })
  }

  toggleLike (id) {
    return this.http.post(`post/${id}/toggleLike`)
  }

  toggleMark (id) {
    return this.http.post(`post/${id}/toggleMark`)
  }

  trending ({ sort, seenIds, take }) {
    return this.http.get(`post/trending/${sort}`, {
      params: { seenIds, take }
    })
  }
}

import BaseApi from './_baseApi'

export default class extends BaseApi {
  create ({ title, bangumiId, content, images, desc, geetest }) {
    return this.http.post('post/create', {
      title, bangumiId, content, images, desc, geetest
    })
  }

  show ({ id, seenIds, take, only }) {
    return this.http.post(`post/${id}/show`, { seenIds, take, only })
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

  comments ({ postId, seenIds }) {
    return this.http.post(`post/${postId}/comments`, { seenIds })
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
    return this.http.post(`trending/post/${sort}`, { seenIds, take })
  }
}

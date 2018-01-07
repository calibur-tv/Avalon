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

  comments ({ postId, seenIds }) {
    return this.http.post(`post/${postId}/comments`, { seenIds })
  }

  delete (id) {
    return this.http.post(`post/${id}/delete`)
  }

  trending ({ sort, seenIds, take }) {
    return this.http.post(`trending/post/${sort}`, { seenIds, take })
  }
}

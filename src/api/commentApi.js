import BaseApi from './_baseApi'

export default class extends BaseApi {
  getMainCommentList({ type, id, fetchId, onlySeeMaster, seeReplyId }) {
    return this.http.get('comment/main/list', {
      params: { fetchId, onlySeeMaster, seeReplyId, type, id }
    })
  }

  getSubCommentList({ type, id, maxId }) {
    return this.http.get('comment/sub/list', {
      params: { maxId, type, id }
    })
  }

  createMainComment({ type, id, content, images }) {
    return this.http.post('comment/main/create', {
      content,
      images,
      type,
      id
    })
  }

  createSubComment({ type, id, content, targetUserId }) {
    return this.http.post('comment/main/reply', {
      targetUserId,
      content,
      type,
      id
    })
  }

  deleteSubComment({ type, id }) {
    return this.http.post('comment/sub/delete', {
      type,
      id
    })
  }

  deleteMainComment({ type, id }) {
    return this.http.post('comment/main/delete', {
      type,
      id
    })
  }

  toggleLikeMainComment({ type, id }) {
    return this.http.post('comment/main/toggleLike', {
      type,
      id
    })
  }

  toggleLikeSubComment({ type, id }) {
    return this.http.post('comment/sub/toggleLike', {
      type,
      id
    })
  }
}

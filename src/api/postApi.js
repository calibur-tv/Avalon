import BaseApi from "./_baseApi";

export default class extends BaseApi {
  create({
    title,
    bangumiId,
    tags,
    content,
    images,
    desc,
    geetest,
    is_creator
  }) {
    return this.http.post("post/create", {
      title,
      bangumiId,
      tags,
      content,
      images,
      desc,
      geetest,
      is_creator
    });
  }

  show({ id, page, take, only, replyId }) {
    return this.http.get(`post/${id}/show`, {
      params: {
        page,
        take,
        only,
        replyId
      }
    });
  }

  reply({ postId, images, content, geetest }) {
    return this.http.post(`post/${postId}/reply`, {
      images,
      content,
      geetest
    });
  }

  comment({ postId, content, targetUserId }) {
    return this.http.post(`post/${postId}/comment`, {
      content,
      targetUserId
    });
  }

  comments({ postId, page }) {
    return this.http.get(`post/${postId}/comments`, {
      params: { page }
    });
  }

  deletePost(id) {
    return this.http.post(`post/${id}/deletePost`);
  }

  deleteComment({ postId, commentId }) {
    return this.http.post(`post/${postId}/deleteComment`, { commentId });
  }

  setTop({ id }) {
    return this.http.post("post/manager/top/set", { id });
  }

  removeTop({ id }) {
    return this.http.post("post/manager/top/remove", { id });
  }

  setNice({ id }) {
    return this.http.post("post/manager/nice/set", { id });
  }

  removeNice({ id }) {
    return this.http.post("post/manager/nice/remove", { id });
  }

  tags() {
    return this.http.get("post/tags");
  }
}

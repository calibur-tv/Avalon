import BaseApi from "./_baseApi";

export default class extends BaseApi {
  createQuestion({ title, tags, content, images, intro, geetest }) {
    return this.http.post("question/create/q", {
      title,
      tags,
      content,
      images,
      intro,
      geetest
    });
  }
}

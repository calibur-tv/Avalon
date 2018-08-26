import BaseApi from "./_baseApi";

export default class extends BaseApi {
  createQuestion({ title, tags, content, images, intro, geetest }) {
    return this.http.post("question/qaq/create", {
      title,
      tags,
      content,
      images,
      intro,
      geetest
    });
  }

  getQuestionShow({ id }) {
    return this.http.get(`question/qaq/${id}/show`);
  }

  getAnswerShow({ id }) {
    return this.http.get(`question/soga/${id}/show`);
  }

  createAnswer({
    question_id,
    do_publish,
    geetest,
    source_url,
    content,
    intro
  }) {
    return this.http.post("question/soga/create", {
      question_id,
      do_publish,
      geetest,
      source_url,
      content,
      intro
    });
  }

  edit({ id }) {
    return this.http.get(`question/soga/${id}/resource`);
  }

  deleteAnswer({ id }) {
    return this.http.post(`question/soga/${id}/delete`);
  }

  updateAnswer({
    question_id,
    do_publish,
    geetest,
    source_url,
    content,
    intro,
    id
  }) {
    return this.http.post(`question/soga/${id}/update`, {
      question_id,
      do_publish,
      geetest,
      source_url,
      content,
      intro
    });
  }
}

import BaseApi from "./_baseApi";

export default class extends BaseApi {
  show({ id }) {
    return this.http.get(`score/${id}/show`);
  }

  edit({ id }) {
    return this.http.get(`score/${id}/edit`);
  }

  check({ id }) {
    return this.http.get("score/check", {
      params: { id }
    });
  }

  create(params) {
    return this.http.post("score/create", params);
  }

  drafts() {
    return this.http.get("score/drafts");
  }

  update(params) {
    return this.http.post("score/update", params);
  }

  delete({ id }) {
    return this.http.post("score/delete", { id });
  }

  bangumiScore(id) {
    return this.http.get("score/bangumis", {
      params: { id }
    });
  }

  getUsersScore({ zone, page, take }) {
    return this.http.get("score/users", {
      params: { zone, page, take }
    });
  }

  trials() {
    return this.http.get("admin/trial/score/list");
  }

  ban({ id }) {
    return this.http.post("admin/trial/score/ban", { id });
  }

  pass({ id }) {
    return this.http.post("admin/trial/score/pass", { id });
  }
}

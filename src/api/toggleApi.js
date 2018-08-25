import BaseApi from "./_baseApi";

export default class extends BaseApi {
  users({ type, id, last_id, take, model }) {
    return this.http.get(`toggle/${type}/users`, {
      params: { id, last_id, take, model }
    });
  }

  like({ type, id }) {
    return this.http.post("toggle/like", { type, id });
  }

  reward({ type, id }) {
    return this.http.post("toggle/reward", { type, id });
  }

  follow({ type, id }) {
    return this.http.post("toggle/follow", { type, id });
  }

  mark({ type, id }) {
    return this.http.post("toggle/mark", { type, id });
  }

  vote({ type, id, is_agree }) {
    return this.http.post("toggle/vote", { type, id, is_agree });
  }
}

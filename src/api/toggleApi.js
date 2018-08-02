import BaseApi from "./_baseApi";

export default class extends BaseApi {
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

  check({ type, id }) {
    return this.http.get("toggle/check", {
      params: { type, id }
    });
  }
}

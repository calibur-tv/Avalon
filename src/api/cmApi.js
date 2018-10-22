import BaseApi from "./_baseApi";

export default class extends BaseApi {
  getLoop() {
    return this.http.get("cm/loop/list");
  }

  viewLoop({ id }) {
    return this.http.post("cm/loop/view", {
      id
    });
  }

  clickLoop({ id }) {
    return this.http.post("cm/loop/click", {
      id
    });
  }
}

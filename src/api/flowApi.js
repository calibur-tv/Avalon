import BaseApi from "./_baseApi";

export default class extends BaseApi {
  fetch({ sort, type, take, page, minId, seenIds, bangumiId, userZone }) {
    return this.http.get("flow/list", {
      params: { sort, type, take, page, minId, seenIds, bangumiId, userZone }
    });
  }

  meta({ type }) {
    return this.http.get("flow/meta", {
      params: { type }
    });
  }
}

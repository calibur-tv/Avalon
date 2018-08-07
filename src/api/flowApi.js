import BaseApi from "./_baseApi";

export default class extends BaseApi {
  fetch({ sort, type, take, minId, seenIds, bangumiId }) {
    return this.http.get(`trending/${sort}`, {
      params: { type, take, minId, seenIds, bangumiId }
    });
  }

  meta({ type }) {
    return this.http.get("trending/meta", {
      params: { type }
    });
  }
}

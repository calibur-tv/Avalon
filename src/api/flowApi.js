import BaseApi from "./_baseApi";

export default class extends BaseApi {
  fetch({ sort, type, take, minId, seenIds, bangumiId, userZone }) {
    return this.http.get("flowlist", {
      params: { sort, type, take, minId, seenIds, bangumiId, userZone }
    });
  }

  meta({ type }) {
    return this.http.get("trending/meta", {
      params: { type }
    });
  }
}

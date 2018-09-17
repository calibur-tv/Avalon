import BaseApi from "./_baseApi";

export default class extends BaseApi {
  show(id) {
    return this.http.get(`bangumi/${id}/show`);
  }

  follow(id) {
    return this.http.post(`bangumi/${id}/toggleFollow`);
  }

  roles({ bangumiId, seenIds, all }) {
    return this.http.get(`bangumi/${bangumiId}/roles`, {
      params: { seenIds, all }
    });
  }

  edit({ id, name, summary, avatar, banner, tags }) {
    return this.http.post(`bangumi/${id}/edit`, {
      name,
      summary,
      avatar,
      banner,
      tags
    });
  }

  followers({ bangumiId, page, take }) {
    return this.http.get(`bangumi/${bangumiId}/followers`, {
      params: { page, take }
    });
  }

  managers({ bangumiId }) {
    return this.http.get(`bangumi/${bangumiId}/managers`);
  }

  videos(id) {
    return this.http.get(`bangumi/${id}/videos`);
  }

  posts({ id, minId, take }) {
    return this.http.get(`bangumi/${id}/posts/active`, {
      params: { minId, take }
    });
  }

  cartoon({ bangumiId, page, take, sort }) {
    return this.http.get(`bangumi/${bangumiId}/cartoon`, {
      params: { page, take, sort }
    });
  }

  released() {
    return this.http.get("bangumi/released");
  }

  timeline({ year, take }) {
    return this.http.get("bangumi/timeline", {
      params: { year, take }
    });
  }

  tags() {
    return this.http.get("bangumi/tags");
  }

  category({ id, page, take }) {
    return this.http.get("bangumi/category", {
      params: { id, page, take }
    });
  }

  getTopPosts({ id }) {
    return this.http.get(`bangumi/${id}/posts/top`);
  }
}

export default {
  index: '/',

  __query(str, obj) {
    if (!obj) {
      return str;
    }
    let query = '?';
    Object.keys(obj).forEach((item) => {
      query += `${item}=${obj[item]}&`;
    });
    return `${str.split('?').shift()}${query.substring(0, query.length - 1)}`;
  },

  url(url, query) {
    return this.__query(url, query);
  },

  user(zone) {
    return `/user/${zone}`;
  },

  bangumi(id) {
    return `/bangumi/${id}`;
  },

  video(id) {
    return `/video/${id}`;
  },

  score(id) {
    return `/review/${id}`;
  },

  image(id) {
    return `/pins/${id}`
  },

  post(id, query) {
    return this.__query(`/post/${id}`, query);
  },

  bangumiTag(id) {
    return id ? `/bangumi/tags?id=${id}` : '/bangumi/tags';
  },

  bangumiNews: '/bangumi/news',

  bangumiTimeline: '/bangumi/timeline',

  postTrending(sort) {
    return `/post/trending/${sort}`;
  },

  imageTrending(sort) {
    return `/pins/trending/${sort}`;
  },

  cartoonRole(id) {
    return `/role/${id}`;
  },

  roleTrending: '/role/trending',
};

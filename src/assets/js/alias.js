export default {
  index: '/',

  __query(str, obj) {
    if (!obj) {
      return str
    }
    let query = '?'
    Object.keys(obj).forEach(item => {
      query += `${item}=${obj[item]}&`
    })
    return `${str.split('?').shift()}${query.substring(0, query.length - 1)}`
  },

  url(url, query) {
    return this.__query(url, query)
  },

  user(zone, path = '') {
    return `/user/${zone}/${path}`
  },

  bangumi(id, path = '') {
    return `/bangumi/${id}/${path}`
  },

  video(id) {
    return `/video/${id}`
  },

  score(id) {
    return `/review/${id}`
  },

  image(id) {
    return `/pin/${id}`
  },

  post(id, query) {
    return this.__query(`/post/${id}`, query)
  },

  bangumiTag(id) {
    return id ? `/bangumi/tags?id=${id}` : '/bangumi/tags'
  },

  bangumiNews: '/bangumi/news',

  bangumiTimeline: '/bangumi/timeline',

  cartoonRole(id) {
    return `/role/${id}`
  },

  editScore(id) {
    return `/review/edit/${id}`
  },

  world(type) {
    return `/world/${type}`
  },

  question(id) {
    return `/qaq/${id}`
  },

  answer(id) {
    return `/soga/${id}`
  },

  createScore: '/review/create',

  roleTrending: '/role/trending'
}

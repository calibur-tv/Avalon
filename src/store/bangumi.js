import Api from '~/api/bangumiApi'

const state = () => ({
  follows: Object.create(null),
  released: [],
  timeline: {
    data: [],
    year: new Date().getFullYear() + 1,
    take: 5,
    min: 0,
    noMore: false
  },
  category: {},
  tags: [],
  info: null,
  posts: {
    data: [],
    total: 0,
    noMore: false
  },
  videos: {
    data: [],
    repeat: false,
    total: 0,
    fetched: false
  }
})

const mutations = {
  selectTag (state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  },
  SET_FOLLOW (state, { followed, self }) {
    state.info.followed = followed
    if (followed) {
      state.info.followers.unshift(self)
    } else {
      state.info.followers.forEach((user, index) => {
        if (user.zone === self.zone) {
          state.info.followers.splice(index, 1)
        }
      })
    }
  },
  SET_RELEASED (state, data) {
    state.released = data
  },
  SET_TIMELINE (state, data) {
    const temp = state.timeline
    const nowYear = temp.year - temp.take
    state.timeline = {
      data: temp.data.concat(data.list),
      min: data.min,
      take: temp.take,
      year: nowYear,
      noMore: nowYear <= data.min
    }
  },
  SET_TAGS (state, { tags, id }) {
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    state.tags = tags
  },
  SET_CATEGORY (state, { data, page, take }) {
    if (page === 1) {
      state.category = { data }
    } else {
      data.forEach(item => {
        state.category.data.push(item)
      })
    }
    state.category.noMore = data.length < take
  },
  SET_POSTS (state, { data, total }) {
    const posts = state.posts.data.concat(data)
    state.posts = {
      data: posts,
      total: total,
      noMore: posts.length >= total
    }
  },
  SET_BANGUMI (state, data) {
    state.info = data
  },
  SET_VIDEOS (state, data) {
    state.videos = {
      data: data.videos,
      repeat: data.repeat,
      total: data.total,
      fetched: true
    }
  }
}

const actions = {
  async getTags ({ state, commit }, { id, ctx }) {
    if (state.tags.length) {
      return
    }
    const api = new Api(ctx)
    const tags = await api.tags()
    commit('SET_TAGS', { tags, id })
  },
  async getBangumi ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    const data = await api.show(id)
    commit('SET_BANGUMI', data)
  },
  async getVideos ({ commit }, id) {
    const api = new Api()
    const data = await api.videos(id)
    commit('SET_VIDEOS', data)
  },
  async follow ({ commit, rootState }, { ctx, id }) {
    const api = new Api(ctx)
    const followed = await api.follow(id)
    commit('SET_FOLLOW', {
      followed,
      self: {
        id: rootState.user.id,
        zone: rootState.user.zone,
        avatar: rootState.user.avatar,
        nickname: rootState.user.nickname
      }
    })
  },
  async getReleased ({ state, commit }, ctx) {
    if (state.released.length) {
      return
    }
    const api = new Api(ctx)
    const data = await api.released()
    commit('SET_RELEASED', data)
  },
  async getTimeline ({ state, commit }, ctx) {
    if (state.timeline.noMore) {
      return
    }
    const api = new Api(ctx)
    const data = await api.timeline({
      year: state.timeline.year,
      take: state.timeline.take
    })
    commit('SET_TIMELINE', data)
  },
  async getCategory ({ commit }, { id, page, take, ctx }) {
    const api = new Api(ctx)
    const data = await api.category({ id, page, take })
    commit('SET_CATEGORY', { data, page, take })
  },
  async getPosts ({ state, commit }, { id, take, type, ctx }) {
    const seenIds = state.posts.data.length
      ? state.posts.data.map(item => item.id).join(',')
      : null
    const api = new Api(ctx)
    const data = await api.posts({ id, take, type, seenIds })
    commit('SET_POSTS', {
      data: data.list,
      total: data.total
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

import BangumiApi from '~/api/bangumiApi'
import UserApi from '~/api/userApi'

const state = () => ({
  list: Object.create(null),
  follows: Object.create(null),
  released: [],
  timeline: {},
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
    total: 0
  }
})

const mutations = {
  pushList (state, data) {
    state.list[data.id] = data
  },
  selectTag (state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  },
  followBangumi (state, { followed, id, self }) {
    const bangumi = state.list[id]
    if (bangumi) {
      state.list[id].followed = followed
      if (followed) {
        state.list[id].followers.push(self)
      } else {
        bangumi.followers.forEach((user, index) => {
          if (user.zone === self.zone) {
            state.list[id].followers.splice(index, 1)
          }
        })
      }
    }
  },
  pushFollowBangumis (state, { data, zone }) {
    state.follows[zone] = data
  },
  setReleased (state, data) {
    state.released = data
  },
  setTimeline (state, data) {
    if (state.timeline.data) {
      data.data.forEach(item => {
        state.timeline.data.push(item)
      })
    } else {
      state.timeline.data = data.data
    }
    state.timeline.min = data.min
  },
  setTags (state, { tags, id }) {
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    state.tags = tags
  },
  setCategory (state, { data, page, take }) {
    if (page === 1) {
      state.category = { data }
    } else {
      data.forEach(item => {
        state.category.data.push(item)
      })
    }
    state.category.noMore = data.length < take
  },
  setPosts (state, { data, total }) {
    const posts = state.posts.data.concat(data)
    state.posts = {
      data: posts,
      total: total,
      noMore: posts.length >= total
    }
  },
  setBangumi (state, data) {
    state.info = data
  },
  setVideos (state, data) {
    state.videos = {
      data: data.videos,
      repeat: data.repeat,
      total: data.total
    }
  }
}

const actions = {
  async getTags ({ state, commit }, { id }) {
    if (state.tags.length) {
      return
    }
    const api = new BangumiApi()
    const tags = await api.tags()
    commit('setTags', { tags, id })
  },
  async getBangumi ({ state, commit }, { ctx, id }) {
    if (state.list[id]) {
      return
    }
    const api = new BangumiApi(ctx)
    const data = await api.show(id)
    commit('setBangumi', data)
  },
  async getVideos ({ commit }, id) {
    const api = new BangumiApi()
    const data = await api.videos(id)
    commit('setVideos', data)
  },
  follow ({ commit, rootState }, { ctx, id }) {
    const api = new BangumiApi(ctx)
    api.follow(id).then((followed) => {
      commit('followBangumi', {
        followed,
        id,
        self: {
          id: rootState.user.id,
          zone: rootState.user.zone,
          avatar: rootState.user.avatar,
          nickname: rootState.user.nickname
        }
      })
    }).catch((err) => {
      err.message.forEach(tip => {
        ctx.$toast.error(tip)
      })
    })
  },
  async getFollowBangumis ({ state, commit }, { zone }) {
    if (state.follows[zone]) {
      return
    }
    const api = new UserApi()
    const data = await api.followBangumis(zone)
    commit('pushFollowBangumis', { data, zone })
  },
  async getReleased ({ state, commit }) {
    if (state.released.length) {
      return
    }
    const api = new BangumiApi()
    const data = await api.released()
    commit('setReleased', data)
  },
  async getTimeline ({ commit }, { year, take }) {
    const api = new BangumiApi()
    const data = await api.timeline({ year, take })
    if (data.data.length) {
      commit('setTimeline', data)
    }
  },
  async getCategory ({ commit }, { id, page, take }) {
    const api = new BangumiApi()
    const data = await api.category({ id, page, take })
    commit('setCategory', { data, page, take })
  },
  async getPosts ({ state, commit }, { id, take, type, ctx }) {
    const seenIds = state.posts.data.length
      ? state.posts.data.map(item => item.id).join(',')
      : null
    const api = new BangumiApi(ctx)
    const data = await api.posts({ id, take, type, seenIds })
    commit('setPosts', {
      data: data.data,
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

import Api from '~/api/userApi'

const state = () => ({
  list: Object.create(null),
  self: {
    bangumis: []
  },
  posts: {
    take: 10,
    mine: {
      data: [],
      noMore: false,
      loading: false
    },
    reply: {
      data: [],
      noMore: false,
      loading: false
    }
  }
})

const mutations = {
  pushList (state, data) {
    state.list[data.zone] = data
  },
  removeUser (state, zone) {
    if (state.list[zone]) {
      delete state.list[zone]
    }
  },
  pushFollowBangumis (state, data) {
    state.self.bangumis = data
  },
  setFollowPosts (state, { data, type }) {
    state.posts[type] = {
      data: state.posts[type].data.concat(data),
      noMore: data.length < state.posts.take,
      loading: false
    }
  },
  setFollowPostsState (state, { type }) {
    state.posts[type].loading = true
  }
}

const actions = {
  async getUser ({ state, commit }, { ctx, zone }) {
    if (state.list[zone]) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getUserInfo({ zone })
    commit('pushList', data)
  },
  async getFollowBangumis ({ commit }, { zone }) {
    const api = new Api()
    const data = await api.followBangumis(zone)
    commit('pushFollowBangumis', data)
  },
  async getFollowPosts ({ state, commit }, { type, zone }) {
    if (state.posts[type].noMore || state.posts[type].loading) {
      return
    }
    commit('setFollowPostsState', { type })
    const api = new Api()
    const data = await api.followPosts({
      type,
      take: state.posts.take,
      zone,
      seenIds: state.posts[type].data.length ? state.posts[type].data.map(item => item.id).join(',') : null
    })
    commit('setFollowPosts', { type, data })
  },
  async daySign ({ rootState }, { ctx }) {
    if (rootState.user.signed) {
      return
    }
    const api = new Api(ctx)
    await api.daySign()
  }
}

const getters = {
  bangumis: state => {
    return state.self.bangumis
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

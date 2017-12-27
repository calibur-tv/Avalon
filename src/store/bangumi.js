import BangumiApi from '~/api/bangumiApi'
import UserApi from '~/api/userApi'

const state = () => ({
  tags: [],
  list: Object.create(null),
  follows: Object.create(null),
  released: [],
  timeline: {},
  category: {},
  posts: []
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
  setPosts (state, { data, lastId }) {
    if (lastId) {
      data.forEach(item => {
        state.posts.push(item)
      })
    } else {
      state.posts = data
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
  async getShow ({ state, commit }, { ctx, id }) {
    if (state.list[id]) {
      return
    }
    const api = new BangumiApi(ctx)
    const data = await api.getShow(id)
    commit('pushList', data)
  },
  follow ({ commit, rootState }, { ctx, id }) {
    const api = new BangumiApi(ctx)
    api.follow(id).then((followed) => {
      commit('followBangumi', {
        followed,
        id,
        self: {
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
  async getPosts ({ state, commit }, { id, lastId, take, type, ctx }) {
    if (lastId === 0 && state.posts.length) {
      return
    }
    const api = new BangumiApi(ctx)
    const data = await api.posts({ id, lastId, take, type })
    commit('setPosts', { data, lastId })
    return data.length ? data[data.length - 1].id : 0
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

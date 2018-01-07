import Api from '~/api/postApi'

const state = () => ({
  trending: {
    take: 10,
    new: {
      data: [],
      noMore: false
    },
    hot: {
      data: [],
      noMore: false
    }
  },
  show: {
    init: true,
    take: 10,
    info: {
      bangumi: null,
      user: null,
      post: null
    },
    data: {
      total: 0,
      list: [],
      noMore: false
    }
  }
})

const mutations = {
  setPost (state, data) {
    if (state.show.init) {
      state.show.info = {
        bangumi: data.bangumi,
        user: data.user,
        post: data.post
      }
      state.show.init = false
    }
    state.show.data = {
      list: state.show.data.list.concat(data.list),
      noMore: data.list.length < state.show.take,
      total: data.total
    }
  },
  setState (state, { index, key, value }) {
    state.list[index].state[key] = value
  },
  setComment (state, { index, data }) {
    state.list[index].comments.push(data)
    state.list[index].comment_count++
  },
  setComments (state, { index, data }) {
    data.forEach(item => {
      state.list[index].comments.push(item)
    })
    state.list[index].state.noMoreComment = state.list[index].comments.length >= state.list[index].comment_count
  },
  delPost (state, id) {
    if (id === state.post.id) {
      return
    }
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list.splice(index, 1)
      }
    })
    state.total--
  },
  setTrending (state, { data, sort }) {
    state.trending[sort] = {
      data: state.trending[sort].data.concat(data),
      noMore: data.length < state.trending.take
    }
  }
}

const actions = {
  async getPost ({ state, commit }, { id, ctx, only }) {
    const api = new Api(ctx)
    const data = await api.show({
      id,
      only,
      seenIds: state.show.data.list.length ? state.show.data.list.map(item => item.id).join(',') : null,
      take: state.show.take
    })
    commit('setPost', data)
  },
  async getComments ({ state, commit }, { index, postId }) {
    if (state.list[index].state.noMoreComment) {
      return
    }
    const api = new Api()
    const seenIds = state.list[index].comments.length
      ? state.list[index].comments.map(item => item.id).join(',')
      : null
    const data = await api.comments({
      postId, seenIds
    })
    commit('setComments', { index, data })
  },
  async setComment ({ commit }, { index, postId, targetUserId, content, ctx }) {
    const api = new Api(ctx)
    const data = await api.comment({ postId, targetUserId, content })
    commit('setComment', { data, index })
  },
  // eslint-disable-next-line no-empty-pattern
  async create ({}, params) {
    const api = new Api(params.ctx)
    const id = await api.create(params)
    return id
  },
  // eslint-disable-next-line no-empty-pattern
  async reply ({}, params) {
    const api = new Api(params.ctx)
    await api.reply(params)
  },
  async deletePost ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    await api.delete(id)
    commit('delPost', id)
  },
  async getTrending ({ state, commit }, { sort }) {
    if (state.trending[sort].noMore) {
      return
    }
    const api = new Api()
    const data = await api.trending({
      sort,
      take: state.trending.take,
      seenIds: state.trending[sort].data.length ? state.trending[sort].data.map(item => item.id).join(',') : null
    })
    commit('setTrending', { sort, data })
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

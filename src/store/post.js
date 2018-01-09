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
      list: {},
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
    const list = state.show.data.list
    const keys = Object.keys(data.list)
    keys.forEach(id => {
      list[id] = data.list[id]
    })
    state.show.data = {
      list: list,
      noMore: keys.length < state.show.take,
      total: data.total
    }
  },
  setComment (state, { postId, data }) {
    state.show.data.list[postId].comments.push(data)
    state.show.data.list[postId].comment_count++
  },
  setComments (state, { postId, data }) {
    state.show.data.list[postId].comments = state.show.data.list[postId].comments.concat(data)
  },
  delPost (state, id) {
    if (id === state.show.info.post.id) {
      return
    }
    delete state.show.data.list[id]
    state.show.data.total--
  },
  delComment (state, { postId, commentId }) {
    state.show.data.list[postId].comments.forEach((item, index) => {
      if (item.id === commentId) {
        state.show.data.list[postId].comments.splice(index, 1)
      }
    })
  },
  setTrending (state, { data, sort }) {
    state.trending[sort] = {
      data: state.trending[sort].data.concat(data),
      noMore: data.length < state.trending.take
    }
  },
  TOGGLE_LIKE (state, id) {
    let oldState
    if (id === state.show.info.post.id) {
      oldState = state.show.info.post.liked
      state.show.info.post.liked = !oldState
      oldState ? state.show.info.post.like_count-- : state.show.info.post.like_count++
    } else {
      oldState = state.show.data.list[id].liked
      state.show.data.list[id].liked = !oldState
      oldState ? state.show.data.list[id].like_count-- : state.show.data.list[id].like_count++
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
  async getComments ({ state, commit }, { postId }) {
    const api = new Api()
    const seenIds = state.show.data.list[postId].comments.length
      ? state.show.data.list[postId].comments.map(item => item.id).join(',')
      : null
    const data = await api.comments({
      postId, seenIds
    })
    commit('setComments', { postId, data })
  },
  async setComment ({ commit }, { postId, targetUserId, content, ctx }) {
    const api = new Api(ctx)
    const data = await api.comment({ postId, targetUserId, content })
    commit('setComment', { data, postId })
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
    await api.deletePost(id)
    commit('delPost', id)
  },
  async deleteComment ({ commit }, { ctx, postId, commentId }) {
    const api = new Api(ctx)
    await api.deleteComment({
      postId, commentId
    })
    commit('delComment', { postId, commentId })
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
  },
  async toggleLike ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    await api.toggleLike(id)
    commit('TOGGLE_LIKE', id)
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

import Api from '~/api/postApi'

const state = () => ({
  info: {
    bangumi: null,
    user: null,
    post: null
  }
})

const mutations = {
  SET_POST_INFO (state, data) {
    state.info.bangumi = data.bangumi
    state.info.user = data.user
    state.info.post = data.post
  },
  TOGGLE_LIKE_POST (state, { result }) {
    state.info.post.liked = result
    result ? state.info.post.like_count++ : state.info.post.like_count--
  },
  TOGGLE_MARK_POST (state, result) {
    state.info.post.marked = result
    result ? state.info.post.mark_count++ : state.info.post.mark_count--
  },
  FOLLOW_BANGUMI (state, { result }) {
    state.info.bangumi.followed = result
  }
}

const actions = {
  async getPost ({ commit }, { id, ctx, only }) {
    const api = new Api(ctx)
    const data = await api.show({ id, only })
    commit('SET_POST_INFO', data)
  },
  // eslint-disable-next-line no-empty-pattern
  async create ({}, params) {
    const api = new Api(params.ctx)
    const id = await api.create(params)
    return id
  },
  // eslint-disable-next-line no-empty-pattern
  async deletePost ({}, { ctx, id }) {
    const api = new Api(ctx)
    await api.deletePost(id)
  },
  async toggleLike ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    const result = await api.toggleLike(id)
    commit('TOGGLE_LIKE_POST', { result })
  },
  async toggleMark ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    const result = await api.toggleMark(id)
    commit('TOGGLE_MARK_POST', result)
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

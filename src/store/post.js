import Api from '~/api/postApi'

const state = () => ({
  info: {
    bangumi: null,
    user: null,
    post: null
  }
})

const mutations = {
  FETCH_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.info.post[`${type}_users`]
    state.info.post[`${type}_users`].list = prefix.list.concat(result.list)
    state.info.post[`${type}_users`].total = result.total
    state.info.post[`${type}_users`].noMore = result.noMore
  },
  SOCIAL_TOGGLE(state, { key, value, user }) {
    state.info.post[`${key}ed`.replace('ee', 'e')] = value
    if (value) {
      state.info.post[`${key}_users`].total++
      state.info.post[`${key}_users`].list.unshift(user)
    } else {
      state.info.post[`${key}_users`].total--
      state.info.post[`${key}_users`].list.forEach((item, index) => {
        if (item.id === user.id) {
          state.info.post[`${key}_users`].list.splice(index, 1)
        }
      })
    }
  },
  SET_POST_INFO(state, data) {
    state.info.bangumi = data.bangumi
    state.info.user = data.user
    state.info.post = data.post
  },
  FOLLOW_BANGUMI(state, result) {
    state.info.bangumi.followed = result
  }
}

const actions = {
  async getPost({ commit }, { id, ctx, only }) {
    const api = new Api(ctx)
    const data = await api.show({ id, only })
    commit('SET_POST_INFO', data)
  },
  async deletePost({}, { ctx, id }) {
    const api = new Api(ctx)
    await api.deletePost(id)
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

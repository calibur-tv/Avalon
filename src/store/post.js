import Api from '~/api/postApi'

const state = () => ({
  post: null,
  list: [],
  bangumi: null,
  noMore: false
})

const mutations = {
  setPost (state, { data, take }) {
    data.list.forEach(item => {
      item.state = {
        openComment: false,
        loading: false,
        comment: '',
        replying: false,
        noMoreComment: item.comments.length >= item.comment_count,
        collapsed: false
      }
      state.list.push(item)
    })
    state.post = data.post
    state.bangumi = data.bangumi
    state.noMore = data.list.length < take
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
  }
}

const actions = {
  async getPost ({ commit }, { id, ctx, take, page }) {
    const api = new Api(ctx)
    const data = await api.show({ id, take, page })
    commit('setPost', { data, take, page })
  },
  async getComments ({ state, commit }, { index, postId }) {
    if (state.list[index].state.noMoreComment) {
      return
    }
    const api = new Api()
    const seenIds = state.list[index].comments.length ? state.list[index].comments.map(item => item.id) : []
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

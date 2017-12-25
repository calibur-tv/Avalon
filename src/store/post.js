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
        maxPage: 1,
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
  setComments (state, { index, data, page }) {
    data.forEach(item => {
      state.list[index].comments.push(item)
    })
    state.list[index].state.maxPage = page
  }
}

const actions = {
  async getPost ({ commit }, { id, ctx, take, page }) {
    const api = new Api(ctx)
    const data = await api.show({ id, page, take })
    commit('setPost', { data, take, page })
  },
  async getComments ({ state, commit }, { index, postId, page, take }) {
    if (state.list[index].state.maxPage >= page) {
      return
    }
    const api = new Api()
    const data = await api.comments({
      postId, page, take
    })
    commit('setComments', { index, data, page })
  },
  async setComment ({ commit }, { index, postId, targetUserId, content, ctx }) {
    const api = new Api(ctx)
    const data = await api.comment({ postId, targetUserId, content })
    commit('setComment', { data, index })
  },
  // eslint-disable-next-line no-empty-pattern
  async create ({}, { title, bangumiId, content, images, geetest, ctx }) {
    const api = new Api(ctx)
    const id = await api.create({ title, bangumiId, content, images, geetest })
    return id
  },
  // eslint-disable-next-line no-empty-pattern
  async reply ({}, { postId, content, images, targetUserId, geetest, ctx }) {
    const api = new Api(ctx)
    await api.reply({ postId, targetUserId, content, images, geetest })
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

import Api from '~/api/postApi'

const state = () => ({
  list: {}
})

const mutations = {
  setPost (state, { data, id, take, page }) {
    if (page === 1) {
      state.list[id] = {
        data: data.list,
        bangumi: data.bangumi
      }
    } else {
      data.list.forEach(item => {
        state.list[id].data.push(item)
      })
    }
    state.list[id].noMore = data.list.length < take
  }
}

const actions = {
  async getPost ({ commit }, { id, ctx, take, page }) {
    const api = new Api(ctx)
    const data = await api.show({ id, page, take })
    commit('setPost', { data, id, take, page })
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

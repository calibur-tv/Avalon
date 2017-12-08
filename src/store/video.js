import Api from 'api/videoApi'

const state = () => ({
  list: Object.create(null)
})

const mutations = {
  pushList (state, data) {
    const id = data.id
    delete data.id
    state.list[id] = data
  }
}

const actions = {
  async getShow ({ state, commit }, id) {
    if (state.list[id]) {
      return
    }
    const api = new Api()
    const data = await api.getShow(id)
    data.id = id
    commit('pushList', data)
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

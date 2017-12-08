import Api from 'api/imageApi'

const state = () => ({
  upToken: null
})

const mutations = {
  setUpToken (state, data) {
    state.upToken = data
  }
}

const actions = {
  async getUpToken ({ commit }, params) {
    const api = new Api()
    const data = await api.getUpToken(params)
    commit('setUpToken', data)
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

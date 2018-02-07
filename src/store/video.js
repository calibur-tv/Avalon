import Api from '~/api/videoApi'

const state = () => ({
  bangumi: null,
  info: null,
  list: null,
  season: null
})

const mutations = {
  SET_DATA (state, data) {
    state.list = data.list
    state.info = data.info
    state.bangumi = data.bangumi
    state.season = data.season
  }
}

const actions = {
  async getShow ({ commit }, { id, ctx }) {
    const api = new Api(ctx)
    const data = await api.getShow(id)
    commit('SET_DATA', data)
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

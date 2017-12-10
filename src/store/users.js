import Api from 'api/userApi'

const state = () => ({
  list: Object.create(null)
})

const mutations = {
  pushList (state, data) {
    state.list[data.zone] = data
  },
  removeUser (state, zone) {
    if (state.list[zone]) {
      delete state.list[zone]
    }
  }
}

const actions = {
  async getUser ({ state, commit }, { ctx, zone }) {
    if (state.list[zone]) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getUserInfo({ zone })
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

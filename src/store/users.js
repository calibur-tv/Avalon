import Api from 'api/userApi'

const state = () => ({
  list: Object.create(null),
  self: {
    bangumis: []
  }
})

const mutations = {
  pushList (state, data) {
    state.list[data.zone] = data
  },
  removeUser (state, zone) {
    if (state.list[zone]) {
      delete state.list[zone]
    }
  },
  pushFollowBangumis (state, data) {
    state.self.bangumis = data
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
  },
  async getFollowBangumis ({ commit }, { zone }) {
    const api = new Api()
    const data = await api.followBangumis(zone)
    commit('pushFollowBangumis', data)
  }
}

const getters = {
  bangumis: state => {
    return state.self.bangumis
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

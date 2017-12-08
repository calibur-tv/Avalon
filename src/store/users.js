import Api from 'api/userApi'

const state = () => ({
  list: Object.create(null),
  bangumis: Object.create(null)
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
  pushFollowBangumis (state, { data, zone }) {
    state.bangumis[zone] = data
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
  async getFollowBangumis ({ state, commit }, { zone }) {
    if (state.bangumis[zone]) {
      return
    }
    const api = new Api()
    const data = await api.followBangumis(zone)
    commit('pushFollowBangumis', { data, zone })
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

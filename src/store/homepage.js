import Api from '~/api/imageApi'

const state = () => ({
  banners: []
})

const mutations = {
  pushBanners (state, data) {
    state.banners = data
  }
}

const actions = {
  async getBanners ({ state, commit }) {
    if (state.banners.length) {
      return
    }
    const api = new Api()
    const data = await api.getBanners()
    commit('pushBanners', data)
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

import Api from 'api/imageApi'

export default {
  namespaced: true,
  state () {
    return {
      banners: []
    }
  },
  mutations: {
    pushBanners (state, data) {
      state.banners = data
    }
  },
  actions: {
    async getBanners ({ state, commit }) {
      if (state.banners.length) {
        return
      }
      const api = new Api()
      const data = await api.getBanners()
      commit('pushBanners', data)
    }
  },
  getters: {}
}

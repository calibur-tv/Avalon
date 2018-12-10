import Api from '~/api/appApi'

export default {
  namespaced: true,
  state: () => ({
    download: {}
  }),
  mutations: {
    SET_DOWNLOAD_URL(state, { data, os }) {
      state.download[os] = data
    }
  },
  actions: {
    async getDownloadUrl({ commit }, { type, os }) {
      const api = new Api()
      const data = await api.downloadUrl({
        type
      })
      commit('SET_DOWNLOAD_URL', { data, os })
    }
  },
  getters: {}
}

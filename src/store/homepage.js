import Api from 'api/imageApi'
import { shuffle } from 'utils/lodash'

const state = () => {
  return {
    banners: []
  }
}

const mutations = {
  pushBanners (state, data) {
    state.banners = shuffle(data)
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

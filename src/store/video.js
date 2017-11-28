import Api from 'api/videoApi'

import { listCacheLimit } from '../../.env'

const state = () => ({
  list: Object.create(null)
})

const mutations = {
  pushList (state, data) {
    const ids = Object.keys(state.list)
    const id = data.id
    if (ids.indexOf(id) === -1) {
      ids.length >= listCacheLimit && delete state.list[ids[0]]
      delete data.id
      state.list[id] = data
    } else {
      const temp = state.list[id]
      Object.keys(temp).forEach(key => {
        if (Array.isArray(temp[key])) {
          temp[key] = temp[key].concat(data[key])
        } else {
          temp[key] = Object.assign(temp[key], data[key])
        }
      })
      state.list[id] = temp
    }
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

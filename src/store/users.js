import Api from 'api/userApi'

import { listCacheLimit } from '../../.env'

const state = () => ({
  list: Object.create(null)
})

const mutations = {
  pushList (state, data) {
    const ids = Object.keys(state.list)
    const id = data.zone
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

import Api from 'api/bangumiApi'

import { listCacheLimit } from '../../.env'

export default {
  namespaced: true,
  state () {
    return {
      news: [],
      tags: [],
      list: Object.create(null)
    }
  },
  mutations: {
    pushNews (state, data) {
      state.news = data
    },
    pushTags (state, data) {
      state.tags = data
    },
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
  },
  actions: {
    async getNews ({ state, commit }) {
      if (state.news.length) {
        return
      }
      const api = new Api()
      const data = await api.getNews()
      commit('pushNews', data)
    },
    async getTags ({ state, commit }, id) {
      if (state.tags.length) {
        return
      }
      const api = new Api()
      const data = await api.getTags(id)
      commit('pushTags', data)
    },
    async getShow ({ state, commit }, id) {
      if (state.list[id]) {
        return
      }
      const api = new Api()
      const data = await api.getShow(id)
      commit('pushList', data)
    }
  },
  getters: {}
}

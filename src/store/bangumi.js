import Api from 'api/bangumiApi'

import { listCacheLimit } from '../../.env'

const state = {
  news: [],
  tags: [],
  rank: [],
  list: Object.create(null)
}

const mutations = {
  pushNews (state, data) {
    state.news = data
  },
  pushTags (state, data) {
    state.tags = data
  },
  pushRank (state, data) {
    state.rank = data
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
  },
  selectTag (state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  }
}

const actions = {
  async getNews ({ state, commit }) {
    if (state.news.length) {
      return
    }
    const api = new Api()
    const data = await api.getNews()
    commit('pushNews', data)
  },
  async getTags ({ state, commit }, id) {
    if (state.tags.length && !id) {
      return
    }
    const api = new Api()
    const data = await api.getTags(id)
    const tags = data.tags
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    commit('pushTags', tags)
    commit('pushRank', data.bangumis)
  },
  async getShow ({ state, commit }, id) {
    if (state.list[id]) {
      return
    }
    const api = new Api()
    const data = await api.getShow(id)
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

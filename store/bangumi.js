import { getAllBangumi } from '~/api/bangumiApi'

export const state = () => ({
  show: null,
  all: []
})

export const mutations = {
  SET_BANGUMI_DATA(state, data) {
    state.show = data
  },
  SET_ALL_BANGUMI(state, data) {
    state.all = data
  },
  SET_BANGUMI_INFO(state, { key, value }) {
    state.show[key] = value
  }
}

export const actions = {
  async getAllBangumi({ state, commit }) {
    let needLoad = true
    try {
      const lastLoadAt = sessionStorage.getItem('all-bangumi-load-at')
      if (lastLoadAt && Date.now() - lastLoadAt < 3600000) {
        const list = JSON.parse(sessionStorage.getItem('all-bangumi-list'))
        list && commit('SET_ALL_BANGUMI', list)
        needLoad = !(list && list.length)
      }
    } catch (e) {}
    if (state.all.length || !needLoad) {
      return
    }
    const data = await getAllBangumi(this)
    commit('SET_ALL_BANGUMI', data)
    try {
      sessionStorage.setItem('all-bangumi-load-at', Date.now())
      sessionStorage.setItem('all-bangumi-list', JSON.stringify(data))
    } catch (e) {}
  }
}

export const getters = {}

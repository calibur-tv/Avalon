import Api from '~/api/searchApi'

const tabs = {
  0: '综合',
  1: '用户',
  2: '番剧',
  // 3: '视频',
  4: '帖子',
  5: '偶像'
}

const state = () => ({
  tabs,
  lastSearchKeywords: '',
  resource: Object.assign({}, ...Object.keys(tabs).map(_ => {
    return {
      [_]: {
        list: [],
        page: 0,
        total: 0,
        noMore: false,
        loading: false
      }
    }
  }))
})

const mutations = {
  RESET_DATA (state) {
    state.lastSearchKeywords = ''
    state.resource = Object.assign({}, ...Object.keys(tabs).map(_ => {
      return {
        [_]: {
          list: [],
          page: 0,
          total: 0,
          noMore: false,
          loading: false
        }
      }
    }))
  },
  SET_LOADING (state, { type, value }) {
    state.resource[type].loading = value
  },
  SET_RESOURCE (state, { type, q, data }) {
    state.lastSearchKeywords = q
    state.resource[type].list = state.resource[type].list.concat(data.list)
    state.resource[type].page = state.resource[type].page + 1
    state.resource[type].noMore = data.noMore
    state.resource[type].total = data.total
    state.resource[type].loading = false
  }
}

const actions = {
  async fetchData ({ state, commit }, { q, type, ctx }) {
    if (!q) {
      return
    }
    if (state.lastSearchKeywords && state.lastSearchKeywords !== q) {
      commit('RESET_DATA')
    }
    const resource = state.resource[type]
    if (resource.list.length || resource.noMore || resource.loading) {
      return
    }
    commit('SET_LOADING', { type, value: true })
    const api = new Api(ctx)
    const data = await api.v2({
      q,
      type,
      page: resource.page
    })
    commit('SET_RESOURCE', { q, type, data })
  },
  async fetchMore ({ state, commit }, { type, ctx }) {
    const q = state.lastSearchKeywords
    if (!q) {
      return
    }
    const resource = state.resource[type]
    if (resource.noMore || resource.loading) {
      return
    }
    commit('SET_LOADING', { type, value: true })
    const api = new Api(ctx)
    const data = await api.v2({
      q,
      type,
      page: resource.page
    })
    commit('SET_RESOURCE', { q, type, data })
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

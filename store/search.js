import { searchV2 } from '~/api/searchApi'

const tabs = {
  all: '综合',
  bangumi: '番剧',
  video: '视频',
  post: '帖子',
  score: '漫评',
  role: '偶像',
  user: '用户'
  // image: "相册",
}

export const state = () => ({
  tabs,
  lastSearchKeywords: '',
  resource: Object.assign(
    {},
    ...Object.keys(tabs).map(_ => ({
      [_]: {
        list: [],
        page: 0,
        total: 0,
        noMore: false,
        loading: false
      }
    }))
  ),
  bangumis: []
})

export const mutations = {
  RESET_DATA(state) {
    state.lastSearchKeywords = ''
    state.resource = Object.assign(
      {},
      ...Object.keys(tabs).map(_ => ({
        [_]: {
          list: [],
          page: 0,
          total: 0,
          noMore: false,
          loading: false
        }
      }))
    )
  },
  SET_LOADING(state, { type, value }) {
    state.resource[type].loading = value
  },
  SET_RESOURCE(state, { type, q, data }) {
    state.lastSearchKeywords = q
    state.resource[type].list = state.resource[type].list.concat(data.list)
    state.resource[type].page = state.resource[type].page + 1
    state.resource[type].noMore = data.noMore
    state.resource[type].total = data.total
    state.resource[type].loading = false
  },
  SET_BANGUMIS(state, data) {
    state.bangumis = data
  }
}

export const actions = {
  async fetchData({ state, commit }, { q, type }) {
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
    const data = await searchV2(this, {
      q,
      type,
      page: resource.page
    })
    commit('SET_RESOURCE', { q, type, data })
  },
  async fetchMore({ state, commit }, { type }) {
    const q = state.lastSearchKeywords
    if (!q) {
      return
    }
    const resource = state.resource[type]
    if (resource.noMore || resource.loading) {
      return
    }
    commit('SET_LOADING', { type, value: true })
    const data = await searchV2(this, {
      q,
      type,
      page: resource.page
    })
    commit('SET_RESOURCE', { q, type, data })
  }
}

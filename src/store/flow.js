import Api from '~/api/flowApi'
import { merge } from 'lodash'

const trendingFlowStore = {
  bangumiId: 0,
  userZone: '',
  news: {
    list: [],
    page: 0,
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  active: {
    list: [],
    page: 0,
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  hot: {
    list: [],
    page: 0,
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  meta: null
}

const state = () => ({
  post: merge({}, trendingFlowStore),
  image: merge({}, trendingFlowStore),
  score: merge({}, trendingFlowStore),
  role: merge({}, trendingFlowStore),
  question: merge({}, trendingFlowStore)
})

const mutations = {
  SET_META(state, { data, type }) {
    state[type].meta = data
  },
  RESET_STATE(state, { type }) {
    state[type] = merge({}, trendingFlowStore)
  },
  PUSH_STATE(state, { data, type, sort, bangumiId, userZone, refresh }) {
    const list = refresh ? data.list : state[type][sort].list.concat(data.list)
    state[type][sort].list = list
    state[type][sort].total = data.total
    state[type][sort].noMore = data.noMore
    state[type][sort].nothing = !list.length
    state[type][sort].page = state[type][sort].page + 1
    state[type][sort].loading = false
    state[type].bangumiId = +bangumiId
    state[type].userZone = userZone
  },
  SET_LOADING(state, { type, sort }) {
    state[type][sort].loading = true
  }
}

const actions = {
  async getMeta({ commit }, { type }) {
    const api = new Api()
    const data = await api.meta({ type })
    commit('SET_META', { data, type })
  },
  async initData(
    { state, commit },
    {
      ctx,
      sort,
      type,
      take = 10,
      bangumiId = 0,
      userZone = '',
      refresh = false
    }
  ) {
    if (
      +bangumiId !== state[type].bangumiId ||
      userZone !== state[type].userZone ||
      refresh
    ) {
      commit('RESET_STATE', { type })
    }
    if (
      state[type][sort].list.length ||
      state[type][sort].loading ||
      state[type][sort].nothing
    ) {
      return
    }
    commit('SET_LOADING', { type, sort })
    let data
    const source = state[type][sort]
    const list = source.list
    const api = new Api(ctx)
    if (sort === 'news') {
      data = await api.fetch({
        sort,
        type,
        take,
        page: source.page,
        seenIds: '',
        minId: refresh ? 0 : list.length ? list[list.length - 1].id : 0,
        bangumiId,
        userZone
      })
    } else {
      data = await api.fetch({
        sort,
        type,
        take,
        page: source.page,
        minId: 0,
        seenIds: refresh
          ? ''
          : list.length
            ? list.map(_ => _.id).toString()
            : '',
        bangumiId,
        userZone
      })
    }
    commit('PUSH_STATE', { data, type, sort, bangumiId, userZone, refresh })
  },
  async getData(
    { state, commit },
    {
      ctx,
      sort,
      type,
      take = 10,
      bangumiId = 0,
      userZone = '',
      refresh = false
    }
  ) {
    if (
      +bangumiId !== state[type].bangumiId ||
      userZone !== state[type].userZone
    ) {
      commit('RESET_STATE', { type })
    }
    if ((state[type][sort].noMore && !refresh) || state[type][sort].loading) {
      return
    }
    commit('SET_LOADING', { type, sort })
    let data
    const source = state[type][sort]
    const list = source.list
    const api = new Api(ctx)
    if (sort === 'news') {
      data = await api.fetch({
        sort,
        type,
        take,
        page: source.page,
        seenIds: '',
        minId: refresh ? 0 : list.length ? list[list.length - 1].id : 0,
        bangumiId,
        userZone
      })
    } else {
      data = await api.fetch({
        sort,
        type,
        take,
        page: source.page,
        minId: 0,
        seenIds: refresh
          ? ''
          : list.length
            ? list.map(_ => _.id).toString()
            : '',
        bangumiId,
        userZone
      })
    }
    commit('PUSH_STATE', { data, type, sort, bangumiId, userZone, refresh })
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

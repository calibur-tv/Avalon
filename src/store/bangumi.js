import Api from '~/api/bangumiApi'
import ScoreApi from '~/api/scoreApi'

const state = () => ({
  follows: null,
  released: [],
  timeline: {
    data: [],
    year: new Date().getFullYear(),
    noMore: false
  },
  category: {
    data: [],
    noMore: false,
    page: 0,
    take: 10
  },
  tags: [],
  info: null,
  videos: {
    id: 0,
    list: [],
    total: 0,
    has_season: false,
    fetched: false
  },
  cartoon: {
    id: 0,
    page: 0,
    take: 12,
    sort: 'desc',
    total: 0,
    list: [],
    noMore: false
  },
  topPosts: [],
  topFetchedId: 0,
  score: null,
  scoreFetchId: 0,
  recommended: [],
  hots: [],
  all: []
})

const mutations = {
  SET_ALL_BANGUMI(state, data) {
    state.all = data
  },
  SET_RECOMMENDED(state, data) {
    const shuffle = array => {
      const result = array.map(_ => _)
      for (let i = result.length; i; i--) {
        let j = Math.floor(Math.random() * i)
        ;[result[i - 1], result[j]] = [result[j], result[i - 1]]
      }
      return result
    }
    state.recommended = shuffle(data)
  },
  SET_HOTS(state, data) {
    state.hots = data
  },
  FETCH_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.info[`${type}_users`]
    state.info[`${type}_users`].list = prefix.list.concat(result.list)
    state.info[`${type}_users`].total = result.total
    state.info[`${type}_users`].noMore = result.noMore
  },
  SET_ROLES(state, { data, bangumiId }) {
    state.roles.data = state.roles.data.concat(data)
    state.roles.noMore = true
    state.roles.id = bangumiId
  },
  selectTag(state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  },
  SET_FOLLOW(state, { result }) {
    state.info.followed = result
    result ? state.info.follow_users.total++ : state.info.follow_users.total--
  },
  SET_RELEASED(state, data) {
    state.released = data
  },
  SET_TIMELINE(state, data) {
    const temp = state.timeline
    state.timeline.data = temp.data.concat(data.list)
    state.timeline.year = temp.year - 1
    state.timeline.noMore = data.noMore
  },
  SET_TAGS(state, { tags, id }) {
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    state.tags = tags
  },
  SET_CATEGORY(state, data) {
    state.category.data = state.category.data.concat(data.list)
    state.category.noMore = data.list.length < state.category.take
    state.category.page++
  },
  SET_TOP_POST(state, { data, id }) {
    state.topPosts = data
    state.topFetchedId = id
  },
  SET_BANGUMI_DATA(state, data) {
    state.info = data
  },
  SET_VIDEOS(state, { data, id }) {
    state.videos = {
      id,
      list: data.videos,
      total: data.total,
      has_season: data.has_season,
      fetched: true
    }
  },
  SET_BANGUMI_INFO(state, { key, value }) {
    state.info[key] = value
  },
  SET_BANGUMI_CARTOON(state, { data, bangumiId }) {
    state.cartoon.id = bangumiId
    state.cartoon.list = state.cartoon.list.concat(data.list)
    state.cartoon.noMore = data.noMore
    state.cartoon.total = data.total
    state.cartoon.page = state.cartoon.page + 1
  },
  REVERSE_CARTOON(state, { sort }) {
    state.cartoon.list = state.cartoon.list.reverse()
    state.cartoon.sort = sort
  },
  RESET_CARTOON(state, { sort }) {
    state.cartoon = {
      id: 0,
      page: 0,
      take: 12,
      sort,
      total: 0,
      list: [],
      noMore: false
    }
  },
  SET_BANGUMI_SCORE(state, { id, data }) {
    state.score = data
    state.scoreFetchId = id
  }
}

const actions = {
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
    const api = new Api()
    const data = await api.all()
    commit('SET_ALL_BANGUMI', data)
    try {
      sessionStorage.setItem('all-bangumi-load-at', Date.now())
      sessionStorage.setItem('all-bangumi-list', JSON.stringify(data))
    } catch (e) {}
  },
  async getTags({ state, commit }, { id, ctx }) {
    if (state.tags.length) {
      return
    }
    const api = new Api(ctx)
    const tags = await api.tags()
    commit('SET_TAGS', { tags, id })
  },
  async getBangumi({ state, commit }, { ctx, id }) {
    if (state.info && state.info.id === +id) {
      return
    }
    const api = new Api(ctx)
    const data = await api.show(id)
    commit('SET_BANGUMI_DATA', data)
  },
  async getVideos({ state, commit }, { id, ctx }) {
    if (state.videos.id && state.videos.id === id) {
      return
    }
    const api = new Api(ctx)
    const data = await api.videos(id)
    commit('SET_VIDEOS', { data, id })
  },
  async follow({ commit, rootState }, { ctx, id }) {
    const api = new Api(ctx)
    const followed = await api.follow(id)
    commit('SET_FOLLOW', {
      followed,
      self: {
        id: rootState.user.id,
        zone: rootState.user.zone,
        avatar: rootState.user.avatar,
        nickname: rootState.user.nickname
      }
    })
    return followed
  },
  async getReleased({ state, commit }, ctx) {
    if (state.released.length) {
      return
    }
    const api = new Api(ctx)
    const data = await api.released()
    commit('SET_RELEASED', data)
  },
  async getTimeline({ state, commit }, ctx) {
    if (state.timeline.noMore) {
      return
    }
    const api = new Api(ctx)
    const data = await api.timeline({
      year: state.timeline.year,
      take: state.timeline.take
    })
    commit('SET_TIMELINE', data)
  },
  async getCategory({ state, commit }, { id, ctx }) {
    const api = new Api(ctx)
    const data = await api.category({
      id,
      page: state.category.page,
      take: state.category.take
    })
    commit('SET_CATEGORY', data)
  },
  async getCartoons({ state, commit }, { ctx, bangumiId, init = false }) {
    if (init && state.cartoon.id === bangumiId) {
      return
    }
    const api = new Api(ctx)
    const data = await api.cartoon({
      bangumiId,
      page: state.cartoon.page,
      take: state.cartoon.take,
      sort: state.cartoon.sort
    })
    data && commit('SET_BANGUMI_CARTOON', { data, bangumiId })
  },
  async changeCartoonSort({ state, commit }, { ctx, bangumiId, sort }) {
    if (state.cartoon.noMore) {
      commit('REVERSE_CARTOON', { sort })
      return
    }
    commit('RESET_CARTOON', { sort })
    const api = new Api(ctx)
    const data = await api.cartoon({
      take: state.cartoon.take,
      page: 0,
      bangumiId,
      sort
    })
    data && commit('SET_BANGUMI_CARTOON', { data, bangumiId })
  },
  async getTopPosts({ state, commit }, { ctx, id }) {
    if (state.topFetchedId === id) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getTopPosts({ id })
    commit('SET_TOP_POST', { data, id })
  },
  async getBangumiScore({ state, commit }, { ctx, id }) {
    if (state.score && state.scoreFetchId === id) {
      return
    }
    const api = new ScoreApi(ctx)
    const data = await api.bangumiScore(id)
    commit('SET_BANGUMI_SCORE', { data, id })
  },
  async getRecommended({ state, commit }) {
    if (state.recommended.length) {
      return
    }
    const api = new Api(this)
    const data = await api.recommended()
    commit('SET_RECOMMENDED', data)
  },
  async getHots({ commit }) {
    const api = new Api(this)
    const data = await api.hots()
    commit('SET_HOTS', data)
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

import Api from '~/api/trendingApi';

const state = () => ({
  sort: '',
  type: '',
  news: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false,
  },
  active: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false,
  },
  hot: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false,
  },
});

const mutations = {
  INIT_TRENDING_TYPE(state, { type }) {
    state.type = type;
  },
  RESET_TRENDING_STATE(state, { type }) {
    state.sort = ''
    state.type = type
    state.news = {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: false,
    }
    state.active = {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: false,
    }
    state.hot = {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: false,
    }
  },
  INIT_TRENDING_DATA(state, { data, sort }) {
    state[sort].list = data.list;
    state[sort].total = data.total;
    state[sort].noMore = data.noMore;
    state[sort].nothing = !data.list.length;
    state[sort].loading = false;
  },
  PUSH_TRENDING_DATA(state, { data, sort }) {
    const list = state[sort].list.concat(data.list);
    state[sort].list = list;
    state[sort].total = data.total;
    state[sort].noMore = data.noMore;
    state[sort].nothing = !list.length;
    state[sort].loading = false;
  },
  SET_TRENDING_LOADING(state, { sort }) {
    state[sort].loading = true;
  },
  CLEAR_TRENDING_SORT(state, { sort }) {
    state[sort] = {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: true,
    };
  },
};

const actions = {
  async getTrending({ state, commit }, {
    ctx, type, sort, take, bangumiId = 0, useCache = true,
  }) {
    if (!state.type) {
      commit('INIT_TRENDING_TYPE', { type });
    } else if (state.type !== type) {
      commit('RESET_TRENDING_STATE', { type });
    }
    if (state[sort].list.length) {
      if (useCache) {
        return;
      }
      commit('CLEAR_TRENDING_SORT', { sort });
    }
    if (state[sort].loading) {
      return;
    }
    commit('SET_TRENDING_LOADING', { sort });
    const api = new Api(ctx)
    const data = await api.fetch({
      seenIds: '',
      minId: 0,
      sort,
      take,
      type,
      bangumiId
    });
    commit('INIT_TRENDING_DATA', { data, sort });
  },
  async loadMore({ state, commit }, { ctx, sort, type, take, bangumiId = 0 }) {
    if (!state.type || state.type !== type) {
      return;
    }
    if (state[sort].noMore || state[sort].loading) {
      return;
    }
    commit('SET_TRENDING_LOADING', { sort });
    let data;
    const list = state[sort].list;
    const api = new Api(ctx);
    if (sort === 'news') {
      data = await api.fetch({
        sort,
        type,
        take,
        minId: list.length ? list[list.length - 1].id : 0,
        bangumiId
      });
    } else {
      data = await api.fetch({
        sort,
        type,
        take,
        seenIds: list.length ? list.map(_ => _.id).toString() : '',
        bangumiId
      });
    }
    commit('PUSH_TRENDING_DATA', { data, sort });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

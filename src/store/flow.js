import Api from "~/api/flowApi";
import { merge } from "lodash";

const trendingFlowStore = {
  bangumiId: 0,
  news: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  active: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  hot: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  meta: null
};

const state = () => ({
  post: merge({}, trendingFlowStore),
  image: merge({}, trendingFlowStore),
  score: merge({}, trendingFlowStore)
});

const mutations = {
  SET_META(state, { data, type }) {
    state[type].meta = data;
  },
  RESET_STATE(state, { type }) {
    state[type] = merge({}, trendingFlowStore);
  },
  PUSH_STATE(state, { data, type, sort, bangumiId, refresh }) {
    const list = refresh ? data.list : state[type][sort].list.concat(data.list);
    state[type][sort].list = list;
    state[type][sort].total = data.total;
    state[type][sort].noMore = data.noMore;
    state[type][sort].nothing = !list.length;
    state[type][sort].loading = false;
    state[type].bangumiId = bangumiId;
  },
  SET_LOADING(state, { type, sort }) {
    state[type][sort].loading = true;
  }
};

const actions = {
  async getMeta({ commit }, { type }) {
    const api = new Api();
    const data = await api.meta({ type });
    commit("SET_META", { data, type });
  },
  async getData(
    { state, commit },
    { ctx, sort, type, take = 10, bangumiId = 0, refresh = false }
  ) {
    if (bangumiId !== state[type].bangumiId) {
      commit("RESET_STATE", { type });
    }
    if ((state[type][sort].noMore && !refresh) || state[type][sort].loading) {
      return;
    }
    commit("SET_LOADING", { type, sort });
    let data;
    const list = state[type][sort].list;
    const api = new Api(ctx);
    if (sort === "news") {
      data = await api.fetch({
        sort,
        type,
        take,
        seenIds: "",
        minId: refresh ? 0 : list.length ? list[list.length - 1].id : 0,
        bangumiId
      });
    } else {
      data = await api.fetch({
        sort,
        type,
        take,
        minId: 0,
        seenIds: refresh
          ? ""
          : list.length
            ? list.map(_ => _.id).toString()
            : "",
        bangumiId
      });
    }
    commit("PUSH_STATE", { data, type, sort, bangumiId, refresh });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

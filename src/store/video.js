import Api from "~/api/videoApi";

export default {
  namespaced: true,
  state: () => ({
    bangumi: null,
    info: null,
    list: null,
    season: null,
    blocked: false,
    mustReward: false,
    needMinLevel: 0
  }),
  mutations: {
    FETCH_SOCIAL_USERS(state, { type, result }) {
      const prefix = state.info[`${type}_users`];
      state.info[`${type}_users`].list = prefix.list.concat(result.list);
      state.info[`${type}_users`].total = result.total;
      state.info[`${type}_users`].noMore = result.noMore;
    },
    SOCIAL_TOGGLE(state, { key, value, user }) {
      state.info[`${key}ed`.replace("ee", "e")] = value;
      if (value) {
        state.info[`${key}_users`].total++;
        state.info[`${key}_users`].list.unshift(user);
      } else {
        state.info[`${key}_users`].total--;
        state.info[`${key}_users`].list.forEach((item, index) => {
          if (item.id === user.id) {
            state.info[`${key}_users`].list.splice(index, 1);
          }
        });
      }
    },
    SET_DATA(state, data) {
      state.list = data.list;
      state.info = data.info;
      state.bangumi = data.bangumi;
      state.season = data.season;
      state.blocked = data.ip_blocked;
      state.mustReward = data.must_reward;
      state.needMinLevel = data.need_min_level;
    },
    FOLLOW_ALBUM_BANGUMI(state, { result }) {
      state.bangumi.followed = result;
    }
  },
  actions: {
    async getShow({ commit }, { id, ctx }) {
      const api = new Api(ctx);
      const data = await api.getShow(id);
      commit("SET_DATA", data);
    }
  },
  getters: {}
};

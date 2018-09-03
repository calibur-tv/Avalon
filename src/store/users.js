import Api from "~/api/userApi";

const state = () => ({
  show: null,
  bangumis: [],
  notifications: {
    checked: 0,
    take: 10,
    list: [],
    noMore: false,
    total: 0
  }
});

const mutations = {
  SET_USER_INFO(state, data) {
    state.show = data;
  },
  SET_SELF_INFO(state, { key, value }) {
    if (Array.isArray(state.self[key])) {
      state.self[key] = state.self[key].concat(value);
    } else if (typeof state.self[key] === "object") {
      state.self[key] = Object.assign(state.self[key], value);
    } else {
      state.self[key] = value;
    }
  },
  SET_USER_FOLLOW_BANGUMI(state, bangumis) {
    state.bangumis = bangumis;
  },
  SET_NOTIFICATIONS(state, data) {
    state.notifications.list = state.notifications.list.concat(data.list);
    state.notifications.total = data.total;
    state.notifications.noMore = data.noMore;
    state.notifications.checked = 0;
  },
  READ_NOTIFICATION(state, id) {
    state.notifications.list.forEach((message, index) => {
      if (message.id === id && !message.checked) {
        state.notifications.list[index].checked = true;
        state.notifications.checked++;
      }
    });
  },
  READ_ALL_NOTIFICATION(state) {
    state.notifications.list.forEach((message, index) => {
      state.notifications.list[index].checked = true;
    });
    state.notifications.checked = 88888888;
  },
  RESET_NOTIFICATION(state) {
    state.notifications.total = 0;
    state.notifications.list = [];
    state.notifications.noMore = false;
  }
};

const actions = {
  async getUser({ commit }, { ctx, zone }) {
    const api = new Api(ctx);
    const data = await api.getUserInfo({ zone });
    commit("SET_USER_INFO", data);
  },
  async getFollowBangumis({ commit }, { ctx, zone }) {
    const api = new Api(ctx);
    const data = await api.followBangumis(zone);
    commit("SET_USER_FOLLOW_BANGUMI", data);
    return data;
  },
  async daySign({ rootState }, { ctx }) {
    if (rootState.user.signed) {
      return;
    }
    const api = new Api(ctx);
    await api.daySign();
  },
  async getNotifications({ state, commit }, { ctx, init }) {
    const length = state.notifications.list.length;
    if ((init && length) || state.notifications.noMore) {
      return;
    }
    const api = new Api(ctx);
    const data = await api.getNotifications({
      minId: length ? state.notifications.list[length - 1].id : null,
      take: state.notifications.take
    });
    commit("SET_NOTIFICATIONS", data);
  },
  async readMessage({ state, commit }, { ctx, id }) {
    let msg = null;
    state.notifications.list.forEach(message => {
      if (message.id === id && !message.checked) {
        msg = message;
      }
    });
    if (msg) {
      const api = new Api(ctx);
      await api.readMessage(id);
      commit("READ_NOTIFICATION", id);
    }
  },
  async readAllMessage({ commit }, ctx) {
    const api = new Api(ctx);
    await api.readAllMessage();
    commit("READ_ALL_NOTIFICATION");
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

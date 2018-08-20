import Api from "~/api/userApi";

const state = () => ({
  list: {},
  posts: {
    zone: "",
    take: 10,
    mine: {
      data: [],
      page: 0,
      noMore: false,
      loading: false
    },
    reply: {
      data: [],
      page: 0,
      noMore: false,
      loading: false
    },
    like: {
      data: [],
      page: 0,
      noMore: false,
      loading: false
    },
    mark: {
      data: [],
      page: 0,
      noMore: false,
      loading: false
    }
  },
  roles: {
    zone: "",
    data: [],
    page: 0,
    noMore: false
  },
  notifications: {
    checked: 0,
    take: 10,
    list: [],
    noMore: false,
    total: 0
  },
  self: {
    followBangumi: []
  }
});

const mutations = {
  SET_USER_ROLES(state, { data, zone }) {
    state.roles.zone = zone;
    state.roles.data = state.roles.data.concat(data.list);
    state.roles.noMore = data.noMore;
    state.roles.page++;
  },
  SET_USER_INFO(state, { data, zone }) {
    state.list[zone] = state.list[zone]
      ? Object.assign(state.list[zone], data)
      : data;
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
  SET_FOLLOW_POST_DATA(state, { data, type, zone }) {
    state.posts.zone = zone;
    state.posts[type] = {
      data: state.posts[type].data.concat(data.list),
      noMore: data.noMore,
      loading: false,
      page: state.posts[type].page + 1
    };
  },
  SET_FOLLOW_POST_STATE(state, { type }) {
    state.posts[type].loading = true;
  },
  SET_NOTIFICATIONS(state, data) {
    const list = state.notifications.list.concat(data.list);
    state.notifications.list = state.notifications.list.concat(data.list);
    state.notifications.total = data.total;
    state.notifications.noMore = data.noMore;
    state.notifications.checked = list.filter(_ => _.checked).length;
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
  CLEAR_FOLLOW_POST(state) {
    state.posts = {
      zone: "",
      take: 10,
      mine: {
        data: [],
        page: 0,
        noMore: false,
        loading: false
      },
      reply: {
        data: [],
        page: 0,
        noMore: false,
        loading: false
      },
      like: {
        data: [],
        page: 0,
        noMore: false,
        loading: false
      },
      mark: {
        data: [],
        page: 0,
        noMore: false,
        loading: false
      }
    };
  }
};

const actions = {
  async getUser({ commit }, { ctx, zone }) {
    const api = new Api(ctx);
    const data = await api.getUserInfo({ zone });
    commit("SET_USER_INFO", { data, zone });
  },
  async getFollowBangumis({ commit }, { ctx, zone, self }) {
    const api = new Api(ctx);
    const data = await api.followBangumis(zone);
    if (self) {
      commit("SET_SELF_INFO", {
        key: "followBangumi",
        value: data
      });
    } else {
      commit("SET_USER_INFO", {
        data: {
          bangumis: data
        },
        zone
      });
    }
    return data;
  },
  async getFollowPosts({ state, commit }, { type, zone }) {
    if (state.posts.zone !== zone) {
      commit("CLEAR_FOLLOW_POST");
    }
    if (state.posts[type].noMore || state.posts[type].loading) {
      return;
    }
    commit("SET_FOLLOW_POST_STATE", { type });
    const api = new Api();
    const data = await api.followPosts({
      type,
      zone,
      take: state.posts.take,
      page: state.posts[type].page
    });
    data && commit("SET_FOLLOW_POST_DATA", { type, data, zone });
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
  },
  async getFollowRoles({ state, commit }, { ctx, zone, reset }) {
    if (reset && state.roles.data.length) {
      return;
    }
    if (state.roles.noMore) {
      return;
    }
    const api = new Api(ctx);
    const data = await api.followRoles({
      zone,
      page: state.roles.page
    });
    data && commit("SET_USER_ROLES", { data, zone });
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

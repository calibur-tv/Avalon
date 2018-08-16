import Api from "~/api/postApi";

const state = () => ({
  info: {
    bangumi: null,
    user: null,
    post: null
  }
});

const mutations = {
  FETCH_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.info.post[`${type}_users`];
    state.info.post[`${type}_users`].list = prefix.list.concat(result.list);
    state.info.post[`${type}_users`].total = result.total;
    state.info.post[`${type}_users`].noMore = result.noMore;
  },
  SOCIAL_TOGGLE(state, { key, value, user }) {
    state.info.post[`${key}ed`.replace("ee", "e")] = value;
    if (value) {
      state.info.post[`${key}_users`].total++;
      state.info.post[`${key}_users`].list.push(user);
    } else {
      state.info.post[`${key}_users`].total--;
      state.info.post[`${key}_users`].list.forEach((item, index) => {
        if (item.id === user.id) {
          state.info.post[`${key}_users`].list.splice(index, 1);
        }
      });
    }
  },
  SET_POST_INFO(state, data) {
    state.info.bangumi = data.bangumi;
    state.info.user = data.user;
    state.info.post = data.post;
  },
  TOGGLE_LIKE_POST(state, { result }) {
    state.info.post.liked = result;
    result ? state.info.post.like_count++ : state.info.post.like_count--;
  },
  TOGGLE_MARK_POST(state, result) {
    state.info.post.marked = result;
    result ? state.info.post.mark_count++ : state.info.post.mark_count--;
  },
  FOLLOW_BANGUMI(state, { result }) {
    state.info.bangumi.followed = result;
  }
};

const actions = {
  async getPost({ commit }, { id, ctx, only }) {
    const api = new Api(ctx);
    const data = await api.show({ id, only });
    commit("SET_POST_INFO", data);
  },
  async create({}, params) {
    const api = new Api(params.ctx);
    return await api.create(params);
  },
  async deletePost({}, { ctx, id }) {
    const api = new Api(ctx);
    await api.deletePost(id);
  },
  async toggleLike({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const result = await api.toggleLike(id);
    commit("TOGGLE_LIKE_POST", { result });
  },
  async toggleMark({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const result = await api.toggleMark(id);
    commit("TOGGLE_MARK_POST", result);
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

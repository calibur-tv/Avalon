import Api from "~/api/questionApi";

const state = () => ({
  qaq: null,
  answer: null
});

const mutations = {
  SET_QAQ(state, data) {
    state.qaq = data;
  },
  SET_ANSWER(state, data) {
    state.qaq = data.question;
    state.answer = data.answer;
  },
  FETCH_QAQ_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.qaq[`${type}_users`];
    state.qaq[`${type}_users`].list = prefix.list.concat(result.list);
    state.qaq[`${type}_users`].total = result.total;
    state.qaq[`${type}_users`].noMore = result.noMore;
  },
  QAQ_SOCIAL_TOGGLE(state, { key, value, user }) {
    state.qaq[`${key}ed`.replace("ee", "e")] = value;
    if (value) {
      state.qaq[`${key}_users`].total++;
      state.qaq[`${key}_users`].list.unshift(user);
    } else {
      state.qaq[`${key}_users`].total--;
      state.qaq[`${key}_users`].list.forEach((item, index) => {
        if (item.id === user.id) {
          state.qaq[`${key}_users`].list.splice(index, 1);
        }
      });
    }
  }
};

const actions = {
  async getQAQ({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const data = await api.getQuestionShow({ id });
    commit("SET_QAQ", data);
  },
  async getAnswer({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const data = await api.getAnswerShow({ id });
    commit("SET_ANSWER", data);
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

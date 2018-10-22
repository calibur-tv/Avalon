import Api from "~/api/cmApi";

export default {
  namespaced: true,
  state: () => ({
    loops: []
  }),
  mutations: {
    SET_LOOPS(state, data) {
      state.loops = data;
    }
  },
  actions: {
    async getCmLoop({ commit }) {
      const api = new Api();
      const data = await api.getLoop();
      commit("SET_LOOPS", data);
    }
  },
  getters: {}
};

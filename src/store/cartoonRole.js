import Api from '~/api/cartoonRoleApi'

export default {
  namespaced: true,
  state: () => ({
    trending: {
      data: [],
      noMore: false
    },
    fans: {
      new: {
        data: [],
        noMore: false
      },
      hot: {
        data: [],
        noMore: false
      }
    }
  }),
  mutations: {
    SET_DATA (state, data) {
      state.list = data.list
      state.info = data.info
      state.bangumi = data.bangumi
      state.season = data.season
    },
    SET_TRENDING (state, data) {
      state.trending.data = state.trending.data.concat(data)
      state.trending.noMore = data.length < 15
    },
    SET_FANS_LIST (state, { data, reset, sort }) {
      if (reset) {
        state.fans = {
          new: {
            data: [],
            noMore: false
          },
          hot: {
            data: [],
            noMore: false
          }
        }
      }
      state.fans[sort].data = state.fans[sort].data.concat(data)
      state.fans[sort].noMore = data.length < 15
    }
  },
  actions: {
    async getShow ({ commit }, { id, ctx }) {
      const api = new Api(ctx)
      const data = await api.getShow(id)
      commit('SET_DATA', data)
    },
    async getTrending ({ state, commit }) {
      if (state.trending.noMore) {
        return
      }
      const api = new Api()
      const data = await api.trending({
        seenIds: state.trending.data.length ? state.trending.data.map(item => item.id).join(',') : null
      })
      commit('SET_TRENDING', data)
    },
    async getFansList ({ state, commit }, { bangumiId, roleId, sort, reset }) {
      if (state.fans[sort].noMore && !reset) {
        return
      }
      const api = new Api()
      const length = state.fans[sort].data.length
      const data = await api.fans(Object.assign({
        sort,
        bangumiId,
        roleId
      }, sort === 'new' ? {
        minId: reset ? null : length ? state.fans[sort].data[length - 1].id : null
      } : {
        seenIds: reset ? null : length ? state.fans[sort].data.map(item => item.id).join(',') : null
      }))
      commit('SET_FANS_LIST', { data, reset, sort })
    }
  },
  getters: {}
}

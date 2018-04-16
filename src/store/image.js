import BangumiApi from '~/api/bangumiApi'
import UserApi from '~/api/userApi'

export default {
  namespaced: true,
  state: () => ({
    waterfall: {
      data: [],
      take: 12,
      type: 0,
      noMore: false
    }
  }),
  mutations: {
    SET_WATERFALL (state, data) {
      state.waterfall.data = state.waterfall.data.concat(data)
      state.waterfall.noMore = data.length < state.waterfall.take
    },
    DELETE_WATERFALL (state, { id }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data.splice(index, 1)
        }
      })
    },
    EDIT_WATERFALL (state, data) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === data.id) {
          state.waterfall.data[index].role_id = data.role_id
          state.waterfall.data[index].tags = data.tags
          state.waterfall.data[index].role = data.role
        }
      })
    },
    LIKE_WATERFALL (state, { id, result }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index].like_count += result ? 1 : -1
          state.waterfall.data[index].liked = result
        }
      })
    }
  },
  actions: {
    async getBangumiImages ({ state, commit }, { id, ctx }) {
      const api = new BangumiApi(ctx)
      const data = await api.images({
        id,
        take: state.waterfall.take,
        type: state.waterfall.type,
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null
      })
      commit('SET_WATERFALL', data.list)
    },
    async getUserImages ({ state, commit }, { zone, ctx }) {
      if (state.waterfall.noMore) {
        return
      }
      const api = new UserApi(ctx)
      const data = await api.images({
        zone,
        page: state.waterfall.page,
        take: state.waterfall.take
      })
      commit('SET_WATERFALL', data)
    }
  },
  getters: {}
}

import Api from '~/api/cartoonRoleApi'

export default {
  namespaced: true,
  state: () => ({
    fans: {
      new: {
        data: [],
        total: 0,
        noMore: false
      },
      hot: {
        data: [],
        total: 0,
        noMore: false
      }
    },
    info: {
      data: {},
      bangumi: {}
    },
    todayActivity: [],
    dalao: [],
    newbie: []
  }),
  mutations: {
    SET_DALAO(state, data) {
      state.dalao = data
    },
    SET_NEWBIE(state, data) {
      state.newbie = data
    },
    SET_TODAY_ACTIVITY(state, data) {
      state.todayActivity = data
    },
    ADD_ROLE_STATE(state, { hasStar, user }) {
      if (hasStar) {
        state.info.data.hasStar++
      } else {
        state.info.data.hasStar = 1
        state.info.data.fans_count++
        state.fans.new.data.unshift(user)
      }
      state.info.data.star_count++
    },
    FOLLOW_ROLE_BANGUMI(state, { result }) {
      state.info.bangumi.followed = result
    },
    SET_ROLE_INFO(state, data) {
      state.info = data
    },
    SET_FANS_LIST(state, { data, reset, sort }) {
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
      state.fans[sort].data = state.fans[sort].data.concat(data['list'])
      state.fans[sort].noMore = data['noMore']
      state.fans[sort].total = data['total']
    }
  },
  actions: {
    async getFansList({ state, commit }, { bangumiId, roleId, sort, reset }) {
      if (state.fans[sort].noMore && !reset) {
        return
      }
      const api = new Api()
      const length = state.fans[sort].data.length
      const data = await api.fans(
        Object.assign(
          {
            sort,
            bangumiId,
            roleId
          },
          sort === 'new'
            ? {
                minId: reset
                  ? 0
                  : length
                    ? state.fans[sort].data[length - 1].id
                    : 0
              }
            : {
                seenIds: reset
                  ? ''
                  : length
                    ? state.fans[sort].data.map(item => item.id).toString()
                    : ''
              }
        )
      )
      commit('SET_FANS_LIST', { data, reset, sort })
    },
    async getRoleInfo({ commit }, { ctx, id }) {
      const api = new Api(ctx)
      const data = await api.show(id)
      commit('SET_ROLE_INFO', data)
    },
    async getTodayActivity({ commit }) {
      const api = new Api()
      const data = await api.getTodayActivity()
      commit('SET_TODAY_ACTIVITY', data)
    },
    async getNewbieUsers({ commit }) {
      const api = new Api()
      const data = await api.newbie()
      commit('SET_NEWBIE', data)
    },
    async getDalaoUsers({ commit }) {
      const api = new Api()
      const data = await api.dalao()
      commit('SET_DALAO', data)
    },
    async star({ rootState, commit }, { bangumiId, roleId, ctx, hasStar }) {
      const api = new Api(ctx)
      await api.star({ bangumiId, roleId })
      const self = rootState.user
      commit('ADD_ROLE_STATE', {
        hasStar,
        user: {
          id: self.id,
          zone: self.zone,
          avatar: self.avatar,
          nickname: self.nickname
        }
      })
    }
  },
  getters: {}
}

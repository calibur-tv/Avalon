import Vue from 'vue'
import { getPageData } from '~/api/carouselApi'
import { getLoginUser, getNotificationCount } from '~/api/userApi'
import { getUpToken } from '~/api/imageApi'
import parseToken from '~/assets/js/parseToken'

export const state = () => ({
  isAuth: false,
  user: null,
  login: false,
  pageData: null,
  haveAuthToken: false
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.login = !!user.id
    state.isAuth = true
  },
  SET_AUTH_TOKEN(state, token) {
    const bool = !!token
    state.haveAuthToken = bool
    if (!bool) {
      state.isAuth = true
    }
  },
  SET_PAGE_DATA(state, data) {
    state.pageData = data
  },
  UPDATE_USER_INFO(state, { key, value }) {
    Vue.set(state.user, key, value)
  },
  UPDATE_USER_EXP(state, score) {
    if (!state.login || !score) {
      return
    }
    // level * (level + 10) 是经验计算公式
    if (score > 0) {
      if (state.user.exp.have_exp + score >= state.user.next_level_exp) {
        const newLevel = state.user.exp.level + 1
        state.user.exp.level = newLevel
        state.user.exp.have_exp =
          state.user.exp.have_exp + score - state.user.next_level_exp
        state.user.exp.next_level_exp = newLevel * newLevel + newLevel * 10
      } else {
        state.user.exp.have_exp = state.user.exp.have_exp + score
      }
    } else {
      if (state.user.exp.have_exp + score < 0) {
        const newLevel = state.user.exp.level - 1
        const lastTotalExp = newLevel * newLevel + newLevel * 10
        state.user.exp.have_exp = lastTotalExp + state.user.exp.have_exp + score
        state.user.exp.next_level_exp = lastTotalExp
      } else {
        state.user.exp.have_exp = state.user.exp.have_exp + score
      }
    }
  },
  USE_COIN(state, amount = 1) {
    if (!state.login) {
      return
    }
    state.user.coin -= amount
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const data = await getPageData(this)
    commit('SET_AUTH_TOKEN', parseToken(req))
    commit('SET_PAGE_DATA', data)
  },
  async initAuth({ state, commit }) {
    if (state.user) {
      return true
    }
    if (!state.haveAuthToken) {
      commit('SET_USER', {})
      return false
    }
    try {
      const data = await getLoginUser(this)
      commit('SET_USER', data)
      const notification = await getNotificationCount(this)
      commit('UPDATE_USER_INFO', {
        key: 'notification',
        value: notification
      })
      return true
    } catch (e) {
      commit('SET_USER', {})
      return false
    }
  },
  async getNotification({ state, commit }) {
    if (!state.login) {
      return
    }
    const data = await getNotificationCount(this)
    commit('UPDATE_USER_INFO', {
      key: 'notification',
      value: data
    })
  },
  async getUpToken({ state, commit }) {
    if (!state.login) {
      return
    }
    if (state.user.uptoken.expiredAt <= parseInt(Date.now() / 1000, 10)) {
      const data = await getUpToken()
      commit('UPDATE_USER_INFO', {
        key: 'uptoken',
        value: data
      })
    }
  }
}

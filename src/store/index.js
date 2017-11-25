import Vue from 'vue'
import Vuex from 'vuex'
import UserApi from 'api/userApi'
import homepage from './homepage'
import bangumi from './bangumi'
import video from './video'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: () => {
      return {
        user: null,
        token: '',
        login: false
      }
    },
    mutations: {
      SET_USER (state, user) {
        state.user = user
        state.login = true
      },
      SET_TOKEN (state, data) {
        state.token = data
      }
    },
    actions: {
      async init ({ commit }, { ctx }) {
        const cookie = ctx.header.cookie
        if (cookie) {
          let token = ''
          cookie.split('; ').forEach(item => {
            const temp = item.split('=')
            if (temp[0] === 'JWT-TOKEN') {
              token = temp[1]
            }
          })
          if (token) {
            const api = new UserApi(token)
            const user = await api.getLoginUser()
            if (user) {
              commit('SET_TOKEN', token)
              commit('SET_USER', user)
            }
          }
        }
      }
    },
    getters: {},
    modules: {
      homepage,
      bangumi,
      video
    }
  })
}

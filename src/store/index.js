import Vue from 'vue'
import Vuex from 'vuex'
import UserApi from '~/api/userApi'
import homepage from './homepage'
import bangumi from './bangumi'
import video from './video'
import users from './users'
import image from './image'
import post from './post'

import ImageApi from '~/api/imageApi'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: () => ({
      user: null,
      token: '',
      login: false,
      banner: 'banner/1.jpg'
    }),
    mutations: {
      SET_USER (state, user) {
        state.user = user
        state.login = true
      },
      SET_TOKEN (state, data) {
        state.token = data
      },
      SET_USER_INFO (state, data) {
        Object.keys(data).forEach(key => {
          state.user[key] = data[key]
        })
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
      },
      async getUpToken ({ state, commit }) {
        if (state.user.uptoken.expiredAt <= parseInt(Date.now() / 1000, 10)) {
          const api = new ImageApi()
          const data = await api.getUpToken()
          commit('SET_USER_INFO', {
            uptoken: data
          })
        }
      }
    },
    getters: {},
    modules: {
      homepage,
      bangumi,
      video,
      users,
      image,
      post
    }
  })
}

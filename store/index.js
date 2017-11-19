export const state = () => ({
  user: null,
  token: '',
  login: false
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
    state.login = true
  },
  SET_TOKEN (state, data) {
    state.token = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app, req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      let token = ''
      cookie.split('; ').forEach(item => {
        const temp = item.split('=')
        if (temp[0] === 'JWT-TOKEN') {
          token = temp[1]
        }
      })
      app.$axios.setToken(token, 'Bearer')
      const user = await app.$axios.post('door/user')
      if (user) {
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
      }
    }
  }
}

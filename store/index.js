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
  async nuxtServerInit ({ commit }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      let token = ''
      cookie.split('; ').forEach(item => {
        const temp = item.split('=')
        if (temp[0] === 'JWT-TOKEN') {
          token = temp[1]
        }
      })
      commit('SET_TOKEN', token)
    }
  }
}

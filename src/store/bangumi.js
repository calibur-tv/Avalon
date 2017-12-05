import Api from 'api/bangumiApi'

const state = () => ({
  news: [],
  tags: [],
  rank: [],
  list: Object.create(null)
})

const mutations = {
  pushNews (state, data) {
    state.news = data
  },
  pushTags (state, data) {
    state.tags = data
  },
  pushRank (state, data) {
    state.rank = data
  },
  pushList (state, data) {
    state.list[data.id] = data
  },
  selectTag (state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  },
  followBangumi (state, { followed, id, self }) {
    const bangumi = state.list[id]
    if (bangumi) {
      state.list[id].followed = followed
      if (followed) {
        state.list[id].followers.push(self)
      } else {
        bangumi.followers.forEach((user, index) => {
          if (user.zone === self.zone) {
            state.list[id].followers.splice(index, 1)
          }
        })
      }
    }
  }
}

const actions = {
  async getNews ({ state, commit }) {
    if (state.news.length) {
      return
    }
    const api = new Api()
    const data = await api.getNews()
    commit('pushNews', data)
  },
  async getTags ({ state, commit }, id) {
    if (state.tags.length && !id) {
      return
    }
    const api = new Api()
    const data = await api.getTags(id)
    const tags = data.tags
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    commit('pushTags', tags)
    commit('pushRank', data.bangumis)
  },
  async getShow ({ state, commit }, { ctx, id }) {
    if (state.list[id]) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getShow(id)
    commit('pushList', data)
  },
  follow ({ commit, rootState }, { ctx, id }) {
    const api = new Api(ctx)
    api.follow(id).then((followed) => {
      commit('followBangumi', {
        followed,
        id,
        self: {
          zone: rootState.user.zone,
          avatar: rootState.user.avatar,
          nickname: rootState.user.nickname
        }
      })
    }).catch((err) => {
      console.log(err)
      err.message.forEach(tip => {
        ctx.$toast.error(tip)
      })
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

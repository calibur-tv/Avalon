import Api from '~/api/questionApi'
import FlowApi from '~/api/flowApi'

const state = () => ({
  qaq: null,
  answers: {
    questionId: 0,
    userZone: '',
    list: [],
    page: 0,
    total: 0,
    noMore: false,
    nothing: false
  }
})

const mutations = {
  SET_QAQ(state, data) {
    state.qaq = data
  },
  EDIT_ANSWER(state, { id }) {
    state.qaq.my_answer = {
      id,
      published_at: null
    }
  },
  SET_ANSWER(state, data) {
    state.qaq = data.question
    state.answers.list = [data.answer]
  },
  FETCH_QAQ_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.qaq[`${type}_users`]
    state.qaq[`${type}_users`].list = prefix.list.concat(result.list)
    state.qaq[`${type}_users`].total = result.total
    state.qaq[`${type}_users`].noMore = result.noMore
  },
  FETCH_ANSWER_SOCIAL_USERS(state, { id, type, result }) {
    let actionIndex = -1
    state.answers.list.forEach((item, index) => {
      if (item.id === id) {
        actionIndex = index
      }
    })
    if (actionIndex === -1) {
      return
    }
    const prefix = state.answers.list[actionIndex][`${type}_users`]
    state.answers.list[actionIndex][`${type}_users`].list = prefix.list.concat(
      result.list
    )
    state.answers.list[actionIndex][`${type}_users`].total = result.total
    state.answers.list[actionIndex][`${type}_users`].noMore = result.noMore
  },
  QAQ_SOCIAL_TOGGLE(state, { key, value, user }) {
    state.qaq[`${key}ed`.replace('ee', 'e')] = value
    if (value) {
      state.qaq[`${key}_users`].total++
      state.qaq[`${key}_users`].list.unshift(user)
    } else {
      state.qaq[`${key}_users`].total--
      state.qaq[`${key}_users`].list.forEach((item, index) => {
        if (item.id === user.id) {
          state.qaq[`${key}_users`].list.splice(index, 1)
        }
      })
    }
  },
  ANSWER_SOCIAL_TOGGLE(state, { id, key, value, user }) {
    let actionIndex = -1
    state.answers.list.forEach((item, index) => {
      if (item.id === id) {
        actionIndex = index
      }
    })
    if (actionIndex === -1) {
      return
    }
    state.answers.list[actionIndex][`${key}ed`.replace('ee', 'e')] = value
    if (value) {
      state.answers.list[actionIndex][`${key}_users`].total++
      state.answers.list[actionIndex][`${key}_users`].list.unshift(user)
    } else {
      state.answers.list[actionIndex][`${key}_users`].total--
      state.answers.list[actionIndex][`${key}_users`].list.forEach(
        (item, index) => {
          if (item.id === user.id) {
            state.answers.list[actionIndex][`${key}_users`].list.splice(
              index,
              1
            )
          }
        }
      )
    }
  },
  TOGGLE_ANSWER_VOTE(state, { id, data }) {
    let actionIndex = -1
    state.answers.list.forEach((item, index) => {
      if (item.id === id) {
        actionIndex = index
      }
    })
    if (actionIndex === -1) {
      return
    }
    state.answers.list[actionIndex].vote_count = data.total
    state.answers.list[actionIndex].voted = data.result
  },
  COMMENT_CHANGE_COUNT(state, { id, key, value }) {
    if (key === 'qaq') {
      state.qaq.comment_count = state.qaq.comment_count + value
    } else {
      let actionIndex = -1
      state.answers.list.forEach((item, index) => {
        if (item.id === id) {
          actionIndex = index
        }
      })
      if (actionIndex === -1) {
        return
      }
      state.answers.list[actionIndex].comment_count =
        state.answers.list[actionIndex].comment_count + value
    }
  },
  SET_ANSWERS(state, { data, questionId, userZone, refresh }) {
    const list = refresh ? data.list : state.answers.list.concat(data.list)
    state.answers.list = list
    state.answers.total = data.total
    state.answers.noMore = data.noMore
    state.answers.nothing = !list.length
    state.answers.page = state.answers.page + 1
    state.answers.questionId = +questionId
    state.answers.userZone = userZone
  }
}

const actions = {
  async getQAQ({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    const data = await api.getQuestionShow({ id })
    commit('SET_QAQ', data)
  },
  async getAnswer({ commit }, { ctx, id }) {
    const api = new Api(ctx)
    const data = await api.getAnswerShow({ id })
    commit('SET_ANSWER', data)
  },
  async getAnswers(
    { state, commit },
    { ctx, take = 10, questionId = 0, userZone = '', refresh = false }
  ) {
    if (state.answers.noMore && !refresh) {
      return
    }
    let data
    const source = state.answers
    const list = source.list
    const api = new FlowApi(ctx)
    data = await api.fetch({
      sort: 'active',
      type: 'answer',
      take,
      page: source.page,
      minId: 0,
      seenIds: refresh ? '' : list.length ? list.map(_ => _.id).toString() : '',
      bangumiId: questionId,
      userZone
    })
    commit('SET_ANSWERS', { data, questionId, userZone, refresh })
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

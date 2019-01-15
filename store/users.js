import {
  getNotifications,
  daySignAction,
  readMessage,
  readNotice
} from '~/api/userApi'

export const state = () => ({
  show: null,
  notifications: {
    checked: 0,
    take: 10,
    list: [],
    noMore: false,
    total: 0,
    system_count: 0,
    user_count: 0
  }
})

export const mutations = {
  SET_USER_INFO(state, data) {
    state.show = data
  },
  SET_NOTIFICATIONS(state, data) {
    state.notifications.list = state.notifications.list.concat(data.list)
    state.notifications.total = data.total
    state.notifications.noMore = data.noMore
    state.notifications.checked = 0
    if (data.system_count) {
      state.notifications.system_count = data.system_count
    }
  },
  READ_NOTIFICATION(state, id) {
    state.notifications.list.forEach((message, index) => {
      if (message.id === id && !message.checked) {
        state.notifications.list[index].checked = true
        state.notifications.checked++
      }
    })
  },
  READ_ALL_NOTIFICATION(state) {
    state.notifications.list.forEach((message, index) => {
      state.notifications.list[index].checked = true
    })
    state.notifications.checked = 88888888
  },
  CLEAR_NOTICE(state) {
    state.notifications.checked += state.notifications.system_count
    state.notifications.system_count = 0
  }
}

export const actions = {
  async daySign({ rootState }) {
    if (rootState.user.signed) {
      return
    }
    return await daySignAction(this)
  },
  async getNotifications({ state, commit }, { init }) {
    const length = state.notifications.list.length
    if ((init && length) || state.notifications.noMore) {
      return
    }
    const data = await getNotifications(this, {
      minId: length ? state.notifications.list[length - 1].id : null,
      take: state.notifications.take
    })
    commit('SET_NOTIFICATIONS', data)
  },
  async readMessage({ state, commit }, { id }) {
    let msg = null
    state.notifications.list.forEach(message => {
      if (message.id === id && !message.checked) {
        msg = message
      }
    })
    if (msg) {
      await readMessage(this, { id })
      commit('READ_NOTIFICATION', id)
    }
  },
  async readNotice({ state, commit }, { id }) {
    if (!state.notifications.system_count) {
      return
    }
    await readNotice(this, { id })
    commit('CLEAR_NOTICE')
  }
}

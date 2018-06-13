import Api from '~/api/commentApi'

const state = () => ({
  type: '',
  fetchId: 0,
  list: [],
  total: 0,
  noMore: false,
  submitting: false
})

const mutations = {
  RESET_STATE (state, { type }) {
    state = {
      type,
      fetchId: '',
      list: [],
      total: 0,
      noMore: false,
      submitting: false
    }
  },
  INIT_FETCH_TYPE (state, { type }) {
    state.type = type
  },
  SET_MAIN_COMMENTS (state, comments) {
    if (!comments.list.length) {
      state.noMore = comments.noMore
      state.total = comments.total
      return
    }
    const formatComments = comments.list.map(item => {
      // 子评论的 key 是 comments，是个对象，有 list，noMore，total 三个 key
      const childrenCommentList = item.comments.list
      const childrenCommentLength = childrenCommentList.length
      // 在每个子评论对象里里维护一个 maxId，这里默认子评论是 id 增大排序的
      const childrenCommentObj = Object.assign(item.comments, {
        maxId: childrenCommentLength ? childrenCommentList[childrenCommentLength - 1].id : 0
      })
      return Object.assign(item, {
        comments: childrenCommentObj
      })
    })
    // 操作主评论的 fetchId
    const resIds = formatComments.map(_ => _.id)
    state.fetchId = formatComments[formatComments.length - 1].id
    state.list = state.list.filter(_ => resIds.indexOf(_.id) === -1)
    state.list = state.list.concat(formatComments)
    state.noMore = comments.noMore
    state.total = comments.total
  },
  SET_SUB_COMMENTS (state, { comments, parentId }) {
    let parentComment = null
    let parentIndex = 0
    state.list.forEach((item, index) => {
      if (item.id === parentId) {
        parentComment = item
        parentIndex = index
      }
    })
    if (!parentComment) {
      return
    }
    const resIds = comments.list.map(_ => _.id)
    // 操作一下 maxId 即可
    state.list[parentIndex].maxId = comments.list[comments.list.length - 1].id
    state.list[parentIndex].comments.list = parentComment.comments.list.filter(_ => resIds.indexOf(_.id) === -1)
    state.list[parentIndex].comments.list = state.list[parentIndex].comments.list.concat(comments.list)
    state.list[parentIndex].comments.total = comments.total
    state.list[parentIndex].comments.noMore = comments.noMore
  },
  CREATE_MAIN_COMMENT (state, comment) {
    state.list.push(comment)
  },
  CREATE_SUB_COMMENT (state, { id, comment }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list[index].comments.list.push(comment)
        state.list[index].comments.total = state.list[index].comments.total + 1
      }
    })
  },
  SET_SUBMITTING (state, { result }) {
    state.submitting = result
  }
}

const actions = {
  async getMainComments ({ state, commit }, { ctx, type, id }) {
    if (state.type) {
      if (state.type === type) {
        if (state.noMore) {
          return
        }
      } else {
        commit('RESET_STATE', { type })
      }
    } else {
      commit('INIT_FETCH_TYPE', { type })
    }
    const api = new Api(ctx)
    const data = await api.getMainCommentList({
      type,
      id,
      fetchId: state.fetchId
    })
    data && commit('SET_MAIN_COMMENTS', data)
  },
  async getSubComments ({ state, commit }, { ctx, type, parentId }) {
    const store = state.list.filter(_ => _.id === parentId)[0].comments
    if (store.noMore) {
      return
    }
    const api = new Api(ctx)
    const comments = await api.getSubCommentList({
      type,
      parentId,
      maxId: store.maxId
    })
    commit('SET_SUB_COMMENTS', { comments, parentId })
  },
  async createMainComment ({ commit }, data) {
    const comment = await Api.createMainComment(data)
    commit('CREATE_MAIN_COMMENT', comment)
  },
  async createSubComment ({ commit }, { ctx, id, type, content, targetUserId }) {
    const api = new Api(ctx)
    const comment = await api.createSubComment({
      id, type, content, targetUserId
    })
    commit('CREATE_SUB_COMMENT', { id, comment })
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

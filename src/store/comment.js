import Api from "~/api/commentApi";
import { orderBy } from "lodash";

const state = () => ({
  type: "",
  sort: "desc",
  fetchId: 0,
  list: [],
  total: 0,
  noMore: false,
  submitting: false,
  id: 0
});

const mutations = {
  RESET_STATE(state, { type }) {
    state.type = type;
    state.sort = type === "post" ? "asc" : "desc";
    state.fetchId = 0;
    state.list = [];
    state.total = 0;
    state.noMore = false;
    state.submitting = false;
    state.id = 0;
  },
  INIT_FETCH_TYPE(state, { type }) {
    state.type = type;
    if (type === "post") {
      state.sort = "asc";
    }
  },
  SET_MAIN_COMMENTS(state, { comments, seeReplyId, id }) {
    state.id = +id;
    if (!comments.list.length) {
      state.noMore = comments.noMore;
      state.total = comments.total;
      return;
    }
    const formatComments = comments.list.map(item => {
      // 子评论的 key 是 comments，是个对象，有 list，noMore，total 三个 key
      const childrenCommentList = item.comments.list;
      const childrenCommentLength = childrenCommentList.length;
      // 在每个子评论对象里里维护一个 maxId，这里默认子评论是 id 增大排序的
      const childrenCommentObj = Object.assign(item.comments, {
        maxId: childrenCommentLength
          ? childrenCommentList[childrenCommentLength - 1].id
          : 0
      });
      return Object.assign(item, {
        comments: childrenCommentObj
      });
    });
    // 更新 fetchId，如果是第一页，并且有 seeReplyId，就比较麻烦
    state.fetchId = formatComments[formatComments.length - 1].id;
    if (!state.list.length && seeReplyId) {
      state.fetchId = formatComments
        .map(_ => _.id)
        .filter(_ => _ !== parseInt(seeReplyId, 10))
        .pop();
    }
    // 操作主评论的 fetchId
    const resIds = formatComments.map(_ => _.id);
    const originList = state.list;
    // 对服务端进行一个校准
    const hasNew = !!resIds.filter(
      _ => originList.map(_ => _.id).indexOf(_) === -1
    ).length;
    state.list = state.list.filter(_ => resIds.indexOf(_.id) === -1);
    state.list = orderBy(state.list.concat(formatComments), "id", state.sort);
    state.noMore = hasNew ? comments.noMore : true;
    state.total = hasNew ? comments.total : state.list.length;
  },
  SET_SUB_COMMENTS(state, { comments, id }) {
    let parentComment = null;
    let parentIndex = 0;
    state.list.forEach((item, index) => {
      if (item.id === id) {
        parentComment = item;
        parentIndex = index;
      }
    });
    if (!parentComment) {
      return;
    }
    // 更新 maxId
    state.list[parentIndex].comments.maxId =
      comments.list[comments.list.length - 1].id;
    // 返回的 ids
    const resIds = comments.list.map(_ => _.id);
    const parentCommentList = parentComment.comments.list;
    // 对服务端进行一个校准
    const hasNew = !!resIds.filter(
      _ => parentCommentList.map(_ => _.id).indexOf(_) === -1
    ).length;
    state.list[parentIndex].comments.list = parentCommentList.filter(
      _ => resIds.indexOf(_.id) === -1
    );
    state.list[parentIndex].comments.list = state.list[
      parentIndex
    ].comments.list.concat(comments.list);
    state.list[parentIndex].comments.noMore = hasNew ? comments.noMore : true;
    state.list[parentIndex].comments.total = hasNew
      ? comments.total
      : state.list[parentIndex].comments.list.length;
  },
  CREATE_MAIN_COMMENT(state, comment) {
    state.sort === "asc"
      ? state.list.push(comment)
      : state.list.unshift(comment);
    state.total = state.total + 1;
  },
  CREATE_SUB_COMMENT(state, { id, comment }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list[index].comments.list.push(comment);
        state.list[index].comments.total = state.list[index].comments.total + 1;
      }
    });
  },
  SET_SUBMITTING(state, { result }) {
    state.submitting = result;
  },
  DELETE_SUB_COMMENT(state, { parentId, id }) {
    state.list.forEach((parent, index) => {
      if (parent.id === parentId) {
        parent.comments.list.forEach((item, subIndex) => {
          if (item.id === id) {
            state.list[index].comments.list.splice(subIndex, 1);
            state.list[index].comments.total =
              state.list[index].comments.total - 1;
          }
        });
      }
    });
  },
  DELETE_MAIN_COMMENT(state, { id }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        state.list.splice(index, 1);
        state.total = state.total - 1;
      }
    });
  },
  TOGGLE_LIKE_SUB_COMMENT(state, { id, parentId }) {
    state.list.forEach((parent, index) => {
      if (parent.id === parentId) {
        parent.comments.list.forEach((item, subIndex) => {
          if (item.id === id) {
            const result = !state.list[index].comments[subIndex].liked;
            state.list[index].comments[subIndex].liked = result;
            state.list[index].comments[subIndex].like_count =
              state.list[index].comments[subIndex].like_count +
              (result ? 1 : -1);
          }
        });
      }
    });
  },
  TOGGLE_LIKE_MAIN_COMMENT(state, { id }) {
    state.list.forEach((item, index) => {
      if (item.id === id) {
        const result = !state.list[index].liked;
        state.list[index].liked = result;
        state.list[index].like_count =
          state.list[index].like_count + (result ? 1 : -1);
      }
    });
  }
};

const actions = {
  async getMainComments(
    { state, commit },
    { ctx, type, id, onlySeeMaster, seeReplyId, firstRequest }
  ) {
    // 如果已经请求过数据了
    if (state.type) {
      // 如果这次和上一次的 type 相同
      if (state.type === type) {
        if (state.id !== +id) {
          // 如果两个 id 不相同，重置 store
          commit("RESET_STATE", { type });
        } else {
          // 如果两个 id 相同
          if (state.noMore) {
            // 如果没有更多数据，return
            return;
          }
          if (state.list.length && firstRequest) {
            // 如果有更多数据，但只请求第一页，return
            return;
          }
          if (firstRequest) {
            // 如果没有更多数据，并且请求第一页，重置 store（因为已经请求过了）
            commit("RESET_STATE", { type });
          }
        }
      } else {
        // 如果两次请求的 type 不同，重置 store
        commit("RESET_STATE", { type });
      }
    } else {
      // 如果没请求过数据，初始化 type
      commit("INIT_FETCH_TYPE", { type });
    }
    const api = new Api(ctx);
    const comments = await api.getMainCommentList({
      type,
      id,
      onlySeeMaster,
      seeReplyId,
      fetchId: state.fetchId
    });
    comments && commit("SET_MAIN_COMMENTS", { comments, seeReplyId, id });
  },
  async getSubComments({ state, commit }, { ctx, type, id }) {
    const store = state.list.filter(_ => _.id === id)[0].comments;
    if (store.noMore) {
      return;
    }
    const api = new Api(ctx);
    const comments = await api.getSubCommentList({
      type,
      id,
      maxId: store.maxId
    });
    commit("SET_SUB_COMMENTS", { comments, id });
  },
  async createMainComment({ commit }, { ctx, images, content, type, id }) {
    const api = new Api(ctx);
    const result = await api.createMainComment({
      type,
      id,
      content,
      images
    });
    commit("CREATE_MAIN_COMMENT", result.data);
    return result;
  },
  async createSubComment({ commit }, { ctx, id, type, content, targetUserId }) {
    const api = new Api(ctx);
    const result = await api.createSubComment({
      id,
      type,
      content,
      targetUserId
    });
    commit("CREATE_SUB_COMMENT", { id, comment: result.data });
    return result;
  },
  async deleteSubComment({ commit }, { ctx, id, type, parentId }) {
    const api = new Api(ctx);
    await api.deleteSubComment({
      id,
      type
    });
    commit("DELETE_SUB_COMMENT", { parentId, id });
  },
  async deleteMainComment({ commit }, { ctx, id, type }) {
    const api = new Api(ctx);
    await api.deleteMainComment({
      id,
      type
    });
    commit("DELETE_MAIN_COMMENT", { id });
  },
  async toggleLikeSubComment({ commit }, { ctx, type, id, parentId }) {
    const api = new Api(ctx);
    commit("TOGGLE_LIKE_SUB_COMMENT", { id, parentId });
    await api.toggleLikeSubComment({
      type,
      id
    });
  },
  async toggleLikeMainComment({ commit }, { ctx, type, id }) {
    const api = new Api(ctx);
    commit("TOGGLE_LIKE_MAIN_COMMENT", { id });
    await api.toggleLikeMainComment({
      type,
      id
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

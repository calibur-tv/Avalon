import Api from "~/api/bangumiApi";
import CartoonRoleApi from "~/api/cartoonRoleApi";

const state = () => ({
  follows: null,
  released: [],
  timeline: {
    data: [],
    year: new Date().getFullYear(),
    noMore: false
  },
  category: {
    data: [],
    noMore: false,
    page: 0,
    take: 10
  },
  tags: [],
  info: null,
  followersPage: 1,
  posts: {
    data: [],
    total: 0,
    take: 10,
    type: "new",
    noMore: false
  },
  videos: {
    list: [],
    total: 0,
    has_season: false,
    fetched: false
  },
  roles: {
    id: 0,
    data: [],
    noMore: false
  },
  cartoon: {
    page: 0,
    take: 12,
    sort: "desc",
    total: 0,
    list: [],
    noMore: false
  },
  topPosts: []
});

const mutations = {
  SET_ROLES(state, { data, bangumiId }) {
    state.roles.data = state.roles.data.concat(data);
    state.roles.noMore = true;
    state.roles.id = bangumiId;
  },
  selectTag(state, index) {
    const tag = state.tags[index];
    tag.selected = !tag.selected;
    state.tags[index] = tag;
  },
  SET_FOLLOW(state, { result }) {
    state.info.followed = result;
    result ? state.info.count_like++ : state.info.count_like--;
  },
  SET_RELEASED(state, data) {
    state.released = data;
  },
  SET_TIMELINE(state, data) {
    const temp = state.timeline;
    state.timeline.data = temp.data.concat(data.list);
    state.timeline.year = temp.year - 1;
    state.timeline.noMore = data.noMore;
  },
  SET_TAGS(state, { tags, id }) {
    const ids = id ? id.split("-") : undefined;
    tags.forEach((tag, index) => {
      tags[index].selected = ids
        ? ids.indexOf(tag.id.toString()) !== -1
        : false;
    });
    state.tags = tags;
  },
  SET_CATEGORY(state, data) {
    state.category.data = state.category.data.concat(data.list);
    state.category.noMore = data.list.length < state.category.take;
    state.category.page++;
  },
  SET_POSTS(state, { data, total }) {
    const posts = state.posts.data.concat(data);
    state.posts.data = posts;
    state.posts.total = total;
    state.posts.noMore =
      posts.length >= total || data.length < state.posts.take;
  },
  SET_TOP_POST(state, data) {
    state.topPosts = data;
  },
  SET_IMAGES(state, { data, total }) {
    const images = state.images.data.concat(data);
    state.images.data = images;
    state.images.total = total;
    state.images.noMore =
      images.length >= total || data.length < state.images.take;
  },
  SET_BANGUMI(state, data) {
    state.info = Object.assign(data, {
      noMoreFollowers: data.followers.length < 10
    });
  },
  SET_VIDEOS(state, data) {
    state.videos = {
      list: data.videos,
      total: data.total,
      has_season: data.has_season,
      fetched: true
    };
  },
  SET_BANGUMI_FOLLOWERS(state, data) {
    state.info.followers = state.info.followers.concat(data.list);
    state.info.noMoreFollowers = data.noMore;
    state.followersPage += 1;
  },
  SET_BANGUMI_INFO(state, { key, value }) {
    state.info[key] = value;
  },
  SET_BANGUMI_CARTOON(state, data) {
    state.cartoon.list = state.cartoon.list.concat(data.list);
    state.cartoon.noMore = data.noMore;
    state.cartoon.total = data.total;
    state.cartoon.page = state.cartoon.page + 1;
  },
  REVERSE_CARTOON(state, { sort }) {
    state.cartoon.list = state.cartoon.list.reverse();
    state.cartoon.sort = sort;
  },
  RESET_CARTOON(state, { sort }) {
    state.cartoon = {
      page: 0,
      take: 12,
      sort,
      total: 0,
      list: [],
      noMore: false
    };
  }
};

const actions = {
  async getTags({ state, commit }, { id, ctx }) {
    if (state.tags.length) {
      return;
    }
    const api = new Api(ctx);
    const tags = await api.tags();
    commit("SET_TAGS", { tags, id });
  },
  async getBangumi({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const data = await api.show(id);
    commit("SET_BANGUMI", data);
  },
  async getVideos({ commit }, { id, ctx }) {
    const api = new Api(ctx);
    const data = await api.videos(id);
    commit("SET_VIDEOS", data);
  },
  async follow({ commit, rootState }, { ctx, id }) {
    const api = new Api(ctx);
    const followed = await api.follow(id);
    commit("SET_FOLLOW", {
      followed,
      self: {
        id: rootState.user.id,
        zone: rootState.user.zone,
        avatar: rootState.user.avatar,
        nickname: rootState.user.nickname
      }
    });
    return followed;
  },
  async getReleased({ state, commit }, ctx) {
    if (state.released.length) {
      return;
    }
    const api = new Api(ctx);
    const data = await api.released();
    commit("SET_RELEASED", data);
  },
  async getTimeline({ state, commit }, ctx) {
    if (state.timeline.noMore) {
      return;
    }
    const api = new Api(ctx);
    const data = await api.timeline({
      year: state.timeline.year,
      take: state.timeline.take
    });
    commit("SET_TIMELINE", data);
  },
  async getCategory({ state, commit }, { id, ctx }) {
    const api = new Api(ctx);
    const data = await api.category({
      id,
      page: state.category.page,
      take: state.category.take
    });
    commit("SET_CATEGORY", data);
  },
  async getPosts({ state, commit }, { id, ctx }) {
    const api = new Api(ctx);
    const data = await api.posts({
      id,
      take: state.posts.take,
      type: state.posts.type,
      minId: state.posts.data.length
        ? state.posts.data[state.posts.data.length - 1].id
        : 0
    });
    commit("SET_POSTS", {
      data: data.list,
      total: data.total
    });
  },
  async getRoles({ state, commit }, { bangumiId, ctx }) {
    if (state.roles.id === bangumiId) {
      return state.roles.data;
    }
    const api = new Api(ctx);
    const data = await api.roles({ bangumiId });
    commit("SET_ROLES", { data, bangumiId });
    return data;
  },
  async getFollowers({ state, commit }, { ctx, bangumiId, take }) {
    const api = new Api(ctx);
    const data = await api.followers({
      take,
      bangumiId,
      page: state.followersPage
    });
    commit("SET_BANGUMI_FOLLOWERS", data);
  },
  async getCartoons({ state, commit }, { ctx, bangumiId }) {
    const api = new Api(ctx);
    const data = await api.cartoon({
      bangumiId,
      page: state.cartoon.page,
      take: state.cartoon.take,
      sort: state.cartoon.sort
    });
    data && commit("SET_BANGUMI_CARTOON", data);
  },
  async changeCartoonSort({ state, commit }, { ctx, bangumiId, sort }) {
    if (state.cartoon.noMore) {
      commit("REVERSE_CARTOON", { sort });
      return;
    }
    commit("RESET_CARTOON", { sort });
    const api = new Api(ctx);
    const data = await api.cartoon({
      take: state.cartoon.take,
      page: 0,
      bangumiId,
      sort
    });
    data && commit("SET_BANGUMI_CARTOON", data);
  },
  async getTopPosts({ commit }, { ctx, id }) {
    const api = new Api(ctx);
    const data = await api.getTopPosts({ id });
    commit("SET_TOP_POST", data);
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

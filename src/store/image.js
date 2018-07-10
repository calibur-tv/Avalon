import BangumiApi from '~/api/bangumiApi';
import UserApi from '~/api/userApi';
import ImageApi from '~/api/imageApi';
import CartoonRoleApi from '~/api/cartoonRoleApi';

export default {
  namespaced: true,
  state: () => ({
    show: null,
    users: {
      list: [],
      page: 0,
      total: 0,
      noMore: false,
    },
    trending: {
      sort: '',
      list: [],
      total: 0,
      noMore: false
    },
    waterfall: {
      data: [],
      take: 12,
      options: {},
      noMore: false,
      size: 0,
      tags: 0,
      bangumiId: -1,
      roleId: -1,
      creator: -1,
    },
    albums: [],
  }),
  mutations: {
    SET_USER_IMAGES(state, data) {
      state.users.list = state.users.list.concat(data.list)
      state.users.noMore = data.noMore
      state.users.total = data.total
      state.users.page = state.users.page + 1
    },
    SET_IMAGE_INFO(state, data) {
      state.show = data
    },
    SHOW_TOGGLE_LIKE(state, { result }) {
      state.show.liked = result
    },
    SHOW_FOLLOW_BANGUMI(state, { result }) {
      state.show.bangumi.followed = result
    },
    DELETE_ALBUM_IMAGE(state, { index }) {
      state.show.images.splice(index, 1);
      state.show.image_count--;
    },
    SORT_ALBUM_IMAGE(state, result) {
      state.show.images = result;
    },
    SET_ALBUM(state, data) {
      state.albumShow = data;
    },
    RESET_WATERFALL(state) {
      state.waterfall = {
        data: [],
        take: 12,
        options: {},
        noMore: false,
        size: 0,
        tags: 0,
        bangumiId: -1,
        roleId: -1,
        creator: -1,
      };
    },
    SET_WATERFALL(state, data) {
      state.waterfall.data = state.waterfall.data.concat(data.list);
      state.waterfall.options = data.type;
      state.waterfall.noMore = data.list.length < state.waterfall.take;
    },
    CREATE_WATERFALL(state, data) {
      if (data[0].album_id) {
        return;
      }
      state.waterfall.data = data.concat(state.waterfall.data);
    },
    SET_WATERFALL_META(state, {
      size, tags, bangumiId, roleId, creator,
    }) {
      state.waterfall.size = size;
      state.waterfall.tags = tags;
      state.waterfall.bangumiId = bangumiId;
      state.waterfall.roleId = roleId;
      state.waterfall.creator = creator;
      state.waterfall.noMore = false;
      state.waterfall.data = [];
    },
    DELETE_WATERFALL(state, { id }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data.splice(index, 1);
        }
      });
    },
    EDIT_WATERFALL(state, { id, data }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index] = data;
        }
      });
    },
    LIKE_WATERFALL(state, { id, result }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index].like_count += result ? 1 : -1;
          state.waterfall.data[index].liked = result;
        }
      });
    },
    SET_USER_IMAGE_ALBUMS(state, data) {
      state.albums = data;
    },
    CREATE_ALBUM(state, data) {
      state.albums.unshift(data);
    },
    EDIT_ALBUM(state, { id, data }) {
      if (!state.albums.length) {
        return;
      }
      state.albums.forEach((item, index) => {
        if (item.id === id) {
          state.albums[index] = data;
        }
      });
    },
  },
  actions: {
    async show({ commit }, { id, ctx }) {
      const api = new ImageApi(ctx)
      const data = await api.show({ id })
      commit('SET_IMAGE_INFO', data)
    },
    async users({ state, commit }, { zone, ctx }) {
      const api = new ImageApi(ctx)
      const data = await api.users({
        zone,
        page: state.users.page
      });
      commit('SET_USER_IMAGES', data)
    },
    async getBangumiImages({ state, commit }, { id, ctx, force }) {
      if (force) {
        commit('RESET_WATERFALL');
      }
      if (state.waterfall.noMore) {
        return;
      }
      const waterfall = state.waterfall;
      const api = new BangumiApi(ctx);
      const data = await api.images({
        id,
        take: waterfall.take,
        seenIds: waterfall.data.length ? waterfall.data.map(item => item.id).toString() : null,
        size: waterfall.size,
        tags: waterfall.tags,
        roleId: waterfall.roleId,
        creator: waterfall.creator,
      });
      commit('SET_WATERFALL', data);
    },
    async getUserImages({ state, commit }, { zone, ctx, force }) {
      if (force) {
        commit('RESET_WATERFALL');
      }
      if (state.waterfall.noMore) {
        return;
      }
      const waterfall = state.waterfall;
      const api = new UserApi(ctx);
      const data = await api.images({
        zone,
        seenIds: waterfall.data.length ? waterfall.data.map(item => item.id).toString() : null,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator,
      });
      commit('SET_WATERFALL', data);
    },
    async getTrendingImages({ state, commit }, { sort, ctx, force }) {
      if (force) {
        commit('RESET_WATERFALL');
      }
      if (state.waterfall.noMore) {
        return;
      }
      const waterfall = state.waterfall;
      const api = new ImageApi(ctx);
      const data = await api.trendingList({
        seenIds: waterfall.data.length ? waterfall.data.map(item => item.id).toString() : null,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator,
        sort,
      });
      commit('SET_WATERFALL', data);
    },
    async getRoleImages({ state, commit }, { ctx, id, force }) {
      if (force) {
        commit('RESET_WATERFALL');
      }
      if (state.waterfall.noMore) {
        return;
      }
      const waterfall = state.waterfall;
      const api = new CartoonRoleApi(ctx);
      const data = await api.images({
        id,
        seenIds: waterfall.data.length ? waterfall.data.map(item => item.id).toString() : null,
        take: waterfall.take,
        sort: waterfall.sort,
        size: waterfall.size,
        tags: waterfall.tags,
        creator: waterfall.creator,
      });
      commit('SET_WATERFALL', data);
    },
    async userAlbum({ state, commit }, { ctx }) {
      if (state.albums.length) {
        return
      }
      const api = new ImageApi(ctx);
      const data = await api.getUserAlbums();
      commit('SET_USER_IMAGE_ALBUMS', data);
    },
    async getAlbumData({ commit }, { id, ctx }) {
      const api = new ImageApi(ctx);
      const data = await api.getAlbumData({ id });
      commit('SET_ALBUM', data);
    },
    async sortAlbumImage({ state, commit }, {
      prev, next, ctx, id,
    }) {
      let imageArr = state.show.images.map(_ => _);
      imageArr.splice(prev, 1, ...imageArr.splice(next, 1, imageArr[prev]));
      const result = imageArr.map(_ => _.id).toString();
      const api = new ImageApi(ctx);
      await api.sortAlbum({ id, result });
      commit('SORT_ALBUM_IMAGE', imageArr);
    },
    async deleteAlbumImage({ state, commit }, { index, ctx, id }) {
      let idsArr = state.show.images.map(_ => _.id);
      const imageId = idsArr.splice(index, 1)[0];
      const api = new ImageApi(ctx);
      await api.deleteAlbumImage({ id, result: idsArr.toString(), imageId });
      commit('DELETE_ALBUM_IMAGE', { index });
    },
  },
  getters: {},
};

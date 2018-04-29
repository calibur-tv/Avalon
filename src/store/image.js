import BangumiApi from '~/api/bangumiApi'
import UserApi from '~/api/userApi'
import ImageApi from '~/api/imageApi'

export default {
  namespaced: true,
  state: () => ({
    waterfall: {
      data: [],
      take: 12,
      options: {},
      noMore: false,
      size: 0,
      tags: 0,
      bangumiId: -1,
      roleId: -1,
      creator: -1
    },
    albums: []
  }),
  mutations: {
    RESET_WATERFALL (state) {
      state.waterfall = {
        data: [],
        take: 12,
        options: {},
        noMore: false,
        size: 0,
        tags: 0,
        bangumiId: -1,
        roleId: -1,
        creator: -1
      }
    },
    SET_WATERFALL (state, data) {
      state.waterfall.data = state.waterfall.data.concat(data.list)
      state.waterfall.options = data.type
      state.waterfall.noMore = data.list.length < state.waterfall.take
    },
    CREATE_WATERFALL (state, data) {
      if (data[0]['album_id']) {
        return
      }
      state.waterfall.data = data.concat(state.waterfall.data)
    },
    SET_WATERFALL_META (state, { size, tags, bangumiId, roleId, creator }) {
      state.waterfall.size = size
      state.waterfall.tags = tags
      state.waterfall.bangumiId = bangumiId
      state.waterfall.roleId = roleId
      state.waterfall.creator = creator
      state.waterfall.noMore = false
      state.waterfall.data = []
    },
    DELETE_WATERFALL (state, { id }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data.splice(index, 1)
        }
      })
    },
    EDIT_WATERFALL (state, { id, data }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index] = data
        }
      })
    },
    LIKE_WATERFALL (state, { id, result }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index].like_count += result ? 1 : -1
          state.waterfall.data[index].liked = result
        }
      })
    },
    SET_USER_IMAGE_ALBUMS (state, data) {
      state.albums = data
    },
    CREATE_ALBUM (state, data) {
      state.albums.unshift(data)
    },
    EDIT_ALBUM (state, { id, data }) {
      if (!state.albums.length) {
        return
      }
      state.albums.forEach((item, index) => {
        if (item.id === id) {
          state.albums[index] = data
        }
      })
    }
  },
  actions: {
    async getBangumiImages ({ state, commit }, { id, ctx, force }) {
      const waterfall = state.waterfall
      if (waterfall.noMore && !force) {
        return
      }
      if (force) {
        commit('RESET_WATERFALL')
      }
      const api = new BangumiApi(ctx)
      const data = await api.images({
        id,
        take: state.waterfall.take,
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null,
        size: waterfall.size,
        tags: waterfall.tags,
        roleId: waterfall.roleId,
        creator: waterfall.creator
      })
      commit('SET_WATERFALL', data)
    },
    async getUserImages ({ state, commit }, { zone, ctx, force }) {
      const waterfall = state.waterfall
      if (waterfall.noMore && !force) {
        return
      }
      if (force) {
        commit('RESET_WATERFALL')
      }
      const api = new UserApi(ctx)
      const data = await api.images({
        zone,
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator
      })
      commit('SET_WATERFALL', data)
    },
    async getTrendingImages ({ state, commit }, { sort, ctx, force }) {
      const waterfall = state.waterfall
      if (waterfall.noMore && !force) {
        return
      }
      if (force) {
        commit('RESET_WATERFALL')
      }
      const api = new ImageApi(ctx)
      const data = await api.trendingList({
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator,
        sort
      })
      commit('SET_WATERFALL', data)
    },
    async userAlbum ({ commit }, { ctx }) {
      const api = new UserApi(ctx)
      const data = await api.getUserAlbums()
      commit('SET_USER_IMAGE_ALBUMS', data)
    },
    async getAlbumData ({ commit }, { id, ctx }) {
      const api = new ImageApi(ctx)
      const data = await api.getAlbumData({ id })
      commit('SET_ALBUM', data)
    }
  },
  getters: {}
}

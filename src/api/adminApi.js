import BaseApi from './_baseApi'

export default class extends BaseApi {
  realtimeStats () {
    return this.http.get('admin/stats/realtime')
  }

  timelineStats ({ days }) {
    return this.http.get('admin/stats/timeline', {
      params: { days }
    })
  }

  indexBannerList () {
    return this.http.get('admin/banner/list')
  }

  indexBannerUpload ({ url, bangumi_id, user_id, gray }) {
    return this.http.post('admin/banner/upload', {
      url, bangumi_id, user_id, gray
    })
  }

  indexBannerToggle (id) {
    return this.http.post('admin/banner/toggle_use', { id })
  }

  indexBannerEdit ({ id, bangumi_id, user_id }) {
    return this.http.post('admin/banner/edit', { id, bangumi_id, user_id })
  }

  searchUser ({ zone, id }) {
    return this.http.get('admin/search/user', {
      params: { zone, id }
    })
  }

  bangumiInfo ({ id }) {
    return this.http.get('admin/bangumi/info', {
      params: { id }
    })
  }

  bangumiRelease ({ bangumi_id, video_id }) {
    return this.http.post('admin/bangumi/release', {
      bangumi_id, video_id
    })
  }

  bangumiDelete ({ id }) {
    return this.http.post('admin/bangumi/delete', { id })
  }

  bangumiCreate (params) {
    return this.http.post('admin/bangumi/create', params)
  }

  bangumiEdit (params) {
    return this.http.post('admin/bangumi/edit', params)
  }

  allTag () {
    return this.http.get('admin/tag/all')
  }

  editTag ({ id, name }) {
    return this.http.post('admin/tag/edit', {
      id, name
    })
  }

  editCreate ({ name, model }) {
    return this.http.post('admin/tag/create', {
      name, model
    })
  }

  cartoonBangumis () {
    return this.http.get('admin/cartoon/bangumis')
  }

  cartoonDetail ({ id }) {
    return this.http.get('admin/cartoon/list_of_bangumi', {
      params: { id }
    })
  }

  cartoonSort ({ id, cartoon }) {
    return this.http.post('admin/cartoon/sort', {
      id, cartoon
    })
  }

  cartoonEdit ({ id, name, url }) {
    return this.http.post('admin/cartoon/edit', {
      id, name, url
    })
  }

  getBangumiVideoList ({ id, cur_page, to_page, take }) {
    return this.http.get('admin/video/bangumis', {
      params: { id, cur_page, to_page, take }
    })
  }

  videoEdit (params) {
    return this.http.post('admin/video/edit', params)
  }

  videoSave (arr) {
    return this.http.post('admin/video/save', arr)
  }

  videoDelete ({ id }) {
    return this.http.post('admin/video/delete', { id })
  }

  getTrendingVideo ({ cur_page, to_page, take }) {
    return this.http.get('admin/video/trending', {
      params: { cur_page, to_page, take }
    })
  }

  cartoonRoleInfo ({ id }) {
    return this.http.get('admin/cartoon_role/show', {
      params: { id }
    })
  }

  cartoonRoleEdit (params) {
    return this.http.post('admin/cartoon_role/edit', params)
  }

  cartoonRoleCreate (params) {
    return this.http.post('admin/cartoon_role/create', params)
  }

  getFakerList () {
    return this.http.get('admin/user/faker/list')
  }

  rebornFakerUser ({ id, phone }) {
    return this.http.post('admin/user/faker/reborn', {
      id, phone
    })
  }

  createFakerUser ({ nickname, phone }) {
    return this.http.post('admin/user/faker/create', {
      nickname, phone
    })
  }

  getCoinDescUser ({ to_page, cur_page, take }) {
    return this.http.get('admin/user/dalao', {
      params: { to_page, cur_page, take }
    })
  }

  addUserToTrial ({ id }) {
    return this.http.post('admin/user/add_to_trial', { id })
  }

  blockUser ({ id }) {
    return this.http.post('admin/user/block', { id })
  }

  recoverUser ({ id }) {
    return this.http.post('admin/user/recover', { id })
  }

  getUserFeedback () {
    return this.http.get('admin/user/feedback/list')
  }

  readFeedback ({ id }) {
    return this.http.post('admin/user/feedback/read', { id })
  }

  getAdminList () {
    return this.http.get('admin/console/list')
  }

  removeAdmin ({ id }) {
    return this.http.post('admin/console/remove', { id })
  }

  addAdmin ({ id }) {
    return this.http.post('admin/console/add', { id })
  }

  trialTestImage ({ url }) {
    return this.http.get('admin/trial/test/image', {
      params: { url }
    })
  }

  trialTestText ({ text }) {
    return this.http.get('admin/trial/test/text', {
      params: { text }
    })
  }

  getTrialWords () {
    return this.http.get('admin/trial/words/list')
  }

  deleteTrialWords ({ words }) {
    return this.http.post('admin/trial/words/delete', { words })
  }

  addTrialWords ({ words }) {
    return this.http.post('admin/trial/words/add', { words })
  }

  getTrialUsers () {
    return this.http.get('admin/trial/user/list')
  }

  deleteUserInfo ({ id, key, value }) {
    return this.http.post('admin/trial/user/delete_info', {
      id, key, value
    })
  }

  passUser ({ id }) {
    return this.http.post('admin/trial/user/pass', { id })
  }

  getTrialPosts () {
    return this.http.get('admin/trial/post/list')
  }

  deletePost ({ id }) {
    return this.http.post('admin/trial/post/delete', { id })
  }

  passPost ({ id }) {
    return this.http.post('admin/trial/post/pass', { id })
  }

  deletePostImage ({ id, src }) {
    return this.http.post('admin/trial/post/delete_image', { id, src })
  }

  getTrialImages () {
    return this.http.get('admin/trial/image/list')
  }

  deleteImage ({ id }) {
    return this.http.post('admin/trial/image/delete', { id })
  }

  passImage ({ id }) {
    return this.http.post('admin/trial/image/pass', { id })
  }

  getTrialComments () {
    return this.http.get('admin/trial/comment/list')
  }

  passComment ({ id, type }) {
    return this.http.post('admin/trial/comment/pass', { id, type })
  }

  deleteComment ({ id, type }) {
    return this.http.post('admin/trial/comment/delete', { id, type })
  }
}

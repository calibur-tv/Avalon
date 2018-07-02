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

  searchUser ({ zone }) {
    return this.http.get('admin/search/user_by_zone', {
      params: { zone }
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
}

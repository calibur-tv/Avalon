import BaseApi from './_baseApi';

export default class extends BaseApi {
  show({ id }) {
    return this.http.get(`score/${id}/show`)
  }

  check ({ id }) {
    return this.http.get('score/check', {
      params: { id }
    })
  }

  create(params) {
    return this.http.post('score/create', params)
  }

  update(params) {
    return this.http.post('score/update', params)
  }

  delete({ id }) {
    return this.http.post('score/delete', { id })
  }

  bangumiScore(id) {
    return this.http.get('score/bangumis', {
      params: { id }
    });
  }

  getUsersScore({ user_id, page, take }) {
    return this.http.get('score/users', {
      params: { user_id, page, take }
    })
  }
}

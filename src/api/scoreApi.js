import BaseApi from './_baseApi';

export default class extends BaseApi {
  bangumiScore(id) {
    return this.http.get('score/bangumis', {
      params: { id }
    });
  }

  create(params) {
    return this.http.post('score/create', params)
  }

  getUsersScore({ user_id, page, take }) {
    return this.http.get('score/users', {
      params: { user_id, page, take }
    })
  }
}

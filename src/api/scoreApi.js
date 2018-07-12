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
}

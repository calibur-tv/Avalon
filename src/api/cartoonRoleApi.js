import BaseApi from './_baseApi';

export default class extends BaseApi {
  trending({ seenIds }) {
    return this.http.get('/trending/cartoon_role', {
      params: { seenIds },
    });
  }

  star({ bangumiId, roleId }) {
    return this.http.post(`/bangumi/${bangumiId}/role/${roleId}/star`);
  }

  fans({
    bangumiId, roleId, seenIds, minId, sort,
  }) {
    return this.http.get(`/bangumi/${bangumiId}/role/${roleId}/fans`, {
      params: { seenIds, minId, sort },
    });
  }

  create ({ bangumi_id, name, intro, avatar, alias }) {
    return this.http.post('cartoon_role/manager/create', {
      bangumi_id, name, intro, avatar, alias
    })
  }

  edit ({ id, bangumi_id, name, intro, avatar, alias }) {
    return this.http.post('cartoon_role/manager/edit', {
      id, bangumi_id, name, intro, avatar, alias
    })
  }

  show(id) {
    return this.http.get(`/cartoon_role/${id}/show`);
  }

  images({
    id, seenIds, take, size, tags, creator, sort,
  }) {
    return this.http.get(`/cartoon_role/${id}/images`, {
      params: {
        seenIds, take, size, tags, creator, sort,
      },
    });
  }

  trialList () {
    return this.http.get('admin/trial/cartoon_role/list')
  }

  trialPass ({ id }) {
    return this.http.post('admin/trial/cartoon_role/pass', { id })
  }

  trialBan ({ id, bangumi_id }) {
    return this.http.post('admin/trial/cartoon_role/ban', { id, bangumi_id })
  }
}

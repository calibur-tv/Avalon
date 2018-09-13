import BaseApi from "./_baseApi";

export default class extends BaseApi {
  getBanners() {
    return this.http.get("image/banner");
  }

  getCaptcha() {
    return this.http.get("image/captcha");
  }

  getUpToken() {
    return this.http.get("image/uptoken");
  }

  uploadToQiniu(formData) {
    return this.http.post("https://up.qbox.me", formData, {
      "Content-Type": "multipart/form-data"
    });
  }

  trialReport({ id }) {
    return this.http.post("image/report", { id });
  }

  editImage({ id, bangumiId, roleId, size, tags }) {
    return this.http.post("image/edit", {
      id,
      bangumiId,
      roleId,
      tags,
      size
    });
  }

  toggleLike({ id }) {
    return this.http.post("image/toggleLike", { id });
  }

  show({ id }) {
    return this.http.get(`image/${id}/show`);
  }

  users({ zone, page }) {
    return this.http.get("image/users", {
      params: { zone, page }
    });
  }

  createAlbum({
    bangumi_id,
    name,
    url,
    width,
    height,
    size,
    type,
    is_creator,
    is_cartoon,
    part
  }) {
    return this.http.post("image/album/create", {
      bangumi_id,
      name,
      url,
      width,
      height,
      size,
      type,
      is_creator,
      is_cartoon,
      part
    });
  }

  editAlbum({ id, name, url, width, height, size, type, part }) {
    return this.http.post("image/album/edit", {
      id,
      name,
      url,
      width,
      height,
      size,
      type,
      part
    });
  }

  uploadSingleImage({
    bangumi_id,
    name,
    url,
    width,
    height,
    size,
    type,
    is_creator,
    geetest
  }) {
    return this.http.post("image/single/upload", {
      bangumi_id,
      name,
      url,
      width,
      height,
      size,
      type,
      is_creator,
      geetest
    });
  }

  uploadManyImage({ album_id, images }) {
    return this.http.post("image/album/upload", {
      album_id,
      images
    });
  }

  deleteAlbum({ id }) {
    return this.http.post("image/album/delete", { id });
  }

  editSingleImage({ id, name, bangumi_id }) {
    return this.http.post("image/single/edit", {
      id,
      name,
      bangumi_id
    });
  }

  getUserAlbums() {
    return this.http.get("image/album/users");
  }

  sortAlbum({ id, result }) {
    return this.http.post(`image/album/${id}/sort`, { result });
  }

  deleteAlbumImage({ id, result, imageId }) {
    return this.http.post(`image/album/${id}/deleteImage`, { result, imageId });
  }
}

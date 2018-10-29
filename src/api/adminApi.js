import BaseApi from "./_baseApi";

export default class extends BaseApi {
  getTodo() {
    return this.http.get("admin/todo");
  }

  realtimeStats() {
    return this.http.get("admin/stats/realtime");
  }

  timelineStats({ days }) {
    return this.http.get("admin/stats/timeline", {
      params: { days }
    });
  }

  indexBannerList() {
    return this.http.get("admin/banner/list");
  }

  indexBannerUpload({ url, bangumi_id, user_id, gray }) {
    return this.http.post("admin/banner/upload", {
      url,
      bangumi_id,
      user_id,
      gray
    });
  }

  indexBannerToggle(id) {
    return this.http.post("admin/banner/toggle_use", { id });
  }

  indexBannerEdit({ id, bangumi_id, user_id }) {
    return this.http.post("admin/banner/edit", { id, bangumi_id, user_id });
  }

  searchUser({ type, value }) {
    return this.http.get("admin/search/user", {
      params: { type, value }
    });
  }

  bangumiInfo({ id }) {
    return this.http.get("admin/bangumi/info", {
      params: { id }
    });
  }

  bangumiRelease({ bangumi_id, video_id }) {
    return this.http.post("admin/bangumi/release", {
      bangumi_id,
      video_id
    });
  }

  getBangumiList({ cur_page, to_page, take }) {
    return this.http.get("admin/bangumi/list", {
      params: { cur_page, to_page, take }
    });
  }

  setBangumiManager({ user_id, bangumi_id }) {
    return this.http.post("admin/bangumi/manager/set", {
      user_id,
      bangumi_id
    });
  }

  removeBangumiManager({ user_id, bangumi_id }) {
    return this.http.post("admin/bangumi/manager/remove", {
      user_id,
      bangumi_id
    });
  }

  upgradeBangumiManager({ user_id, bangumi_id }) {
    return this.http.post("admin/bangumi/manager/upgrade", {
      user_id,
      bangumi_id
    });
  }

  downgradeBangumiManager({ user_id, bangumi_id }) {
    return this.http.post("admin/bangumi/manager/downgrade", {
      user_id,
      bangumi_id
    });
  }

  bangumiDelete({ id }) {
    return this.http.post("admin/bangumi/delete", { id });
  }

  bangumiCreate(params) {
    return this.http.post("admin/bangumi/create", params);
  }

  bangumiEdit(params) {
    return this.http.post("admin/bangumi/edit", params);
  }

  allTag({ type }) {
    return this.http.get("admin/tag/all", {
      params: { type }
    });
  }

  editTag({ id, name, type }) {
    return this.http.post("admin/tag/edit", {
      id,
      name,
      type
    });
  }

  createTag({ name, type }) {
    return this.http.post("admin/tag/create", {
      name,
      type
    });
  }

  cartoonBangumis() {
    return this.http.get("admin/cartoon/bangumis");
  }

  cartoonDetail({ id }) {
    return this.http.get("admin/cartoon/list_of_bangumi", {
      params: { id }
    });
  }

  cartoonSort({ id, cartoon }) {
    return this.http.post("admin/cartoon/sort", {
      id,
      cartoon
    });
  }

  cartoonEdit({ id, name, url }) {
    return this.http.post("admin/cartoon/edit", {
      id,
      name,
      url
    });
  }

  getBangumiVideoList({ id, cur_page, to_page, take }) {
    return this.http.get("admin/video/bangumis", {
      params: { id, cur_page, to_page, take }
    });
  }

  videoEdit(params) {
    return this.http.post("admin/video/edit", params);
  }

  videoSave(arr) {
    return this.http.post("admin/video/save", arr);
  }

  videoDelete({ id }) {
    return this.http.post("admin/video/delete", { id });
  }

  getTrendingVideo({ cur_page, to_page, take }) {
    return this.http.get("admin/video/trending", {
      params: { cur_page, to_page, take }
    });
  }

  cartoonRoleInfo({ id }) {
    return this.http.get("admin/cartoon_role/show", {
      params: { id }
    });
  }

  cartoonRoleEdit(params) {
    return this.http.post("admin/cartoon_role/edit", params);
  }

  cartoonRoleCreate(params) {
    return this.http.post("admin/cartoon_role/create", params);
  }

  getFakerList() {
    return this.http.get("admin/user/faker/list");
  }

  rebornFakerUser({ id, phone }) {
    return this.http.post("admin/user/faker/reborn", {
      id,
      phone
    });
  }

  createFakerUser({ nickname, phone }) {
    return this.http.post("admin/user/faker/create", {
      nickname,
      phone
    });
  }

  getCoinDescUser({ to_page, cur_page, take }) {
    return this.http.get("admin/user/dalao", {
      params: { to_page, cur_page, take }
    });
  }

  addUserToTrial({ id }) {
    return this.http.post("admin/user/add_to_trial", { id });
  }

  getUserFeedback() {
    return this.http.get("admin/user/feedback/list");
  }

  readFeedback({ id }) {
    return this.http.post("admin/user/feedback/read", { id });
  }

  getAdminList() {
    return this.http.get("admin/console/list");
  }

  removeAdmin({ id }) {
    return this.http.post("admin/console/remove", { id });
  }

  addAdmin({ id }) {
    return this.http.post("admin/console/add", { id });
  }

  trialTestImage({ url }) {
    return this.http.get("admin/trial/test/image", {
      params: { url }
    });
  }

  trialTestText({ text }) {
    return this.http.post("admin/trial/test/text", {
      text
    });
  }

  getTrialWords() {
    return this.http.get("admin/trial/words/list");
  }

  deleteTrialWords({ words }) {
    return this.http.post("admin/trial/words/delete", { words });
  }

  addTrialWords({ words }) {
    return this.http.post("admin/trial/words/add", { words });
  }

  getTrialUsers() {
    return this.http.get("admin/trial/user/list");
  }

  deleteUserInfo({ id, key, value }) {
    return this.http.post("admin/trial/user/delete_info", {
      id,
      key,
      value
    });
  }

  passUser({ id }) {
    return this.http.post("admin/trial/user/pass", { id });
  }

  blockUser({ id }) {
    return this.http.post("admin/trial/user/ban", { id });
  }

  recoverUser({ id }) {
    return this.http.post("admin/trial/user/recover", { id });
  }

  getTrialPosts() {
    return this.http.get("admin/trial/post/list");
  }

  deletePost({ id }) {
    return this.http.post("admin/trial/post/ban", { id });
  }

  passPost({ id }) {
    return this.http.post("admin/trial/post/pass", { id });
  }

  approvePost({ id }) {
    return this.http.post("admin/trial/post/approve", { id });
  }

  rejectPost({ id }) {
    return this.http.post("admin/trial/post/reject", { id });
  }

  deletePostImage({ id, url }) {
    return this.http.post("admin/trial/post/delete_image", { id, url });
  }

  getTrialImages() {
    return this.http.get("admin/trial/image/list");
  }

  deleteImage({ id, type }) {
    return this.http.post("admin/trial/image/ban", { id, type });
  }

  passImage({ id, type }) {
    return this.http.post("admin/trial/image/pass", { id, type });
  }

  approveImage({ id, type }) {
    return this.http.post("admin/trial/image/approve", { id, type });
  }

  rejectImage({ id, type }) {
    return this.http.post("admin/trial/image/reject", { id, type });
  }

  getTrialComments() {
    return this.http.get("admin/trial/comment/list");
  }

  passComment({ id, type }) {
    return this.http.post("admin/trial/comment/pass", { id, type });
  }

  approveComment({ id, type }) {
    return this.http.post("admin/trial/comment/approve", { id, type });
  }

  rejectComment({ id, type, parent_id }) {
    return this.http.post("admin/trial/comment/reject", {
      id,
      type,
      parent_id
    });
  }

  batchDeleteComment({ user_id, type }) {
    return this.http.post("admin/trial/comment/batch_ban", { user_id, type });
  }

  deleteComment({ id, type }) {
    return this.http.post("admin/trial/comment/ban", { id, type });
  }

  getTrialBangumis() {
    return this.http.get("admin/trial/bangumi/list");
  }

  passBangumi({ id }) {
    return this.http.post("admin/trial/bangumi/pass", { id });
  }

  getUserCoinTransactions({ id, to_page, cur_page, take }) {
    return this.http.post("admin/user/transactions", {
      id,
      to_page,
      cur_page,
      take
    });
  }

  withdrawal({ id, money }) {
    return this.http.post("admin/user/withdrawal", {
      id,
      money
    });
  }

  getReportList() {
    return this.http.get("admin/report/list");
  }

  getReportItem({ tail }) {
    return this.http.get("admin/report/item", {
      params: { tail }
    });
  }

  removeReport({ tail }) {
    return this.http.post("admin/report/remove", { tail });
  }

  getAppVersions() {
    return this.http.get("admin/app/version/list");
  }

  getAppUpToken() {
    return this.http.get("admin/app/version/uptoken");
  }

  createAppVersion({ type, version, url }) {
    return this.http.post("admin/app/version/create", {
      type,
      version,
      url
    });
  }

  deleteAppVersion({ type, version }) {
    return this.http.post("admin/app/version/delete", {
      type,
      version
    });
  }

  toggleAppUpdate({ type, version, force }) {
    return this.http.post("admin/app/version/toggleForce", {
      type,
      version,
      force
    });
  }

  getFriendLinks() {
    return this.http.get("admin/web/friend_link/list");
  }

  addFriendLink({ name, link }) {
    return this.http.post("admin/web/friend_link/append", {
      name,
      link
    });
  }

  delFriendLink({ link }) {
    return this.http.post("admin/web/friend_link/remove", {
      link
    });
  }

  blockedIpList() {
    return this.http.get("admin/ip_blocker/list");
  }

  blockIpAddress({ ip_address }) {
    return this.http.post("admin/ip_blocker/block", {
      ip_address
    });
  }

  recoverIpAddress({ ip_address }) {
    return this.http.post("admin/ip_blocker/recover", {
      ip_address
    });
  }

  batchPassComment({ approve_arr, pass_arr }) {
    return this.http.post("admin/trial/comment/batch_pass", {
      approve_arr,
      pass_arr
    });
  }

  getCMLoop() {
    return this.http.get("admin/cm/loop/list");
  }

  createCMLoop(params) {
    return this.http.post("admin/cm/loop/add", params);
  }

  updateCMLoop(params) {
    return this.http.post("admin/cm/loop/update", params);
  }

  sortCMLoop({ id }) {
    return this.http.post("admin/cm/loop/sort", {
      id
    });
  }

  deleteCMLoop({ id }) {
    return this.http.post("admin/cm/loop/delete", {
      id
    });
  }

  freezeUserList() {
    return this.http.get("admin/user/banned/freezeUsers");
  }

  freezeUser({ banned_to, id }) {
    return this.http.post("admin/user/banned/freeze", {
      banned_to,
      id
    });
  }

  freeUser({ id }) {
    return this.http.post("admin/user/banned/free", {
      id
    });
  }
}

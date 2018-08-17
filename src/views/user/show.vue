<style lang="scss">
#user-show {
  .banner-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-white;
    text-shadow: 0 1px 10px gray;
    user-select: none;

    .file-input {
      &:before {
        content: "\e603";
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        @include iconfont(30px);
        text-align: center;
        line-height: 100px;
        color: $color-white;
      }
    }

    .banner-file-input {
      display: none;
    }

    .banner-cropper-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      $selector-height: 80px;
      .banner-select-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: $selector-height;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0 50px;
        z-index: 3;

        p {
          font-size: 18px;
          color: $color-white;
          float: left;
          line-height: $selector-height;
        }

        .el-button--text {
          color: $color-white;
          float: right;
          margin-top: 20px;
          margin-right: 100px;
        }
      }

      .submit-btn {
        position: fixed;
        right: 50px;
        bottom: 24px;
        z-index: 4;
      }
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid hsla(0, 0%, 100%, 0.4);
      margin: 100px auto 10px auto;
    }

    .signature,
    .nickname {
      word-break: break-all;
      word-wrap: break-word;
      font-size: 13px;
      line-height: 20px;
      pointer-events: none;
    }

    .signature {
      margin: 30px 0 20px 0;
      max-width: 600px;
    }

    .buttons {
      margin-top: 10px;
      text-align: center;
      position: relative;

      > * {
        margin: 0 5px;
      }
    }

    &.my-banner {
      .banner-file-input {
        display: block;
        position: absolute;
        right: -65px;
        bottom: -60px;
        width: 120px;
        height: 120px;
        transition-duration: 0.4s;
        transform: rotate(45deg);
        transition-property: background-color;

        &:before {
          background-color: transparent;
          transform: rotate(-45deg);
          text-align: left;
          line-height: 65px;
          margin-left: 20px;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.9) !important;
        }
      }

      &:hover .banner-file-input {
        background-color: rgba(0, 0, 0, 0.5);
        overflow: visible;

        &:before {
          opacity: 1;
        }
      }
    }
  }

  .container {
    .faker-tips {
      margin-left: 54px;
      margin-bottom: 25px;
      padding: 8px 16px;
      border-radius: 4px;
      background-color: #fef0f0;
      color: #f56c6c;

      span {
        font-size: 13px;
        line-height: 18px;
        font-weight: 700;
      }

      p {
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .el-tabs__active-bar:after {
      display: none;
    }

    .el-tabs__header {
      width: 100px;
      margin-right: 50px;
    }

    .el-radio-group {
      margin-left: 10px;
    }

    $video-item-width: 220px;
    $video-item-margin: 15px;
    $video-item-height: 70px;
    .bangumis {
      li {
        margin: 0 $video-item-margin 15px 0;
        float: left;
      }

      a {
        display: block;
        position: relative;
        width: $video-item-width;
        height: $video-item-height;
        border-radius: 3px;
        background-color: $color-gray-normal;
        overflow: hidden;

        &:hover .name {
          color: $color-blue-normal;
        }
      }

      .poster {
        width: $video-item-height;
        height: $video-item-height;
        margin-right: 12px;
        float: left;
      }

      .intro {
        padding-right: 12px;

        .name {
          font-size: 12px;
          color: $color-text-normal;
          margin-top: 6px;
          margin-bottom: 5px;
        }
      }
    }

    .cartoon-role {
      li {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px dotted #e4e6eb;
        max-width: 800px;
      }

      img {
        width: 84px;
        height: 84px;
        margin-right: 10px;
        float: left;
      }

      .text {
        overflow: hidden;

        h4 {
          margin-bottom: 2px;
          line-height: 19px;
        }

        .intro {
          height: 38px;
          margin-bottom: 8px;
          font-size: 13px;
          @include twoline(20px);
        }

        .meta {
          text-align: right;

          span {
            margin-right: 10px;
            margin-left: 10px;
            font-size: 13px;
          }
        }
      }

      .load-more-btn {
        width: 800px;
      }
    }

    .load-more-btn {
      margin-top: 20px;
      width: 100%;
    }
  }

  .user-setting-form {
    width: 750px;
  }

  #no-content {
    margin-top: 25px;
  }
}
</style>

<style lang="scss">
.avatar-cropper-modal {
  .submit-btn {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<template>
  <div id="user-show">
    <v-header
      :banner="user.banner"
      type="mask"
      height="400px"
    >
      <div
        :class="{ 'my-banner': isMe }"
        class="banner-container"
      >
        <div
          v-if="isMe"
          class="banner-cropper-wrap"
        >
          <template v-if="bannerSelector.showBar">
            <image-cropper
              :init-image="bannerSelector.image"
              :uploading="bannerSelector.loading"
              :auto-size="true"
              @submit="submitBannerChange"
            />
            <div class="banner-select-bar">
              <p>确认要更换主页背景图吗（拖动图片可裁剪，鼠标滚动可缩放）?</p>
              <el-button
                :disabled="bannerSelector.loading"
                type="text"
                @click="cancelBannerChange"
              >取消</el-button>
            </div>
          </template>
          <div
            v-else
            class="banner-file-input file-input bg"
          >
            <input
              ref="bannerInput"
              :accept="$imageAcceptStr"
              type="file"
              @change="selectBanner"
            >
          </div>
        </div>
        <template v-if="isMe">
          <div
            :style="{ backgroundImage: `url(${$resize(user.avatar, { width: 200, height: 200 })})` }"
            class="avatar bg file-input"
          >
            <input
              ref="avatarInput"
              :accept="$imageAcceptStr"
              type="file"
              @change="openAvatarModal"
            >
          </div>
          <v-dialog
            v-model="avatarCropper.showModal"
            :footer="false"
            width="400px"
            title="头像裁剪"
            class="avatar-cropper-modal"
            @cancel="handleAvatarCropperCancel"
          >
            <image-cropper
              v-if="avatarCropper.showModal"
              :init-image="avatarCropper.src"
              :uploading="avatarCropper.loading"
              :width="358"
              :height="358"
              type="avatar"
              @submit="handleAvatarCropperSubmit"
            />
          </v-dialog>
        </template>
        <img
          v-else
          :src="$resize(user.avatar, { width: 200, height: 200 })"
          class="avatar"
          alt="avatar"
        >
        <span
          class="nickname"
          v-text="user.nickname"
        />
        <div class="buttons">
          <template v-if="isMe">
            <el-button
              :disabled="daySigned"
              :loading="signDayLoading"
              type="primary"
              size="small"
              @click="handleDaySign"
            >
              {{ daySigned ? '已签到' : '签到' }}{{ coinCount ? ` (${coinCount})` : '' }}
            </el-button>
            <el-tooltip
              class="item"
              effect="dark"
              placement="bottom"
            >
              <div slot="content">
                点击复制我的邀请地址
                <br>
                邀请小伙伴们注册赚金币
              </div>
              <el-button
                ref="inviteBtn"
                :data-clipboard-text="`http://calibur.tv/about/invite/${user.id}`"
                type="warning"
                size="small"
              >邀请码：{{ user.id }}</el-button>
            </el-tooltip>
          </template>
        </div>
        <p
          class="signature"
          v-text="user.signature"
        />
      </div>
    </v-header>
    <div class="container">
      <div
        v-if="user.faker"
        class="faker-tips"
      >
        <span>重要提醒</span>
        <p>这是一个运营号，并非本人，该账号下所有信息都是搬运而来</p>
        <p>如果你就是该账号本人，可以联系网站工作人员拿回该账号，该账号通过搬运资源获得的金币也将归你所有</p>
        <p>当然，你也有权要求我们删除所有你的内容</p>
      </div>
      <el-tabs
        tab-position="left"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="番剧">
          <ul
            v-if="bangumis.length"
            class="bangumis"
          >
            <li
              v-for="item in bangumis"
              :key="item.id"
            >
              <a
                :href="$alias.bangumi(item.id)"
                target="_blank"
              >
                <v-img
                  :src="item.avatar"
                  :lazy="false"
                  size="70"
                  class="poster"
                />
                <figcaption class="intro">
                  <p
                    class="name"
                    v-text="item.name"
                  />
                </figcaption>
              </a>
            </li>
          </ul>
          <no-content v-else/>
        </el-tab-pane>
        <el-tab-pane label="帖子">
          <user-post-flow-list :zone="zone"/>
        </el-tab-pane>
        <el-tab-pane label="偶像">
          <cartoon-role-flow-list :user-zone="zone"/>
        </el-tab-pane>
        <el-tab-pane label="相册">
          <image-flow-list :user-zone="zone"/>
        </el-tab-pane>
        <el-tab-pane label="漫评">
          <user-score-flow-list :zone="zone"/>
        </el-tab-pane>
        <template v-if="isMe">
          <el-tab-pane label="设置">
            <user-setting-form/>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UserApi from "~/api/userApi";
import ImageApi from "~/api/imageApi";
import ImageCropper from "~/components/common/ImageCropper";
import ImageWaterfallFlow from "~/components/image/ImageWaterfallFlow";
import UserSettingForm from "~/components/user/forms/UserSettingForm";
import ImageFlowList from "~/components/flow/list/ImageFlowList";
import CartoonRoleFlowList from "~/components/flow/list/CartoonRoleFlowList";
import UserScoreFlowList from "~/components/user/UserScoreFlowList";
import UserPostFlowList from "~/components/user/UserPostFlowList";

export default {
  name: "UserShow",
  async asyncData({ route, store, ctx }) {
    const zone = route.params.zone;
    const arr = [
      store.dispatch("users/getUser", {
        ctx,
        zone
      }),
      store.dispatch("users/getFollowBangumis", {
        ctx,
        zone
      })
    ];
    await Promise.all(arr);
  },
  head() {
    if (!this.zone) {
      return;
    }
    return {
      title: `${this.user.nickname} - 用户`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.user.signature
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `calibur,用户,天下漫友是一家,${this.user.zone},${
            this.user.nickname
          }`
        }
      ]
    };
  },
  components: {
    ImageCropper,
    ImageWaterfallFlow,
    CartoonRoleFlowList,
    UserSettingForm,
    UserScoreFlowList,
    UserPostFlowList,
    ImageFlowList
  },
  data() {
    return {
      tabActive: "bangumi",
      avatarCropper: {
        src: "",
        type: "",
        showModal: false,
        loading: false,
        file: null
      },
      bannerSelector: {
        file: null,
        image: "",
        showBar: false,
        loading: false
      },
      postTab: "发表",
      signDayLoading: false,
      loadingUserBangumiFetch: false
    };
  },
  computed: {
    zone() {
      return this.$route.params.zone;
    },
    isMe() {
      return this.$store.state.login ? this.zone === this.self.zone : false;
    },
    self() {
      return this.$store.state.user;
    },
    user() {
      return this.isMe ? this.self : this.$store.state.users.list[this.zone];
    },
    bangumis() {
      return this.$store.state.users.list[this.zone].bangumis;
    },
    daySigned() {
      return this.self.daySign;
    },
    coinCount() {
      return this.self.coin;
    }
  },
  mounted() {
    this.watchCopyInviteLink();
  },
  methods: {
    handleTabClick(tab) {
      switch (tab.label) {
        case "番剧":
          this.$channel.$emit("user-tab-switch-bangumi");
          break;
        case "帖子":
          this.$channel.$emit("user-tab-switch-post");
          break;
        case "偶像":
          this.$channel.$emit("user-tab-switch-role");
          break;
        case "相册":
          this.$channel.$emit("user-tab-switch-image");
          break;
        case "漫评":
          this.$channel.$emit("user-tab-switch-score");
          break;
        case "设置":
          this.$channel.$emit("user-tab-switch-setting");
          break;
      }
    },
    openAvatarModal(e) {
      const file = e.target.files[0];
      if (!file) {
        this.$toast.error("请先选择一张图片");
        return;
      }
      if (
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].indexOf(
          file.type
        ) === -1
      ) {
        this.$toast.error("仅支持 jpg / jpeg / png / gif 格式的图片");
        return;
      }
      const reader = new FileReader();
      this.avatarCropper.type = file.type;
      this.avatarCropper.file = file;
      reader.onload = evt => {
        this.avatarCropper.src = evt.target.result;
        this.avatarCropper.showModal = true;
      };
      reader.readAsDataURL(file);
    },
    handleAvatarCropperCancel() {
      this.avatarCropper.showModal = false;
      this.$nextTick(() => {
        this.$refs.avatarInput.value = "";
      });
    },
    async handleAvatarCropperSubmit(formData) {
      this.avatarCropper.loading = true;
      const filename = this.$utils.createFileName({
        userId: this.user.id,
        type: "avatar",
        id: 0,
        file: this.avatarCropper.file
      });
      const imageApi = new ImageApi();
      try {
        await this.$store.dispatch("getUpToken", this);
        formData.append("token", this.user.uptoken.upToken);
        formData.append("key", filename);
        const result = await imageApi.uploadToQiniu(formData);
        const userApi = new UserApi(this);
        await userApi.settingImage({
          type: "avatar",
          url: result.key
        });
        this.$store.commit("UPDATE_USER_INFO", {
          key: "avatar",
          value: `${this.$cdn.image}${result.key}`
        });
        this.$toast.success("头像更新成功");
      } catch (e) {
        typeof e === "string"
          ? this.$toast.error(e)
          : this.$toast.error("头像更新失败，请刷新页面重试或选择其他图片");
      } finally {
        this.avatarCropper.loading = false;
        this.handleAvatarCropperCancel();
      }
    },
    selectBanner(e) {
      const file = e.target.files[0];
      if (!file) {
        this.$toast.error("请先选择一张图片");
        return;
      }
      if (
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].indexOf(
          file.type
        ) === -1
      ) {
        this.$toast.error("仅支持 jpg / jpeg / png / gif 格式的图片");
        return;
      }
      const reader = new FileReader();
      this.bannerSelector.file = file;
      reader.onload = evt => {
        this.bannerSelector.image = evt.target.result;
        this.bannerSelector.showBar = true;
      };
      reader.readAsDataURL(file);
    },
    cancelBannerChange() {
      this.bannerSelector.showBar = false;
      this.$nextTick(() => {
        this.$refs.bannerInput.value = "";
      });
    },
    async submitBannerChange(formData) {
      this.bannerSelector.loading = true;
      const filename = this.$utils.createFileName({
        userId: this.user.id,
        type: "banner",
        id: 0,
        file: this.bannerSelector.file
      });
      try {
        await this.$store.dispatch("getUpToken", this);
        formData.append("token", this.user.uptoken.upToken);
        formData.append("key", filename);
        const imageApi = new ImageApi();
        const result = await imageApi.uploadToQiniu(formData);
        const userApi = new UserApi(this);
        await userApi.settingImage({
          type: "banner",
          url: result.key
        });
        this.$store.commit("UPDATE_USER_INFO", {
          key: "banner",
          value: `${this.$cdn.image}${result.key}`
        });
        this.$toast.success("背景更新成功");
      } catch (e) {
        typeof e === "string"
          ? this.$toast.error(e)
          : this.$toast.error("背景图更新失败，请刷新页面重试或选择其他图片");
      } finally {
        this.bannerSelector.loading = false;
        this.cancelBannerChange();
      }
    },
    async handleDaySign() {
      if (this.signDayLoading) {
        return;
      }
      this.signDayLoading = true;

      try {
        await this.$store.dispatch("users/daySign", {
          ctx: this
        });
        this.$store.commit("UPDATE_USER_INFO", {
          key: "daySign",
          value: true
        });
        this.$store.commit("UPDATE_USER_INFO", {
          key: "coin",
          value: this.coinCount + 1
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.signDayLoading = false;
      }
    },
    watchCopyInviteLink() {
      if (!this.$refs.inviteBtn) {
        return;
      }
      this.$nextTick(() => {
        const clipboard = new this.$copy(this.$refs.inviteBtn.$el);

        clipboard.on("success", () => {
          this.$toast.success("复制成功");
        });
      });
    },
    openUploadImageModal() {
      this.$channel.$emit("show-upload-image-modal");
    }
  }
};
</script>

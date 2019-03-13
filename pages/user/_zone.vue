<style lang="scss">
#user-show {
  .banner-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: $color-white;
    text-shadow: 0 1px 10px gray;
    user-select: none;
    position: relative;
    background-color: rgba(#000, 0.3);

    .file-input {
      &:before {
        content: '\e60a';
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        @include iconfont(27px);
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

    .exp-container {
      width: 200px;
      margin-top: 10px;
    }

    .signature {
      margin-top: 10px;
      max-width: 700px;
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

      .signature {
        margin-top: 15px;
      }
    }
  }

  .flow-container {
    min-height: 400px;

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

    .user-flows-wrap {
      position: relative;
      min-height: 360px;

      .tab-container {
        position: absolute;
        left: 0;
        top: 0;
      }

      .el-tabs__active-bar:after {
        display: none;
      }

      .el-tabs__header {
        width: 101px;
        margin-right: 34px;
      }

      .el-radio-group {
        margin-top: 6px;
      }

      .route-container {
        margin-left: 135px;
      }
    }
  }

  .user-badge {
    padding-bottom: 5px;

    &:not(:first-child) {
      padding-top: 5px;
    }

    &:hover span {
      color: $color-blue-deep;
    }
  }

  .coin-panel {
    margin-bottom: 20px;

    .item {
      width: 49%;
      display: inline-block;
      text-align: center;
      margin-bottom: 10px;

      strong {
        color: #6d757a;
        font-weight: 700;
        font-size: 30px;
      }

      div {
        font-size: 14px;
        margin-top: 10px;
      }

      &:first-child {
        border-right: 1px solid $color-gray-normal;
      }
    }

    .sign-btn {
      background-color: #f25d8e;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      width: 76px;
      line-height: 30px;
      margin-top: -3px;
      float: right;

      &:hover {
        background-color: #ff85ad;
      }

      &.day-signed {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }

    .intro {
      font-size: 12px;
      color: $color-text-light;

      p {
        margin-top: 5px;
      }
    }
  }

  .invite-code {
    button {
      width: 100%;
      background-color: #f25d8e;
      border-radius: 4px;
      box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      line-height: 50px;
      padding: 0 24px;
      margin-bottom: 20px;

      &:hover {
        background-color: #ff709f;
      }
    }

    p {
      font-size: 12px;
      color: $color-text-light;
      margin-bottom: 20px;
    }
  }

  #no-content {
    padding-top: 56px;
  }
}

.avatar-cropper-modal {
  .submit-btn {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

.exp-detail .content {
  padding: 10px 15px;
  font-size: 13px;
  line-height: 20px;

  p {
    font-weight: bold;

    span {
      font-weight: normal;
    }
  }

  li {
    font-size: 12px;
  }
}
</style>

<template>
  <div id="user-show">
    <v-header :banner="user.banner" type="mask" height="400px">
      <div :class="{ 'my-banner': isMe }" class="banner-container">
        <div v-if="isMe" class="banner-cropper-wrap">
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
              >
                取消
              </el-button>
            </div>
          </template>
          <div v-else class="banner-file-input file-input bg">
            <input
              ref="bannerInput"
              accept="image/png, image/jpeg, image/jpg, image/x-png, image/gif"
              type="file"
              @change="selectBanner"
            >
          </div>
        </div>
        <template v-if="isMe">
          <div
            :style="{
              backgroundImage: `url(${$resize(user.avatar, {
                width: 200,
                height: 200
              })})`
            }"
            class="avatar bg file-input"
          >
            <input
              ref="avatarInput"
              accept="image/png, image/jpeg, image/jpg, image/x-png, image/gif"
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
        <span class="nickname">
          {{ user.nickname }}
          <template v-if="isMe">
            <user-sex
              :sex="convertUserSex(user.sex)"
              :secret="user.sexSecret"
            />
            <span class="level"> Lv{{ user.exp.level }} </span>
          </template>
          <template v-else>
            <user-sex :sex="user.sex" :secret="user.sexSecret" />
            <span class="level"> Lv{{ user.level }} </span>
          </template>
          <span class="level"> &nbsp;·&nbsp;战斗力：{{ userPower }} </span>
          <span class="level"> &nbsp;·&nbsp;邀请码：{{ user.id }} </span>
        </span>
        <el-popover
          v-if="isMe"
          placement="right"
          width="250"
          trigger="hover"
          popper-class="exp-detail"
        >
          <div class="content">
            <v-hr text="我的等级" />
            <p>
              当前等级：<span>{{ user.exp.level }}</span>
            </p>
            <p>
              距离升级：<span>{{ user.exp.have_exp }} / {{ user.exp.next_level_exp }}</span>
            </p>
            <v-hr text="升级方法" />
            <ul>
              <li>每日签到：+2</li>
              <li>发帖子：+4</li>
              <li>写漫评：+5</li>
              <li>写回答：+4</li>
              <li>传图片（限图片区）：+3</li>
              <li>提问题（限问答区）：+3</li>
              <li>写评论（包括跟帖）：+2</li>
              <li>回复评论：+1</li>
              <li>获得喜欢：+2</li>
              <li>获得收藏：+2</li>
              <li>获得团子：+3</li>
            </ul>
            <v-hr text="其它提醒" />
            <p>评论/回复自己的内容不会获得经验</p>
            <p>少于15字的内容，是没有经验的</p>
            <p>如果内容被删除，会掉经验和等级</p>
          </div>
          <div slot="reference" class="exp-container">
            <el-progress
              :text-inside="true"
              :stroke-width="18"
              :percentage="expPercent"
              color="#f25d8e"
            />
          </div>
        </el-popover>
        <p class="signature" v-text="user.signature" />
      </div>
    </v-header>
    <v-layout class="flow-container">
      <div v-if="user.faker" class="faker-tips">
        <span>重要提醒</span>
        <p>这是一个运营号，并非本人，该账号下所有信息都是搬运而来</p>
        <p>
          如果你就是该账号本人，可以联系网站工作人员拿回该账号，该账号通过搬运资源获得的团子也将归你所有
        </p>
        <p>当然，你也有权要求我们删除所有你的内容</p>
      </div>
      <div v-if="blockedAt" class="faker-tips">
        <span>该用户已被禁言，禁言至：{{ blockedAt }}，可能是由于以下原因：</span>
        <p>1. 破坏社区环境，包括但不限于：无脑刷屏、复制他人内容来发表</p>
        <p>2. 恶意带节奏</p>
        <p>3. 发表于二次元无关的内容</p>
        <p>4. 其它原因还没想好，希望大家引以为戒</p>
      </div>
      <div class="user-flows-wrap">
        <tab-container :list="cards" def="user-bangumi" pos="left" />
        <div class="route-container">
          <router-view />
        </div>
      </div>
      <template slot="aside">
        <div class="coin-panel">
          <h2 class="sub-title">
            虚拟币
            <button
              v-if="isMe"
              :class="{ 'day-signed': daySigned }"
              class="sign-btn"
              @click="handleDaySign"
            >
              {{ daySigned ? '已签到' : '签到' }}
            </button>
          </h2>
          <div>
            <div class="item">
              <strong>{{ coinCount }}</strong>
              <div>团子</div>
            </div>
            <div class="item">
              <strong>{{ lightCount }}</strong>
              <div>光玉</div>
            </div>
          </div>
          <div class="intro">
            <p>团子类似于Q币，1团子=1Q币，可在站内流通</p>
            <p>光玉就是可提现的团子，只能从别人的投食中获得</p>
          </div>
        </div>
        <div class="invite-code">
          <h2 class="sub-title">
            邀请码
          </h2>
          <button
            v-clipboard="`http://calibur.tv/about/invite/${user.id}`"
            @success="handleCopySuccess"
          >
            点击复制邀请码
          </button>
          <p>其他人使用你的邀请码注册，你就能获得团子奖励</p>
        </div>
        <template v-if="badges.length">
          <h2 class="sub-title">
            徽章墙
          </h2>
          <ul>
            <user-badge
              v-for="item in badges"
              :key="item.id"
              :item="item"
              :user-id="user.id"
            />
          </ul>
        </template>
      </template>
    </v-layout>
  </div>
</template>

<script>
import ImageCropper from '~/components/common/ImageCropper'
import TabContainer from '~/components/common/TabContainer'
import UserSex from '~/components/user/UserSex'
import UserBadge from '~/components/user/UserBadge'
import { Progress } from 'element-ui'
import { settingImage, getUserInfo } from '~/api/userApi'
import { uploadToQiniu } from '~/api/imageApi'

export default {
  name: 'UserShowLayout',
  components: {
    TabContainer,
    ImageCropper,
    UserSex,
    UserBadge,
    'el-progress': Progress
  },
  data() {
    return {
      avatarCropper: {
        src: '',
        type: '',
        showModal: false,
        loading: false,
        file: null
      },
      bannerSelector: {
        file: null,
        image: '',
        showBar: false,
        loading: false
      },
      signDayLoading: false
    }
  },
  computed: {
    zone() {
      return this.$route.params.zone
    },
    isMe() {
      return this.$store.state.login ? this.zone === this.self.zone : false
    },
    self() {
      return this.$store.state.user
    },
    showUser() {
      return this.$store.state.users.show
    },
    blockedAt() {
      return this.showUser.banned_to
    },
    userPower() {
      return this.showUser.power
    },
    user() {
      return this.isMe ? this.self : this.showUser
    },
    badges() {
      return this.$store.state.users.show.badge
    },
    daySigned() {
      return this.self.daySign
    },
    coinCount() {
      return parseFloat(this.showUser.banlance.coin_count).toFixed(2)
    },
    lightCount() {
      return parseFloat(this.showUser.banlance.light_count).toFixed(2)
    },
    cards() {
      return [
        {
          label: '番剧',
          name: 'user-zone-bangumi',
          show: true
        },
        {
          label: '帖子',
          name: 'user-zone-post',
          show: true
        },
        {
          label: '相册',
          name: 'user-zone-pins',
          show: true
        },
        {
          label: '漫评',
          name: 'user-zone-review',
          show: true
        },
        {
          label: '问答',
          name: 'user-zone-qaq',
          show: true
        },
        {
          label: '偶像',
          name: 'user-zone-role',
          show: true
        },
        {
          label: '收藏',
          name: 'user-zone-mark',
          show: this.isMe
        },
        {
          label: '草稿',
          name: 'user-zone-draft',
          show: this.isMe
        },
        {
          label: '设置',
          name: 'user-zone-setting',
          show: this.isMe
        }
      ].filter(_ => _.show)
    },
    expPercent() {
      if (!this.isMe) {
        return 0
      }
      return parseInt(
        (this.user.exp.have_exp / this.user.exp.next_level_exp) * 100,
        10
      )
    }
  },
  asyncData({ app, store, params, error }) {
    return getUserInfo(app, {
      zone: params.zone
    })
      .then(data => {
        store.commit('users/SET_USER_INFO', data)
      })
      .catch(e => {
        error({
          statusCode: e.statusCode,
          message: e.message
        })
      })
  },
  head() {
    return {
      title: this.user.nickname
    }
  },
  methods: {
    openAvatarModal(e) {
      const file = e.target.files[0]
      if (!file) {
        this.$toast.error('请先选择一张图片')
        return
      }
      if (
        ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(
          file.type
        ) === -1
      ) {
        this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
        return
      }
      const reader = new FileReader()
      this.avatarCropper.type = file.type
      this.avatarCropper.file = file
      reader.onload = evt => {
        this.avatarCropper.src = evt.target.result
        this.avatarCropper.showModal = true
      }
      reader.readAsDataURL(file)
    },
    handleAvatarCropperCancel() {
      this.avatarCropper.showModal = false
      this.$nextTick(() => {
        this.$refs.avatarInput.value = ''
      })
    },
    async handleAvatarCropperSubmit(formData) {
      this.avatarCropper.loading = true
      const filename = this.$utils.createFileName({
        userId: this.user.id,
        type: 'avatar',
        file: this.avatarCropper.file
      })
      try {
        await this.$store.dispatch('getUpToken', this)
        formData.append('token', this.user.uptoken.upToken)
        formData.append('key', filename)
        const result = await uploadToQiniu(this, formData)
        await settingImage(this, {
          type: 'avatar',
          url: result.url
        })
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'avatar',
          value: `https://image.calibur.tv/${result.url}`
        })
        this.$toast.success('头像更新成功')
      } catch (e) {
        typeof e === 'string'
          ? this.$toast.error(e)
          : this.$toast.error('头像更新失败，请刷新页面重试或选择其他图片')
      } finally {
        this.avatarCropper.loading = false
        this.handleAvatarCropperCancel()
      }
    },
    selectBanner(e) {
      const file = e.target.files[0]
      if (!file) {
        this.$toast.error('请先选择一张图片')
        return
      }
      if (
        ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(
          file.type
        ) === -1
      ) {
        this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
        return
      }
      const reader = new FileReader()
      this.bannerSelector.file = file
      reader.onload = evt => {
        this.bannerSelector.image = evt.target.result
        this.bannerSelector.showBar = true
      }
      reader.readAsDataURL(file)
    },
    cancelBannerChange() {
      this.bannerSelector.showBar = false
      this.$nextTick(() => {
        this.$refs.bannerInput.value = ''
      })
    },
    async submitBannerChange(formData) {
      this.bannerSelector.loading = true
      const filename = this.$utils.createFileName({
        userId: this.user.id,
        type: 'banner',
        file: this.bannerSelector.file
      })
      try {
        await this.$store.dispatch('getUpToken', this)
        formData.append('token', this.user.uptoken.upToken)
        formData.append('key', filename)
        const result = await uploadToQiniu(this, formData)
        await settingImage(this, {
          type: 'banner',
          url: result.url
        })
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'banner',
          value: `https://image.calibur.tv/${result.url}`
        })
        this.$toast.success('背景更新成功')
      } catch (e) {
        typeof e === 'string'
          ? this.$toast.error(e)
          : this.$toast.error('背景图更新失败，请刷新页面重试或选择其他图片')
      } finally {
        this.bannerSelector.loading = false
        this.cancelBannerChange()
      }
    },
    async handleDaySign() {
      if (this.daySigned) {
        this.$toast.info('今天已经签过到了！')
        return
      }
      if (this.signDayLoading) {
        return
      }
      this.signDayLoading = true

      try {
        const result = await this.$store.dispatch('users/daySign')
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'daySign',
          value: true
        })
        this.$store.commit('UPDATE_USER_INFO', {
          key: 'coin',
          value: this.coinCount + 1
        })
        this.$store.commit('UPDATE_USER_EXP', result.exp)
        this.$toast.success(result.message)
      } catch (e) {
        // do nothing
      } finally {
        this.signDayLoading = false
      }
    },
    handleCopySuccess() {
      this.$toast.success('邀请链接已复制，快去分享吧~')
    },
    convertUserSex(sex) {
      let $res = ''
      switch (sex) {
        case 0:
          $res = '未知'
          break
        case 1:
          $res = '男'
          break
        case 2:
          $res = '女'
          break
        case 3:
          $res = '伪娘'
          break
        case 4:
          $res = '药娘'
          break
        case 5:
          $res = '扶她'
          break
        default:
          $res = '未知'
      }
      return $res
    }
  }
}
</script>

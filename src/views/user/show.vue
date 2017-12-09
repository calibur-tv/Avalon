<style lang="scss">
  #user-show {
    $banner-height: 400px;

    .file-input {
      overflow: hidden;
      position: relative;

      &:hover:before {
        opacity: 1;
        transition-duration: .4s;
      }

      input {
        opacity: 0;
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
      }

      &:before {
        content: '\e603';
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        @include iconfont(30px);
        text-align: center;
        line-height: 100px;
        color: $color-white;
      }
    }

    .avatar-cropper-modal {
      .v-modal {
        width: 400px;
      }

      .image-crop-area {
        width: 360px;
        height: 360px;
        overflow: hidden;
      }

      .cropper-face {
        left: 0;
        top: 0;
        overflow: hidden;
        background-color: transparent;
        opacity: 1;

        &:after {
          content: '';
          position: absolute;
          left: 2%;
          top: 2%;
          border-radius: 100%;
          width: 96%;
          height: 96%;
          box-shadow: 0 0 0 2000px #fff;
          opacity: .85;
        }
      }
    }

    .banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 1;
      height: $banner-height;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .signature {
        color: $color-white;
        word-break: break-all;
        word-wrap: break-word;
        font-size: 13px;
        line-height: 20px;
        margin: 40px 0 20px 0;
        text-shadow: 0 1px 10px gray;
      }

      .img {
        width: 110%;
        height: $banner-height;
        margin: -$banner-height / 2 -55%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
        @include filter-blur();
      }

      .file-input {
        display: none;
      }

      &.my-banner {
        .file-input {
          display: block;
          position: absolute;
          right: -65px;
          bottom: -60px;
          width: 120px;
          height: 120px;
          transition-duration: .4s;
          transform: rotate(45deg);

          &:before {
            background-color: transparent;
            transform: rotate(-45deg);
            text-align: left;
            line-height: 65px;
            margin-left: 20px;
          }

          &:hover {
            background-color: rgba(0, 0, 0, .9) !important;
          }
        }

        &:hover .file-input {
          background-color: rgba(0, 0, 0, .5);
          overflow: visible;

          &:before {
            opacity: 1;
          }
        }
      }

      $selector-height: 80px;
      .banner-select-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: $selector-height;
        background-color: rgba(0, 0, 0, .7);
        padding: 0 50px;

        p {
          font-size: 18px;
          color: $color-white;
          float: left;
          line-height: $selector-height;
        }

        button {
          float: right;
          margin-top: 20px;
        }

        .el-button--primary {
          margin-left: 30px;
          width: 100px;
        }

        .el-button--text {
          color: $color-white;
        }
      }
    }

    $user-panel-height: 160px;
    .container {
      .el-tabs__active-bar:after {
        display: none;
      }

      .el-tabs__header {
        margin-top: $user-panel-height;
        width: 100px;
        margin-right: 100px;
      }

      #user-panel {
        height: $user-panel-height;
        position: absolute;
        left: 60px;
        top: 0;

        .avatar {
          @include avatar(100px)
        }

        .nickname {
          margin-top: 20px;
          display: block;
          text-align: center;
        }
      }

      $video-item-width: 220px;
      $video-item-margin: 15px;
      $video-item-height: 70px;
      .bangumis {
        li {
          margin: 0 $video-item-margin 15px 0;
        }

        a {
          display: block;
          position: relative;
        }

        figure {
          width: $video-item-width - $video-item-margin;
          height: $video-item-height;
          background-color: $color-gray-normal;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;

          &:hover p {
            color: $color-blue-normal;
          }

          img {
            width: $video-item-height;
            height: 100%;
            cursor: pointer;
            margin-right: 12px;
          }

          figcaption {
            padding-left: $video-item-height + 12px;
            padding-right: 12px;

            p {
              display: block;
              color: $color-text-deep;
              font-size: 12px;
              line-height: 14px;
              margin-top: 6px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="user-show">
    <section class="banner" :class="{ 'my-banner': isMe && !bannerSelector.loading }">
      <div class="img bg" :style="{ backgroundImage: banner }"></div>
      <div class="file-input bg">
        <input type="file" ref="bannerInput" @change="selectBanner">
      </div>
      <p class="signature" v-text="user.signature"></p>
      <v-share></v-share>
      <no-ssr>
        <transition name="el-zoom-in-bottom">
          <div class="banner-select-bar" v-if="bannerSelector.showBar">
            <p>确认要更换主页背景图吗？</p>
            <el-button @click="submitBannerChange" :loading="bannerSelector.loading" type="primary" round>确认</el-button>
            <el-button @click="cancelBannerChange" :disabled="bannerSelector.loading" type="text">取消</el-button>
          </div>
        </transition>
      </no-ssr>
    </section>
    <div class="container">
      <div id="user-panel">
        <div class="avatar bg file-input"
             :style="{ backgroundImage: `url(${$resize(user.avatar, { width: 200, height: 200 })})` }"
             v-if="isMe">
          <input type="file" ref="avatarInput" @change="openAvatarModal">
        </div>
        <img class="avatar"
             :src="$resize(user.avatar, { width: 200, height: 200 })"
             alt="avatar"
             v-else>
        <span class="nickname" v-text="user.nickname"></span>
        <v-modal class="avatar-cropper-modal"
                 v-model="avatarCropper.showModal"
                 header-text="头像裁剪"
                 :footer="false">
          <v-cropper :src="avatarCropper.src"
                     :file-type="avatarCropper.type"
                     :uploading="avatarCropper.loading"
                     @cancel="handleAvatarCropperCancel"
                     @submit="handleAvatarCropperSubmit">
          </v-cropper>
        </v-modal>
      </div>
      <el-tabs tab-position="left" @tab-click="handleTabClick">
        <el-tab-pane label="番剧">
          <ul class="bangumis">
            <li v-for="item in bangumis" :key="item.id">
              <a :href="`/bangumi/${item.id}`" target="_blank">
                <figure>
                  <v-img class="bg"
                         :alt="item.name"
                         :src="$resize(item.avatar, { width: 160, height: 160 })"
                  ></v-img>
                  <figcaption class="abs">
                    <p class="twoline" v-text="item.name"></p>
                  </figcaption>
                </figure>
              </a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="帖子">帖子</el-tab-pane>
        <template v-if="isMe">
          <el-tab-pane label="设置">
            <no-ssr>
              <el-form :model="settingForm" :rules="settingRule" ref="settingForm" label-width="50px">
                <el-form-item label="昵称" prop="nickname">
                  <el-col :span="10">
                    <el-input v-model="settingForm.nickname"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="生日">
                  <el-date-picker
                    v-model="settingForm.birthday"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="性别">
                  <el-col>
                    <el-radio-group v-model="settingForm.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col v-if="settingForm.sex">
                    <el-switch v-model="settingForm.sexSecret"
                               active-text="公开"
                               inactive-text="私密"
                    ></el-switch>
                  </el-col>
                </el-form-item>
                <el-form-item label="签名" prop="signature">
                  <el-col :span="20">
                    <el-input type="textarea" v-model="settingForm.signature" placeholder="用简单的言语，表达深刻的心"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveSetting">提交</el-button>
                </el-form-item>
              </el-form>
            </no-ssr>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import vCropper from 'component/base/cropper'
  import UserApi from 'api/userApi'
  import ImageApi from 'api/imageApi'

  export default {
    async asyncData ({ route, store, ctx }) {
      const zone = route.params.slug
      const arr = [
        store.dispatch('users/getUser', {
          ctx, zone
        }),
        store.dispatch('users/getFollowBangumis', {
          zone
        })
      ]
      await Promise.all(arr)
    },
    head () {
      if (!this.slug) {
        return
      }
      return {
        title: this.user.nickname,
        meta: [
          { hid: 'description', name: 'description', content: this.user.signature },
          { hid: 'keywords', name: 'keywords', content: `calibur,用户,天下漫友是一家,${this.user.zone},${this.user.nickname}` }
        ]
      }
    },
    components: {
      vCropper
    },
    computed: {
      slug () {
        return this.$route.params.slug
      },
      isMe () {
        return this.$store.state.login
          ? this.slug === this.self.zone
          : false
      },
      self () {
        return this.$store.state.user
      },
      user () {
        return this.isMe
          ? this.self
          : this.$store.state.users.list[this.slug]
      },
      bangumis () {
        return this.$store.state.users.bangumis[this.slug]
      },
      banner () {
        return this.bannerSelector.showBar
          ? `url(${this.bannerSelector.image})`
          : `url(${this.$resize(this.user.banner, { width: 1920, mode: 0 })})`
      }
    },
    data () {
      const validateNickname = (rule, value, callback) => {
        const length = value.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
        if (!length) {
          callback(new Error('昵称不能为空'))
        } else if (length < 2) {
          callback(new Error('昵称至少为2个字符'))
        } else if (length > 14) {
          callback(new Error('昵称不能超过14个字符'))
        }
        callback()
      }
      return {
        tabActive: 'bangumi',
        settingForm: {
          nickname: '',
          signature: '',
          sex: 0,
          sexSecret: false,
          birthday: ''
        },
        settingRule: {
          nickname: [
            { validator: validateNickname, trigger: 'blur' }
          ],
          signature: [
            { max: 20, message: '请缩减至20字以内', trigger: 'blur' }
          ]
        },
        avatarCropper: {
          src: '',
          type: '',
          showModal: false,
          loading: false
        },
        bannerSelector: {
          file: null,
          image: '',
          showBar: false,
          loading: false
        }
      }
    },
    beforeMount () {
      this.$channel.$emit('change-page-background', {
        img: '',
        theme: 'mask'
      })
    },
    methods: {
      handleTabClick (tab) {
        if (tab.label === '设置') {
          this.settingForm = {
            nickname: this.self.nickname,
            signature: this.self.signature,
            sex: this.self.sex > 2 ? this.self.sex - 2 : this.self.sex,
            sexSecret: this.self.sex > 2,
            birthday: this.self.birthday ? this.self.birthday * 1000 : ''
          }
        }
      },
      saveSetting () {
        this.$refs.settingForm.validate((valid) => {
          if (valid) {
            const api = new UserApi(this)
            const data = {
              nickname: this.settingForm.nickname,
              signature: this.settingForm.signature,
              sex: parseInt(this.settingForm.sex, 10) + (this.settingForm.sexSecret ? 2 : 0),
              birthday: new Date(this.settingForm.birthday).getTime() / 1000
            }
            api.settingProfile(data).then(() => {
              this.$toast.success('设置成功')
              this.$store.commit('SET_USER', Object.assign(this.self, data))
              this.$store.commit('users/removeUser', this.slug)
            }).catch((err) => {
              err.message.forEach(tip => {
                this.$toast.error(tip)
              })
            })
          } else {
            return false
          }
        })
      },
      openAvatarModal (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        this.avatarCropper.type = file.type
        reader.onload = (evt) => {
          this.avatarCropper.src = evt.target.result
          this.avatarCropper.showModal = true
        }
        reader.readAsDataURL(file)
      },
      handleAvatarCropperCancel () {
        this.avatarCropper.showModal = false
        this.$nextTick(() => {
          this.$refs.avatarInput.value = ''
        })
      },
      async handleAvatarCropperSubmit (formData) {
        this.avatarCropper.loading = true
        await this.$store.dispatch('image/getUpToken', {
          modal: 'user',
          type: 'avatar',
          id: this.user.id
        })
        const upToken = this.$store.state.image.upToken
        formData.append('token', upToken.token)
        formData.append('key', upToken.key)
        const imageApi = new ImageApi()
        try {
          await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'avatar',
            url: upToken.key
          })
          this.$store.commit('SET_USER_INFO', {
            avatar: `${this.$cdn.image}${upToken.key}`
          })
          this.$toast.success('头像更新成功')
        } catch (e) {
          console.log(e)
          this.$toast.error('头像更新失败，请联系管理员查看')
        }
        this.avatarCropper.loading = false
        this.handleAvatarCropperCancel()
      },
      selectBanner (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        this.bannerSelector.file = file
        reader.onload = (evt) => {
          this.bannerSelector.image = evt.target.result
          this.bannerSelector.showBar = true
        }
        reader.readAsDataURL(file)
      },
      cancelBannerChange () {
        this.bannerSelector.showBar = false
        this.$nextTick(() => {
          this.$refs.bannerInput.value = ''
        })
      },
      async submitBannerChange () {
        this.bannerSelector.loading = true
        await this.$store.dispatch('image/getUpToken', {
          modal: 'user',
          type: 'banner',
          id: this.user.id
        })
        const formData = new FormData()
        const upToken = this.$store.state.image.upToken
        formData.append('file', this.bannerSelector.file)
        formData.append('token', upToken.token)
        formData.append('key', upToken.key)
        const imageApi = new ImageApi()
        try {
          await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'banner',
            url: upToken.key
          })
          this.$store.commit('SET_USER_INFO', {
            banner: `${this.$cdn.image}${upToken.key}`
          })
          this.$toast.success('背景更新成功')
        } catch (e) {
          console.log(e)
          this.$toast.error('背景更新失败，请联系管理员查看')
        }
        this.bannerSelector.loading = false
        this.cancelBannerChange()
      }
    }
  }
</script>

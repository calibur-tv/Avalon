<style lang="scss">
  #user-show {
    $banner-height: 400px;

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
      color: $color-white;
      text-shadow: 0 1px 10px gray;

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
      }

      .file-input {
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

      .banner-file-input {
        display: none;
      }

      &.my-banner {
        .banner-file-input {
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

        &:hover .banner-file-input {
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

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid hsla(0,0%,100%,.4);
        margin-bottom: 10px;
      }

      .signature, .nickname {
        word-break: break-all;
        word-wrap: break-word;
        font-size: 13px;
        line-height: 20px;
      }

      .signature {
        margin: 30px 0 20px 0;
      }

      .buttons {
        margin-top: 10px;
        text-align: center;
      }
    }

    .container {
      .el-tabs__active-bar:after {
        display: none;
      }

      .el-tabs__header {
        width: 100px;
        margin-right: 100px;
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
              margin-top: 6px;
              margin-bottom: 5px;
              @include twoline(14px)
            }
          }
        }
      }

      .posts {
        margin-top: 10px;

        &.posts-of-mine {
          li {
            float: none;
            padding: 10px;
            position: relative;

            &:not(:last-child) {
              border-bottom: 1px dotted #e4e6eb;
            }

            .header {
              position: relative;
              height: 32px;

              .avatar {
                display: block;
                float: right;
                margin-top: 4px;
                position: relative;
                z-index: 1;

                img {
                  display: block;
                  width: 24px;
                  height: 24px;
                }
              }

              .title {
                font-size: 14px;
                line-height: 32px;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding-right: 240px;
                z-index: 0;
              }

              .time {
                float: right;
                display: block;
                line-height: 32px;
                color: #999;
                font-size: 12px;
                position: relative;
                z-index: 1;
                margin-right: 12px;
              }
            }

            .content {
              margin-top: 3px;
              color: #666;
              font-size: 12px;
              @include twoline(22px)
            }

            .images {
              height: 90px;
              overflow: hidden;
              margin-top: 10px;
              margin-bottom: 15px;

              .image-box {
                margin-right: 10px;
                height: 100%;
                position: relative;
                float: left;
                cursor: zoom-in;

                &:after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background-color: #fff;
                  opacity: 0;
                }

                &:hover {
                  &:after {
                    opacity: 0.1;
                  }
                }

                img {
                  height: 100%;
                  width: auto;
                }
              }
            }

            .footer {
              margin: 8px 0;

              span {
                line-height: 12px;
                color: #919499;
                font-size: 12px;
                margin-right: 10px;
                float: right;
              }
            }
          }
        }

        &.posts-of-reply {
          li {
            float: none;
            padding: 10px;
            position: relative;

            &:not(:last-child) {
              border-bottom: 1px dotted #e4e6eb;
            }

            .header {
              position: relative;
              height: 32px;
              line-height: 32px;

              .time {
                float: right;
                display: block;
                color: #999;
                font-size: 12px;
                position: relative;
                z-index: 1;
                margin-right: 12px;
              }
            }

            .origin {
              background-color: $color-gray-normal;
              padding: 10px 20px;
              margin: 10px 0;
              border-radius: 5px;
            }

            .reply {
              border-left: 5px solid $color-gray-normal;
              padding: 0 20px;
              margin: 10px 0;
            }

            .content {
              margin-top: 3px;
              color: #666;
              font-size: 12px;
              line-height: 22px;
              max-height: 44px;
              overflow: hidden;
            }

            .images {
              height: 90px;
              overflow: hidden;
              margin-top: 10px;
              margin-bottom: 15px;

              .image-box {
                margin-right: 10px;
                height: 100%;
                position: relative;
                float: left;
                cursor: zoom-in;

                &:after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background-color: #fff;
                  opacity: 0;
                }

                &:hover {
                  &:after {
                    opacity: 0.1;
                  }
                }

                img {
                  height: 100%;
                  width: auto;
                }
              }
            }
          }
        }

        &.posts-of-like {
          li {
            float: none;
            position: relative;

            &:not(:last-child) {
              border-bottom: 1px dotted #e4e6eb;
            }

            .title {
              font-size: 14px;
              line-height: 32px;
              display: block;
              padding: 10px;
            }
          }
        }

        &.posts-of-mark {
          li {
            float: none;
            position: relative;

            &:not(:last-child) {
              border-bottom: 1px dotted #e4e6eb;
            }

            .title {
              font-size: 14px;
              line-height: 32px;
              display: block;
              padding: 10px;
            }
          }
        }
      }

      .load-post-btn {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div id="user-show">
    <section class="banner" :class="{ 'my-banner': isMe && !bannerSelector.loading }">
      <div class="img bg" :style="{ backgroundImage: banner }"></div>
      <div class="banner-file-input file-input bg">
        <input type="file" accept="image/png, image/jpeg, image/jpg, image/x-png" ref="bannerInput" @change="selectBanner">
      </div>
      <div class="avatar bg file-input"
           :style="{ backgroundImage: `url(${$resize(user.avatar, { width: 200, height: 200 })})` }"
           v-if="isMe">
        <input type="file" accept="image/png, image/jpeg, image/jpg, image/x-png" ref="avatarInput" @change="openAvatarModal">
      </div>
      <img class="avatar"
           :src="$resize(user.avatar, { width: 200, height: 200 })"
           alt="avatar"
           v-else>
      <span class="nickname" v-text="user.nickname"></span>
      <div class="buttons">
        <template v-if="isMe">
          <el-button
            type="primary"
            :disabled="daySigned"
            :loading="signDayLoading"
            size="small"
            @click="handleDaySign"
          >
            {{ daySigned ? '已签到' : '签到' }}{{ coinCount ? ` (${coinCount})` : '' }}
          </el-button>
          <el-button
            type="warning"
            size="small"
          >
            邀请码：{{ user.id }}
          </el-button>
        </template>
      </div>
      <v-modal
        class="avatar-cropper-modal"
        v-model="avatarCropper.showModal"
        header-text="头像裁剪"
        :footer="false"
      >
        <v-cropper
          :src="avatarCropper.src"
          :file-type="avatarCropper.type"
          :uploading="avatarCropper.loading"
          @cancel="handleAvatarCropperCancel"
          @submit="handleAvatarCropperSubmit"
        ></v-cropper>
      </v-modal>
      <p class="signature" v-text="user.signature"></p>
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
      <el-tabs tab-position="left" @tab-click="handleTabClick">
        <el-tab-pane label="番剧">
          <ul class="bangumis">
            <li v-for="item in bangumis" :key="item.id">
              <a :href="$alias.bangumi(item.id)" target="_blank">
                <figure>
                  <v-img
                    class="bg"
                    :alt="item.name"
                    :src="$resize(item.avatar, { width: 160, height: 160 })"
                  ></v-img>
                  <figcaption class="abs">
                    <p class="name" v-text="item.name"></p>
                  </figcaption>
                </figure>
              </a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="帖子">
          <el-radio-group v-model="postTab" @change="handlePostTabClick">
            <el-radio-button label="发表"></el-radio-button>
            <el-radio-button label="回复"></el-radio-button>
            <el-radio-button label="喜欢"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
          </el-radio-group>
          <template v-if="postListType === 'mine'">
            <ul class="posts posts-of-mine">
              <li v-for="item in posts.data" :key="item.id">
                <div class="header clearfix">
                  <el-tooltip effect="dark" :content="item.bangumi.name" placement="top">
                    <a class="avatar" :href="$alias.bangumi(item.bangumi.id)" target="_blank">
                      <v-img :src="item.bangumi.avatar" width="32" height="32"></v-img>
                    </a>
                  </el-tooltip>
                  <a class="title oneline href-fade-blue" target="_blank" :href="$alias.post(item.id)" v-text="item.title"></a>
                  <span class="time">
                    发表于: <v-time v-model="item.created_at"></v-time>
                </span>
                </div>
                <p class="content" v-text="item.desc"></p>
                <div class="images clearfix" v-if="item.images.length">
                  <div class="image-box"
                       :key="image"
                       v-for="(image, index) in item.images"
                       @click="$previewImages(item.images, index)">
                    <v-img :src="image" height="90" mode="2"></v-img>
                  </div>
                </div>
                <div class="footer clearfix">
                  <span>查看: {{ item.view_count }}</span>
                  <span>喜欢: {{ item.like_count }}</span>
                  <span>回复: {{ item.comment_count }}</span>
                </div>
              </li>
            </ul>
            <el-button :loading="posts.loading"
                       v-if="!posts.noMore"
                       class="load-post-btn"
                       @click="getUserPosts(false)"
                       type="info"
                       plain
            >{{ posts.loading ? '加载中' : '加载更多' }}</el-button>
          </template>
          <template v-else-if="postListType === 'reply'">
            <ul class="posts posts-of-reply">
              <li v-for="item in posts.data" :key="item.id">
                <div class="header clearfix">
                  回复来自番剧
                  <a class="href-fade-blue" target="_blank" :href="$alias.bangumi(item.bangumi.id)" v-text="item.bangumi.name"></a>
                  的帖子
                  <a class="href-fade-blue" target="_blank" :href="$alias.post(item.post.id)">《{{ item.post.title }}》</a>
                  <v-time class="time" v-model="item.created_at"></v-time>
                </div>
                <div class="origin">
                  <a class="href-fade-blue" target="_blank" :href="$alias.user(item.user.zone)">{{ item.user.nickname }}</a>：
                  <div class="content" v-html="item.parent.content"></div>
                  <div class="images clearfix" v-if="item.parent.images.length">
                    <div class="image-box"
                         :key="image"
                         v-for="(image, index) in item.parent.images"
                         @click="$previewImages(item.parent.images, index)">
                      <v-img :src="image" height="90" mode="2"></v-img>
                    </div>
                  </div>
                </div>
                <div class="reply">
                  <div class="content" v-html="item.content"></div>
                  <div class="images clearfix" v-if="item.images.length">
                    <div class="image-box"
                         :key="image"
                         v-for="(image, index) in item.images"
                         @click="$previewImages(item.images, index)">
                      <v-img :src="image" height="90" mode="2"></v-img>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-button :loading="posts.loading"
                       v-if="!posts.noMore"
                       class="load-post-btn"
                       @click="getUserPosts(false)"
                       type="info"
                       plain
            >{{ posts.loading ? '加载中' : '加载更多' }}</el-button>
          </template>
          <template v-else-if="postListType === 'like'">
            <ul class="posts posts-of-like">
              <li v-for="item in posts.data" :key="item.id">
                <a class="title oneline href-fade-blue" target="_blank" :href="$alias.post(item.id)" v-text="item.title"></a>
              </li>
            </ul>
          </template>
          <template v-else-if="postListType === 'mark'">
            <ul class="posts posts-of-mark">
              <li v-for="item in posts.data" :key="item.id">
                <a class="title oneline href-fade-blue" target="_blank" :href="$alias.post(item.id)" v-text="item.title"></a>
              </li>
            </ul>
          </template>
          <no-content v-if="posts.noMore && !posts.data.length"></no-content>
        </el-tab-pane>
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
                  <el-date-picker v-model="settingForm.birthday"
                                  type="date"
                                  :editable="false"
                                  :clearable="false"
                                  placeholder="选择日期"
                  ></el-date-picker>
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
                               active-text="私密"
                               inactive-text="公开"
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
  import vCropper from '~/components/base/Cropper'
  import UserApi from '~/api/userApi'
  import ImageApi from '~/api/imageApi'

  export default {
    async asyncData ({ route, store, ctx }) {
      const zone = route.params.slug
      const arr = [
        store.dispatch('users/getUser', {
          ctx, zone
        }),
        store.dispatch('users/getFollowBangumis', {
          ctx, zone
        })
      ]
      await Promise.all(arr)
    },
    head () {
      if (!this.slug) {
        return
      }
      return {
        title: `${this.user.nickname} - 用户`,
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
        return this.$store.state.users.list[this.slug].bangumis
      },
      banner () {
        return this.bannerSelector.showBar
          ? `url(${this.bannerSelector.image})`
          : `url(${this.$resize(this.user.banner, { width: 1920, mode: 0 })})`
      },
      postListType () {
        const type = this.postTab
        if (type === '发表') {
          return 'mine'
        } else if (type === '回复') {
          return 'reply'
        } else if (type === '喜欢') {
          return 'like'
        } else if (type === '收藏') {
          return 'mark'
        }
        return 'mine'
      },
      posts () {
        return this.$store.state.users.posts[this.postListType]
      },
      daySigned () {
        return this.self.daySign
      },
      coinCount () {
        return this.self.coin
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
        },
        postTab: '发表',
        signDayLoading: false
      }
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
        } else if (tab.label === '帖子') {
          this.getUserPosts(true)
        }
      },
      handlePostTabClick () {
        this.getUserPosts(true)
      },
      getUserPosts (isFirstRequest) {
        if (isFirstRequest && this.$store.state.users.posts[this.postListType].data.length) {
          return
        }
        this.$store.dispatch('users/getFollowPosts', {
          type: this.postListType,
          zone: this.user.zone
        })
      },
      saveSetting () {
        this.$refs.settingForm.validate((valid) => {
          if (valid) {
            const birthday = this.settingForm.birthday ? new Date(this.settingForm.birthday).getTime() / 1000 : 0
            if (birthday && (Date.now() / 1000 - birthday < 315360000)) {
              this.$toast.warning('小于10岁？不应该...')
              return
            }
            const api = new UserApi(this)
            const data = {
              nickname: this.settingForm.nickname,
              signature: this.settingForm.signature,
              sex: parseInt(this.settingForm.sex, 10) + (this.settingForm.sexSecret ? 2 : 0),
              birthday: birthday
            }
            api.settingProfile(data).then(() => {
              this.$toast.success('设置成功')
              this.$store.commit('SET_USER_INFO', Object.assign({}, this.self, data))
              this.$store.commit('users/removeUser', this.slug)
            }).catch((err) => {
              this.$toast.error(err)
            })
          } else {
            return false
          }
        })
      },
      openAvatarModal (e) {
        const file = e.target.files[0]
        if (['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) === -1) {
          this.$toast.warning('仅支持 jpg / jpeg / png 格式的图片')
          return
        }
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
        await this.$store.dispatch('getUpToken', this)
        const key = `user/${this.user.id}/avatar/${Date.now()}-${Math.random().toString(36).substring(3, 6)}`
        formData.append('token', this.user.uptoken.upToken)
        formData.append('key', key)
        const imageApi = new ImageApi()
        try {
          await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'avatar',
            url: key
          })
          this.$store.commit('SET_USER_INFO', {
            avatar: `${this.$cdn.image}${key}`
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
        if (['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) === -1) {
          this.$toast.warning('仅支持 jpg / jpeg / png 格式的图片')
          return
        }
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
        await this.$store.dispatch('getUpToken', this)
        const key = `user/${this.user.id}/banner/${Date.now()}-${Math.random().toString(36).substring(3, 6)}`
        const formData = new FormData()
        formData.append('file', this.bannerSelector.file)
        formData.append('token', this.user.uptoken.upToken)
        formData.append('key', key)
        const imageApi = new ImageApi()
        try {
          await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'banner',
            url: key
          })
          this.$store.commit('SET_USER_INFO', {
            banner: `${this.$cdn.image}${key}`
          })
          this.$toast.success('背景更新成功')
        } catch (e) {
          console.log(e)
          this.$toast.error('背景更新失败，请联系管理员查看')
        }
        this.bannerSelector.loading = false
        this.cancelBannerChange()
      },
      async handleDaySign () {
        if (this.signDayLoading) {
          return
        }
        this.signDayLoading = true

        try {
          await this.$store.dispatch('users/daySign', {
            ctx: this
          })
          this.$store.commit('SET_USER_INFO', {
            daySign: true,
            coin: this.coinCount + 1
          })
        } finally {
          this.signDayLoading = false
        }
      }
    }
  }
</script>

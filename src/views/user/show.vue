<style lang="scss">
  #user-show {
    $banner-height: 400px;

    .banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 3;
      height: $banner-height;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: $color-white;
      text-shadow: 0 1px 10px gray;
      user-select: none;

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
          transition-property: background-color;

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

      .banner-cropper-wrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;

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
          z-index: 1;
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
        pointer-events: none;
      }

      .signature {
        margin: 30px 0 20px 0;
        max-width: 600px;
      }

      .buttons {
        margin-top: 10px;
        text-align: center;

        >* {
          margin: 0 5px;
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
                overflow: hidden;
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

          .top_badge, .nice_badge {
            float: left;
            height: 22px;
            line-height: 20px;
            color: #fff;
            cursor: default;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            padding: 1px 6px;
            border-radius: 4px;
            margin: 5px 5px 0 0;
          }

          .top_badge {
            background-color: $color-blue-normal;
          }

          .nice_badge {
            background-color: $color-pink-deep;
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
                line-height: 32px;
                color: #999;
                font-size: 12px;
                position: relative;
                z-index: 1;
                margin-right: 12px;
              }

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
    <section
      :class="{ 'my-banner': isMe }"
      class="banner"
    >
      <div
        :style="{ backgroundImage: `url(${$resize(user.banner, { width: 1920, mode: 0 })})` }"
        class="img bg"
      />
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
    </section>
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
                <figure>
                  <v-img
                    :alt="item.name"
                    :src="$resize(item.avatar, { width: 160, height: 160 })"
                    class="bg"
                  />
                  <figcaption class="abs">
                    <p
                      class="name"
                      v-text="item.name"
                    />
                  </figcaption>
                </figure>
              </a>
            </li>
          </ul>
          <no-content v-else/>
        </el-tab-pane>
        <el-tab-pane label="帖子">
          <el-radio-group
            v-model="postTab"
            size="mini"
            @change="handlePostTabClick"
          >
            <el-radio-button label="发表"/>
            <el-radio-button label="回复"/>
          </el-radio-group>
          <template v-if="postListType === 'mine'">
            <ul class="posts posts-of-mine">
              <li
                v-for="item in posts.data"
                :key="item.id"
              >
                <div class="header clearfix">
                  <el-tooltip
                    :content="item.bangumi.name"
                    effect="dark"
                    placement="top"
                  >
                    <a
                      :href="$alias.bangumi(item.bangumi.id)"
                      class="avatar"
                      target="_blank"
                    >
                      <img
                        :src="item.bangumi.avatar"
                        width="32"
                        height="32"
                      >
                    </a>
                  </el-tooltip>
                  <div
                    v-if="item.top_at"
                    class="top_badge"
                  >置顶</div>
                  <div
                    v-if="item.is_nice"
                    class="nice_badge"
                  >精</div>
                  <a
                    :href="$alias.post(item.id)"
                    class="title oneline href-fade-blue"
                    target="_blank"
                    v-text="item.title"
                  />
                  <span class="time">
                    发表于: <v-time v-model="item.created_at"/>
                  </span>
                </div>
                <p
                  class="content"
                  v-text="item.desc"
                />
                <div
                  v-if="item.images.length"
                  class="images clearfix"
                >
                  <div
                    v-for="(image, index) in item.images"
                    :key="index"
                    class="image-box"
                    @click="$previewImages(item.images, index)"
                  >
                    <v-img
                      :src="image.url"
                      height="90"
                      mode="2"
                    />
                  </div>
                </div>
                <div class="footer clearfix">
                  <span>查看: {{ item.view_count }}</span>
                  <span>喜欢: {{ item.like_count }}</span>
                  <span>回复: {{ item.comment_count }}</span>
                </div>
              </li>
            </ul>
            <el-button
              v-if="!posts.noMore"
              :loading="posts.loading"
              class="load-more-btn"
              type="info"
              plain
              @click="getUserPosts(false)"
            >{{ posts.loading ? '加载中' : '加载更多' }}</el-button>
          </template>
          <template v-else-if="postListType === 'reply'">
            <ul class="posts posts-of-reply">
              <li
                v-for="item in posts.data"
                :key="item.id"
              >
                <div class="header clearfix">
                  回复：
                  <a
                    :href="$alias.post(item.post.id)"
                    class="href-fade-blue"
                    target="_blank"
                    v-text="item.post.title"
                  />
                  <el-tooltip
                    :content="item.bangumi.name"
                    effect="dark"
                    placement="top"
                  >
                    <a
                      :href="$alias.bangumi(item.bangumi.id)"
                      class="avatar"
                      target="_blank"
                    >
                      <v-img
                        :src="item.bangumi.avatar"
                        width="32"
                        height="32"
                      />
                    </a>
                  </el-tooltip>
                  <v-time
                    v-model="item.created_at"
                    class="time"
                  />
                </div>
                <div class="origin">
                  <div
                    class="content"
                    v-html="item.post.content"
                  />
                  <div
                    v-if="item.post.images.length"
                    class="images clearfix"
                  >
                    <div
                      v-for="(image, index) in item.post.images"
                      :key="index"
                      class="image-box"
                      @click="$previewImages(item.post.images, index)"
                    >
                      <v-img
                        :src="image.url"
                        height="90"
                        mode="2"
                      />
                    </div>
                  </div>
                </div>
                <div class="reply">
                  <div
                    class="content"
                    v-html="item.content"
                  />
                  <div
                    v-if="item.images.length"
                    class="images clearfix"
                  >
                    <div
                      v-for="(image, index) in item.images"
                      :key="index"
                      class="image-box"
                      @click="$previewImages(item.images, index)"
                    >
                      <v-img
                        :src="image.url"
                        height="90"
                        mode="2"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-button
              v-if="!posts.noMore"
              :loading="posts.loading"
              class="load-more-btn"
              type="info"
              plain
              @click="getUserPosts(false)"
            >{{ posts.loading ? '加载中' : '加载更多' }}</el-button>
          </template>
          <no-content v-if="posts.noMore && !posts.data.length"/>
        </el-tab-pane>
        <el-tab-pane label="偶像">
          <div
            v-if="roles.data.length"
            class="cartoon-role"
          >
            <ul>
              <li
                v-for="item in roles.data"
                :key="item.id"
                class="clearfix"
              >
                <a
                  :href="$alias.cartoonRole(item.id)"
                  target="_blank"
                >
                  <img :src="$resize(item.avatar, { width: 168 })">
                </a>
                <div class="text">
                  <a
                    :href="$alias.cartoonRole(item.id)"
                    target="_blank"
                  >
                    <h4 v-text="item.name"/>
                    <p
                      class="intro"
                      v-text="item.intro"
                    />
                  </a>
                  <div class="meta">
                    <span>粉丝: {{ item.fans_count }}</span>
                    ·
                    <span>金币: {{ item.star_count }}</span>
                    ·
                    <span>贡献: {{ item.has_star }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <el-button
              v-if="!roles.noMore"
              :loading="loadingFetchUserRoles"
              class="load-more-btn"
              plain
              type="info"
              @click="getUserRoles(false)"
            >{{ loadingFetchUserRoles ? '加载中' : '加载更多' }}</el-button>
          </div>
          <no-content v-else-if="roles.noMore">
            <a
              v-if="isMe"
              :href="$alias.roleTrending"
              target="_blank"
            >查看角色列表</a>
          </no-content>
        </el-tab-pane>
        <el-tab-pane label="相册">
          <image-waterfall-flow
            :list="images.list"
            :no-more="images.noMore"
            :loading="images.loading"
            @load="getUserImages(false)"
          />
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
  import UserApi from '~/api/userApi'
  import ImageApi from '~/api/imageApi'
  import ImageCropper from '~/components/common/ImageCropper'
  import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'
  import UserSettingForm from '~/components/user/forms/UserSettingForm'

  export default {
    name: 'UserShow',
    async asyncData ({ route, store, ctx }) {
      const zone = route.params.zone
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
      if (!this.zone) {
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
      ImageCropper,
      ImageWaterfallFlow,
      UserSettingForm
    },
    data () {
      return {
        tabActive: 'bangumi',
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
        postTab: '发表',
        signDayLoading: false,
        loadingUserImageFetch: false,
        loadingUserBangumiFetch: false,
        loadingFetchUserRoles: false
      }
    },
    computed: {
      zone () {
        return this.$route.params.zone
      },
      isMe () {
        return this.$store.state.login
          ? this.zone === this.self.zone
          : false
      },
      self () {
        return this.$store.state.user
      },
      user () {
        return this.isMe
          ? this.self
          : this.$store.state.users.list[this.zone]
      },
      bangumis () {
        return this.$store.state.users.list[this.zone].bangumis
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
      images () {
        return this.$store.state.image.users
      },
      daySigned () {
        return this.self.daySign
      },
      coinCount () {
        return this.self.coin
      },
      roles () {
        return this.$store.state.users.roles
      }
    },
    mounted () {
      this.watchCopyInviteLink()
    },
    methods: {
      handleTabClick (tab) {
        if (tab.label === '设置') {
        } else if (tab.label === '帖子') {
          this.getUserPosts(true)
        } else if (tab.label === '偶像') {
          this.getUserRoles(true)
        } else if (tab.label === '相册') {
          this.getUserImages(true)
        }
      },
      handlePostTabClick () {
        this.getUserPosts(true)
      },
      async getUserBangumis () {
        if (this.bangumis.length) {
          return
        }
        if (this.loadingUserBangumiFetch) {
          return
        }
        this.loadingUserBangumiFetch = true
        try {
          await this.$store.dispatch('users/getFollowBangumis', {
            ctx: this,
            zone: this.zone
          })
        } finally {
          this.loadingUserBangumiFetch = false
        }
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
      async getUserImages (isFirstRequest) {
        if (isFirstRequest && this.images.list.length) {
          return
        }
        if (this.loadingUserImageFetch) {
          return
        }
        this.loadingUserImageFetch = true
        try {
          await this.$store.dispatch('image/users', {
            zone: this.user.zone,
            ctx: this,
            force: isFirstRequest
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingUserImageFetch = false
        }
      },
      async getUserRoles (isFirstRequest = false) {
        if (this.loadingFetchUserRoles) {
          return
        }
        this.loadingFetchUserRoles = true
        try {
          await this.$store.dispatch('users/getFollowRoles', {
            ctx: this,
            zone: this.user.zone,
            reset: isFirstRequest
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFetchUserRoles = false
        }
      },
      openAvatarModal (e) {
        const file = e.target.files[0]
        if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
          this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
          return
        }
        const reader = new FileReader()
        this.avatarCropper.type = file.type
        this.avatarCropper.file = file
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
        const filename = this.$utils.createFileName({
          userId: this.user.id,
          type: 'avatar',
          id: 0,
          file: this.avatarCropper.file
        })
        const imageApi = new ImageApi()
        try {
          await this.$store.dispatch('getUpToken', this)
          formData.append('token', this.user.uptoken.upToken)
          formData.append('key', filename)
          const result = await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'avatar',
            url: result.key
          });
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'avatar',
            value: `${this.$cdn.image}${result.key}`
          });
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
      selectBanner (e) {
        const file = e.target.files[0]
        if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
          this.$toast.error('仅支持 jpg / jpeg / png / gif 格式的图片')
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
      async submitBannerChange (formData) {
        this.bannerSelector.loading = true
        const filename = this.$utils.createFileName({
          userId: this.user.id,
          type: 'banner',
          id: 0,
          file: this.bannerSelector.file
        })
        try {
          await this.$store.dispatch('getUpToken', this)
          formData.append('token', this.user.uptoken.upToken)
          formData.append('key', filename)
          const imageApi = new ImageApi()
          const result = await imageApi.uploadToQiniu(formData)
          const userApi = new UserApi(this)
          await userApi.settingImage({
            type: 'banner',
            url: result.key
          })
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'banner',
            value: `${this.$cdn.image}${result.key}`
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
      async handleDaySign () {
        if (this.signDayLoading) {
          return
        }
        this.signDayLoading = true

        try {
          await this.$store.dispatch('users/daySign', {
            ctx: this
          });
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'daySign',
            value: true
          });
          this.$store.commit('UPDATE_USER_INFO', {
            key: 'coin',
            value: this.coinCount + 1
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.signDayLoading = false
        }
      },
      openUploadModal () {
        this.$channel.$emit('open-upload-image-modal')
      },
      watchCopyInviteLink () {
        if (!this.$refs.inviteBtn) {
          return
        }
        this.$nextTick(() => {
          const clipboard = new this.$copy(this.$refs.inviteBtn.$el)

          clipboard.on('success', () => {
            this.$toast.success('复制成功')
          })
        })
      }
    }
  }
</script>

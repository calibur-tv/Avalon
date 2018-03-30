<style lang="scss">
  #bangumi-show {
    $banner-height: 400px;

    #banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 1;
      height: $banner-height;
      margin-bottom: 25px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

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

      .info {
        width: 60%;
        min-width: 600px;
        color: $color-white;

        .title, .summary {
          text-shadow: 0 1px 10px gray;
        }

        .title {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
        }

        .summary {
          word-break: break-all;
          word-wrap: break-word;
          text-indent: 2em;
          font-size: 13px;
          line-height: 20px;
          margin: 40px 0 20px 0;
        }

        .console {
          text-align: center;

          .follow {
            padding: 10px 30px;
            height: 40px;
            font-size: 15px;
            border-radius: 40px;
            border: 1px solid;
            color: $color-white;

            &.is-followed {
              background-color: transparent;
              border-color: $color-white;
              text-shadow: 0 1px 10px gray;

              &:hover {
                background-color: rgba(#fff, .25);
              }
            }

            &.not-follow {
              background-color: $color-pink-deep;
              border-color: $color-pink-deep;

              &:hover {
                border-color: $color-pink-normal;
                background-color: $color-pink-normal;
              }
            }

            i {
              margin-right: 5px;
            }
          }
        }
      }

      .v-share {
        position: absolute;
        right: 40px;
        bottom: 10px;
      }
    }

    .el-tabs__nav-wrap {
      margin-top: -10px;

      &:after {
        background-color: transparent;
      }
    }

    $video-item-width: 255px;
    $video-item-margin: 15px;
    $video-item-height: 70px;
    #videos {
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
          width: 110px;
          height: 100%;
          cursor: pointer;
          margin-right: 12px;
        }

        figcaption {
          padding-left: 122px;
          padding-right: 12px;

          .part {
            display: block;
            color: $color-text-deep;
            font-size: 12px;
            line-height: 14px;
            margin-top: 6px;
            margin-bottom: 5px;
          }

          .name {
            font-size: 12px;
            color: $color-text-normal;
            @include twoline(14px);
          }
        }
      }
    }

    #posts {
    }

    #load-post-btn {
      margin-top: 20px;
      width: 100%;
    }

    .col-aside {
      ul {
        margin-bottom: 20px;
      }

      #tags {
        li {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }

      #followers {
        a {
          overflow: hidden;
          border-radius: 50%;
          margin-right: -10px;
          display: inline-block;
          border: 3px solid #fff;
        }

        img {
          width: 32px;
          height: 32px;
          overflow: hidden;
          display: block;
        }
      }
    }

    #roles {
      .role {
        float: none;
        display: block;
        position: relative;
        padding-bottom: 15px;
        margin-top: 15px;
        margin-right: 30px;

        &:not(:last-child) {
          border-bottom: 1px solid #F0F0F0;
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
          float: left;
          overflow: hidden;
          border-radius: 5px;
          margin-right: 10px;
          border: 1px solid $color-gray-normal;

          img {
            width: 100%;
            height: auto;
          }
        }

        .summary {
          overflow: hidden;

          .info {
            display: block;
            font-size: 14px;
            line-height: 20px;
            height: 60px;
            overflow: hidden;

            .name {
              font-weight: bold;
            }

            .intro {
              color: #000;
            }
          }

          .star {
            float: right;
            margin-top: 14px;
            border-radius: 14px;
          }
        }

        .footer {
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          vertical-align: middle;
          color: $color-text-normal;
          text-align: right;

          img {
            width: 20px;
            height: 20px;
            border-radius: 15px;
            vertical-align: middle;
            border: 1px solid $color-gray-normal;
            margin-left: 2px;
            margin-top: -3px;
          }

          a {
            font-size: 12px;
            color: $color-text-normal;
          }

          span {
            font-size: 12px;
          }
          
          .load-list {
            cursor: pointer;
          }
        }
      }

      .role-fans-modal {
        .v-modal {
          min-height: 600px;

          li {
            float: none;

            .lover-user {
              padding: 10px 0;
              position: relative;
              border-bottom: 1px solid #f0f0f0;
              display: block;

              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid $color-gray-normal;
                margin-right: 10px;
                vertical-align: middle;
              }

              .score {
                float: right;
                font-size: 13px;
                color: $color-text-light;
                margin-top: 13px;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="bangumi-show">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: info ? `url(${$resize(info.banner, { width: 1920, mode: 0 })})` : '' }"></div>
      <div class="info">
        <h1 class="title" v-text="info.name"></h1>
        <p class="summary" v-text="info.summary"></p>
        <div class="console">
          <button
            class="follow"
            @click="follow"
            :class="[ info.followed ? 'is-followed' : 'not-follow' ]"
          >
            <i class="iconfont icon-guanzhu"></i>
            {{ info.followed ? '已关注' : '关注' }}
          </button>
        </div>
      </div>
      <v-share type="panel"></v-share>
    </section>
    <div class="container">
      <div class="col-main">
        <el-tabs @tab-click="handleTabClick">
          <el-tab-pane label="帖子">
            <no-content v-if="posts.noMore && !posts.total"></no-content>
            <ul id="posts">
              <post-show-item
                v-for="item in posts.data"
                :key="item.id"
                :item="item"
              ></post-show-item>
            </ul>
            <el-button
              :loading="postState.loading"
              v-if="!posts.noMore"
              id="load-post-btn"
              @click="getPosts"
              type="info"
              plain
            >{{ postState.loading ? '加载中' : '加载更多' }}</el-button>
          </el-tab-pane>
          <el-tab-pane label="视频">
            <section id="videos" v-if="videos.data.length">
              <div v-if="info.season">
                <template v-for="season in videos.data">
                  <h3 class="celltitle" v-text="season.name" :key="season.name"></h3>
                  <ul :key="season.name">
                    <li v-for="(video, index) in season.data" :key="video.id">
                      <a :href="$alias.video(video.id)"
                         target="_blank">
                        <figure>
                          <v-img
                            class="bg"
                            :alt="video.name"
                            :src="$resize(video.poster, { width: 192, height: 120 })"
                          ></v-img>
                          <figcaption class="abs">
                            <p class="part oneline">第{{ videos.repeat ? index + 1 : video.part }}话</p>
                            <span class="name" v-text="video.name"></span>
                          </figcaption>
                        </figure>
                      </a>
                    </li>
                  </ul>
                </template>
              </div>
              <ul v-else>
                <li v-for="video in videos.data" :key="video.id">
                  <a :href="$alias.video(video.id)" target="_blank">
                    <figure>
                      <v-img
                        class="bg"
                        :alt="video.name"
                        :src="$resize(video.poster, { width: 192, height: 120 })"
                      ></v-img>
                      <figcaption class="abs">
                        <p class="part oneline">第{{ video.part }}话</p>
                        <span class="name" v-text="video.name"></span>
                      </figcaption>
                    </figure>
                  </a>
                </li>
              </ul>
            </section>
            <no-content v-else-if="videos.fetched"></no-content>
          </el-tab-pane>
          <el-tab-pane label="偶像">
            <div id="roles">
              <ul>
                <li class="role" v-for="item in roles.data">
                  <div class="clearfix">
                    <div class="avatar">
                      <v-img :src="item.avatar" width="90" height="90"></v-img>
                    </div>
                    <div class="summary">
                      <div class="info">
                        <span class="name" v-text="item.name"></span>
                        <span class="intro">：{{ item.intro }}</span>
                      </div>
                      <el-button
                        @click="handleStarRole(item)"
                        type="warning"
                        class="star"
                        size="mini"
                        plain>为TA应援</el-button>
                    </div>
                  </div>
                  <div class="footer" v-if="item.fans_count">
                  <span>
                    粉丝:
                    {{ $utils.shortenNumber(item.fans_count) }}
                  </span>
                    ·
                    <span>
                    金币:
                    {{ $utils.shortenNumber(item.star_count) }}
                  </span>
                    ·
                    <span v-if="item.lover">
                    守护者:
                    <router-link :to="$alias.user(item.lover.zone)">
                      {{ item.lover.nickname }}
                      <v-img :src="item.lover.avatar" width="20" height="20"></v-img>
                    </router-link>
                  </span>
                    ·
                    <span class="load-list" @click="showRoleDetail(item, 'new')">最新应援</span>
                    ·
                    <span class="load-list" @click="showRoleDetail(item, 'hot')">最多应援</span>
                  </div>
                </li>
              </ul>
              <no-content v-if="roles.noMore && !roles.data.length"></no-content>
              <v-modal
                class="role-fans-modal"
                v-model="openRolesModal"
                :header-text="`${currentRole.name} · 应援团`"
                :footer="false"
                :scroll="fetchCurrentRoleFans"
              >
                <li
                  v-for="item in currentRoleFans.data"
                  :key="item.id"
                >
                  <router-link class="lover-user" :to="$alias.user(item.zone)">
                    <img :src="$resize(item.avatar, { width: 80 })">
                    <span v-text="item.nickname"></span>
                    <v-time class="score" v-if="focusRoleSort === 'new'" v-model="item.score"></v-time>
                    <span class="score" v-else>{{ item.score }}个金币</span>
                  </router-link>
                </li>
              </v-modal>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <aside class="col-aside">
        <div id="tags" v-if="tags.length">
          <h2 class="subtitle">标签</h2>
          <ul>
            <li class="tag" v-for="tag in tags" :key="tag.id">
              <a :href="$alias.bangumiTag(tag.id)" class="el-tag" v-text="tag.name" target="_blank"></a>
            </li>
          </ul>
        </div>
        <div id="followers" v-if="followers.length">
          <h2 class="subtitle">关注的人（{{ info.count_like }}）</h2>
          <ul>
            <li v-for="user in followers" :key="user.zone">
              <el-tooltip class="item" effect="dark" :content="user.nickname" placement="top">
                <a :href="$alias.user(user.zone)" target="_blank">
                  <v-img :src="$resize(user.avatar, { width: 64, height: 64 })"
                         :alt="user.zone"
                  ></v-img>
                </a>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
  import PostShowItem from '~/components/items/PostShow'

  const defaultParams = {
    post: {
      take: 10,
      type: 'new'
    }
  }

  export default {
    name: 'bangumi-show',
    async asyncData ({ route, store, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('bangumi/getBangumi', { ctx, id }),
        store.dispatch('bangumi/getPosts', {
          ctx,
          id,
          take: defaultParams.post.take,
          type: defaultParams.post.type
        })
      ])
    },
    components: {
      PostShowItem
    },
    head () {
      if (!this.id) {
        return
      }
      let keywords = this.info.alias
      this.tags.forEach(tag => {
        keywords += `,${tag.name}`
      })
      const name = this.info.name
      keywords += `${keywords}, ${name}动漫, ${name}动画片, ${name}全集, ${name}在线观看, ${name}吧`
      return {
        title: `${name} - 番剧`,
        meta: [
          { hid: 'description', name: 'description', content: this.info.summary },
          { hid: 'keywords', name: 'keywords', content: keywords }
        ]
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      info () {
        return this.$store.state.bangumi.info
      },
      tags () {
        return this.info.tags
      },
      followers () {
        return this.info.followers
      },
      videos () {
        return this.$store.state.bangumi.videos
      },
      posts () {
        return this.$store.state.bangumi.posts
      },
      roles () {
        return this.$store.state.bangumi.roles
      },
      currentRoleFans () {
        return this.$store.state.cartoonRole.fans[this.focusRoleSort]
      }
    },
    data () {
      return {
        postState: {
          take: defaultParams.post.take,
          type: defaultParams.post.type,
          loading: false,
          init: true
        },
        videoState: {
          loading: false,
          init: false
        },
        rolesState: {
          loading: false,
          init: false
        },
        openRolesModal: false,
        loadingRoleFans: false,
        focusRoleSort: 'new',
        currentRole: {},
        loadingFollow: false
      }
    },
    methods: {
      async follow () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.loadingFollow) {
          return
        }
        this.loadingFollow = true
        try {
          await this.$store.dispatch('bangumi/follow', {
            ctx: this,
            id: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollow = false
        }
      },
      handleTabClick (tab) {
        const index = parseInt(tab.index, 10)
        if (index === 0) {
          if (!this.postState.init) {
            this.getPosts()
          }
        } else if (index === 1) {
          if (!this.videoState.init) {
            this.getVideos()
          }
        } else if (index === 2) {
          if (!this.rolesState.init) {
            this.getRoles()
          }
        }
      },
      async getRoles () {
        if (this.rolesState.loading) {
          return
        }
        this.rolesState.loading = true
        this.rolesState.init = true

        try {
          await this.$store.dispatch('bangumi/getRoles', {
            ctx: this,
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.rolesState.loading = false
        }
      },
      async getVideos () {
        if (this.videoState.loading) {
          return
        }
        this.videoState.loading = true
        this.videoState.init = true

        try {
          await this.$store.dispatch('bangumi/getVideos', this.id)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.videoState.loading = false
        }
      },
      async getPosts () {
        if (this.postState.loading || this.posts.noMore) {
          return
        }
        this.postState.loading = true

        try {
          await this.$store.dispatch('bangumi/getPosts', {
            ctx: this,
            id: this.id,
            take: this.postState.take,
            type: this.postState.type
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.postState.loading = false
        }
      },
      showRoleDetail (role, sort) {
        this.currentRole = role
        this.openRolesModal = true
        this.focusRoleSort = sort
        this.fetchCurrentRoleFans(true)
      },
      switchFocusRoleTab (label) {
        if (this.$store.state.cartoonRole.fans[label].length) {
          return
        }
        this.fetchCurrentRoleFans()
      },
      async fetchCurrentRoleFans (reset = false) {
        if (this.loadingRoleFans) {
          return
        }
        this.loadingRoleFans = true
        try {
          await this.$store.dispatch('cartoonRole/getFansList', {
            ctx: this,
            bangumiId: this.id,
            roleId: this.currentRole.id,
            sort: this.focusRoleSort,
            reset
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleFans = false
        }
      },
      async handleStarRole (role) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.$store.state.user.coin) {
          this.$toast.warning('金币不足')
          return
        }
        try {
          await this.$store.dispatch('bangumi/starRole', {
            bangumiId: this.id,
            roleId: role.id,
            ctx: this,
            hasStar: role.has_star
          })
          this.$store.commit('USE_COIN')
          this.$toast.success(`+${role.has_star}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      }
    },
    mounted () {
      this.$channel.$on('get-page-bangumi-for-post-create', () => {
        this.$channel.$emit('set-page-bangumi-for-post-create', {
          id: this.info.id,
          name: this.info.name,
          avatar: this.info.avatar
        })
      })
    }
  }
</script>

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
      margin-bottom: 40px;
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

      #share {
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

          p {
            display: block;
            color: $color-text-deep;
            font-size: 12px;
            line-height: 14px;
            margin-top: 6px;
            margin-bottom: 5px;
          }

          span {
            font-size: 12px;
            line-height: 14px;
            color: $color-text-normal;
          }
        }
      }
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
          <button class="follow"
                  @click="follow"
                  :class="[ info.followed ? 'is-followed' : 'not-follow' ]">
            <i class="iconfont icon-guanzhu"></i>
            {{ info.followed ? '已关注' : '关注' }}
          </button>
        </div>
      </div>
      <v-share></v-share>
    </section>
    <div class="container">
      <div class="col-main">
        <el-tabs @tab-click="handleTabClick">
          <el-tab-pane label="视频">
            <section id="videos" v-if="videoPackage.videos.length">
              <div v-if="info.season">
                <template v-for="season in videoPackage.videos">
                  <h3 class="celltitle" v-text="season.name" :key="season.name"></h3>
                  <ul :key="season.name">
                    <li v-for="(video, index) in sortVideos(season.data)" :key="video.id">
                      <a :href="info.others_site_video ? video.url : `/video/${video.id}`"
                         :rel="info.others_site_video ? 'nofollow' : ''"
                         target="_blank">
                        <figure>
                          <v-img class="bg"
                                 :alt="video.name"
                                 :src="$resize(video.poster, { width: 192, height: 120 })">
                          </v-img>
                          <figcaption class="abs">
                            <p class="oneline">第{{ videoPackage.repeat ? index + 1 : video.part }}话</p>
                            <span class="twoline" v-text="video.name"></span>
                          </figcaption>
                        </figure>
                      </a>
                    </li>
                  </ul>
                </template>
              </div>
              <ul v-else>
                <li v-for="video in sortVideos(videoPackage.videos)" :key="video.id">
                  <a :href="info.others_site_video ? video.url : `/video/${video.id}`"
                     :rel="info.others_site_video ? 'nofollow' : ''"
                     target="_blank">
                    <figure>
                      <v-img class="bg"
                             :alt="video.name"
                             :src="$resize(video.poster, { width: 192, height: 120 })">
                      </v-img>
                      <figcaption class="abs">
                        <p class="oneline">第{{ video.part }}话</p>
                        <span class="twoline" v-text="video.name"></span>
                      </figcaption>
                    </figure>
                  </a>
                </li>
              </ul>
            </section>
          </el-tab-pane>
          <el-tab-pane label="帖子"></el-tab-pane>
          <el-tab-pane label="图片"></el-tab-pane>
          <el-tab-pane label="管理"></el-tab-pane>
        </el-tabs>
      </div>
      <aside class="col-aside">
        <div id="tags" v-if="tags.length">
          <h2 class="subtitle">标签</h2>
          <ul>
            <li class="tag" v-for="tag in tags" :key="tag.id">
              <router-link class="el-tag" :to="`/bangumi/tags/${tag.id}`" v-text="tag.name"></router-link>
            </li>
          </ul>
        </div>
        <div id="followers" v-if="info.followers.length">
          <h2 class="subtitle">关注的人</h2>
          <ul>
            <li v-for="user in info.followers" :key="user.zone">
              <el-tooltip class="item" effect="dark" :content="user.nickname" placement="top">
                <a :href="`/user/${user.zone}`" target="_blank">
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
  export default {
    name: 'bangumi-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('bangumi/getShow', {
        ctx,
        id: route.params.id
      })
    },
    head () {
      if (!this.id) {
        return
      }
      let keywords = this.info.alias ? this.info.alias.search : ''
      this.tags.forEach(tag => {
        keywords += `,${tag.name}`
      })
      return {
        title: `${this.info.name}`,
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
        return this.$store.state.bangumi.list[this.id]
      },
      tags () {
        return this.info.tags
      },
      videoPackage () {
        return this.info.videoPackage
      }
    },
    mounted () {
      this.$channel.$emit('change-page-background', {
        theme: 'mask',
        img: ''
      })
    },
    methods: {
      sortVideos (videos) {
        return this.$orderBy(videos, 'part')
      },
      follow () {
        if (this.$store.state.login) {
          this.$store.dispatch('bangumi/follow', {
            ctx: this,
            id: this.id
          })
        } else {
          this.$channel.$emit('sign-in')
        }
      },
      handleTabClick (tab) {
        console.log(tab.label)
      }
    }
  }
</script>

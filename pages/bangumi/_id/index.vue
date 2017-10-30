<style lang="scss">
  #bangumi-home {
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

        #share {
          height: 40px;
          text-align: center;
        }
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
  }
</style>

<template>
  <div id="bangumi-home" class="main">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: info ? `url(${$resize(info.banner, { width: 1920, mode: 0 })})` : '' }"></div>
      <div class="info">
        <h1 class="title" v-text="info.name"></h1>
        <p class="summary" v-text="info.summary"></p>
        <v-share></v-share>
      </div>
    </section>
    <div class="container clearfix">
      <div class="col-main">
        <section id="videos" v-if="videos.length">
          <h2 class="subtitle">视频列表</h2>
          <div v-if="info.season">
            <template v-for="season in videos">
              <h3 class="celltitle" v-text="season.name" :key="season.name"></h3>
              <ul :key="season.name">
                <li v-for="(video, index) in sortVideos(season.data)" :key="video.id">
                  <a :href="selfResource(video.url) ? `/video/${video.id}` : video.url"
                     :rel="selfResource(video.url) ? '' : 'nofollow'"
                     target="_blank">
                    <figure>
                      <v-img class="bg"
                             :alt="video.name"
                             :src="$resize(video.poster, { width: 192, height: 120 })">
                      </v-img>
                      <figcaption class="abs">
                        <p class="oneline">第{{ info.repeat ? index + 1 : video.part }}话</p>
                        <span class="twoline" v-text="video.name"></span>
                      </figcaption>
                    </figure>
                  </a>
                </li>
              </ul>
            </template>
          </div>
          <ul v-else>
            <li v-for="video in sortVideos(videos)" :key="video.id">
              <a :href="selfResource(video.url) ? `/video/${video.id}` : video.url"
                 :rel="selfResource(video.url) ? '' : 'nofollow'"
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
      </div>
      <aside class="col-aside">
        <div id="tags">
          <h2 class="subtitle">标签</h2>
          <ul>
            <li class="tag" v-for="tag in tags" :key="tag.pivot.tag_id">
              <nuxt-link :to="`/bangumi/tags/${tag.pivot.tag_id}`" v-text="tag.name"></nuxt-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bangumi-home',
    head () {
      return {
        title: `${this.info.name} - 番剧`,
        meta: [
          { hid: 'description', name: 'description', content: this.info.summary },
          { hid: 'keywords', name: 'keywords', content: `${this.info.keywords}` }
        ]
      }
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params, app }) {
      const data = await app.$axios.$get(`bangumi/${params.id}/info`)
      return {
        videos: data.videos,
        tags: data.tags,
        info: data.info
      }
    },
    data () {
      return {
        id: this.$route.params.id,
        info: null,
        tags: [],
        videos: []
      }
    },
    created () {
      this.$channel.$emit('change-page-background', {
        theme: 'mask',
        img: ''
      })
    },
    methods: {
      sortVideos (videos) {
        return this.$orderBy(videos, 'part')
      },
      selfResource (url) {
        return url === '' || url.match(this.$cdn) !== null
      }
    }
  }
</script>

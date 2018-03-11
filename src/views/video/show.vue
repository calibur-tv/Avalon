<style lang="scss">
  #video-show {
    $meta-height: 30px;
    $meta-margin-bottom: 8px;

    #metas {
      margin-bottom: 20px;
      padding-right: 55px;
      overflow: hidden;
      position: relative;
      min-height: 30px;

      ul {
        margin-bottom: 5px;
      }

      li {
        float: left;
        margin: 0 8px $meta-margin-bottom 0;
      }

      .season-title {
        padding-bottom: 10px;
        margin-left: 10px;
      }

      .meta, .more {
        border: 1px solid $color-gray-deep;
        height: $meta-height;
        color: $color-link;
        border-radius: 4px;
        display: block;
        transition: .2s;
        padding: 0 15px 0 8px;
        font-size: 14px;
        line-height: 28px;

        span {
          min-width: 16px;
          margin-right: 5px;
          display: inline-block;
          text-align: right;
        }

        &:hover {
          border-color: $color-blue-light;
          background-color: $color-blue-light;
          color: $color-white;
        }
      }

      .router-link-active {
        border-color: $color-blue-light;
        background-color: $color-blue-light;
        color: $color-white;
      }

      .more {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        padding-right: 8px;
        text-align: center;
      }
    }

    .social {
      margin-top: 20px;

      .v-share {
        height: 40px;
        float: right;
      }
    }
  }
</style>

<template>
  <div id="video-show" class="main">
    <v-banner></v-banner>
    <div class="container">
      <nav>
        <h1 class="breadcrumb" v-if="bangumi && video">
          <a :href="$alias.index" target="_blank">主站</a>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank" v-text="bangumi.name"></a>
          第{{ video.part }}话&nbsp;{{ video.name }}
        </h1>
      </nav>
      <div id="metas">
        <template v-if="season && showAll">
          <template v-for="(metas, idx) in list">
            <h6 class="season-title" v-text="season.name[idx]"></h6>
            <ul>
              <li v-for="(meta, index) in metas.data" :key="meta.id">
                <a class="meta"
                   :class="{ 'router-link-active' : $route.params.id == meta.id }"
                   :style="{ width: `${maxWidth}px` }"
                   :href="$alias.video(meta.id)">
                  <span>{{ videoPackage.list.repeat ? index + 1 : meta.part }}</span>{{ meta.name }}
                </a>
              </li>
            </ul>
          </template>
        </template>
        <ul v-else>
          <li v-for="meta in sortVideos" :key="meta.id">
            <a class="meta"
               :class="{ 'router-link-active' : $route.params.id == meta.id }"
               :style="{ width: `${maxWidth}px` }"
               :href="$alias.video(meta.id)">
              <span>{{ meta.part }}</span>{{ meta.name }}
            </a>
          </li>
        </ul>
        <div class="more" v-if="showMoreBtn" @click="showAll = !showAll">{{ showAll ? '收起' : '展开' }}</div>
      </div>
      <no-ssr>
        <v-video
          :source="computeVideoSrc(video)"
          :other-src="bangumi.others_site_video"
          :video="`${bangumi.name} 第 ${video.part} 话 ${video.name}`"
          :poster="$resize(video.poster)"
          @playing="handlePlaying"
        ></v-video>
      </no-ssr>
      <div class="social">
        <v-share type="panel"></v-share>
      </div>
    </div>
  </div>
</template>

<script>
  import vVideo from '~/components/Video'
  import VideoApi from '~/api/videoApi'

  export default {
    name: 'video-show',
    head () {
      return {
        title: `${this.bangumi.name} : 第${this.video.part}话 ${this.video.name} - 视频`,
        meta: [
          { hid: 'description', name: 'description', content: this.bangumi.summary },
          { hid: 'keywords', name: 'keywords', content: `${this.bangumi.name}，第${this.video.part}话，${this.video.name}` }
        ]
      }
    },
    components: {
      vVideo
    },
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('video/getShow', {
        id: route.params.id,
        ctx
      })
    },
    computed: {
      id () {
        return parseInt(this.$route.params.id, 10)
      },
      videoPackage () {
        return this.$store.state.video
      },
      video () {
        return this.videoPackage.info
      },
      list () {
        return this.videoPackage.list.videos
      },
      videos () {
        if (!this.season) {
          return this.list
        }
        let result = []
        this.list.forEach(videos => {
          result = result.concat(videos.data)
        })
        return result
      },
      bangumi () {
        return this.videoPackage.bangumi
      },
      sortVideos () {
        const begin = (this.page - 1) * this.take
        return this.showAll ? this.videos : this.videos.slice(begin, begin + this.take)
      },
      season () {
        return this.$store.state.video.season
      },
      showMoreBtn () {
        return this.take < this.videos.length
      }
    },
    data () {
      return {
        maxWidth: 0,
        take: 0,
        part: 0,
        page: 0,
        showAll: false,
        firstPlay: true
      }
    },
    methods: {
      computeVideoSrc (video) {
        return this.bangumi.others_site_video
          ? video.url
          : video.resource
            ? video.resource.video[720].src || video.url
            : video.url
      },
      computeMaxWidth () {
        let maxlength = 0
        this.videos.forEach(video => {
          const templength = video.name.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
          if (maxlength < templength) {
            maxlength = templength
          }
        })
        this.maxWidth = 46 + maxlength * 8
      },
      computePage () {
        this.take = Math.floor(document.getElementById('metas').offsetWidth / (this.maxWidth + 8)) * 2
        this.videos.forEach((meta) => {
          if (meta.id === this.id) {
            this.part = meta.part
          }
        })
        this.page = Math.ceil(this.part / this.take)
      },
      handlePlaying () {
        if (this.firstPlay) {
          this.firstPlay = false
          const api = new VideoApi(this)
          api.playing(this.id)
        }
      }
    },
    mounted () {
      this.computeMaxWidth()
      this.computePage()
      window.addEventListener('resize', () => {
        this.computeMaxWidth()
        this.computePage()
      })
    }
  }
</script>

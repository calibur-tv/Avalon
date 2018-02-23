<style lang="scss">
  #video-show {
    $meta-height: 30px;
    $meta-margin-bottom: 8px;

    #metas {
      margin-bottom: 20px;
      padding-right: 55px;
      overflow: hidden;
      position: relative;

      li {
        float: left;
        margin: 0 8px $meta-margin-bottom 0;
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

      #share {
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
        <ul>
          <li v-for="meta in sortVideos" :key="meta.id">
            <a class="meta"
               :class="{ 'router-link-active' : $route.params.id == meta.id }"
               :style="{ width: `${maxWidth}px` }"
               :href="$alias.video(meta.id)">
              <span>{{ meta.part }}</span>{{ meta.name }}
            </a>
          </li>
        </ul>
        <div class="more" v-if="take < list.length" @click="showAll = !showAll">{{ showAll ? '收起' : '展开' }}</div>
      </div>
      <v-video v-if="video"
               :source="computeVideoSrc(video)"
               :other-src="bangumi.others_site_video"
               :video="`${bangumi.name} 第 ${video.part} 话 ${video.name}`"
               :poster="$resize(video.poster)"
               @playing="handlePlaying">
      </v-video>
      <div class="social">
        <v-share></v-share>
      </div>
    </div>
  </div>
</template>

<script>
  import vVideo from '~/components/Video'
  import VideoApi from '~/api/videoApi'

  const metaMarginRgt = 8

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
      video () {
        return this.$store.state.video.info
      },
      list () {
        return this.$store.state.video.list.videos
      },
      bangumi () {
        return this.$store.state.video.bangumi
      },
      sortVideos () {
        const begin = (this.page - 1) * this.take
        const metas = this.$orderBy(this.list, 'part')
        return this.showAll ? metas : metas.slice(begin, begin + this.take)
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
          ? video.resource.video[720].src
          : video.url || video.resource.video[720].src
      },
      computeMaxWidth () {
        let maxlength = 0
        this.list.forEach((meta) => {
          const templength = meta.name.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
          if (maxlength < templength) {
            maxlength = templength
          }
        })
        this.maxWidth = 46 + maxlength * 8
      },
      computePage () {
        this.take = Math.floor(document.getElementById('metas').offsetWidth / (this.maxWidth + metaMarginRgt)) * 2
        this.list.forEach((meta) => {
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

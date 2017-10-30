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

      .nuxt-link-active {
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
        <h1 class="breadcrumb" v-if="bangumi && info">
          <nuxt-link to="/">主站</nuxt-link>
          <nuxt-link :to="`/bangumi/${bangumi.id}`" v-text="bangumi.name"></nuxt-link>
          第{{ info.part }}话&nbsp;{{ info.name }}
        </h1>
      </nav>
      <div id="metas">
        <ul>
          <li v-for="meta in sortVideos" :key="meta.id">
            <a class="meta"
               :class="{ 'nuxt-link-active' : $route.params.id == meta.id }"
               :style="{ width: `${maxWidth}px` }"
               :href="`/video/${meta.id}`">
              <span>{{ meta.part }}</span>{{ meta.name }}
            </a>
          </li>
        </ul>
        <div class="more" v-if="take < videos.length" @click="showAll = !showAll">{{ showAll ? '收起' : '展开' }}</div>
      </div>
      <v-video v-if="info"
               :source="info.url ? info.url : info.resource"
               :sourceissrc="!!info.url"
               :info="`${bangumi.name} 第 ${info.part} 话 ${info.name}`"
               :poster="$resize(info.poster)"
               @playing="handlePlaying">
      </v-video>
      <div class="social">
        <v-share></v-share>
      </div>
    </div>
  </div>
</template>

<script>
  import vBanner from '~/components/views/Banner.vue'
  import vVideo from '~/components/Video.vue'

  const metaMarginRgt = 8

  export default {
    name: 'video-show',
    head () {
      return {
        title: `${this.bangumi.name} : 第${this.info.part}话 ${this.info.name} - 视频`,
        meta: [
          { hid: 'description', name: 'description', content: this.bangumi.summary },
          { hid: 'keywords', name: 'keywords', content: `${this.bangumi.name}，第${this.info.part}话，${this.info.name}` }
        ]
      }
    },
    components: {
      vBanner, vVideo
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params, app }) {
      const data = await app.$axios.$get(`video/${params.id}/info`)
      return {
        bangumi: data.bangumi,
        videos: data.videos,
        info: data.info
      }
    },
    computed: {
      sortVideos () {
        const begin = (this.page - 1) * this.take
        const metas = this.$orderBy(this.videos, 'part')
        return this.showAll ? metas : metas.slice(begin, begin + this.take)
      }
    },
    data () {
      return {
        id: parseInt(this.$route.params.id, 10),
        info: null,
        bangumi: null,
        videos: [],
        maxWidth: 0,
        take: 0,
        part: 0,
        page: 0,
        showAll: false,
        firstPlay: true
      }
    },
    methods: {
      computeMaxWidth () {
        let maxlength = 0
        this.videos.forEach((meta) => {
          const templength = meta.name.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length
          if (maxlength < templength) {
            maxlength = templength
          }
        })
        this.maxWidth = 46 + maxlength * 8
      },
      computePage () {
        this.take = Math.floor(document.getElementById('metas').offsetWidth / (this.maxWidth + metaMarginRgt)) * 2
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
          this.$axios.$post(`/video/${this.id}/playing`)
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

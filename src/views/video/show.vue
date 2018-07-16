<style lang="scss">
  #video-show {
    $meta-height: 30px;
    $meta-margin-bottom: 8px;

    #video-metas {
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;
      min-height: 30px;

      .season-title {
        padding-bottom: 10px;
        margin-left: 10px;
      }
    }

    .video-placeholder {
      height: 600px;
      background-color: #000;
    }

    .video-info {
      margin-top: 70px;
      margin-bottom: 20px;

      .v-share {
        height: 40px;
        float: right;
      }

      .video-report {
        margin-right: 15px;
        margin-top: 2px;
      }
    }

    .col-aside {
      .bangumi-panel {
        float: right;
      }
    }
  }
</style>

<template>
  <div
    id="video-show"
    class="main"
  >
    <v-header/>
    <div class="container">
      <nav>
        <h1
          v-if="bangumi && video"
          class="breadcrumb"
        >
          <a
            :href="$alias.index"
            target="_blank"
          >主站</a>
          <a
            :href="$alias.bangumi(bangumi.id)"
            target="_blank"
            v-text="bangumi.name"
          />
          第{{ video.part }}话&nbsp;{{ video.name }}
        </h1>
      </nav>
      <div id="video-metas">
        <template v-if="season && showAll">
          <div
            v-for="(items, idx) in list"
            :key="idx"
          >
            <h6
              class="season-title"
              v-text="season.name[idx]"
            />
            <v-part
              :list="items.data"
              :alias="$alias.video"
              :is-first="idx === 0"
              :force-all="true"
              :all-data="videos"
              v-model="showAll"
            >
              <template slot-scope="{ item }">
                <span>{{ item.part - items.base }}</span>{{ item.name }}
              </template>
            </v-part>
          </div>
        </template>
        <v-part
          v-else
          :list="videos"
          :all-data="videos"
          :alias="$alias.video"
          v-model="showAll"
        >
          <template slot-scope="{ item }">
            <span>{{ item.part }}</span>{{ item.name }}
          </template>
        </v-part>
      </div>
      <no-ssr class="video-placeholder">
        <v-video
          :source="computeVideoSrc"
          :other-src="useOtherSiteSource"
          :video="`${bangumi.name} 第 ${video.part} 话 ${video.name}`"
          :poster="$resize(video.poster)"
          :next="nextPartVideo"
          @playing="handlePlaying"
        />
      </no-ssr>
      <div class="video-info">
        <v-share type="panel"/>
        <el-button
          type="warning"
          size="medium"
          class="video-report"
          round
          @click="handleVideoReportClick"
        >资源报错</el-button>
      </div>
      <div class="clearfix">
        <div class="col-aside">
          <v-bangumi-panel
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
            :followed="bangumi.followed"
            class="bangumi-panel"
            @follow="handleFollowAction"
          />
        </div>
        <div class="col-main">
          <comment-main
            :id="id"
            :master-id="video.user_id"
            type="video"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoApi from '~/api/videoApi'
  import vVideo from '~/components/Video'
  import vPart from '~/components/lists/Parts'
  import CommentMain from '~/components/comments/CommentMain'

  export default {
    name: 'VideoShow',
    head () {
      return {
        title: `${this.bangumi.name} : 第${this.video.part}话 ${this.video.name} - 视频`,
        meta: [
          { hid: 'description', name: 'description', content: this.bangumi.summary },
          { hid: 'keywords', name: 'keywords', content: `${this.bangumi.name}，第${this.video.part}话，${this.video.name}，在线观看 动画片大全 动漫在线播放 日本动漫 好看的动漫 二次元网站` }
        ]
      }
    },
    components: {
      vVideo,
      vPart,
      CommentMain
    },
    async asyncData ({ route, store, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('video/getShow', { id, ctx }),
        store.dispatch('comment/getMainComments', {
          ctx,
          id,
          type: 'video',
          seeReplyId: route.query.reply
        })
      ])
    },
    data () {
      return {
        showAll: false,
        firstPlay: true
      }
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
      season () {
        return this.$store.state.video.season
      },
      nextPartVideo () {
        let nextId = 0
        this.videos.forEach((video, index) => {
          if (video.id === this.id && index !== this.videos.length - 1) {
            nextId = this.videos[index + 1].id
          }
        })
        return nextId ? this.$alias.video(nextId) : ''
      },
      useOtherSiteSource () {
        if (this.bangumi.others_site_video) {
          return true
        }
        const resource = this.video.resource
        if (!resource) {
          return true
        }
        return !((
          resource.video[720] && resource.video[720].src
        ) || (
          resource.video[1080] && resource.video[1080].src
        ))
      },
      computeVideoSrc () {
        const video = this.video
        return this.useOtherSiteSource
          ? video.url
          : video.resource
            ? (
              video.resource.video[720] && video.resource.video[720].src
            ) || (
              video.resource.video[1080] && video.resource.video[1080].src
            ) || video.url
            : video.url
      }
    },
    mounted () {
      this.$channel.$on('get-page-bangumi-for-post-create', () => {
        this.$channel.$emit('set-page-bangumi-for-post-create', {
          id: this.bangumi.id,
          name: this.bangumi.name,
          avatar: this.bangumi.avatar
        })
      })
    },
    methods: {
      handlePlaying () {
        if (this.firstPlay) {
          this.firstPlay = false
          const api = new VideoApi(this)
          api.playing(this.id)
        }
      },
      handleVideoReportClick () {
        this.$channel.$emit('open-feedback', {
          type: 4,
          desc: `【PC】-《${this.bangumi.name}》视频有错误，视频 id：${this.id}：错误详情为：`
        })
      },
      handleFollowAction (result) {
        this.$store.commit('video/FOLLOW_ALBUM_BANGUMI', { result })
      }
    }
  }
</script>

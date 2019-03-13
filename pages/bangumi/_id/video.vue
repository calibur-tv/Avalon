<template>
  <div id="bangumi-video-flow">
    <el-alert
      v-if="bangumi.is_leader || bangumi.is_master"
      type="info"
      title=""
      style="margin-bottom:15px"
    >
      版主和代行者有权限上传百度云资源的视频，请勿引用包含广告的资源，违者抹杀（笑&nbsp;
      <el-button
        type="primary"
        size="mini"
        plain
        round
        @click="openCreateDialog"
      >
        添加视频
      </el-button>
    </el-alert>
    <section v-if="source.total">
      <div v-if="source.has_season">
        <div v-for="season in source.videos" :key="season.name">
          <h3 class="celltitle" v-text="season.name" />
          <ul>
            <video-flow-item
              v-for="video in season.data"
              :key="video.id"
              :item="video"
              :bangumi-id="id"
            />
          </ul>
        </div>
      </div>
      <ul v-else>
        <video-flow-item
          v-for="video in source.videos[0].data"
          :key="video.id"
          :item="video"
          :bangumi-id="id"
        />
      </ul>
    </section>
    <v-dialog v-model="showDialog" :footer="false" title="新建视频">
      <edit-video-form :bangumi-id="id" :season="computedSeason" />
    </v-dialog>
  </div>
</template>

<script>
import { getBangumiVideos } from '~/api/bangumiApi'
import VideoFlowItem from '~/components/flow/item/VideoFlowItem'
import EditVideoForm from '~/components/bangumi/EditVideoForm'

export default {
  name: 'BangumiVideo',
  components: {
    EditVideoForm,
    VideoFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      source: null,
      showDialog: false
    }
  },
  computed: {
    computedSeason() {
      const result = this.source.season.map(_ => _)
      this.source.videos.forEach((videos, index) => {
        const lastVideo = videos.data[videos.data.length - 1]
        result[index].last_part = lastVideo ? +lastVideo.episode + 1 : 0
      })
      return result
    },
    bangumi() {
      return this.$store.state.bangumi.show
    }
  },
  asyncData({ params, app, error }) {
    return getBangumiVideos(app, {
      id: params.id
    })
      .then(source => {
        return { source }
      })
      .catch(e => {
        error({
          statusCode: e.statusCode,
          message: e.message
        })
      })
  },
  methods: {
    openCreateDialog() {
      this.showDialog = true
    }
  }
}
</script>

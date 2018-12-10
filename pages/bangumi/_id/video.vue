<template>
  <div id="bangumi-video-flow">
    <section v-if="source.total">
      <div v-if="source.has_season">
        <div
          v-for="season in source.videos"
          :key="season.name"
        >
          <h3
            class="celltitle"
            v-text="season.name"
          />
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
  </div>
</template>

<script>
import { getBangumiVideos } from '~/api/bangumiApi'
import VideoFlowItem from '~/components/flow/item/VideoFlowItem'

export default {
  name: 'BangumiVideo',
  asyncData({ params, app, error }) {
    return getBangumiVideos(app, {
      id: params.id
    })
      .then(source => {
        return { source }
      })
      .catch(error)
  },
  components: {
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
      source: null
    }
  }
}
</script>

<template>
  <div
    v-if="source"
    id="image-flow-list"
  >
    <image-waterfall-flow
      v-if="source.list.length"
      :list="source.list"
      :no-more="source.noMore"
      :loading="source.loading"
      :bangumi-id="bangumiId"
      :user-zone="userZone"
      :width="190"
      @load="loadMore"
    />
    <no-content v-if="source.nothing">
      <el-button
        v-if="showNoContentTips"
        type="primary"
        round
        @click="openUploadImageModal"
      >{{ userZone ? '上传第一张图片' : '上传《' + bangumiName + '》的第一张图片' }}</el-button>
    </no-content>
  </div>
</template>

<script>
import flowMixin from './_flowListMixin'
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'ImageFlowList',
  components: {
    ImageWaterfallFlow
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: 'image'
    }
  },
  methods: {
    openUploadImageModal() {
      this.$channel.$emit('show-upload-image-modal')
    }
  }
}
</script>

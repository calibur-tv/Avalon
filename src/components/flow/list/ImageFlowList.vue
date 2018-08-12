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
    <no-content v-if="!source.list.length && !source.loading && source.noMore">
      <el-button
        v-if="showTips"
        type="primary"
        round
        @click="openUploadImageModal"
      >上传第一张图片</el-button>
    </no-content>
  </div>
</template>

<script>
import flowMixin from "~/mixins/flow";
import PostFlowItem from "../item/PostFlowItem";
import ImageWaterfallFlow from "~/components/image/ImageWaterfallFlow";

export default {
  name: "ImageFlowList",
  components: {
    ImageWaterfallFlow
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: "image"
    };
  },
  computed: {
    showTips() {
      if (this.bangumiId) {
        return true;
      }
      if (
        this.userZone &&
        this.$store.state.user.login &&
        this.$store.state.user.zone === this.userZone
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

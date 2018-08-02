<template>
  <div
    v-if="images"
    id="bangumi-image"
  >
    <image-waterfall-flow
      :list="images.list"
      :no-more="images.noMore"
      :loading="images.loading"
      @load="loadMore"
    />
    <no-content v-if="images.noMore && !images.total">
      <el-button
        type="primary"
        round
        @click="openUploadImageModal"
      >上传《{{ info.name }}》的第一张图片</el-button>
    </no-content>
  </div>
</template>

<script>
import ImageWaterfallFlow from "~/components/image/ImageWaterfallFlow";

export default {
  name: "BangumiImage",
  components: {
    ImageWaterfallFlow
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    },
    images() {
      return this.$store.state.trending.type === "image"
        ? this.$store.state.trending.active
        : null;
    }
  },
  mounted() {
    this.$channel.$on("bangumi-tab-switch-image", () => {
      this.getData();
    });
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("trending/getTrending", {
          type: "image",
          sort: "active",
          ctx: this,
          bangumiId: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      }
    },
    async loadMore() {
      try {
        await this.$store.dispatch("trending/loadMore", {
          type: "image",
          sort: "active",
          ctx: this,
          bangumiId: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      }
    },
    openUploadImageModal() {
      this.$channel.$emit("show-upload-image-modal");
    }
  }
};
</script>

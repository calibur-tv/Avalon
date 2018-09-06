<template>
  <image-flow-list
    :bangumi-id="id"
    :bangumi-name="info.name"
  />
</template>

<script>
import ImageFlowList from "~/components/flow/list/ImageFlowList";

export default {
  name: "BangumiImage",
  async asyncData({ store, route, ctx }) {
    await store.dispatch("flow/initData", {
      type: "image",
      sort: "active",
      bangumiId: route.params.id,
      ctx
    });
  },
  components: {
    ImageFlowList
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    info() {
      return this.$store.state.bangumi.info;
    }
  }
};
</script>

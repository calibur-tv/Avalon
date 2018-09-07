<template>
  <image-flow-list :user-zone="zone"/>
</template>

<script>
import ImageFlowList from "~/components/flow/list/ImageFlowList";

export default {
  name: "UserImage",
  async asyncData({ store, route, ctx }) {
    await store.dispatch("flow/initData", {
      type: "image",
      sort: "news",
      userZone: route.params.zone,
      ctx
    });
  },
  components: {
    ImageFlowList
  },
  computed: {
    zone() {
      return this.$route.params.zone;
    }
  }
};
</script>

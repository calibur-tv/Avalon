<template>
  <bangumi-video-flow/>
</template>

<script>
import BangumiVideoFlow from '~/components/bangumi/BangumiVideoFlow'

export default {
  name: 'BangumiVideo',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('bangumi/getVideos', {
      ctx,
      id: route.params.id
    })
  },
  components: {
    BangumiVideoFlow
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    }
  },
  mounted() {
    if (!this.info.has_video) {
      this.$router.replace({
        name: 'bangumi-post'
      })
    }
  }
}
</script>

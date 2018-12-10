<template>
  <bangumi-cartoon-flow/>
</template>

<script>
import BangumiCartoonFlow from '~/components/bangumi/BangumiCartoonFlow'

export default {
  name: 'BangumiCartoon',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('bangumi/getCartoons', {
      ctx,
      bangumiId: route.params.id,
      init: true
    })
  },
  components: {
    BangumiCartoonFlow
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    }
  },
  mounted() {
    if (!this.info.has_cartoon) {
      this.$router.replace({
        name: 'bangumi-post'
      })
    }
  }
}
</script>

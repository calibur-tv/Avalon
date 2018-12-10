<template>
  <score-flow-list :user-zone="zone"/>
</template>

<script>
import ScoreFlowList from '~/components/flow/list/ScoreFlowList'

export default {
  name: 'UserScore',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('flow/initData', {
      type: 'score',
      sort: 'news',
      userZone: route.params.zone,
      ctx
    })
  },
  components: {
    ScoreFlowList
  },
  computed: {
    zone() {
      return this.$route.params.zone
    }
  }
}
</script>

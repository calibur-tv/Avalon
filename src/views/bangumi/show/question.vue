<template>
  <question-flow-list
    :bangumi-id="id"
    :bangumi-name="info.name"
  />
</template>

<script>
import QuestionFlowList from '~/components/flow/list/QuestionFlowList'

export default {
  name: 'BangumiQuestion',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('flow/initData', {
      type: 'question',
      sort: 'active',
      bangumiId: route.params.id,
      ctx
    })
  },
  components: {
    QuestionFlowList
  },
  computed: {
    id() {
      return +this.$route.params.id
    },
    info() {
      return this.$store.state.bangumi.info
    }
  }
}
</script>

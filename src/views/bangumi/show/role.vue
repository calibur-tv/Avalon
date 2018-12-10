<template>
  <cartoon-role-flow-list
    v-if="info"
    :bangumi-id="info.id"
    :bangumi-name="info.name"
  />
</template>

<script>
import CartoonRoleFlowList from '~/components/flow/list/CartoonRoleFlowList'

export default {
  name: 'BangumiCartoonRole',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('flow/initData', {
      type: 'role',
      sort: 'hot',
      bangumiId: route.params.id,
      ctx
    })
  },
  components: {
    CartoonRoleFlowList
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    }
  }
}
</script>

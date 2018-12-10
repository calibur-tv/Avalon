<template>
  <cartoon-role-flow-list :user-zone="zone"/>
</template>

<script>
import CartoonRoleFlowList from '~/components/flow/list/CartoonRoleFlowList'

export default {
  name: 'UserCartoonRole',
  async asyncData({ store, route, ctx }) {
    await store.dispatch('flow/initData', {
      type: 'role',
      sort: 'news',
      userZone: route.params.zone,
      ctx
    })
  },
  components: {
    CartoonRoleFlowList
  },
  computed: {
    zone() {
      return this.$route.params.zone
    }
  }
}
</script>

<template>
  <flow-list
    :id="user.zone"
    func="getUserRole"
    type="page"
    sort="news"
  >
    <ul slot-scope="{ flow }">
      <cartoon-role-flow-item
        v-for="item in flow"
        :key="item.id"
        :item="item"
        :user-zone="user.zone"
      />
    </ul>
  </flow-list>
</template>

<script>
import CartoonRoleFlowItem from '~/components/flow/item/CartoonRoleFlowItem'

export default {
  name: 'UserCartoonRole',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserRole',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  },
  components: {
    CartoonRoleFlowItem
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  }
}
</script>

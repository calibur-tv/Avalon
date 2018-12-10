<template>
  <flow-list
    :id="id"
    func="getBangumiRole"
    type="seenIds"
    sort="hot"
  >
    <ul slot-scope="{ flow }">
      <cartoon-role-flow-item
        v-for="item in flow"
        :key="item.id"
        :item="item"
        :bangumi-id="id"
      />
    </ul>
  </flow-list>
</template>

<script>
import CartoonRoleFlowItem from '~/components/flow/item/CartoonRoleFlowItem'

export default {
  name: 'BangumiCartoonRole',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getBangumiRole',
      type: 'seenIds',
      sort: 'hot',
      id: params.id
    })
  },
  components: {
    CartoonRoleFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>

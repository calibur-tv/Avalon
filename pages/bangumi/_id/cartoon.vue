<template>
  <div id="bangumi-cartoon-flow">
    <flow-list
      :id="id"
      func="getBangumiCartoon"
      type="page"
      sort="asc"
    >
      <ul slot-scope="{ flow }">
        <cartoon-flow-item
          v-for="item in flow"
          :key="item.id"
          :bangumi-id="id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import CartoonFlowItem from '~/components/flow/item/CartoonFlowItem'

export default {
  name: 'BangumiCartoonFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiCartoon',
      type: 'page',
      sort: 'asc'
    })
  },
  components: {
    CartoonFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>

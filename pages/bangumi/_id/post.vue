<template>
  <div id="bangumi-post-flow">
    <flow-list
      :id="id"
      func="getBangumiPost"
      type="seenIds"
      sort="active"
    >
      <ul slot-scope="{ flow }">
        <post-flow-item
          v-for="item in computeFlow(flow)"
          :key="item.id"
          :bangumi-id="id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import PostFlowItem from '~/components/flow/item/PostFlowItem'
import { getTopicPosts } from '~/api/bangumiApi'

export default {
  name: 'BangumiPostFlow',
  async asyncData({ app, params }) {
    const topic = await getTopicPosts(app, {
      id: params.id
    })
    return { topic }
  },
  async fetch({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiPost',
      type: 'seenIds',
      sort: 'active'
    })
  },
  components: {
    PostFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      topic: []
    }
  },
  methods: {
    computeFlow(flow) {
      return this.topic.concat(flow)
    }
  }
}
</script>

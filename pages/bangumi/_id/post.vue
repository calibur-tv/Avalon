<template>
  <div id="bangumi-post-flow">
    <flow-list :id="id" func="getBangumiPost" type="seenIds" sort="active">
      <ul slot-scope="{ flow }">
        <post-flow-item
          v-for="item in computeFlow(flow)"
          :key="item.id"
          :bangumi-id="id"
          :item="item"
        />
      </ul>
      <no-content slot="nothing">
        <el-button :round="true" type="primary"
                   @click="handlePostClick"
        >
          发表《{{ bangumi.name }}》的第一个帖子
        </el-button>
      </no-content>
    </flow-list>
  </div>
</template>

<script>
import PostFlowItem from '~/components/flow/item/PostFlowItem'
import { getTopicPosts } from '~/api/bangumiApi'

export default {
  name: 'BangumiPostFlow',
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
  computed: {
    bangumi() {
      return this.$store.state.bangumi.show
    }
  },
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
  methods: {
    computeFlow(flow) {
      return this.topic.concat(flow)
    },
    handlePostClick() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.$channel.$emit('show-create-post-modal', {
        bangumiId: this.id
      })
    }
  }
}
</script>

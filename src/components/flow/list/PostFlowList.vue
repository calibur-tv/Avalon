<template>
  <div
    v-if="source"
    id="post-flow-list"
  >
    <ul>
      <post-flow-item
        v-for="item in postList"
        :key="item.id"
        :item="item"
        :bangumi-id="bangumiId"
        :user-zone="userZone"
      />
    </ul>
    <no-content v-if="source.nothing && !postList.length">
      <el-button
        v-if="showNoContentTips"
        type="primary"
        round
        @click="openCreatePostModal"
      >{{ userZone ? '发表第一篇帖子' : '发表《' + bangumiName + '》的第一篇帖子' }}</el-button>
    </no-content>
    <load-more-btn
      v-else
      :no-more="source.noMore"
      :loading="source.loading"
      :auto="true"
      @fetch="loadMore"
    />
  </div>
</template>

<script>
import flowMixin from './_flowListMixin'
import PostFlowItem from '../item/PostFlowItem'

export default {
  name: 'PostFlowList',
  components: {
    PostFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: 'post'
    }
  },
  computed: {
    topPosts() {
      return this.$store.state.bangumi.topPosts
    },
    postList() {
      if (!this.bangumiId) {
        return this.source.list
      }
      return this.source
        ? this.topPosts.concat(this.source.list)
        : this.topPosts
    }
  },
  methods: {
    openCreatePostModal() {
      this.$channel.$emit('show-create-post-modal')
    }
  }
}
</script>

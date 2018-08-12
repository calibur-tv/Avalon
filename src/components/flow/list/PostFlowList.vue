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
    <el-button
      v-if="!source.noMore"
      :loading="source.loading"
      class="load-more-btn"
      type="info"
      plain
      @click="loadMore"
    >{{ source.loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
import flowMixin from "~/mixins/flow";
import PostFlowItem from "../item/PostFlowItem";

export default {
  name: "PostFlowList",
  components: {
    PostFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: "post"
    };
  },
  computed: {
    topPosts() {
      return this.$store.state.bangumi.topPosts;
    },
    postList() {
      if (!this.bangumiId) {
        return this.source.list;
      }
      return this.source
        ? this.topPosts.concat(this.source.list)
        : this.topPosts;
    }
  }
};
</script>

<template>
  <div
    v-if="source"
    id="score-flow-list"
  >
    <ul>
      <score-flow-item
        v-for="item in source.list"
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
import ScoreFlowItem from "../item/ScoreFlowItem";

export default {
  name: "ScoreFlowList",
  components: {
    ScoreFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: "score"
    };
  }
};
</script>

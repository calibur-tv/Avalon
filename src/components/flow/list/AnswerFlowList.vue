<style lang="scss">
#answer-flow-list {
  .load-more-btn {
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
    border: none;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    border-radius: 2px;
  }
}
</style>

<template>
  <div
    v-if="source"
    id="answer-flow-list"
  >
    <ul>
      <answer-flow-item
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
      @click="loadMore"
    >{{ source.loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
import flowMixin from "./_flowListMixin";
import AnswerFlowItem from "../item/AnswerFlowItem";

export default {
  name: "AnswerFlowList",
  components: {
    AnswerFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: "answer"
    };
  }
};
</script>

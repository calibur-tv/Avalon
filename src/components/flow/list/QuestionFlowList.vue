<template>
  <div
    v-if="source"
    id="question-flow-list"
  >
    <ul>
      <question-flow-item
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
    <no-content v-if="source.nothing">
      <a
        v-if="bangumiId"
        :href="`${$alias.createScore}?bid=${bangumiId}`"
        target="_blank"
      >
        <el-button
          type="primary"
          round
        >写下《{{ bangumiName }}》的第一篇漫评</el-button>
      </a>
      <a
        v-else-if="isMe"
        :href="$alias.createScore"
        target="_blank"
      >
        <el-button
          type="primary"
          round
        >发表第一篇漫评</el-button>
      </a>
    </no-content>
  </div>
</template>

<script>
import flowMixin from "./_flowListMixin";
import QuestionFlowItem from "../item/QuestionFlowItem";

export default {
  name: "QuestionFlowList",
  components: {
    QuestionFlowItem
  },
  mixins: [flowMixin],
  data() {
    return {
      flowType: "question"
    };
  }
};
</script>

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
      <el-button
        v-if="bangumiId"
        type="primary"
        round
        @click="openCreateQAQModal"
      >我有《{{ bangumiName }}》的一些疑问</el-button>
      <a
        v-else-if="isMe"
        :href="$alias.world('qaq')"
        target="_blank"
      >
        <el-button
          type="primary"
          round
        >查看问题列表</el-button>
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
  },
  methods: {
    openCreateQAQModal() {
      this.$channel.$emit("show-create-question-modal");
    }
  }
};
</script>

<style lang="scss">
#user-qa-flow-list {
  .el-radio-group {
    margin-left: 0 !important;
    margin-top: 6px;
  }
}
</style>

<template>
  <div id="user-qa-flow-list">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="提问"/>
        <el-radio-button label="回答"/>
      </el-radio-group>
    </div>
    <question-flow-list
      v-if="active === '提问'"
      :user-zone="userZone"
    />
    <div v-else>
      <question-flow-item
        v-for="item in answerList"
        :key="item.id"
        :item="item"
      />
      <el-button
        v-if="!noMoreAnswer"
        :loading="loadingAnswer"
        class="load-more-btn"
        type="info"
        plain
        @click="getUserAnswers(false)"
      >{{ loadingAnswer ? '加载中' : '加载更多' }}</el-button>
      <no-content v-if="!answerList.length && noMoreAnswer && !loadingAnswer"/>
    </div>
  </div>
</template>

<script>
import QuestionFlowList from "~/components/flow/list/QuestionFlowList";
import QuestionFlowItem from "~/components/flow/item/QuestionFlowItem";
import Api from "~/api/flowApi";

export default {
  name: "UserQaFlowList",
  components: {
    QuestionFlowList,
    QuestionFlowItem
  },
  props: {
    userZone: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      active: "提问",
      answerList: [],
      loadingAnswer: false,
      fetchedAnswer: false,
      noMoreAnswer: false,
      page: 0
    };
  },
  methods: {
    handleTabSwitch(label) {
      if (label === "回答") {
        this.getUserAnswers(true);
      }
    },
    async getUserAnswers(init = false) {
      if (init && this.fetchedAnswer) {
        return;
      }
      if (this.loadingAnswer) {
        return;
      }
      this.loadingAnswer = true;
      const api = new Api(this);
      try {
        const data = await api.fetch({
          sort: "news",
          type: "answer",
          take: 10,
          page: this.page,
          minId: 0,
          seenIds: "",
          bangumiId: 0,
          userZone: this.userZone
        });
        this.fetchedAnswer = true;
        this.answerList = this.answerList.concat(data.list);
        this.noMoreAnswer = data.noMore;
        this.page++;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loadingAnswer = false;
      }
    }
  }
};
</script>

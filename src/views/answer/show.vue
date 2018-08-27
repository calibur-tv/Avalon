<style lang="scss">
#answer-show {
  background-color: #f6f6f6;

  .answer {
    position: relative;
    margin-left: 15px;
  }

  .read-all-btn {
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
  <div id="answer-show">
    <v-header
      type="pure"
      margin-bottom="0"
    />
    <question-panel/>
    <v-layout>
      <template slot="main">
        <div
          v-if="answer"
          class="answer"
        >
          <a
            :href="$alias.question(qaq.id)"
            target="_blank"
          >
            <el-button
              v-if="qaq.answer_count > 1"
              class="read-all-btn"
            >查看全部 {{ qaq.answer_count }} 个回答</el-button>
          </a>
          <answer-flow-item :item="answer"/>
          <a
            :href="$alias.question(qaq.id)"
            target="_blank"
          >
            <el-button
              v-if="qaq.answer_count > 1"
              class="read-all-btn"
            >查看全部 {{ qaq.answer_count }} 个回答</el-button>
          </a>
        </div>
        <no-content v-else>
          <a
            v-if="qaq.answer_count"
            :href="$alias.question(qaq.id)"
          >
            <el-button
              type="primary"
              round
            >这个答案在审核中或已被删除，查看其它答案</el-button>
          </a>
        </no-content>
      </template>
    </v-layout>
  </div>
</template>

<script>
import QuestionPanel from "~/components/question/QuestionPanel";
import AnswerFlowItem from "~/components/flow/item/AnswerFlowItem";

export default {
  name: "AnswerShow",
  async asyncData({ route, store, ctx }) {
    await store.dispatch("question/getAnswer", {
      ctx,
      id: route.params.id
    });
  },
  components: {
    QuestionPanel,
    AnswerFlowItem
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    qaq() {
      return this.$store.state.question.qaq;
    },
    answer() {
      return this.$store.state.question.answers.list[0];
    }
  }
};
</script>

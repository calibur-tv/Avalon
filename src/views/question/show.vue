<style lang="scss">
#question-show {
  background-color: #f6f6f6;

  .answers {
    margin-left: 15px;

    .answers-title {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #f6f6f6;
      background-color: #fff;
      box-shadow: 0 -1px 3px rgba(26, 26, 26, 0.1);

      h2 {
        font-weight: 600;
        font-size: 15px;
      }
    }
  }

  #no-content {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div id="question-show">
    <v-header
      type="pure"
      margin-bottom="0"
    />
    <question-panel/>
    <v-layout>
      <template slot="main">
        <div
          v-if="qaq.answer_count"
          class="answers"
        >
          <div class="answers-title">
            <h2>
              {{ qaq.answer_count }} 个回答
            </h2>
          </div>
          <answer-flow-list
            :bangumi-id="id"
          />
        </div>
        <no-content v-else>
          <el-button
            type="primary"
            round
            @click="showCreateAnswerForm = true"
          >开始写第一个回答</el-button>
        </no-content>
      </template>
    </v-layout>
  </div>
</template>

<script>
import AnswerFlowList from "~/components/flow/list/AnswerFlowList";
import QuestionPanel from "~/components/question/QuestionPanel";

export default {
  name: "QuestionShow",
  async asyncData({ store, route, ctx }) {
    const id = route.params.id;
    await Promise.all([
      store.dispatch("question/getQAQ", {
        id,
        ctx
      }),
      store.dispatch("flow/getData", {
        type: "answer",
        sort: "active",
        bangumiId: id,
        ctx
      })
    ]);
  },
  head() {
    return {
      title: `${this.qaq.title} - 提问`
    };
  },
  components: {
    AnswerFlowList,
    QuestionPanel
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    qaq() {
      return this.$store.state.question.qaq;
    }
  }
};
</script>

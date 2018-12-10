<style lang="scss">
#answer-show {
  background-color: $color-gray-light;
  margin-bottom: -40px;

  .answer {
    position: relative;
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
      <div
        v-if="answer"
        class="answer"
      >
        <a :href="$alias.question(qaq.id)">
          <el-button
            v-if="qaq.answer_count > 1"
            class="read-all-btn"
          >查看全部 {{ qaq.answer_count }} 个回答</el-button>
          <el-button
            v-else
            class="read-all-btn"
          >查看问题</el-button>
        </a>
        <answer-flow-item :item="answer"/>
        <a :href="$alias.question(qaq.id)">
          <el-button
            v-if="qaq.answer_count > 1"
            class="read-all-btn"
          >查看全部 {{ qaq.answer_count }} 个回答</el-button>
          <el-button
            v-else
            class="read-all-btn"
          >查看问题</el-button>
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
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import QuestionPanel from '~/components/question/QuestionPanel'
import AnswerFlowItem from '~/components/flow/item/AnswerFlowItem'

export default {
  name: 'AnswerShow',
  async asyncData({ route, store, ctx }) {
    await store.dispatch('question/getAnswer', {
      ctx,
      id: route.params.id
    })
  },
  components: {
    QuestionPanel,
    AnswerFlowItem
  },
  head() {
    return {
      title: `${this.qaq.title} - 回答`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$utils.truncate(
            this.answer ? this.answer.intro : this.qaq.intro
          )
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,回答,天下漫友是一家,${
            this.answer ? this.answer.intro : this.qaq.intro
          }`
        }
      ]
    }
  },
  computed: {
    id() {
      return +this.$route.params.id
    },
    qaq() {
      return this.$store.state.question.qaq
    },
    answer() {
      return this.$store.state.question.answers.list[0]
    }
  }
}
</script>

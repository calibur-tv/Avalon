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
    <question-panel
      :qaq="qaq"
      :answer="answer"
    />
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
        <answer-flow-item
          :item="answer"
          :qaq="qaq"
        />
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
import { getAnswerInfo } from '~/api/answerApi'

export default {
  name: 'AnswerShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ app, store, params, error }) {
    const { id } = params
    return getAnswerInfo(app, { id })
      .then(data => {
        const { question } = data
        store.commit('social/SET_STATE', {
          type: 'question',
          id: question.id,
          data: {
            follow: question.followed,
            follow_users: question.follow_users
          }
        })
        return {
          answer: data.answer,
          qaq: question
        }
      })
      .catch(error)
  },
  components: {
    QuestionPanel,
    AnswerFlowItem
  },
  head() {
    return {
      title: this.qaq.title
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      qaq: null,
      answer: null
    }
  }
}
</script>

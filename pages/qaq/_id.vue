<style lang="scss">
#question-show {
  background-color: $color-gray-light;
  margin-bottom: -40px;

  .answers {
    .answers-title {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid $color-gray-light;
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
    <v-header type="pure" margin-bottom="0" />
    <question-panel :qaq="qaq" />
    <el-alert
      v-if="qaq.deleted_at"
      title="该内容已被删除"
      type="error"
      center
      show-icon
    />
    <v-layout>
      <flow-list
        :id="id"
        func="getQuestionAnswers"
        sort="active"
        type="seenIds"
      >
        <div v-if="qaq.answer_count" slot="header" class="answers">
          <div class="answers-title">
            <h2>{{ qaq.answer_count }} 个回答</h2>
          </div>
        </div>
        <ul slot-scope="{ flow }">
          <answer-flow-item
            v-for="item in flow"
            :key="item.id"
            :item="item"
            :qaq="qaq"
          />
        </ul>
      </flow-list>
      <template slot="aside">
        &nbsp;
      </template>
    </v-layout>
  </div>
</template>

<script>
import QuestionPanel from '~/components/question/QuestionPanel'
import AnswerFlowItem from '~/components/flow/item/AnswerFlowItem'
import { getQuestionInfo } from '~/api/questionApi'

export default {
  name: 'QuestionShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    AnswerFlowItem,
    QuestionPanel
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      qaq: null
    }
  },
  async asyncData({ app, store, params, error }) {
    const { id } = params
    return getQuestionInfo(app, { id })
      .then(qaq => {
        store.commit('social/SET_STATE', {
          type: 'question',
          id: qaq.id,
          data: {
            follow: qaq.followed,
            follow_users: qaq.follow_users
          }
        })
        return { qaq }
      })
      .catch(e => {
        error({
          statusCode: e.statusCode,
          message: e.message
        })
      })
  },
  async fetch({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getQuestionAnswers',
      type: 'seenIds',
      sort: 'active'
    })
  },
  head() {
    return {
      title: this.qaq.title
    }
  }
}
</script>

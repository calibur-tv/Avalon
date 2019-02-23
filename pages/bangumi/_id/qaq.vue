<template>
  <div id="bangumi-question-flow">
    <flow-list :id="id" func="getBangumiQAQ" type="seenIds" sort="active">
      <ul slot-scope="{ flow }">
        <question-flow-item v-for="item in flow" :key="item.id" :item="item" />
      </ul>
      <no-content slot="nothing" />
    </flow-list>
  </div>
</template>

<script>
import QuestionFlowItem from '~/components/flow/item/QuestionFlowItem'

export default {
  name: 'BangumiQuestionFlow',
  components: {
    QuestionFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiQAQ',
      type: 'seenIds',
      sort: 'active'
    })
  }
}
</script>

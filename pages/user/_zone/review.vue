<template>
  <flow-list
    :id="user.zone"
    func="getUserScore"
    type="page"
    sort="news"
  >
    <ul slot-scope="{ flow }">
      <score-flow-item
        v-for="item in flow"
        :key="item.id"
        :item="item"
      />
    </ul>
    <no-content slot="nothing"/>
  </flow-list>
</template>

<script>
import ScoreFlowItem from '~/components/flow/item/ScoreFlowItem'

export default {
  name: 'UserScore',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'getUserScore',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  },
  components: {
    ScoreFlowItem
  },
  computed: {
    user() {
      return this.$store.state.users.show
    }
  }
}
</script>

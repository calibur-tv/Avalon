<template>
  <flow-list
    :id="id"
    func="virtualIdolList"
    type="seenIds"
    sort="bangumi-activity-1"
  >
    <ul slot-scope="{ flow }">
      <virtual-idol-item
        v-for="item in flow"
        :key="item.id"
        :item="item"
        sort="bangumi"
      />
    </ul>
    <no-content slot="nothing">
      <nuxt-link to="/role/trending/register">
        <el-button size="mini">
          为「{{ bangumi.name }}」注册公司
        </el-button>
      </nuxt-link>
    </no-content>
  </flow-list>
</template>

<script>
import VirtualIdolItem from '~/components/idol/VirtualIdolItem'
import FlowList from '~/components/flow/FlowList'

export default {
  name: 'BangumiCartoonRole',
  components: {
    FlowList,
    VirtualIdolItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    bangumi() {
      return this.$store.state.bangumi.show
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      func: 'virtualIdolList',
      type: 'seenIds',
      sort: 'bangumi-activity-1',
      id: params.id
    })
  }
}
</script>

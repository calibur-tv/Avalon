<style lang="scss"></style>

<template>
  <div id="role-trending-product">
    <v-layout>
      <flow-list :id="0" func="getIdolProducts" type="lastId" sort="news">
        <ul slot-scope="{ flow }">
          <post-flow-item
            v-for="item in flow"
            :key="item.id"
            :item="item"
            bangumi-id=""
            user-zone=""
          />
        </ul>
        <no-content slot="nothing">
          <el-button size="mini">
            暂无产品发售
          </el-button>
        </no-content>
      </flow-list>
      <template slot="aside"
>
        &nbsp;
      </template>
    </v-layout>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import PostFlowItem from '~/components/flow/item/PostFlowItem'

export default {
  name: 'RoleTrendingProduct',
  components: {
    FlowList,
    PostFlowItem
  },
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'getIdolProducts',
      type: 'lastId',
      sort: 'news',
      id: 0
    })
  }
}
</script>

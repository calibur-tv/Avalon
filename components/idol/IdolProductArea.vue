<template>
  <div id="idol-product-area">
    <flow-list :id="idolId" func="getIdolProducts" type="lastId" sort="news">
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
          {{ state ? '暂无产品发售' : '未上市公司不能发售产品' }}
        </el-button>
      </no-content>
    </flow-list>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import PostFlowItem from '~/components/flow/item/PostFlowItem'

export default {
  name: 'IdolProductArea',
  components: {
    FlowList,
    PostFlowItem
  },
  props: {
    idolId: {
      type: String,
      required: true
    },
    state: {
      type: Number,
      required: true
    }
  }
}
</script>

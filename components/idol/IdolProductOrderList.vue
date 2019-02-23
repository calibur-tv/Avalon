<template>
  <div class="idol-product-order-list">
    <el-alert
      type="info"
      title="经纪人的采购记录将展示在这里"
    >
      <p>
        经纪人只能采购偶像所属番剧下的原创内容，目前只支持帖子
      </p>
      <p>
        每个内容仅能采购一次，重复采购会更新之前的采购数据，已出售的内容无法采购
      </p>
      <p>
        采购之后，需要作者同意后才会开始生效，作者同意之前，经纪人可取消订单
      </p>
    </el-alert>
    <flow-list :id="idolId" func="getIdolProductOrders" type="page" sort="news">
      <ul slot-scope="{ flow }">
        <idol-order-item v-for="item in flow" :key="item.id" :item="item" />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import IdolOrderItem from '~/components/idol/IdolOrderItem'

export default {
  name: 'IdolProductOrderList',
  components: {
    FlowList,
    IdolOrderItem
  },
  props: {
    idolId: {
      type: String,
      required: true
    }
  }
}
</script>

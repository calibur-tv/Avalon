<style lang="scss"></style>

<template>
  <div class="idol-product-order-list">
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

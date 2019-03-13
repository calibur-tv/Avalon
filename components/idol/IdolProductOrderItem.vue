<style lang="scss">
.idol-product-order-item {
  line-height: 20px;

  a {
    color: $color-blue-normal;
  }

  ul {
    margin-left: 2em;
    margin-top: 10px;
    margin-bottom: 10px;

    li {
      list-style-type: disc;
      margin-bottom: 15px;
      line-height: 30px;
    }
  }
}
</style>

<template>
  <li class="idol-product-order-item">
    <span>{{ status }}</span>
    <span> - 帖子 - </span>
    <a
      :href="$alias.post(item.product.id)"
      target="_blank"
      v-text="item.product.title"
    />
    <ul>
      <li v-for="order in item.orders" :key="order.id">
        <a
          :href="$alias.cartoonRole(order.idol.id)"
          target="_blank"
          v-text="order.idol.name"
        />
        <span>的经纪人</span>
        <a
          :href="$alias.user(order.buyer.zone)"
          target="_blank"
          v-text="order.buyer.nickname"
        />
        <span>发起的购买请求：</span>
        <span>￥{{ order.amount }}的价格，</span>
        <span>{{ order.income_ratio }}%比例分成，</span>
        <span>创建时间：{{ order.created_at }}</span>
        <span v-if="order.result === 1 || order.result === 2"
          >，处理时间：{{ order.updated_at }}</span
        >
        <template v-if="order.result === 0">
          <el-button size="mini" type="primary"
@click="resolveOrder(order.id)"
>
            同意
          </el-button>
          <el-button size="mini" type="danger"
@click="rejectOrder(order.id)"
>
            拒绝
          </el-button>
        </template>
        <el-tag v-else :type="computeTagColor(order.result)" size="mini">
          {{ computedOrderResult(order.result) }}
        </el-tag>
      </li>
    </ul>
  </li>
</template>

<script>
import { checkOrder } from '~/api/cartoonRoleApi'
import { Tag } from 'element-ui'

export default {
  name: 'IdolProductOrderItem',
  components: {
    'el-tag': Tag
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    status() {
      const orders = this.item.orders
      if (orders.some(_ => _.result === 0)) {
        return `【待确认${orders.filter(_ => _.result === 0).length}条】`
      }
      if (orders.some(_ => _.result === 1)) {
        return `【已成交】`
      }
      return '【未知】'
    }
  },
  methods: {
    computeTagColor(result) {
      if (result === 0) {
        return ''
      } else if (result === 1) {
        return 'success'
      } else if (result === 2) {
        return 'danger'
      } else if (result === 3) {
        return 'info'
      } else if (result === 4) {
        return 'warning'
      } else if (result === 5) {
        return 'info'
      }
      return ''
    },
    computedOrderResult(result) {
      if (result === 0) {
        return '待确认'
      } else if (result === 1) {
        return '已同意'
      } else if (result === 2) {
        return '已拒绝'
      } else if (result === 3) {
        return '订单取消'
      } else if (result === 4) {
        return '已售出'
      } else if (result === 5) {
        return '已失效'
      }
      return '未知'
    },
    resolveOrder(order_id) {
      this.$confirm('确认后无法修改，确认吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await checkOrder(this, {
              order_id,
              result: 1
            })
            this.refreshList()
            this.$toast.success('交易已达成')
          } catch (e) {
            // do nothing
          }
        })
        .catch(() => {})
    },
    async rejectOrder(order_id) {
      try {
        await checkOrder(this, {
          order_id,
          result: 2
        })
        this.refreshList()
        this.$toast.success('已确认')
      } catch (e) {
        // do nothing
      }
    },
    refreshList() {
      this.$store.dispatch('flow/initData', {
        func: 'getUserProductOrders',
        type: 'page',
        sort: 'news',
        refresh: true
      })
    }
  }
}
</script>

<style lang="scss">
.idol-order-item {
  line-height: 40px;
  padding: 10px 0;
  border-bottom: 1px solid $color-gray-light;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

  a {
    color: $color-blue-normal;
  }
}
</style>

<template>
  <li class="idol-order-item">
    <a :href="$alias.user(item.buyer.zone)" target="_blank">
      <img :src="$resize(item.buyer.avatar, { width: 80 })" />
      <span v-text="item.buyer.nickname" />
    </a>
    <span>采购了</span>
    <a :href="$alias.user(item.author.zone)" target="_blank">
      <span v-text="item.author.nickname" />
    </a>
    <span>的帖子</span>
    <a
      :href="$alias.post(item.product.id)"
      target="_blank"
      v-text="item.product.title"
    />
    <div>
      <span>价格：￥{{ item.amount }}</span>
      <span>，分成：{{ item.income_ratio }}%</span>
      <span
        >，状态：<el-tag size="mini" :type="computeTagColor">{{
          computedResult
        }}</el-tag></span
      >
      <span>，时间：{{ item.created_at }}</span>
      <el-button
        v-if="canDelete"
        :loading="loading"
        size="mini"
        @click="cancelOrder(item.id)"
      >
        取消订单
      </el-button>
    </div>
  </li>
</template>

<script>
import { deleteOrder } from '~/api/cartoonRoleApi'
import { Tag } from 'element-ui'

export default {
  name: 'IdolOrderItem',
  components: {
    'el-tag': Tag
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      state: this.item.result
    }
  },
  computed: {
    canDelete() {
      if (!this.$store.state.login) {
        return false
      }
      return (
        this.state === 0 && this.$store.state.user.zone === this.item.buyer.zone
      )
    },
    computeTagColor() {
      const result = this.state
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
    computedResult() {
      const result = this.state
      if (result === 0) {
        return '等待作者确认'
      } else if (result === 1) {
        return '已采购成功'
      } else if (result === 2) {
        return '作者已拒绝'
      } else if (result === 3) {
        return '订单已取消'
      } else if (result === 4) {
        return '作品已出售'
      } else if (result === 5) {
        return '作品已失效'
      }
      return '未知状态'
    }
  },
  methods: {
    cancelOrder(order_id) {
      if (this.loading) {
        return
      }
      this.$confirm('确认执行该操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = true
            await deleteOrder(this, { order_id })
            this.$toast.success('订单已取消')
            this.state = 3
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.loading = false
          }
        })
        .catch()
    }
  }
}
</script>

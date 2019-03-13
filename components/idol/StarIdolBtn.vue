<style lang="scss" module>
.wrap {
  display: inline-block;
}

.cartoon-role-btn {
  width: 80px;
  height: 32px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  background-color: #f25d8e;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
  color: #fff;

  &.locked {
    background-color: $color-dark-light;
    box-shadow: 0 4px 4px rgba($color-dark-light, 0.3);

    &:hover {
      background-color: $color-gray-deep;
    }
  }

  &:hover {
    background-color: #ff709f;
  }
}
</style>

<template>
  <span :class="$style.wrap">
    <button
      :class="[$style.cartoonRoleBtn, { [$style.locked]: idol.is_locked }]"
      @click="handleStarRole"
    >
      {{ idol.is_locked ? '已停牌' : '入股' }}
    </button>
    <v-dialog
      v-model="showDialog"
      :title="`入股 - ${idol.name}`"
      :loading="submitting"
      width="560px"
      @submit="submit"
    >
      <el-form label-position="top">
        <el-form-item label="当前股价">
          <el-input v-model="price" :disabled="true">
            <template slot="append">虚拟币每股</template>
          </el-input>
        </el-form-item>
        <el-form-item label="购入上限">
          <el-input
            :disabled="true"
            :placeholder="`${parseFloat(maxCount).toFixed(2)}股`"
          />
        </el-form-item>
        <el-form-item label="购入份额">
          <el-input-number
            v-if="signed"
            v-model="count"
            :min="minCount"
            :step="0.01"
            :max="maxCount"
          />
        </el-form-item>
        <el-form-item label="账单计算">
          <div class="pocket">
            <strong>预计支付：</strong><span>{{ needPay }}</span>&nbsp;&nbsp; <strong>购买后钱包余额：</strong><span>{{ parseFloat(pocket - needPay).toFixed(2) }}</span>
          </div>
        </el-form-item>
      </el-form>
    </v-dialog>
  </span>
</template>

<script>
import { starRoleAction } from '~/api/cartoonRoleApi'

export default {
  name: 'CartoonRoleBtn',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    price: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    buyed: {
      type: Number,
      required: true
    },
    idol: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDialog: false,
      submitting: false,
      count: this.idol.company_state ? 0.01 : 1
    }
  },
  computed: {
    signed() {
      return this.$store.state.login
    },
    pocket() {
      if (!this.signed) {
        return 0
      }
      return +this.$store.state.user.pocket
    },
    maxCount() {
      const maxCanBuy =
        !this.idol.max_stock_count || this.idol.max_stock_count === '0.00'
          ? -1
          : this.idol.max_stock_count - this.idol.star_count
      const pocketCanBuy = this.pocket ? this.pocket / this.idol.stock_price : 0
      if (maxCanBuy === -1) {
        return pocketCanBuy
      }
      return Math.min(pocketCanBuy, maxCanBuy)
    },
    minCount() {
      return Math.min(this.idol.company_state ? 0.01 : 1, this.maxCount)
    },
    needPay() {
      return this.count
        ? parseFloat(this.idol.stock_price * this.count).toFixed(2)
        : '0.00'
    }
  },
  methods: {
    async handleStarRole() {
      if (this.idol.is_locked) {
        this.$toast.error('已经停牌了，等待下次挂牌吧')
        return
      }
      if (!this.signed) {
        this.$channel.$emit('sign-in')
        return
      }
      if (!this.pocket) {
        this.$toast.error('团子不足')
        return
      }
      this.showDialog = true
    },
    async submit() {
      if (this.count <= 0) {
        this.$toast.error('未选择份额')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await starRoleAction(this, {
          id: this.id,
          amount: this.count
        })
        this.$store.commit('USE_COIN', this.needPay)
        this.$emit('success', {
          count: this.count,
          amount: this.needPay
        })
        this.showDialog = false
      } catch (e) {
        // do nothing
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

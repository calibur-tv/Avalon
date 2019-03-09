<style lang="scss">
.idol-deal-btn-wrap {
  display: inline-block;

  button {
    width: 80px;
    height: 32px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    background-color: $color-dark-light;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba($color-dark-light, 0.3);
    color: #fff;

    &:hover {
      background-color: $color-gray-deep;
    }
  }
}
</style>

<template>
  <span class="idol-deal-btn-wrap">
    <button @click="handleClick">出售</button>
    <v-dialog
      v-model="showDialog"
      :title="`出售「${name}」的股份`"
      :loading="submitting"
      width="560px"
      @submit="submit"
    >
      <el-alert :closable="false" title="交易建议" type="info">
        <p v-if="locked">当前公开发售的股份已停牌，可高于市场价格出售</p>
        <p v-else>当前仍有股份在公开发售，应该低于公开价格发售</p>
        <p>
          最终交易的总价值不得低于 0.01 个虚拟币，当前市场价：<strong>{{
            price
          }}</strong
          >/股
        </p>
        <p v-if="loaded">
          {{
            deal.id
              ? '检测到当前有正在出售的交易，可对其进行修改'
              : '当前未有正在进行的交易，可新建一个交易'
          }}
        </p>
      </el-alert>
      <el-form label-position="top">
        <el-form-item label="出售份额">
          <el-input-number
            v-model="deal.product_count"
            :min="0.01"
            :step="0.01"
            :max="has_star"
          />
        </el-form-item>
        <el-form-item label="出售价格">
          <el-input-number
            v-model="deal.product_price"
            :min="0.01"
            :max="10"
            :step="0.01"
          />
        </el-form-item>
        <p>预计收益：{{ canGetMoney }}（精度为小数点后两位，超出的不计）</p>
      </el-form>
    </v-dialog>
  </span>
</template>

<script>
import { getCartoonRoleDeal, createCartoonRoleDeal } from '~/api/cartoonRoleApi'

export default {
  name: 'IdolDealBtn',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    price: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    locked: {
      type: Boolean,
      default: false
    },
    count: {
      type: String,
      required: true
    },
    state: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showDialog: false,
      submitting: false,
      deal: {
        id: 0,
        idol_id: this.id,
        product_count: 0,
        product_price: 0
      },
      has_star: 0,
      loaded: false
    }
  },
  computed: {
    canGetMoney() {
      return parseFloat(
        this.deal.product_count * this.deal.product_price
      ).toFixed(2)
    }
  },
  methods: {
    handleClick() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.count === '0.00') {
        this.$toast.error('需要先入股')
        return
      }
      if (this.state === 0) {
        this.$toast.error('上市之前不能出售')
        return
      }
      this.getCanExchangeCount()
      this.showDialog = true
    },
    async getCanExchangeCount() {
      const { deal, has_star } = await getCartoonRoleDeal(this, {
        id: this.id
      })
      if (deal) {
        // 去掉已售出的份额
        deal['product_count'] = deal['last_count']
        Object.keys(this.deal).forEach(key => {
          this.deal[key] = deal[key]
        })
      }
      this.has_star = has_star
      this.loaded = true
    },
    async submit() {
      if (this.canGetMoney < 0.01) {
        this.$toast.error('最低收益不能小于 0.01')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await createCartoonRoleDeal(this, this.deal)
        this.$toast.success(
          this.deal.id
            ? '交易修改成功，可到交易所查看'
            : '交易创建成功，可到交易所查看'
        )
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

<template>
  <div id="create-price-market-draft">
    <el-alert
      :closable="false"
      type="info"
      title="发行规则"
      style="margin-bottom:15px"
    >
      <p>每次增发的股份，不能小于 {{ minLevel }} 股</p>
      <p>现阶段，不支持以每股价格低于 1.00 或高于 10.00 的价格进行增发</p>
    </el-alert>
    <el-alert
      :closable="false"
      type="info"
      title="当前数据"
      style="margin-bottom:15px"
    >
      <p>当前每股的价格：{{ editStockForm.stock_price }}</p>
      <p>当前总发行股份：{{ editStockForm.max_stock_count || '未设上限' }}</p>
      <p>当前已售出股份：{{ editStockForm.star_count }}</p>
    </el-alert>
    <el-alert
      :closable="false"
      style="margin-bottom:15px"
      title="变更方式"
      type="warning"
    >
      <p>确认之后，将会发布一条公开提案，只要有超过 2/3 的票数表决同意，就会自动增发股票</p>
    </el-alert>
    <el-form label-width="80px">
      <el-form-item
        label="每股股价"
        prop="stock_price"
      >
        <el-input-number
          v-model="editStockForm.new_price"
          :min="1"
          :max="10"
          :step="0.01"
        />
      </el-form-item>
      <el-form-item
        label="增发数额"
        prop="max_stock_count"
      >
        <el-input-number
          v-model="editStockForm.add_stock_count"
          :step="1"
          :min="minLevel"
        />
      </el-form-item>
      <el-form-item>
        <p>最低增发市值：￥{{ minAddPrice }}&nbsp;，当前增发市值：￥{{ curAddPrice }}&nbsp;，增发后总市值：￥{{ totalMarketPrice }}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="submitting"
          type="primary"
          @click="changeIdolStock"
        >提交变更提案</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createMarketPriceDraft } from '~/api/cartoonRoleApi'

export default {
  name: 'CreatePriceMarketDraft',
  props: {
    role: {
      type: Object,
      default: null
    },
    minLevel: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      editStockForm: {
        star_count: this.role.star_count,
        stock_price: +this.role.stock_price,
        max_stock_count: +this.role.max_stock_count,
        market_price: +this.role.market_price,
        new_price: this.role.stock_price,
        add_stock_count: this.minLevel
      },
      submitting: false
    }
  },
  computed: {
    minAddPrice() {
      if (!this.editStockForm) {
        return 0
      }
      let result
      if (this.editStockForm.star_count < 4000) {
        result = this.editStockForm.market_price * 0.25
      } else {
        result = this.editStockForm.market_price * 0.1
      }
      if (result < this.minLevel) {
        return parseFloat(this.minLevel).toFixed(2)
      }
      return parseFloat(result).toFixed(2)
    },
    curAddPrice() {
      if (!this.editStockForm.new_price) {
        return 0
      }
      return parseFloat(
        this.editStockForm.new_price * this.editStockForm.add_stock_count
      ).toFixed(2)
    },
    totalMarketPrice() {
      if (!this.role) {
        return 0
      }
      return parseFloat(+this.role.market_price + +this.curAddPrice).toFixed(2)
    },
    maxStockCount() {
      if (!this.role) {
        return 0
      }
      return +this.role.max_stock_count + this.editStockForm.add_stock_count
    }
  },
  methods: {
    async changeIdolStock() {
      if (!this.curAddPrice) {
        this.$toast.error('请先定价')
        return
      }
      if (this.curAddPrice - this.minAddPrice < 0) {
        this.$toast.error('不能定价太低')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await createMarketPriceDraft(this, {
          idol_id: this.role.id,
          add_stock_count: this.editStockForm.add_stock_count,
          stock_price: this.editStockForm.new_price
        })
        this.$toast.success('修改成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.submitting = false
      }
    }
  }
}
</script>

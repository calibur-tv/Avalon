<style lang="scss">
.buy-content-btn-wrap {
  display: inline-block;

  .buy-content-btn {
    color: $color-text-normal;
  }
}
</style>

<template>
  <span class="buy-content-btn-wrap">
    <button class="buy-content-btn" @click="showBuyModal">
      采购
    </button>
    <v-dialog
      v-model="show"
      :loading="submitting"
      title="内容采购"
      @submit="submitAction"
    >
      <template v-if="idol">
        <p>
          以「{{ idol.name }}」经纪人的身份，采购「{{ author }}」的文章《{{
            title
          }}》
        </p>
        <br />
        <p>当前可用资金：￥{{ idol.income }}</p>
        <div>
          <br />
          <p><strong>采购价格：</strong></p>
          <br />
          <el-input-number
            v-model="price"
            :min="5"
            :max="idol.income > 35 ? 35 : idol.income"
          />
        </div>
        <div>
          <br />
          <p><strong>分成比例：</strong></p>
          <br />
          <p>
            当前默认的分成比例是
            5：5（该文章每收到一次投食，就有0.5个团子赠予偶像，0.5个团子归属作者）
          </p>
        </div>
        <div>
          <br />
          <p><strong>提示：</strong></p>
          <br />
          <p>
            确认采购后，等待作者确认，作者同意后才会扣费，并开始计算偶像的盈利
          </p>
        </div>
      </template>
      <div v-else style="text-align:center">
        <br />
        <br />
        <mt-spinner type="triple-bounce" />
      </div>
    </v-dialog>
  </span>
</template>

<script>
import { getCurrentIdolIncome, createIdolOrder } from '~/api/cartoonRoleApi'
import { Spinner } from 'mint-ui'

export default {
  name: 'BuyContentBtn',
  components: {
    'mt-spinner': Spinner
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      idol: null,
      price: 5,
      submitting: false
    }
  },
  methods: {
    async showBuyModal() {
      this.show = true
      this.idol = await getCurrentIdolIncome(this)
    },
    async submitAction() {
      if (this.price < 5) {
        this.$toast.error('不支持5团子以下的采购')
        return
      }
      if (this.price > this.idol.income) {
        this.$toast.error('没有足够的资金')
        return
      }
      if (this.submitting || !this.idol) {
        return
      }
      this.submitting = true
      try {
        await createIdolOrder(this, {
          product_id: this.id,
          product_type: this.type,
          amount: this.price
        })
        this.show = false
        this.$toast.success('请求已发送，等待作者确认')
      } catch (e) {
        // do nothing
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

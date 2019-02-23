<style lang="scss">
#role-trending-hall {
  .page-header {
    .el-alert--info {
      background-color: $color-gray-normal;
    }

    .badge {
      position: relative;
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      border-radius: 4px;
      text-align: center;
      background-color: $color-gray-normal;
      white-space: nowrap;

      span {
        line-height: 34px;
        font-size: 12px;
        color: $color-text-normal;
      }

      em {
        display: inline-block;
        border-left: 1px solid $color-dark-light;
        height: 10px;
        line-height: 10px;
        margin: 12px 5px 0;
        vertical-align: top;
      }
    }
  }

  .table {
    .idol {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 10px;
      }

      span {
        font-weight: bold;
        @include twoline(20px);
      }
    }

    .user {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-right: 5px;
      }
    }
  }
}
</style>

<template>
  <div id="role-trending-hall">
    <el-row class="page-header">
      <el-col :span="16">
        <el-alert
          :closable="false"
          type="info"
          show-icon
          title="已上市的公司，投资人可以在这里出售自己持有的股份（一周内无人购买的交易会被系统删除）"
        />
      </el-col>
      <el-col :span="6" :offset="2">
        <div v-if="meta" class="badge">
          <span>成交次数：{{ meta.deal_count }}</span>
          <em />
          <span
            >总成交额：￥{{
              parseFloat(meta.exchang_money_count).toFixed(2)
            }}</span
          >
        </div>
      </el-col>
    </el-row>
    <flow-list func="getVirtualIdolDealList" type="seenIds" sort="active">
      <div slot-scope="{ flow }" class="table">
        <el-table :data="flow" stripe style="width: 100%">
          <el-table-column label="交易编号" prop="id" sortable>
            <template slot-scope="scope">
              <span># {{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="偶像" width="200">
            <a
              slot-scope="scope"
              :href="$alias.cartoonRole(scope.row.idol.id)"
              target="_blank"
              class="idol"
            >
              <img :src="$resize(scope.row.idol.avatar, { width: 100 })" />
              <span v-text="scope.row.idol.name" />
            </a>
          </el-table-column>
          <el-table-column label="公司市值" prop="idol.market_price" sortable>
            <template slot-scope="scope">
              <span>￥{{ scope.row.idol.market_price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="每股股价">
            <template slot-scope="scope">
              <span>￥{{ scope.row.idol.stock_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :filters="[
              { text: '已停牌', value: true },
              { text: '挂牌中', value: false }
            ]"
            :filter-method="filterState"
            label="发行股数"
            prop="idol.is_locked"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.idol.star_count }}</div>
              <el-tag v-if="scope.row.idol.is_locked" size="mini" type="danger"
                >已停牌</el-tag
              >
              <el-tag v-else size="mini" type="success">挂牌中</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :filters="[
              { text: '低于市场价', value: -1 },
              { text: '高于市场价', value: 1 },
              { text: '等于市场价', value: 0 }
            ]"
            :filter-method="filterPrice"
            label="出售价格"
            prop="product_price"
          >
            <div slot-scope="scope" class="price">
              <div>￥{{ scope.row.product_price }}</div>
              <el-tag :type="computePriceColor(scope.row)" size="mini">{{
                computePriceText(scope.row)
              }}</el-tag>
            </div>
          </el-table-column>
          <el-table-column label="出售股数">
            <template slot-scope="scope">
              <div>{{ scope.row.product_count }}</div>
              <el-tag size="mini" type="info"
                >占比:{{
                  parseFloat(
                    (scope.row.product_count / scope.row.idol.star_count) * 100
                  ).toFixed(2)
                }}%</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            :filters="[{ text: '有成交额', value: 1 }]"
            :filter-method="filterDeal"
            prop="last_count"
            label="已成交"
          >
            <template slot-scope="scope">
              <span>{{
                parseFloat(
                  scope.row.product_count - scope.row.last_count
                ).toFixed(2)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易人" prop="user.id" sortable>
            <a
              slot-scope="scope"
              :href="$alias.user(scope.row.user.zone)"
              target="_blank"
              class="user"
            >
              <img :src="$resize(scope.row.user.avatar, { width: 60 })" />
              <span class="oneline" v-text="scope.row.user.nickname" />
            </a>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="currentUserId === scope.row.user.id"
                size="small"
                type="danger"
                round
                plain
                @click="deleteMyDeal(scope.row)"
                >终止交易</el-button
              >
              <el-button v-else size="small" round @click="makeADeal(scope.row)"
                >马上交易</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <no-content slot="nothing">
        <nuxt-link to="/role/trending/newbie">
          <el-button size="mini">
            查看融资中的公司
          </el-button>
        </nuxt-link>
        <nuxt-link to="/role/trending/register">
          <el-button size="mini">
            自己注册公司
          </el-button>
        </nuxt-link>
      </no-content>
    </flow-list>
    <v-dialog
      v-if="deal"
      v-model="showDealDialog"
      :title="`购买「${deal.idol.name}」的股份`"
      width="560px"
      @submit="submitDeal"
    >
      <el-alert
        :closable="false"
        type="warning"
        title="每笔交易的金额不得低于0.01"
        style="margin-bottom:10px"
        show-icon
      />
      <el-form label-position="top">
        <el-form-item label="交易信息">
          <p><strong>交易玩家：</strong>{{ deal.user.nickname }}</p>
          <p><strong>交易偶像：</strong>{{ deal.idol.name }}</p>
          <p><strong>每股价格：</strong>{{ deal.product_price }}</p>
        </el-form-item>
        <el-form-item label="购买份额">
          <el-input-number
            v-model="buyCount"
            :step="0.01"
            :min="+minBuyCount"
            :max="+maxBuyCount"
          />
        </el-form-item>
        <el-form-item label="待支付金额">
          <p>最多可购买：{{ maxBuyCount }}股</p>
          <p>需要支付的数额：￥{{ payAmount }}</p>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import { Table, TableColumn, Tag } from 'element-ui'
import {
  makeCartoonRoleDeal,
  deleteCartoonRoleDeal,
  getStockMarketMeta
} from '~/api/cartoonRoleApi'

export default {
  name: 'RoleTrendingHall',
  components: {
    FlowList,
    'el-tag': Tag,
    'el-table': Table,
    'el-table-column': TableColumn
  },
  data() {
    return {
      deal: null,
      showDealDialog: false,
      submitting: false,
      buyCount: 0.01,
      minBuyCount: 0,
      meta: null
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    pocket() {
      if (!this.$store.state.login) {
        return 0
      }
      return +this.$store.state.user.pocket
    },
    maxBuyCount() {
      if (!this.deal) {
        return 0
      }
      const result = parseFloat(this.pocket / this.deal.product_price).toFixed(
        2
      )
      if (result - this.deal.last_count < 0) {
        return result
      }
      return this.deal.last_count
    },
    payAmount() {
      if (!this.deal) {
        return 0
      }
      if (!this.buyCount) {
        return 0
      }
      return parseFloat(this.buyCount * this.deal.product_price).toFixed(2)
    }
  },
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'getVirtualIdolDealList',
      type: 'seenIds',
      sort: 'active'
    })
  },
  head: {
    title: '交易所'
  },
  mounted() {
    this.getMetaInfo()
  },
  methods: {
    async getMetaInfo() {
      this.meta = await getStockMarketMeta(this)
    },
    computePriceText(row) {
      const result = row.product_price - row.idol.stock_price
      if (result > 0) {
        return '高于市场价'
      } else if (result === 0) {
        return '等于市场价'
      }
      return '低于市场价'
    },
    computePriceColor(row) {
      const result = row.product_price - row.idol.stock_price
      if (result > 0) {
        return 'danger'
      } else if (result === 0) {
        return 'info'
      }
      return 'success'
    },
    makeADeal(deal) {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      this.minBuyCount = parseFloat(0.01 / deal.product_price).toFixed(2)
      this.deal = deal
      this.showDealDialog = true
    },
    deleteMyDeal(deal) {
      this.$confirm('确定要终止交易吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteCartoonRoleDeal(this, { id: deal.id })
          this.$toast.success('交易已终止')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
        .catch(e => {
          this.$toast.error(e)
        })
    },
    async submitDeal() {
      if (!this.payAmount) {
        this.$toast.error('未选择份额')
        return
      }
      if (this.pocket < this.payAmount) {
        this.$toast.error('没有足够的虚拟币')
        return
      }
      if (this.submitting) {
        return
      }
      try {
        await makeCartoonRoleDeal(this, {
          deal_id: this.deal.id,
          buy_count: this.buyCount,
          pay_price: this.payAmount
        })
        this.showDealDialog = false
        this.$toast.success('交易成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (err) {
        this.$toast.error(err)
        this.submitting = false
      }
    },
    filterState(value, row) {
      return row.idol.is_locked === value
    },
    filterPrice(value, row) {
      const result = row.product_price - row.idol.stock_price
      if (value === 0) {
        return result === 0
      }
      if (value === 1) {
        return result > 0
      }
      return result < 0
    },
    filterDeal(value, row) {
      return row.product_count !== row.last_count
    }
  }
}
</script>

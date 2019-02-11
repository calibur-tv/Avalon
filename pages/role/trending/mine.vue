<style lang="scss">
#role-trending-mine {
  header {
    margin-bottom: 21px;
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
  }
}
</style>

<template>
  <div id="role-trending-mine">
    <header>
      <el-radio-group
        v-model="selected"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button
          v-for="(item, index) in options"
          :key="index"
          :label="item"
        />
      </el-radio-group>
    </header>
    <flow-list
      v-show="selected === '我入股的公司'"
      :id="userId"
      func="virtualIdolList"
      type="seenIds"
      sort="user-activity-1"
    >
      <ul slot-scope="{ flow }">
        <virtual-idol-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
          sort="mine"
        />
      </ul>
      <no-content slot="nothing">
        <nuxt-link to="/role/trending/newbie">
          <el-button
            size="mini"
          >
            查看融资中的公司
          </el-button>
        </nuxt-link>
        <nuxt-link to="/role/trending/register">
          <el-button
            size="mini"
          >
            自己注册公司
          </el-button>
        </nuxt-link>
      </no-content>
    </flow-list>
    <flow-list
      v-show="selected === '我发起的交易'"
      func="myVirtualIdolDeals"
      type="page"
      sort="mine"
    >
      <div
        slot-scope="{ flow }"
        class="table"
      >
        <el-table
          :data="flow"
          stripe
          style="width: 100%"
        >
          <el-table-column
            label="交易编号"
          >
            <template slot-scope="scope">
              <span># {{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="偶像"
            width="200"
          >
            <a
              slot-scope="scope"
              :href="$alias.cartoonRole(scope.row.idol.id)"
              target="_blank"
              class="idol"
            >
              <img :src="$resize(scope.row.idol.avatar, { width: 100 })">
              <span v-text="scope.row.idol.name"/>
            </a>
          </el-table-column>
          <el-table-column
            label="公司市值"
          >
            <template slot-scope="scope">
              <span>￥{{ scope.row.idol.market_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="每股股价"
          >
            <template slot-scope="scope">
              <span>￥{{ scope.row.idol.stock_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发行股数"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.idol.star_count }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="出售价格"
          >
            <div
              slot-scope="scope"
              class="price"
            >
              <div>￥{{ scope.row.product_price }}</div>
            </div>
          </el-table-column>
          <el-table-column
            label="出售股数"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.product_count }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已成交"
          >
            <template slot-scope="scope">
              <span>{{ parseFloat(scope.row.product_count - scope.row.last_count).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.deleted_at"
                :disabled="true"
                size="small"
                type="info"
                round
                plain
              >交易已终止</el-button>
              <el-button
                v-else
                size="small"
                type="danger"
                round
                plain
                @click="deleteMyDeal(scope.row)"
              >终止交易</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </flow-list>
  </div>
</template>

<script>
import serverAuth from '~/mixins/serverAuth'
import FlowList from '~/components/flow/FlowList'
import VirtualIdolItem from '~/components/idol/VirtualIdolItem'
import { deleteCartoonRoleDeal } from '~/api/cartoonRoleApi'
import { Table, TableColumn, Tag } from 'element-ui'

export default {
  name: 'RoleTrendingMine',
  components: {
    FlowList,
    VirtualIdolItem,
    'el-tag': Tag,
    'el-table': Table,
    'el-table-column': TableColumn
  },
  mixins: [serverAuth],
  data() {
    return {
      selected: '我入股的公司',
      options: ['我入股的公司', '我发起的交易']
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.id
    }
  },
  mounted() {
    this.getMyIdols()
  },
  methods: {
    getMyIdols() {
      this.$store.dispatch('flow/initData', {
        func: 'virtualIdolList',
        type: 'seenIds',
        sort: 'user-activity-1',
        id: this.userId
      })
    },
    getMyDeals() {
      this.$store.dispatch('flow/initData', {
        func: 'myVirtualIdolDeals',
        type: 'page',
        sort: 'mine'
      })
    },
    handleTabSwitch(label) {
      if (label === '我发起的交易') {
        this.getMyDeals()
      }
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
    }
  }
}
</script>

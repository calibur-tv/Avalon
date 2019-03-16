<style lang="scss">
#idol-trending-aside {
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

  .recent-header {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;

    .title {
      font-size: 18px;
    }

    .total {
      font-size: 12px;
    }
  }

  .recent-deal-list {
    .oneline {
      color: #222;
      line-height: 18px;
      margin-top: 15px;

      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: block;
        float: left;
        margin-right: 8px;
      }

      a,
      img,
      span {
        vertical-align: middle;
      }
    }

    .extra {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      font-size: 12px;
      color: $color-text-light;
    }
  }
}
</style>

<template>
  <div id="idol-trending-aside">
    <div class="badge">
      <span>投资人数：{{ meta.buyer_count }}</span>
      <em />
      <span>总交易额：￥{{ parseFloat(meta.money_count).toFixed(2) }}</span>
    </div>
    <flow-list
      :auto="false"
      :show-load-more="false"
      func="getRecentBuyList"
      sort="newest"
      type="page"
    >
      <div slot="header" slot-scope="{ source }" class="recent-header">
        <span class="title">最近入股</span>
        <span v-if="source.total" class="total">
          &nbsp;·&nbsp;共{{ source.total }}笔</span>
      </div>
      <ul slot-scope="{ flow }" class="recent-deal-list">
        <li v-for="(item, index) in flow" :key="index">
          <div class="oneline">
            <a :href="$alias.user(item.user.zone)" target="_blank">
              <img
                :src="$resize(item.user.avatar, { width: 36, height: 36 })"
              >
            </a>
            <span v-text="item.user.nickname" />
            <span>入股了</span>
            <a
              :href="$alias.cartoonRole(item.idol.id)"
              target="_blank"
              v-text="item.idol.name"
            />
          </div>
          <div class="extra">
            <div>
              <span>￥{{ item.price }}</span>
              ·
              <span>{{ item.count }}股</span>
            </div>
            <v-time v-model="item.time" />
          </div>
        </li>
      </ul>
    </flow-list>
    <br>
    <div class="badge">
      <span>成交次数：{{ meta.deal_count }}</span>
      <em />
      <span>总成交额：￥{{ parseFloat(meta.exchang_money_count).toFixed(2) }}</span>
    </div>
    <flow-list
      :auto="false"
      :show-load-more="false"
      func="getRecentDealList"
      sort="newest"
      type="page"
    >
      <div slot="header" slot-scope="{ source }" class="recent-header">
        <span class="title">最近交易</span>
        <span
          v-if="source.total"
          class="total"
        >&nbsp;·&nbsp;共{{ source.total }}笔</span>
      </div>
      <ul slot-scope="{ flow }" class="recent-deal-list">
        <li v-for="(item, index) in flow" :key="index">
          <div class="oneline">
            <a :href="$alias.user(item.buyer.zone)" target="_blank">
              <img
                :src="$resize(item.buyer.avatar, { width: 36, height: 36 })"
              >
            </a>
            <span v-text="item.buyer.nickname" />
            <span>购买了</span>
            <a
              :href="$alias.user(item.dealer.zone)"
              target="_blank"
              v-text="item.dealer.nickname"
            />
            <span>的股票</span>
          </div>
          <div class="extra">
            <div>
              <a
                :href="$alias.cartoonRole(item.idol.id)"
                target="_blank"
                v-text="item.idol.name"
              />
              ·
              <span>￥{{ item.price }}</span>
              ·
              <span>{{ item.count }}股</span>
            </div>
            <v-time v-model="item.time" />
          </div>
        </li>
      </ul>
    </flow-list>
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import { getStockMarketMeta } from '~/api/cartoonRoleApi'

export default {
  name: 'IdolTrendingAside',
  components: {
    FlowList
  },
  data() {
    return {
      meta: {
        buyer_count: 0,
        money_count: 0,
        deal_count: 0,
        exchang_money_count: 0
      }
    }
  },
  mounted() {
    this.getRecentBuy()
    this.getRecentDeal()
    this.getMetaInfo()
  },
  methods: {
    getRecentBuy() {
      this.$store.dispatch('flow/initData', {
        func: 'getRecentBuyList',
        sort: 'newest',
        type: 'page'
      })
    },
    getRecentDeal() {
      this.$store.dispatch('flow/initData', {
        func: 'getRecentDealList',
        sort: 'newest',
        type: 'page'
      })
    },
    async getMetaInfo() {
      this.meta = await getStockMarketMeta(this)
    }
  }
}
</script>

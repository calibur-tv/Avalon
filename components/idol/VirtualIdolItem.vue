<style lang="scss">
.virtual-idol-item {
  display: inline-block;
  width: 200px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: hsla(0, 0%, 71%, 0.1);
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 50px;
  transition: 0.2s ease;
  padding: 15px;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .info {
    text-align: center;
    margin-top: -55px;

    img {
      border-radius: 5px;
      border: 1px solid #ddd;
      width: 80px;
      height: 80px;
    }

    .oneline {
      margin-top: 5px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .intro {
    line-height: 20px;

    .price,
    .meta_1,
    .meta_2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      strong {
        font-size: 20px;
      }

      span {
        font-size: 12px;
        user-select: none;
        color: $color-text-light;
      }
    }

    .meta_1 {
      text-align: center;
      line-height: 30px;
      color: $color-text-light;
    }

    .meta_2 {
      text-align: center;
      line-height: 18px;
      color: $color-text-light;
    }
  }

  .trend-placeholder {
    height: 42px;

    p {
      line-height: 42px;
      text-align: center;
      font-size: 12px;
      color: $color-text-light;
    }
  }

  .control {
    text-align: center;
    margin-top: 10px;

    button {
      width: 90px;
      height: 32px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      background-color: transparent;
      border-radius: 4px;
      color: #f25d8e;
      border: 1px solid #f25d8e;

      &:hover {
        background-color: rgba(#f25d8e, 0.1);
      }

      &.locked {
        color: $color-dark-light;
        border-color: $color-dark-light;

        &:hover {
          background-color: rgba($color-dark-light, 0.1);
        }
      }
    }
  }

  .extra {
    border-top: 1px solid #eaeaea;
    margin-top: 15px;
    padding-top: 15px;

    .user {
      float: right;

      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: relative;
        border: 1px solid hsla(0, 0%, 71%, 0.1);
      }

      .manager {
        z-index: 1;

        &:hover {
          z-index: 3;
        }
      }

      .boss {
        margin-left: -20px;
        z-index: 2;
      }
    }

    .time {
      overflow: hidden;
      font-size: 12px;
      line-height: 24px;
      color: $color-text-light;
    }
  }
}
</style>

<template>
  <li class="virtual-idol-item">
    <a :href="$alias.cartoonRole(item.id)" target="_blank">
      <div class="info">
        <img :src="$resize(item.avatar, { width: 160 })" />
        <p class="oneline">{{ item.name }}</p>
      </div>
      <div class="intro">
        <p class="price">
          <span>市值:</span>
          <strong>{{
            item.company_state ? `￥${item.market_price}` : '未上市'
          }}</strong>
        </p>
        <p class="meta_1">
          <span>股价:</span>
          <span
            >￥{{ item.stock_price }} / 股，{{ item.fans_count }}人持股</span
          >
        </p>
        <p v-if="sort === 'mine'" class="meta_2">
          <span>持有：</span>
          <span>{{ item.has_star }}股，占比 {{ computedPercent }}</span>
        </p>
        <p v-else class="meta_2">
          <span>认购：</span>
          <span>{{ item.star_count }}股</span>
        </p>
        <div class="trend-placeholder">
          <no-ssr v-if="trendData.length">
            <v-trend
              :data="trendData"
              :gradient="['#ffafc9', '#ff8eb3', '#f25d8e']"
              :auto-draw-duration="400"
              :height="42"
              :padding="0"
              auto-draw
              smooth
            />
          </no-ssr>
          <p v-else>暂无数据</p>
        </div>
      </div>
      <div class="control">
        <template v-if="sort === 'mine'">
          <button>查看数据</button>
        </template>
        <template v-else>
          <button :class="{ locked: item.is_locked }">
            {{ item.is_locked ? '已停牌' : '马上入股' }}
          </button>
        </template>
      </div>
      <div class="extra">
        <div class="user">
          <img
            v-if="item.manager"
            :src="$resize(item.manager.avatar, { width: 50, height: 50 })"
            class="manager"
          />
          <img
            v-if="item.boss"
            :src="$resize(item.boss.avatar, { width: 50, height: 50 })"
            class="boss"
          />
        </div>
        <div class="time">
          <p v-if="item.ipo_at">上市时间：{{ item.ipo_at.split(' ')[0] }}</p>
          <p v-else>创办时间：{{ item.created_at.split(' ')[0] }}</p>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
import Trend from 'vuetrend'

export default {
  name: 'VirtualIdolItem',
  components: {
    'v-trend': Trend
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    sort: {
      type: String,
      required: true
    }
  },
  computed: {
    trendData() {
      return this.item.market_trend.map(_ => +_.value).reverse()
    },
    computedPercent() {
      return `${parseFloat(
        (this.item.has_star / this.item.star_count) * 100
      ).toFixed(2)}%`
    }
  }
}
</script>

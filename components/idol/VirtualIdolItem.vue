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
    font-size: 12px;
    margin-top: 15px;
    padding-top: 15px;
    line-height: 16px;
  }
}
</style>

<template>
  <li class="virtual-idol-item">
    <a
      :href="$alias.cartoonRole(item.id)"
      target="_blank"
    >
      <div class="info">
        <img :src="$resize(item.avatar, { width: 160 })">
        <p class="oneline">{{ item.name }}</p>
      </div>
      <div class="intro">
        <p>当前市值：{{ item.company_state ? `￥${item.market_price}` : '未上市' }}</p>
        <p>每股股价：￥{{ item.stock_price }}</p>
        <p>投资人数：{{ item.fans_count }}</p>
        <p>认购股份：{{ item.star_count }}</p>
      </div>
      <div class="control">
        <template v-if="sort === 'mine'">
          <button>查看数据</button>
        </template>
        <template v-else>
          <button :class="{ 'locked': item.is_locked }">{{ item.is_locked ? '已停牌' : '马上入股' }}</button>
        </template>
      </div>
      <div class="extra">
        <p v-if="item.ipo_at">上市时间：{{ item.ipo_at.split(' ')[0] }}</p>
        <p v-else>注册时间：{{ item.created_at.split(' ')[0] }}</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VirtualIdolItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    sort: {
      type: String,
      required: true
    }
  }
}
</script>

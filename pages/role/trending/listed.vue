<style lang="scss">
.role-trending-listed {
  .role-trending-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-right: 15px;
    border-bottom: 1px solid $color-gray-light;
  }
}
</style>

<template>
  <div class="role-trending-listed">
    <flow-list
      :sort="current_sort"
      func="virtualIdolList"
      type="seenIds"
    >
      <div
        slot="header"
        slot-scope="{ source }"
        class="role-trending-header"
      >
        <strong>总共 {{ source.total }} 个公司</strong>
        <el-select
          v-model="sort_selected"
          size="mini"
          @change="handleSortChange"
        >
          <el-option
            v-for="item in sorts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <ul slot-scope="{ flow }">
        <virtual-idol-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
          :sort="sort_selected"
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
  </div>
</template>

<script>
import FlowList from '~/components/flow/FlowList'
import VirtualIdolItem from '~/components/idol/VirtualIdolItem'

export default {
  name: 'RoleTrendingListed',
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'virtualIdolList',
      type: 'seenIds',
      sort: 'trending-activity-1'
    })
  },
  components: {
    FlowList,
    VirtualIdolItem
  },
  data() {
    return {
      sorts: [
        {
          label: '最高市值',
          value: 'market_price'
        },
        {
          label: '最多投资',
          value: 'fans_count'
        },
        {
          label: '最高股价',
          value: 'stock_price'
        },
        {
          label: '最新上市',
          value: 'newest'
        },
        {
          label: '最近活跃',
          value: 'activity'
        }
      ],
      sort_selected: 'activity',
      current_sort: 'trending-activity-1'
    }
  },
  methods: {
    initTrending() {
      const sort = `trending-${this.sort_selected}-1`
      this.$store.dispatch('flow/initData', {
        func: 'virtualIdolList',
        type: 'seenIds',
        sort
      })
      this.current_sort = sort
    },
    handleSortChange(value) {
      this.sort_selected = value
      this.initTrending()
    }
  }
}
</script>

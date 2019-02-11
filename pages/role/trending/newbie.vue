<style lang="scss">
.role-trending-newbie {
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
  <div class="role-trending-newbie">
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
        <nuxt-link to="/role/trending/listed">
          <el-button
            size="mini"
          >
            查看已上市公司
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
  name: 'RoleTrendingNewbie',
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
      func: 'virtualIdolList',
      type: 'seenIds',
      sort: 'trending-newest-0'
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
          label: '最新创办',
          value: 'newest'
        },
        {
          label: '最多股份',
          value: 'star_count'
        }
      ],
      sort_selected: 'newest',
      current_sort: 'trending-newest-0'
    }
  },
  methods: {
    initTrending() {
      const sort = `trending-${this.sort_selected}-0`
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

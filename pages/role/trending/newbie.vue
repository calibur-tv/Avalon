<style lang="scss">
.role-trending-newbie {
  .role-trending-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-right: 30px;
    border-bottom: 1px solid $color-gray-light;

    .search {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      > * {
        margin-left: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="role-trending-newbie">
    <v-layout>
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
          <div class="search">
            <bangumi-search
              size="mini"
              placeholder="按番剧搜索"
              style="width:200px"
              @search="searchByBangumi"
            />
            <el-input
              v-model.trim="nameQuery"
              size="mini"
              placeholder="按名称搜索"
              style="width:200px"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchByName"
              />
            </el-input>
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
      <template slot="aside">&nbsp;</template>
    </v-layout>
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
      nameQuery: '',
      sorts: [
        {
          label: '最新注册',
          value: 'newest'
        },
        {
          label: '最多入股',
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
    },
    searchByName() {
      if (!this.nameQuery) {
        return
      }
      window.open(`/search?q=${this.nameQuery}&type=role`)
      this.nameQuery = ''
    },
    searchByBangumi(bangumiId) {
      window.open(`/bangumi/${bangumiId}/role`)
    }
  }
}
</script>

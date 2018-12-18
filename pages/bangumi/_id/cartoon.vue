<style lang="scss">
#bangumi-cartoon-flow {
  .header {
    margin-bottom: 15px;
    text-align: right;

    .total {
      float: left;
      line-height: 28px;
    }

    .el-select {
      margin-right: 8px;
    }
  }
}
</style>

<template>
  <div id="bangumi-cartoon-flow">
    <div
      v-if="source && source.total"
      class="header"
    >
      <strong class="total">共 {{ source.total }} 集</strong>
      <el-select
        v-model="selectedSort"
        :loading="source.loading"
        size="mini"
        @change="handleSortSwitch"
      >
        <el-option
          v-for="item in order"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <flow-list
      :id="id"
      :sort="sort"
      func="getBangumiCartoon"
      type="page"
    >
      <ul slot-scope="{ flow }">
        <cartoon-flow-item
          v-for="item in flow"
          :key="item.id"
          :bangumi-id="id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import CartoonFlowItem from '~/components/flow/item/CartoonFlowItem'

export default {
  name: 'BangumiCartoonFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow/initData', {
      id: params.id,
      func: 'getBangumiCartoon',
      type: 'page',
      sort: 'asc'
    })
  },
  components: {
    CartoonFlowItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      selectedSort: 'asc',
      sort: 'asc'
    }
  },
  computed: {
    source() {
      return this.$store.getters['flow/getFlow'](
        'getBangumiCartoon',
        this.sort,
        this.id
      )
    },
    order() {
      return [
        {
          label: '由大到小排序',
          value: 'desc'
        },
        {
          label: '由小到大排序',
          value: 'asc'
        }
      ]
    }
  },
  methods: {
    handleSortSwitch(item) {
      this.$store.dispatch('flow/initData', {
        id: this.id,
        func: 'getBangumiCartoon',
        type: 'page',
        sort: item
      })
      this.sort = item
    }
  }
}
</script>

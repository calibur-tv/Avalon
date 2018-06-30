<style lang="scss">
  #search-index {
    .search-panel {
      margin-top: 20px;
      margin-bottom: 30px;

      .search-input-wrap {
        width: 650px;
        height: 45px;
        margin: 0 auto;

        .search-input-text {
          border: 2px solid $color-gray-deep;
          border-radius: 4px;

          input {
            padding: 11px 15px;
          }
        }

        .search-input-btn {
          background-color: $color-blue-normal;
          color: #fff;
          font-size: 16px;
          letter-spacing: 2px;
          line-height: 42px;
          text-align: center;
          width: 90px;
          border-radius: 4px;
          font-weight: bold;
          margin-left: 10px;

          &:hover {
            background-color: $color-blue-light;
          }
        }
      }
    }

    .no-content {
      margin-top: 30px;
    }

    .load-more-btn {
      width: 100%;
    }

    .loading-wrap {
      position: relative;
      width: 100%;
      height: 100px;

      .el-icon-loading {
        color: $color-blue-light;
        font-size: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>

<template>
  <div id="search-index">
    <v-banner/>
    <div class="container">
      <div class="search-panel">
        <v-search
          v-model="words"
          :type="selectedType"
          placeholder="搜索二次元的一切"
        >
          <template slot="submit-btn">
            <i class="iconfont icon-sousuo"/>
            搜索
          </template>
        </v-search>
      </div>
      <el-tabs
        v-model="selectedType"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="(tab, index) in tabs"
          :key="index"
          :name="index"
          :label="tab"
        >
          <div class="col-aside"/>
          <div class="col-main">
            <component
              v-if="noMore && !list.length"
              :is="`Nothing${selectedType}`"
            />
            <template v-else>
              <component
                v-for="item in list"
                :key="`${item.type}-${item.id}`"
                :is="`Flow${item.type}`"
                :item="item"
                :in-common="item.type != selectedType"
              />
            </template>
            <el-button
              v-if="!noMore && list.length"
              :loading="loading"
              type="info"
              plain
              round
              class="load-more-btn"
              @click="loadMore"
            >{{ loading ? '加载中' : '加载更多' }}</el-button>
            <div
              v-if="loading && !list.length"
              class="loading-wrap"
            >
              <div class="el-icon-loading"/>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import vSearch from '~/components/search/Input'
  import Flow1 from '~/components/search/flows/flow_1'
  import Flow2 from '~/components/search/flows/flow_2'
  import Flow3 from '~/components/search/flows/flow_3'
  import Flow4 from '~/components/search/flows/flow_4'
  import Flow5 from '~/components/search/flows/flow_5'
  import Nothing0 from '~/components/search/nothing/nothing_0'
  import Nothing1 from '~/components/search/nothing/nothing_1'
  import Nothing2 from '~/components/search/nothing/nothing_2'
  import Nothing3 from '~/components/search/nothing/nothing_3'
  import Nothing4 from '~/components/search/nothing/nothing_4'
  import Nothing5 from '~/components/search/nothing/nothing_5'

  export default {
    name: 'SearchIndex',
    async asyncData ({ store, route, ctx }) {
      const args = route.query
      await store.dispatch('search/fetchData', {
        ctx,
        type: args.type,
        q: args.q
      })
    },
    components: {
      vSearch,
      Flow1,
      Flow2,
      Flow3,
      Flow4,
      Flow5,
      Nothing0,
      Nothing1,
      Nothing2,
      Nothing3,
      Nothing4,
      Nothing5
    },
    data () {
      return {
        selectedType: this.$route.query.type,
        words: this.$route.query.q
      }
    },
    computed: {
      resource () {
        return this.$store.state.search.resource[this.selectedType]
      },
      loading () {
        return this.resource.loading
      },
      list () {
        return this.resource.list
      },
      noMore () {
        return this.resource.noMore
      },
      total () {
        return this.resource.total
      },
      tabs () {
        return this.$store.state.search.tabs
      }
    },
    methods: {
      handleTabClick (tab) {
        this.$router.push({
          name: 'search-index',
          query: { q: this.words, type: tab.name }
        })
      },
      async loadMore () {
        try {
          await this.$store.dispatch('search/fetchMore', {
            ctx: this,
            type: this.selectedType
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>

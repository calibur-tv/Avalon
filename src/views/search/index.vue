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

      .search-suggestions {
        width: 549px;
        border: 1px solid $color-gray-deep;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
        top: 110%;
        left: 0;

        li:hover,
        li.active {
          background-color: $color-gray-normal;
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
    <v-header/>
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
    </div>
    <v-layout>
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
          <component
            v-if="noMore && !list.length"
            :is="`nothing-${selectedType}`"
          />
          <template v-else>
            <component
              v-for="item in list"
              :key="`${item.type}-${item.id}`"
              :is="`${item.type}-item`"
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
        </el-tab-pane>
      </el-tabs>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import vSearch from "~/components/search/Input";
import UserItem from "~/components/search/flows/UserItem";
import BangumiItem from "~/components/search/flows/BangumiItem";
import VideoItem from "~/components/search/flows/VideoItem";
import PostItem from "~/components/flow/item/PostFlowItem";
import RoleItem from "~/components/flow/item/CartoonRoleFlowItem";
import ScoreItem from "~/components/flow/item/ScoreFlowItem";
import NothingAll from "~/components/search/nothing/NothingAll";
import NothingUser from "~/components/search/nothing/NothingUser";
import NothingBangumi from "~/components/search/nothing/NothingBangumi";
import NothingVideo from "~/components/search/nothing/NothingVideo";
import NothingPost from "~/components/search/nothing/NothingPost";
import NothingRole from "~/components/search/nothing/NothingRole";
import NothingScore from "~/components/search/nothing/NothingScore";

export default {
  name: "SearchIndex",
  async asyncData({ store, route, ctx }) {
    const args = route.query;
    const type = args.type || "all";
    await store.dispatch("search/fetchData", {
      ctx,
      type,
      q: args.q
    });
  },
  components: {
    vSearch,
    UserItem,
    BangumiItem,
    VideoItem,
    PostItem,
    RoleItem,
    ScoreItem,
    NothingAll,
    NothingUser,
    NothingBangumi,
    NothingVideo,
    NothingPost,
    NothingRole,
    NothingScore
  },
  data() {
    return {
      selectedType: this.$route.query.type || "all",
      words: this.$route.query.q
    };
  },
  computed: {
    resource() {
      return this.$store.state.search.resource[this.selectedType];
    },
    loading() {
      return this.resource.loading;
    },
    list() {
      return this.resource.list;
    },
    noMore() {
      return this.resource.noMore;
    },
    total() {
      return this.resource.total;
    },
    tabs() {
      return this.$store.state.search.tabs;
    }
  },
  methods: {
    handleTabClick(tab) {
      this.$router.push({
        name: "search-index",
        query: { q: this.words, type: tab.name }
      });
    },
    async loadMore() {
      try {
        await this.$store.dispatch("search/fetchMore", {
          ctx: this,
          type: this.selectedType
        });
      } catch (e) {
        this.$toast.error(e);
      }
    }
  }
};
</script>

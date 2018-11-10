<style lang="scss">
#trending-role {
  aside {
    .recommended-users {
      margin-bottom: 20px;

      li {
        display: block;
        margin-bottom: 14px;

        a {
          display: block;
          width: 100%;
          height: 100%;
          @extend %clearfix;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
          float: left;
        }

        .intro {
          overflow: hidden;

          p {
            margin-top: 2px;
            cursor: pointer;
            font-size: 12px;
            line-height: 16px;
            color: #222;
          }

          span {
            border-radius: 7px;
            color: #fff;
            text-align: center;
            padding: 0 10px;
            height: 16px;
            min-width: 50px;
            display: inline-block;
            background-color: $color-pink-normal;
            line-height: 16px;
            font-size: 12px;
            margin-top: 3px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="trending-role">
    <v-header/>
    <v-layout>
      <tab-container
        :list="pages"
        :route="false"
        title="偶像排行榜"
        @change="changeTab"
      >
        <div
          slot="0"
          style="margin-right: 50px"
        >
          <ve-bar
            v-if="chartData"
            :data="chartData"
            :extend="chartExtend"
            :height="chartHgt"
          />
        </div>
        <template slot="1">
          <cartoon-role-flow-list/>
        </template>
      </tab-container>
      <template slot="aside">
        <template v-if="newbieUsers.length">
          <p class="sub-title">超新星11人</p>
          <ul class="recommended-users">
            <li
              v-for="user in newbieUsers"
              :key="user.id"
            >
              <a
                :href="$alias.user(user.zone)"
                target="_blank"
              >
                <img
                  :src="$resize(user.avatar, { width: 80 })"
                  class="avatar"
                >
                <div class="intro">
                  <p
                    class="oneline"
                    v-text="user.nickname"
                  />
                  <span
                    class="contribution"
                    v-text="user.contribution"
                  />
                </div>
              </a>
            </li>
          </ul>
        </template>
        <template v-if="dalaoUsers.length">
          <p class="sub-title">最强の11人</p>
          <ul class="recommended-users">
            <li
              v-for="user in dalaoUsers"
              :key="user.id"
            >
              <a
                :href="$alias.user(user.zone)"
                target="_blank"
              >
                <img
                  :src="$resize(user.avatar, { width: 80 })"
                  class="avatar"
                >
                <div class="intro">
                  <p
                    class="oneline"
                    v-text="user.nickname"
                  />
                  <span
                    class="contribution"
                    v-text="user.contribution"
                  />
                </div>
              </a>
            </li>
          </ul>
        </template>
      </template>
    </v-layout>
  </div>
</template>

<script>
import TabContainer from "~/components/common/TabContainer";
import CartoonRoleFlowList from "~/components/flow/list/CartoonRoleFlowList";

export default {
  name: "TrendingRole",
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("cartoonRole/getTodayActivity"),
      store.dispatch("cartoonRole/getDalaoUsers"),
      store.dispatch("cartoonRole/getNewbieUsers")
    ]);
  },
  head: {
    title: "角色排行榜"
  },
  components: {
    TabContainer,
    CartoonRoleFlowList,
    VeBar: () => {
      if (typeof window === "undefined") {
        return import("~/assets/js/empty");
      }
      return import("v-charts/lib/bar.common");
    }
  },
  data() {
    this.chartSettings = {
      dimension: ["偶像"],
      metrics: ["团子数"]
    };
    this.chartExtend = {
      series(v) {
        v.forEach(i => {
          i.barWidth = 10;
        });
        return v;
      }
    };
    return {
      pages: [
        {
          label: "24小时热榜"
        },
        {
          label: "总榜"
        }
      ],
      loadingActivity: false,
      timer: 0,
      index: 0
    };
  },
  computed: {
    todayActivity() {
      return this.$store.state.cartoonRole.todayActivity;
    },
    chartData() {
      if (!this.todayActivity.length) {
        return null;
      }
      return {
        columns: ["偶像", "团子数", "粉丝数"],
        rows: this.todayActivity
      };
    },
    chartHgt() {
      return `${this.todayActivity.length * 50 + 100}px`;
    },
    dalaoUsers() {
      return this.$store.state.cartoonRole.dalao;
    },
    newbieUsers() {
      return this.$store.state.cartoonRole.newbie;
    }
  },
  mounted() {
    this.timer = setInterval(this.getTodayActivity, 5000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  },
  methods: {
    changeTab(index) {
      if (index === 0) {
        this.getTodayActivity();
      } else if (index === 1) {
        this.getTrending();
      }
      this.index = index;
    },
    async getTodayActivity() {
      if (this.loadingActivity || this.index) {
        return;
      }
      this.loadingActivity = true;
      await this.$store.dispatch("cartoonRole/getTodayActivity");
      this.loadingActivity = false;
    },
    async getTrending() {
      await this.$store.dispatch("world/initData", {
        type: "role",
        sort: "hot",
        ctx: this
      });
    }
  }
};
</script>

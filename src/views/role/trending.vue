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
            :data="chartData"
          />
        </div>
        <template slot="1">
          <cartoon-role-flow-list/>
        </template>
      </tab-container>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import TabContainer from "~/components/common/TabContainer";
import CartoonRoleFlowList from "~/components/flow/list/CartoonRoleFlowList";

export default {
  name: "TrendingRole",
  async asyncData({ store }) {
    await store.dispatch("cartoonRole/getTodayActivity");
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

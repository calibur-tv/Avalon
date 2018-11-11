<style lang="scss">
#trending-role {
  background-color: #f6f9fa;
  margin-bottom: -40px;

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

  .cell-container {
    width: 840px;
    margin-top: 15px;
    margin-left: -8px;
    margin-bottom: 15px;
  }

  .cell {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 252px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: #fff;
    transition: 0.2s ease;
    text-align: center;
    font-size: 0;
    vertical-align: middle;
    overflow: hidden;

    img {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin: 26px auto 8px;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      .index {
        display: none;
      }

      .iconfont {
        display: block;
      }
    }

    &:nth-child(1) {
      .iconfont {
        color: gold;
      }
    }

    &:nth-child(2) {
      .iconfont {
        color: silver;
      }
    }

    &:nth-child(3) {
      .iconfont {
        color: indianred;
      }
    }

    .iconfont {
      position: absolute;
      left: 85px;
      top: 3px;
      font-size: 30px;
      display: none;
    }

    .index {
      position: absolute;
      right: 10px;
      top: 0;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      text-align: right;
      color: gold;
    }

    .name {
      margin: 16px 16px 7px;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .intro {
      height: 42px;
      margin-bottom: 14px;
      padding-left: 16px;
      padding-right: 16px;
      font-size: 14px;
      color: gray;
      @include twoline(21px);
    }

    .meta {
      font-size: 14px;
      color: gray;
      margin-bottom: 15px;
    }
  }

  .cell-move {
    transition: transform 1s;
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
        <div slot="0">
          <transition-group
            name="cell"
            tag="div"
            class="cell-container"
          >
            <div
              v-for="(item, index) in todayActivity"
              :key="item.id"
              class="cell"
            >
              <div
                class="index"
                v-text="index + 1"
              />
              <i class="iconfont icon-huangguan"/>
              <a
                :href="$alias.cartoonRole(item.id)"
                target="_blank"
              >
                <img :src="$resize(item.avatar, { width: 96 })">
                <p
                  class="name oneline"
                  v-text="item.name"
                />
              </a>
              <p
                class="intro"
                v-text="item.intro"
              />
              <p class="meta">
                {{ $utils.shortenNumber(item.star_count) }}个团子
                |
                {{ $utils.shortenNumber(item.fans_count) }}人应援
              </p>
              <cartoon-role-btn
                :id="item.id"
                @success="handleSuccess"
              />
            </div>
          </transition-group>
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
import CartoonRoleBtn from "~/components/buttons/CartoonRoleBtn";

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
    CartoonRoleBtn,
    TabContainer,
    CartoonRoleFlowList
  },
  data() {
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
    },
    handleSuccess() {
      this.$toast.success("应援成功!");
    }
  }
};
</script>

<style lang="scss">
#bangumi-news {
  $time-size: 30px;
  .sub-title {
    margin-left: $time-size / 2;
  }

  .el-tabs {
    padding-left: $time-size / 2;

    .el-tabs__nav {
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: center;

      .el-tabs__item {
        flex: 1;
      }
    }
  }

  .bangumi {
    width: 195px;
    margin: 0 10px 20px 0;
    float: left;

    .avatar {
      width: 65px;
      height: 65px;
      display: block;
      float: left;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .intro {
      overflow: hidden;
      font-size: 12px;

      .name {
        height: 37px;
        margin-top: 5px;
        margin-bottom: 5px;
        @include twoline(16px);
      }

      span {
        color: $color-text-light;
        line-height: 18px;

        .part {
          border-radius: 9px;
          color: $color-white;
          text-align: center;
          padding: 0 4px;
          height: 18px;
          min-width: 36px;
          max-width: 50px;
          margin-left: 5px;
          display: inline-block;
          vertical-align: top;

          &.new {
            background-color: $color-pink-normal;
          }

          &.old {
            background-color: $color-dark-light;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-news">
    <v-header/>
    <v-layout>
      <template slot="main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.bangumiNews">新番放送</router-link>
          <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
          <a :href="$alias.bangumiTag()">分类索引</a>
        </div>
        <h2 class="sub-title">新番放送表</h2>
        <el-tabs v-model="thisWeek">
          <el-tab-pane
            v-for="(tab, index) in showtime"
            :key="index"
            :name="tab"
            :label="tab"
          >
            <ul v-if="released && released[index] && released[index].length">
              <li
                v-for="item in released[index]"
                :key="item.id"
                class="bangumi"
              >
                <a
                  :href="$alias.bangumi(item.id)"
                  target="_blank"
                  class="avatar"
                >
                  <img
                    :src="$resize(item.avatar, { width: 180 })"
                    :alt="item.name"
                  >
                </a>
                <div class="intro">
                  <a
                    :href="$alias.bangumi(item.id)"
                    class="name href-fade-blue"
                    target="_blank"
                    v-text="item.name"
                  />
                  <span>
                    更新至
                    <a
                      v-if="item.released_video_id"
                      :class="[item.update ? 'new' : 'old']"
                      :href="$alias.video(item.released_video_id)"
                      target="_blank"
                      class="part oneline"
                    >
                      {{ item.end ? '已完结' : `${item.released_part}话` }}
                    </a>
                    <strong
                      v-else
                      :class="[item.update ? 'new' : 'old']"
                      class="part oneline"
                    >
                      {{ item.end ? '已完结' : `${item.released_part}话` }}
                    </strong>
                  </span>
                </div>
              </li>
            </ul>
            <no-content v-else>
              <el-button
                type="primary"
                round
                @click="openFeedbackForResource"
              >求资源</el-button>
            </no-content>
          </el-tab-pane>
        </el-tabs>
      </template>
    </v-layout>
  </div>
</template>

<script>
const weekly = ["最新", "一", "二", "三", "四", "五", "六", "日"];

export default {
  name: "BangumiNews",
  head: {
    title: "新番放送 - 番剧"
  },
  async asyncData({ store, ctx }) {
    await store.dispatch("bangumi/getReleased", ctx);
  },
  data() {
    return {
      showtime: weekly,
      thisWeek: weekly[new Date().getDay() || 7]
    };
  },
  computed: {
    released() {
      return this.$store.state.bangumi.released;
    }
  },
  methods: {
    openFeedbackForResource() {
      this.$channel.$emit("open-feedback", {
        type: 5,
        desc: "我想看新番："
      });
    }
  }
};
</script>

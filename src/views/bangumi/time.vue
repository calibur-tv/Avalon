<style lang="scss">
#bangumi-timeline {
  $time-size: 30px;
  .collections {
    position: relative;
    margin-left: -$time-size / 2;

    &:before {
      content: '';
      position: absolute;
      display: block;
      left: 14.5px;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: $color-blue-light;
    }

    .collection {
      padding-left: $time-size;

      .time {
        height: $time-size;
        line-height: $time-size;
        padding-left: $time-size * 1.5;
        margin-left: -$time-size;
        position: relative;
        font-weight: 400;
        color: $color-text-light;
        font-size: 16px;
        margin-top: 20px;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: $time-size;
          height: $time-size;
          border-radius: 50%;
          border: 1px solid $color-blue-light;
          background-color: $color-white;
        }

        &:after {
          content: '';
          position: absolute;
          left: 7px;
          top: 7px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: $color-blue-light;
        }
      }
    }
  }

  .bangumi {
    width: 100%;
    padding: 20px 10px;
    @extend %clearfix;

    .avatar {
      margin-right: 15px;
      float: left;
    }

    .content {
      overflow: hidden;

      .title {
        font-size: 18px;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }

      .desc {
        margin: 10px 0 12px 0;
        color: $color-text-light;
        font-size: 13px;
        @include twoline(18px);
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-timeline">
    <v-header/>
    <v-layout :affix-top="235">
      <div class="breadcrumb-links">
        <router-link :to="$alias.bangumiNews">新番放送</router-link>
        <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
        <a :href="$alias.bangumiTag()">分类索引</a>
      </div>
      <h2 class="sub-title">时间轴</h2>
      <ul class="collections">
        <ul
          v-for="col in timeline"
          :key="col.date"
          class="collection"
        >
          <h3
            class="time"
            v-text="col.date"
          />
          <li
            v-for="item in col.list"
            :key="item.id"
            class="bangumi"
          >
            <a
              :href="$alias.bangumi(item.id)"
              target="_blank"
              class="avatar"
            >
              <v-img
                :src="item.avatar"
                :poster="true"
                size="90"
              />
            </a>
            <div class="content">
              <a
                :href="$alias.bangumi(item.id)"
                target="_blank"
                class="title"
                v-text="item.name"
              />
              <p
                class="desc"
                v-text="item.summary"
              />
            </div>
          </li>
        </ul>
      </ul>
      <load-more-btn
        :no-more="noMore"
        :loading="loading"
        :auto="true"
        @fetch="loadMore"
      />
      <template slot="aside">
        <bangumi-recommended/>
      </template>
    </v-layout>
  </div>
</template>

<script>
import BangumiRecommended from '~/components/bangumi/BangumiRecommended'

export default {
  name: 'BangumiTimeline',
  components: {
    BangumiRecommended
  },
  async asyncData({ store, ctx }) {
    await Promise.all([
      store.dispatch('bangumi/getTimeline', ctx),
      store.dispatch('bangumi/getRecommended')
    ])
  },
  head: {
    title: '时间轴 - 番剧'
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    timeline() {
      return this.$store.state.bangumi.timeline.data
    },
    noMore() {
      return this.$store.state.bangumi.timeline.noMore
    }
  },
  methods: {
    async loadMore() {
      this.loading = true
      try {
        await this.$store.dispatch('bangumi/getTimeline')
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

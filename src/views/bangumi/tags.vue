<style lang="scss">
#bangumi-tags {
  .tags {
    margin-bottom: 25px;

    li {
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
    }

    .btn {
      font-size: 12px;
      background-color: $color-white;
      border: 1px solid $color-gray-deep;
      padding: 0 5px;
      line-height: 22px;
      border-radius: 4px;

      &:hover {
        background-color: $color-gray-deep;
      }
    }
  }

  .bangumi {
    width: 100%;
    padding: 20px 10px;
    @extend %clearfix;

    &:not(:last-child) {
      border-bottom: 1px solid $color-gray-normal;
    }

    .avatar {
      margin-right: 15px;
      border-radius: 5px;
      overflow: hidden;
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
  <div
    id="bangumi-tags"
    class="main"
  >
    <v-header/>
    <v-layout :affix-top="235">
      <div class="breadcrumb-links">
        <router-link :to="$alias.bangumiNews">新番放送</router-link>
        <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
        <router-link :to="$alias.bangumiTag()">分类索引</router-link>
      </div>
      <div class="tags">
        <h2 class="sub-title">标签列表</h2>
        <ul>
          <li
            v-for="(tag, index) in tags"
            :key="tag.id"
            @click="$store.commit('bangumi/selectTag', index)"
          >
            <a
              :href="$alias.bangumiTag(tag.id)"
              :class="{ 'selected': tag.selected }"
              class="tag-btn"
              @click.prevent
            >{{ tag.name }}</a>
          </li>
          <li>
            <button
              class="btn"
              @click="refresh"
            >点击查找</button>
          </li>
        </ul>
      </div>
      <div
        v-if="bangumis && bangumis.length"
        class="bangumis"
      >
        <h2 class="sub-title">番剧列表</h2>
        <ul>
          <li
            v-for="item in bangumis"
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
        <load-more-btn
          :no-more="noMore"
          :loading="loading"
          :auto="true"
          @fetch="loadMore"
        />
      </div>
      <no-content v-else-if="id"/>
      <template slot="aside">
        <bangumi-recommended/>
      </template>
    </v-layout>
  </div>
</template>

<script>
import BangumiRecommended from "~/components/bangumi/BangumiRecommended";

export default {
  name: "BangumiTags",
  components: {
    BangumiRecommended
  },
  head: {
    title: "分类索引 - 番剧"
  },
  async asyncData({ route, store, ctx }) {
    const id = route.query.id;
    const arr = [
      store.dispatch("bangumi/getTags", { id, ctx }),
      store.dispatch("bangumi/getRecommended")
    ];
    if (
      id &&
      (/^\d+$/.test(id) ||
        (id.indexOf("-") !== -1 &&
          id.split("-").every(item => /^\d+$/.test(item))))
    ) {
      arr.push(
        store.dispatch("bangumi/getCategory", {
          id,
          ctx
        })
      );
    }
    await Promise.all(arr);
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    bangumis() {
      return this.$store.state.bangumi.category.data;
    },
    tags() {
      return this.$store.state.bangumi.tags;
    },
    noMore() {
      return this.$store.state.bangumi.category.noMore;
    }
  },
  methods: {
    refresh() {
      const selected = [];
      this.tags.forEach(tag => {
        if (tag.selected) {
          selected.push(tag.id);
        }
      });
      if (selected.length) {
        window.location = this.$alias.bangumiTag(selected.join("-"));
      }
    },
    async loadMore() {
      if (this.notFetch) {
        return;
      }
      this.loading = true;

      try {
        await this.$store.dispatch("bangumi/getCategory", {
          id: this.$route.query.id,
          ctx: this
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

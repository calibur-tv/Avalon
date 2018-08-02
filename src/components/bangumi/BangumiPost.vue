<template>
  <div id="bangumi-post">
    <ul>
      <post-show-item
        v-for="item in postList"
        :key="item.id"
        :item="item"
      />
    </ul>
    <template v-if="posts">
      <el-button
        v-if="!posts.noMore"
        :loading="posts.loading"
        class="load-more-btn"
        type="info"
        plain
        @click="loadMore"
      >{{ posts.loading ? '加载中' : '加载更多' }}</el-button>
      <no-content v-if="posts.noMore && !posts.total && !topPosts.length">
        <el-button
          type="primary"
          round
          @click="openCreatePostModal"
        >发表《{{ info.name }}》的第一个帖子</el-button>
      </no-content>
    </template>
  </div>
</template>

<script>
import PostShowItem from "~/components/items/PostShow";

export default {
  name: "BangumiPost",
  components: {
    PostShowItem
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    },
    posts() {
      return this.$store.state.trending.type === "post"
        ? this.$store.state.trending.active
        : null;
    },
    topPosts() {
      return this.$store.state.bangumi.topPosts;
    },
    postList() {
      return this.posts ? this.topPosts.concat(this.posts.list) : this.topPosts;
    }
  },
  mounted() {
    this.$channel.$on("bangumi-tab-switch-post", () => {
      this.getData();
    });
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("trending/getTrending", {
          type: "post",
          sort: "active",
          ctx: this,
          bangumiId: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      }
    },
    async loadMore() {
      try {
        await this.$store.dispatch("trending/loadMore", {
          type: "post",
          sort: "active",
          ctx: this,
          bangumiId: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      }
    },
    openCreatePostModal() {
      this.$channel.$emit("show-create-post-modal");
    }
  }
};
</script>

<style lang="scss">
#bangumi-show {
  .el-tabs__nav-wrap {
    margin-top: -10px;

    &:after {
      background-color: transparent;
    }
  }

  .load-more-btn {
    margin-top: 20px;
    width: 100%;
  }
}
</style>

<template>
  <div id="bangumi-show">
    <bangumi-banner/>
    <v-layout>
      <el-tabs
        slot="main"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="帖子">
          <bangumi-post/>
        </el-tab-pane>
        <el-tab-pane
          v-if="info.has_video"
          label="视频"
        >
          <bangumi-video/>
        </el-tab-pane>
        <el-tab-pane
          v-if="info.has_cartoon"
          label="漫画"
        >
          <bangumi-cartoon/>
        </el-tab-pane>
        <el-tab-pane label="偶像">
          <bangumi-role/>
        </el-tab-pane>
        <el-tab-pane label="相册">
          <bangumi-image/>
        </el-tab-pane>
        <el-tab-pane label="漫评">
          <bangumi-score/>
        </el-tab-pane>
        <el-tab-pane
          v-if="info.is_master"
          label="设置"
        >
          <bangumi-setting/>
        </el-tab-pane>
      </el-tabs>
      <bangumi-aside slot="aside"/>
    </v-layout>
  </div>
</template>

<script>
import BangumiBanner from "~/components/bangumi/BangumiBanner";
import BangumiAside from "~/components/bangumi/BangumiAside";
import BangumiPost from "~/components/bangumi/BangumiPost";
import BangumiVideo from "~/components/bangumi/BangumiVideo";
import BangumiCartoon from "~/components/bangumi/BangumiCartoon";
import BangumiRole from "~/components/bangumi/BangumiRole";
import BangumiImage from "~/components/bangumi/BangumiImage";
import BangumiScore from "~/components/bangumi/BangumiScore";
import BangumiSetting from "~/components/bangumi/BangumiSetting";

export default {
  name: "BangumiShow",
  async asyncData({ route, store, ctx }) {
    const id = route.params.id;
    await Promise.all([
      store.dispatch("bangumi/getBangumi", { ctx, id }),
      store.dispatch("bangumi/getTopPosts", { ctx, id }),
      store.dispatch("flow/getData", {
        type: "post",
        sort: "active",
        bangumiId: id,
        ctx
      })
    ]);
  },
  components: {
    BangumiBanner,
    BangumiAside,
    BangumiPost,
    BangumiVideo,
    BangumiCartoon,
    BangumiRole,
    BangumiImage,
    BangumiScore,
    BangumiSetting
  },
  head() {
    if (!this.id) {
      return;
    }
    return {
      title: `${this.info.name} - 番剧`,
      meta: [
        { hid: "description", name: "description", content: this.info.summary }
      ]
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    info() {
      return this.$store.state.bangumi.info;
    }
  },
  mounted() {
    this.$channel.$on("get-page-bangumi-for-post-create", () => {
      this.$channel.$emit("set-page-bangumi-for-post-create", {
        id: this.info.id,
        name: this.info.name,
        avatar: this.info.avatar
      });
    });
    setTimeout(() => {
      document.getElementById("tab-1").click();
    }, 1000);
  },
  methods: {
    handleTabClick(tab) {
      switch (tab.label) {
        case "帖子":
          this.$channel.$emit("bangumi-tab-switch-post");
          break;
        case "漫画":
          this.$channel.$emit("bangumi-tab-switch-cartoon");
          break;
        case "视频":
          this.$channel.$emit("bangumi-tab-switch-video");
          break;
        case "偶像":
          this.$channel.$emit("bangumi-tab-switch-role");
          break;
        case "相册":
          this.$channel.$emit("bangumi-tab-switch-image");
          break;
        case "漫评":
          this.$channel.$emit("bangumi-tab-switch-score");
          break;
        case "设置":
          this.$channel.$emit("bangumi-tab-switch-setting");
          break;
      }
    }
  }
};
</script>

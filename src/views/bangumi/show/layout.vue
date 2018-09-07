<template>
  <div id="bangumi-show">
    <bangumi-banner/>
    <v-layout>
      <template slot="main">
        <tab-container
          :list="cards"
          def="bangumi-post"
        />
        <router-view/>
      </template>
      <bangumi-aside slot="aside"/>
    </v-layout>
  </div>
</template>

<script>
import BangumiBanner from "~/components/bangumi/BangumiBanner";
import BangumiAside from "~/components/bangumi/BangumiAside";
import TabContainer from "~/components/common/TabContainer";

export default {
  name: "BangumiShowLayout",
  async asyncData({ route, store, ctx }) {
    await store.dispatch("bangumi/getBangumi", { ctx, id: route.params.id });
  },
  components: {
    BangumiBanner,
    BangumiAside,
    TabContainer
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
    },
    cards() {
      const info = this.info;
      if (!info) {
        return [];
      }
      return [
        {
          label: "帖子",
          name: "bangumi-post",
          show: true
        },
        {
          label: "视频",
          name: "bangumi-video",
          show: info.has_video
        },
        {
          label: "漫画",
          name: "bangumi-cartoon",
          show: info.has_cartoon
        },
        {
          label: "偶像",
          name: "bangumi-role",
          show: true
        },
        {
          label: "相册",
          name: "bangumi-image",
          show: true
        },
        {
          label: "漫评",
          name: "bangumi-score",
          show: true
        },
        {
          label: "问答",
          name: "bangumi-question",
          show: true
        },
        {
          label: "设置",
          name: "bangumi-setting",
          show: info.is_master
        }
      ].filter(_ => _.show);
    }
  }
};
</script>

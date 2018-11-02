<template>
  <div id="trending-role">
    <v-header/>
    <v-layout>
      <h2 class="sub-title">偶像排行榜</h2>
      <cartoon-role-flow-list/>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import CartoonRoleFlowList from "~/components/flow/list/CartoonRoleFlowList";

export default {
  name: "TrendingRole",
  async asyncData({ store, ctx }) {
    await store.dispatch("world/initData", {
      type: "role",
      sort: "hot",
      ctx
    });
  },
  head: {
    title: "角色排行榜"
  },
  components: {
    CartoonRoleFlowList
  }
};
</script>
